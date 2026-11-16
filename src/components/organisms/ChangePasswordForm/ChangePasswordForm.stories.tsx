import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ChangePasswordForm } from "./ChangePasswordForm";

const meta: Meta<typeof ChangePasswordForm> = {
  title: "Organisms/ChangePasswordForm",
  component: ChangePasswordForm,
  parameters: { layout: "padded" },
};
export default meta;

export const Default: StoryObj<typeof ChangePasswordForm> = {};
