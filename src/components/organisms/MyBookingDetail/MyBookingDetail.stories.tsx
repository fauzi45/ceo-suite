import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { getMyBooking } from "@/data/my-booking";
import { PACKAGES } from "@/data/packages";
import { MyBookingDetail } from "./MyBookingDetail";

const meta: Meta<typeof MyBookingDetail> = {
  title: "Organisms/MyBookingDetail",
  component: MyBookingDetail,
  args: { booking: getMyBooking(PACKAGES[0], new Date(2024, 6, 10)) },
  parameters: { layout: "fullscreen" },
};
export default meta;

export const Default: StoryObj<typeof MyBookingDetail> = {};
