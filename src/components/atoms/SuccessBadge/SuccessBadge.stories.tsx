import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SuccessBadge } from "./SuccessBadge";

const meta: Meta<typeof SuccessBadge> = {
  title: "Atoms/SuccessBadge",
  component: SuccessBadge,
};
export default meta;

type Story = StoryObj<typeof SuccessBadge>;

export const Default: Story = {};
