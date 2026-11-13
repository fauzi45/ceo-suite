import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DropdownMenu } from "./DropdownMenu";

const ITEMS = [
  { value: "all", label: "All" },
  { value: "customer", label: "Customer" },
  { value: "office", label: "Office" },
  { value: "booking-id", label: "Booking ID" },
  { value: "archived", label: "Archived", disabled: true },
];

const meta: Meta<typeof DropdownMenu> = {
  title: "Molecules/DropdownMenu",
  component: DropdownMenu,
  args: { items: ITEMS, value: "all" },
};
export default meta;

type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {};

function Interactive() {
  const [value, setValue] = useState("all");
  return <DropdownMenu items={ITEMS} value={value} onSelect={setValue} />;
}

export const Selectable: Story = {
  render: () => <Interactive />,
  parameters: { controls: { disable: true } },
};
