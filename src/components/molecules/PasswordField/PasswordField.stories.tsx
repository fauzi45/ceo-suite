import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { PasswordField } from "./PasswordField";

const meta: Meta<typeof PasswordField> = {
  title: "Molecules/PasswordField",
  component: PasswordField,
  args: { label: "Password", placeholder: "Enter your password" },
  decorators: [(Story) => <div className="w-[320px]"><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof PasswordField>;

export const Default: Story = {};
export const Error: Story = { args: { errorText: "Password is required" } };

/** Target sentuh tombol mata minimal 24x24px (WCAG 2.2 SC 2.5.8). */
export const TapTarget: Story = {
  play: async ({ canvasElement }) => {
    const rect = within(canvasElement)
      .getByRole("button", { name: "Show password" })
      .getBoundingClientRect();
    await expect(rect.width).toBeGreaterThanOrEqual(24);
    await expect(rect.height).toBeGreaterThanOrEqual(24);
  },
};

/** Tombol mata mengganti tipe input tanpa menghapus isi dan tanpa men-submit form. */
export const Toggle: Story = {
  args: { defaultValue: "secret" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Password");
    await expect(input).toHaveAttribute("type", "password");

    await userEvent.click(canvas.getByRole("button", { name: "Show password" }));

    await expect(input).toHaveAttribute("type", "text");
    await expect(input).toHaveValue("secret");
    const hide = canvas.getByRole("button", { name: "Hide password" });
    await expect(hide).toHaveAttribute("aria-pressed", "true");
    await expect(hide).toHaveAttribute("type", "button");
  },
};
