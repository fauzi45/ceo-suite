import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { VOUCHERS } from "@/data/booking";
import { VoucherModal } from "./VoucherModal";

const meta: Meta<typeof VoucherModal> = {
  title: "Organisms/VoucherModal",
  component: VoucherModal,
  args: { open: true, value: null, onClose: fn(), onSave: fn() },
};
export default meta;

type Story = StoryObj<typeof VoucherModal>;
export const Empty: Story = {};
export const Selected: Story = { args: { value: VOUCHERS[0] } };
