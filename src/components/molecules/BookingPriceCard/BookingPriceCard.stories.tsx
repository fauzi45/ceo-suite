import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { BookingPriceCard } from "./BookingPriceCard";

const meta: Meta<typeof BookingPriceCard> = {
  title: "Molecules/BookingPriceCard",
  component: BookingPriceCard,
  args: {
    totals: { lines: [{ label: "1x AXA Tower Boardroom (Daily)", amount: 2880000 }], discount: 0, total: 2880000 },
    onAction: fn(),
  },
  decorators: [(Story) => <div className="w-[420px]"><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof BookingPriceCard>;
export const Default: Story = {};
export const WithAddOnsAndVoucher: Story = {
  args: {
    voucherPercent: 10,
    totals: {
      lines: [
        { label: "1x AXA Tower Boardroom (Daily)", amount: 2880000 },
        { label: "1x Coffee Break - Standard", amount: 50000 },
        { label: "1x LCD Projector (Premium)", amount: 1500000 },
      ],
      discount: 288000,
      total: 4142000,
    },
  },
};
export const Disabled: Story = { args: { actionDisabled: true } };
