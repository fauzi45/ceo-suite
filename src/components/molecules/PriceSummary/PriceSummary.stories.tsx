import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PriceSummary } from "./PriceSummary";

const meta: Meta<typeof PriceSummary> = {
  title: "Molecules/PriceSummary",
  component: PriceSummary,
  args: { rates: { hourly: 400000, daily: 2400000, weekly: 13200000, monthly: 43200000 } },
  decorators: [(Story) => <div className="w-[560px]"><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof PriceSummary>;

export const Default: Story = {};
export const BestDeal: Story = { args: { bestDeal: true } };
