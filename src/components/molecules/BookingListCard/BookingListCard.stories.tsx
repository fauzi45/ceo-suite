import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SAMPLE_BOOKINGS, summarizeBooking } from "@/data/my-bookings";
import { BookingListCard } from "./BookingListCard";

const meta: Meta<typeof BookingListCard> = {
  title: "Molecules/BookingListCard",
  component: BookingListCard,
  args: { booking: summarizeBooking(SAMPLE_BOOKINGS[0])! },
  decorators: [
    (Story) => (
      <div className="max-w-3xl">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof BookingListCard>;

export const Expired: Story = {};

export const Waiting: Story = { args: { booking: summarizeBooking(SAMPLE_BOOKINGS[1])! } };

export const Success: Story = { args: { booking: summarizeBooking(SAMPLE_BOOKINGS[2])! } };
