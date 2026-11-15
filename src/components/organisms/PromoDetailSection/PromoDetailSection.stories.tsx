import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PROMO_ITEMS } from "@/data/promotions";
import { PromoDetailSection } from "./PromoDetailSection";

const meta: Meta<typeof PromoDetailSection> = {
  title: "Organisms/PromoDetailSection",
  component: PromoDetailSection,
  args: { promo: PROMO_ITEMS[2] },
  parameters: { layout: "padded" },
};
export default meta;

export const Default: StoryObj<typeof PromoDetailSection> = {};
