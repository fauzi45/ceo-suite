import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { EmailCapture } from "./EmailCapture";

const meta: Meta<typeof EmailCapture> = {
  title: "Molecules/EmailCapture",
  component: EmailCapture,
  args: { onSubmit: fn() },
};
export default meta;

type Story = StoryObj<typeof EmailCapture>;

export const Default: Story = {};
