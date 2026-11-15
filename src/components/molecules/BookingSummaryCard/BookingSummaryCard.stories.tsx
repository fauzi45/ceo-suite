import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { BookingSummaryCard } from "./BookingSummaryCard";

const meta: Meta<typeof BookingSummaryCard> = {
  title: "Molecules/BookingSummaryCard",
  component: BookingSummaryCard,
  args: { date: null, time: { start: null, end: null }, total: null, onBook: fn() },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof BookingSummaryCard>;

/** Belum ada tanggal: "Select date to Book", tombol nonaktif. */
export const Empty: Story = {};
export const DateOnly: Story = { args: { date: new Date(2026, 10, 20) } };
export const Ready: Story = {
  args: { date: new Date(2026, 10, 20), time: { start: "09:00", end: "17:00" }, total: 2400000 },
};
