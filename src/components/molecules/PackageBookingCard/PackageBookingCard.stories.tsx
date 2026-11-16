import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PACKAGES } from "@/data/packages";
import { PackageBookingCard } from "./PackageBookingCard";

const meta: Meta<typeof PackageBookingCard> = {
  title: "Molecules/PackageBookingCard",
  component: PackageBookingCard,
  args: { item: PACKAGES[0], startDate: new Date(2024, 6, 10) },
  decorators: [
    (Story) => (
      <div className="max-w-3xl">
        <Story />
      </div>
    ),
  ],
};
export default meta;

export const Default: StoryObj<typeof PackageBookingCard> = {};
