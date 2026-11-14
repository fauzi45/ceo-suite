import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TextLink } from "./TextLink";

const meta: Meta<typeof TextLink> = {
  title: "Atoms/TextLink",
  component: TextLink,
  args: { href: "#", children: "Forgot Password" },
};
export default meta;

type Story = StoryObj<typeof TextLink>;

export const Default: Story = {};
