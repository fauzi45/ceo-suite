import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { DatePicker, type DateRange } from "./DatePicker";

const meta: Meta<typeof DatePicker> = {
  title: "Organisms/DatePicker",
  component: DatePicker,
  args: {
    initialMonth: new Date(2020, 0, 1),
    value: { start: new Date(2020, 0, 23), end: null },
    onChange: fn(),
    onConfirm: fn(),
  },
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof DatePicker>;

/** Sesuai frame "date picker/desktop": Jan 2020, tanggal 23 terpilih. */
export const Default: Story = {};

export const Range: Story = {
  args: { value: { start: new Date(2020, 0, 6), end: new Date(2020, 1, 12) } },
};

function Demo() {
  const [range, setRange] = useState<DateRange>({ start: null, end: null });
  return (
    <div className="flex flex-col gap-4">
      <DatePicker value={range} onChange={setRange} onConfirm={fn()} />
      <p className="text-caption text-neutral-500">
        {range.start?.toDateString() ?? "–"} → {range.end?.toDateString() ?? "–"}
      </p>
    </div>
  );
}

export const Interactive: Story = {
  render: () => <Demo />,
  parameters: { controls: { disable: true } },
};
