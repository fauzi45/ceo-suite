import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

const meta: Meta<typeof ForgotPasswordForm> = {
  title: "Organisms/ForgotPasswordForm",
  component: ForgotPasswordForm,
  parameters: { layout: "fullscreen" },
  args: { onResend: fn() },
  decorators: [(Story) => <div className="mx-auto flex w-full max-w-146 flex-col gap-10 p-4"><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof ForgotPasswordForm>;

/** Tombol Reset Password nonaktif sampai email valid. Setelah submit pindah ke state "email terkirim". */
export const Default: Story = {};

/** State setelah Reset Password: subjudul memuat email, field terkunci, tombol Resend Email. */
export const EmailSent: Story = { args: { initialSentTo: "janedoe@gmail.com" } };
