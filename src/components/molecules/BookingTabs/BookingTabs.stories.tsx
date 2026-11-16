"use client";

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BookingTabs } from "./BookingTabs";

const TABS = [
  { id: "active", label: "Active" },
  { id: "history", label: "History" },
];

const meta: Meta<typeof BookingTabs> = {
  title: "Molecules/BookingTabs",
  component: BookingTabs,
  args: { tabs: TABS, value: "active" },
};
export default meta;

export const Default: StoryObj<typeof BookingTabs> = {
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return <BookingTabs {...args} value={value} onChange={setValue} />;
  },
};
