import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ReferralModal } from "./ReferralModal";

const meta: Meta<typeof ReferralModal> = {
  title: "Organisms/ReferralModal",
  component: ReferralModal,
  args: { open: true, onClose: () => {} },
  parameters: { layout: "fullscreen" },
};
export default meta;

export const Default: StoryObj<typeof ReferralModal> = {};
