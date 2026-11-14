import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Atoms/Avatar",
  component: Avatar,
  args: { name: "Jane Doe" },
};
export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {};
export const SingleName: Story = { args: { name: "Admin" } };
