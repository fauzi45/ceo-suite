import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SAMPLE_BOOKINGS, getRoomBookingDetail } from "@/data/my-bookings";
import { RoomBookingDetail } from "./RoomBookingDetail";

const meta: Meta<typeof RoomBookingDetail> = {
  title: "Organisms/RoomBookingDetail",
  component: RoomBookingDetail,
  args: { booking: getRoomBookingDetail(SAMPLE_BOOKINGS[0])! },
  parameters: { layout: "fullscreen" },
};
export default meta;

export const Default: StoryObj<typeof RoomBookingDetail> = {};
