import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { BookingTerms } from "./BookingTerms";

const meta: Meta<typeof BookingTerms> = {
  title: "Organisms/BookingTerms",
  component: BookingTerms,
  args: { onBack: fn(), onContinue: fn() },
};
export default meta;

export const Default: StoryObj<typeof BookingTerms> = {};
