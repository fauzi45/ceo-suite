import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ResetPasswordForm } from "./ResetPasswordForm";

const meta: Meta<typeof ResetPasswordForm> = {
  title: "Organisms/ResetPasswordForm",
  component: ResetPasswordForm,
  // ResetPasswordForm memakai useRouter dari App Router (tombol "Go to Login").
  parameters: { nextjs: { appDirectory: true } },
  decorators: [(Story) => <div className="mx-auto w-full max-w-146 p-4"><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof ResetPasswordForm>;

/**
 * Checklist: minimal 6 karakter, minimal 1 angka, dan password cocok.
 * Save nonaktif sampai semuanya terpenuhi; setelah Save muncul modal sukses.
 */
export const Default: Story = {};
