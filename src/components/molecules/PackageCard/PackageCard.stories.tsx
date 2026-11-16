import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PACKAGES } from "@/data/packages";
import { PackageCard } from "./PackageCard";

const meta: Meta<typeof PackageCard> = {
  title: "Molecules/PackageCard",
  component: PackageCard,
  args: { item: PACKAGES[0] },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof PackageCard>;

export const BestDeal: Story = {};

export const WithoutBadge: Story = { args: { item: PACKAGES[2] } };

export const NoDiscount: Story = { args: { item: PACKAGES[8] } };
