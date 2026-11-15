import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { GuestDetailsForm } from "./GuestDetailsForm";

const meta: Meta<typeof GuestDetailsForm> = {
  title: "Organisms/GuestDetailsForm",
  component: GuestDetailsForm,
  args: { onBack: fn(), onSubmit: fn() },
};
export default meta;

export const Default: StoryObj<typeof GuestDetailsForm> = {};
