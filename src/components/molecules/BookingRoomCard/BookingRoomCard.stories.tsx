import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SEARCH_ROOMS } from "@/data/landing";
import { BookingRoomCard } from "./BookingRoomCard";

const meta: Meta<typeof BookingRoomCard> = {
  title: "Molecules/BookingRoomCard",
  component: BookingRoomCard,
  args: { room: SEARCH_ROOMS[0], date: new Date(2026, 6, 10), time: { start: "10:00", end: "13:00" } },
  decorators: [(Story) => <div className="w-[720px]"><Story /></div>],
};
export default meta;

export const Default: StoryObj<typeof BookingRoomCard> = {};
