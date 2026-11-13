import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Logo } from "./Logo";

const meta: Meta<typeof Logo> = {
  title: "Atoms/Logo",
  component: Logo,
  args: { height: 32 },
  argTypes: { height: { control: { type: "range", min: 16, max: 120, step: 4 } } },
};
export default meta;

type Story = StoryObj<typeof Logo>;

export const Default: Story = {};
export const Large: Story = { args: { height: 80 } };
