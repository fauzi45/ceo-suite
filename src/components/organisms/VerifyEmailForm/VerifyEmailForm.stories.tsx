import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { VerifyEmailForm } from "./VerifyEmailForm";

const meta: Meta<typeof VerifyEmailForm> = {
  title: "Organisms/VerifyEmailForm",
  component: VerifyEmailForm,
  // VerifyEmailForm memakai useRouter dari App Router (tombol "Go to Login").
  parameters: { nextjs: { appDirectory: true } },
  args: { onVerify: fn(), onResend: fn() },
  decorators: [(Story) => <div className="mx-auto w-full max-w-146 p-4"><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof VerifyEmailForm>;

/** Tombol Verify nonaktif sampai 6 digit terisi; setelah itu modal sukses muncul. */
export const Default: Story = {};

/** Alur Forgot Password: tanpa modal, langsung pindah ke halaman berikutnya. */
export const ForgotPasswordFlow: Story = { args: { nextHref: "/forgot-password/reset" } };
