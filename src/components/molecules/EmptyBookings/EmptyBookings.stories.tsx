import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EmptyBookings } from "./EmptyBookings";

const meta: Meta<typeof EmptyBookings> = {
  title: "Molecules/EmptyBookings",
  component: EmptyBookings,
};
export default meta;

export const Default: StoryObj<typeof EmptyBookings> = {};
