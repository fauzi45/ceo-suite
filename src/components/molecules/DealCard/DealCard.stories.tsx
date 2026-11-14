import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BEST_DEALS } from "@/data/landing";
import { DealCard } from "./DealCard";

const meta: Meta<typeof DealCard> = {
  title: "Molecules/DealCard",
  component: DealCard,
  args: { deal: BEST_DEALS[0] },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof DealCard>;

export const Default: Story = {};
