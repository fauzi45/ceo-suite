import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { BackHeader } from "./BackHeader";

const meta: Meta<typeof BackHeader> = {
  title: "Molecules/BackHeader",
  component: BackHeader,
  args: { title: "Fill Booking Details", onBack: fn() },
};
export default meta;

export const Default: StoryObj<typeof BackHeader> = {};
