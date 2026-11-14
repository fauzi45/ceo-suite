import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SignUpForm } from "./SignUpForm";

const meta: Meta<typeof SignUpForm> = {
  title: "Organisms/SignUpForm",
  component: SignUpForm,
  // SignUpForm memakai useRouter dari App Router.
  parameters: { nextjs: { appDirectory: true } },
  decorators: [(Story) => <div className="mx-auto w-full max-w-146 p-4"><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof SignUpForm>;

/**
 * Tombol Sign Up nonaktif sampai semua field valid. Setelah submit, modal
 * "Complete your identity" muncul, lalu lanjut ke /verify-email.
 */
export const Default: Story = {};
