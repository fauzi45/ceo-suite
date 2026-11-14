import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { STATS } from "@/data/landing";
import { StatItem } from "./StatItem";

const meta: Meta<typeof StatItem> = {
  title: "Molecules/StatItem",
  component: StatItem,
  args: { stat: STATS[0] },
};
export default meta;

type Story = StoryObj<typeof StatItem>;

export const Default: Story = {};
export const All: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8">
      {STATS.map((stat) => (
        <StatItem key={stat.id} stat={stat} />
      ))}
    </div>
  ),
};
