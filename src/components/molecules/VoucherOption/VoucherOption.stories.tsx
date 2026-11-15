import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { VOUCHERS } from "@/data/booking";
import { VoucherOption } from "./VoucherOption";

const meta: Meta<typeof VoucherOption> = {
  title: "Molecules/VoucherOption",
  component: VoucherOption,
  args: { voucher: VOUCHERS[0], selected: false, onToggle: fn() },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof VoucherOption>;
export const Default: Story = {};
export const Selected: Story = { args: { selected: true } };
