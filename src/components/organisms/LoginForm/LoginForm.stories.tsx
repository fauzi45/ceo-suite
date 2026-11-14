import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import { LoginForm } from "./LoginForm";

const meta: Meta<typeof LoginForm> = {
  title: "Organisms/LoginForm",
  component: LoginForm,
  // LoginForm memakai useRouter dari App Router (pindah halaman setelah login mock).
  parameters: { nextjs: { appDirectory: true } },
  args: { onSubmit: fn() },
  decorators: [(Story) => <div className="mx-auto w-full max-w-120 p-4"><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {};

/** Field wajib diumumkan sebagai required; tanda bintang tidak ikut terbaca di nama aksesibel. */
export const RequiredFields: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("textbox", { name: "Email" })).toBeRequired();
    const password = canvasElement.querySelector<HTMLInputElement>(
      'input[autocomplete="current-password"]',
    )!;
    await expect(password).toBeRequired();
    await expect(canvasElement.querySelectorAll('[aria-hidden="true"]').length).toBeGreaterThan(0);
  },
};

/** Sign In nonaktif selama form belum terisi valid. */
export const DisabledWhenEmpty: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("button", { name: "Sign In" })).toBeDisabled();
    await expect(args.onSubmit).not.toHaveBeenCalled();
  },
};

export const InvalidEmail: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/^Email/), "a@b");
    await userEvent.type(canvas.getByLabelText(/^Password/), "secret");
    await expect(await canvas.findByText("Enter a valid email address")).toBeVisible();
    await expect(canvas.getByRole("button", { name: "Sign In" })).toBeDisabled();
    await expect(args.onSubmit).not.toHaveBeenCalled();
  },
};

export const ValidSubmit: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/^Email/), "  user@example.com  ");
    await userEvent.type(canvas.getByLabelText(/^Password/), "secret");
    await userEvent.click(canvas.getByLabelText("Remember me"));
    await userEvent.click(canvas.getByRole("button", { name: "Sign In" }));
    await waitFor(() => expect(args.onSubmit).toHaveBeenCalledTimes(1));
    await expect(args.onSubmit).toHaveBeenCalledWith({
      email: "user@example.com",
      password: "secret",
      rememberMe: true,
    });
  },
};

/** Saat submit berjalan, tombol nonaktif sehingga klik/Enter kedua tidak men-submit lagi. */
export const NoDoubleSubmit: Story = {
  args: { onSubmit: fn(() => new Promise<void>(() => {})) },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/^Email/), "user@example.com");
    await userEvent.type(canvas.getByLabelText(/^Password/), "secret");
    const button = canvas.getByRole("button", { name: /Sign In/ });
    await userEvent.click(button);
    await waitFor(() => expect(button).toBeDisabled());
    await userEvent.click(button);
    await userEvent.keyboard("{Enter}");
    await expect(args.onSubmit).toHaveBeenCalledTimes(1);
  },
};
