import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SAMPLE_BOOKINGS } from "@/data/my-bookings";
import { MyBookingList } from "./MyBookingList";

const meta: Meta<typeof MyBookingList> = {
  title: "Organisms/MyBookingList",
  component: MyBookingList,
  args: { bookings: SAMPLE_BOOKINGS },
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof MyBookingList>;

export const Default: Story = {};

export const Empty: Story = { args: { bookings: [] } };
