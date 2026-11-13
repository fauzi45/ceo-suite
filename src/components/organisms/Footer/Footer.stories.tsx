import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { Footer } from "./Footer";

const meta: Meta<typeof Footer> = {
  title: "Organisms/Footer",
  component: Footer,
  args: { onSubscribe: fn() },
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {};
