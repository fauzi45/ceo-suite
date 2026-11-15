"use client";

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProductBookingBar } from "./ProductBookingBar";
import type { TimeRange } from "@/components/organisms/TimePicker/TimePicker";

const meta: Meta<typeof ProductBookingBar> = {
  title: "Organisms/ProductBookingBar",
  component: ProductBookingBar,
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof ProductBookingBar>;

function Interactive({ initialDate = null }: { initialDate?: Date | null }) {
  const [date, setDate] = useState<Date | null>(initialDate);
  const [time, setTime] = useState<TimeRange>({ start: null, end: null });
  return (
    <div className="min-h-[520px]">
      <ProductBookingBar date={date} onDateChange={setDate} time={time} onTimeChange={setTime} />
    </div>
  );
}

/** Hanya "Select Date"; "Select Time" muncul setelah tanggal dipilih. */
export const Default: Story = { render: () => <Interactive /> };
export const WithDate: Story = { render: () => <Interactive initialDate={new Date(2026, 10, 20)} /> };
