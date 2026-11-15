import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { SectionHeader } from "./SectionHeader";

const meta: Meta<typeof SectionHeader> = {
  title: "Molecules/SectionHeader",
  component: SectionHeader,
  args: { title: "Promotions", subtitle: "Don't miss this opportunity to elevate your workspace." },
  decorators: [(Story) => <div className="w-full max-w-4xl p-4"><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof SectionHeader>;

export const Default: Story = {};
export const WithIconAndAction: Story = {
  args: { icon: "seal-percent", actionLabel: "See All", onAction: fn() },
};
export const WithFilter: Story = {
  args: {
    title: "Recommended For You",
    actionLabel: "Filter",
    actionIcon: "filter",
    actionHierarchy: "secondary-white",
    onAction: fn(),
  },
};
