import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PROMOTIONS } from "@/data/landing";
import { PromoCard } from "./PromoCard";

const meta: Meta<typeof PromoCard> = {
  title: "Molecules/PromoCard",
  component: PromoCard,
  args: { promo: PROMOTIONS[0] },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof PromoCard>;

export const Default: Story = {};
