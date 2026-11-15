import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import type { AddOnSelection, Voucher } from "@/data/booking";
import { getProduct } from "@/data/product";
import { BookingDetailsForm } from "./BookingDetailsForm";

const meta: Meta<typeof BookingDetailsForm> = {
  title: "Organisms/BookingDetailsForm",
  component: BookingDetailsForm,
  parameters: { layout: "fullscreen" },
  args: {
    product: getProduct("search-room-1")!,
    date: new Date(2026, 6, 10),
    time: { start: "10:00", end: "13:00" },
    onBack: fn(),
    onContinue: fn(),
  },
  render: (args) => {
    const [request, setRequest] = useState("");
    const [addOns, setAddOns] = useState<AddOnSelection>({});
    const [voucher, setVoucher] = useState<Voucher | null>(null);
    return (
      <BookingDetailsForm
        {...args}
        request={request}
        onRequestChange={setRequest}
        addOns={addOns}
        onAddOnsChange={setAddOns}
        voucher={voucher}
        onVoucherChange={setVoucher}
      />
    );
  },
};
export default meta;

export const Default: StoryObj<typeof BookingDetailsForm> = {};
