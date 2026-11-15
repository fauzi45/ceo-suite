import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { getProduct } from "@/data/product";
import { BookingConfirmation } from "./BookingConfirmation";

const meta: Meta<typeof BookingConfirmation> = {
  title: "Organisms/BookingConfirmation",
  component: BookingConfirmation,
  args: { product: getProduct("search-room-1")!, date: new Date(2026, 6, 10), time: { start: "10:00", end: "13:00" } },
};
export default meta;

export const Default: StoryObj<typeof BookingConfirmation> = {};
