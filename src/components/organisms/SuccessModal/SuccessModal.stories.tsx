import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { SuccessModal } from "./SuccessModal";

const meta: Meta<typeof SuccessModal> = {
  title: "Organisms/SuccessModal",
  component: SuccessModal,
  parameters: { layout: "fullscreen" },
  args: {
    open: true,
    title: "Successfully create your account!",
    actionLabel: "Go to Login",
    onAction: fn(),
  },
};
export default meta;

type Story = StoryObj<typeof SuccessModal>;

export const CreateAccount: Story = {};
/** Teks yang sama dengan modal di alur Forgot Password. */
export const ResetPassword: Story = { args: { title: "Successfully reset your password!" } };
export const Closed: Story = { args: { open: false } };
