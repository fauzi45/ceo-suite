import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { SelectRow } from "./SelectRow";

const meta: Meta<typeof SelectRow> = {
  title: "Molecules/SelectRow",
  component: SelectRow,
  args: { icon: "add-ons", placeholder: "Select add ons", onClick: fn() },
  decorators: [(Story) => <div className="w-[480px]"><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof SelectRow>;
export const Empty: Story = {};
export const WithSelection: Story = {
  args: {
    children: (
      <>
        <span className="font-medium text-primary-800">2 Selected</span>
        <span>Coffee Break - Standard</span>
        <span>LCD Projector</span>
      </>
    ),
  },
};
export const VoucherApplied: Story = {
  args: {
    icon: "check",
    tone: "success",
    placeholder: "Add Voucher Code",
    children: <span className="font-medium text-success-600">Promo Code Applied!</span>,
  },
};
