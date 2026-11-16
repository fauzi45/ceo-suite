import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { VOUCHERS } from "@/data/booking";
import { PACKAGES, computePackageTotals } from "@/data/packages";
import { PackagePriceCard } from "./PackagePriceCard";

const meta: Meta<typeof PackagePriceCard> = {
  title: "Molecules/PackagePriceCard",
  component: PackagePriceCard,
  args: { totals: computePackageTotals(PACKAGES[0], null) },
  decorators: [
    (Story) => (
      <div className="max-w-3xl">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof PackagePriceCard>;

export const Default: Story = {};

export const WithVoucher: Story = {
  args: { totals: computePackageTotals(PACKAGES[0], VOUCHERS[0]), voucherPercent: VOUCHERS[0].percent },
};
