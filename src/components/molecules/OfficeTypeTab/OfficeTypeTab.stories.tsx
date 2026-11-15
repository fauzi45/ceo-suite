import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { OfficeTypeTab } from "./OfficeTypeTab";

const meta: Meta<typeof OfficeTypeTab> = {
  title: "Molecules/OfficeTypeTab",
  component: OfficeTypeTab,
  args: { icon: "room-meeting", label: "Meeting Room", onClick: fn() },
};
export default meta;

type Story = StoryObj<typeof OfficeTypeTab>;

export const Inactive: Story = {};
export const Active: Story = { args: { active: true } };
export const Large: Story = { args: { size: "lg", icon: "voucher", label: "Vouchers", iconClassName: "text-teal-600" } };
export const LargeActive: Story = { args: { size: "lg", icon: "voucher", label: "Vouchers", active: true } };
