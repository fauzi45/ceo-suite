import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { TimePicker, type TimeRange } from "./TimePicker";

const meta: Meta<typeof TimePicker> = {
  title: "Organisms/TimePicker",
  component: TimePicker,
  args: { onChange: fn() },
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="h-[360px]"><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof TimePicker>;

export const Empty: Story = {};
export const Filled: Story = { args: { value: { start: "12:00", end: "14:00" } } };

function Demo() {
  const [range, setRange] = useState<TimeRange>({ start: null, end: null });
  return <TimePicker value={range} onChange={setRange} />;
}

export const Interactive: Story = {
  render: () => <Demo />,
  parameters: { controls: { disable: true } },
};
