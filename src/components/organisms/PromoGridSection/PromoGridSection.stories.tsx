import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PROMO_ITEMS, VOUCHER_DEALS } from "@/data/promotions";
import { DealCard } from "@/components/molecules/DealCard/DealCard";
import { PromoCard } from "@/components/molecules/PromoCard/PromoCard";
import { PromoGridSection } from "./PromoGridSection";

const meta: Meta<typeof PromoGridSection> = {
  title: "Organisms/PromoGridSection",
  component: PromoGridSection,
  parameters: { layout: "padded" },
  args: { title: "Promotions", subtitle: "Don't miss this opportunity.", icon: "megaphone" },
};
export default meta;

type Story = StoryObj<typeof PromoGridSection>;

export const Promotions: Story = {
  render: (args) => (
    <PromoGridSection {...args}>
      {PROMO_ITEMS.map((promo) => (
        <PromoCard key={promo.id} promo={promo} unavailable={!promo.available} />
      ))}
    </PromoGridSection>
  ),
};

export const Vouchers: Story = {
  args: { title: "Vouchers", subtitle: "Save on Your Dream Workspace", icon: "voucher", iconClassName: "bg-teal-50 text-teal-600" },
  render: (args) => (
    <PromoGridSection {...args}>
      {VOUCHER_DEALS.map((deal) => (
        <DealCard key={deal.id} deal={deal} />
      ))}
    </PromoGridSection>
  ),
};
