import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PACKAGES } from "@/data/packages";
import { PackageBookingForm } from "./PackageBookingForm";

const meta: Meta<typeof PackageBookingForm> = {
  title: "Organisms/PackageBookingForm",
  component: PackageBookingForm,
  args: { item: PACKAGES[0], startDate: new Date(2024, 6, 10), voucher: null },
  parameters: { layout: "fullscreen" },
};
export default meta;

export const Default: StoryObj<typeof PackageBookingForm> = {};
