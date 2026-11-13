import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { SidebarNavItem, SidebarSubItem } from "./SidebarNavItem";

const meta: Meta<typeof SidebarNavItem> = {
  title: "Molecules/SidebarNavItem",
  component: SidebarNavItem,
  args: { icon: "dashboard", label: "Dashboard", onClick: fn() },
  decorators: [(Story) => <div className="w-[195px]"><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof SidebarNavItem>;

export const Default: Story = {};
export const Active: Story = { args: { active: true } };
export const Expandable: Story = { args: { icon: "admin", label: "Admin", expandable: true } };
export const Expanded: Story = {
  render: (args) => (
    <div className="flex flex-col gap-1">
      <SidebarNavItem {...args} icon="admin" label="Admin" active expandable expanded />
      <SidebarSubItem label="List Admin" active />
      <SidebarSubItem label="Admin Roles" />
    </div>
  ),
};

/** off / hover / on seperti set "dashboard" di Figma. */
export const States: Story = {
  render: (args) => (
    <div className="flex w-[640px] gap-4">
      <SidebarNavItem {...args} />
      <SidebarNavItem {...args} className="bg-neutral-50 text-primary-800" />
      <SidebarNavItem {...args} active />
    </div>
  ),
  decorators: [(Story) => <Story />],
  parameters: { controls: { disable: true } },
};
