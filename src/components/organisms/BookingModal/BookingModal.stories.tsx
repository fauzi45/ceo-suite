import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { Button } from "@/components/atoms/Button/Button";
import { BookingModal } from "./BookingModal";

const meta: Meta<typeof BookingModal> = {
  title: "Organisms/BookingModal",
  component: BookingModal,
  args: { open: true, onClose: fn(), title: "Select Add Ons", children: <p className="text-caption">Isi modal</p> },
};
export default meta;

type Story = StoryObj<typeof BookingModal>;
export const Default: Story = { args: { footer: <Button fullWidth>Save</Button> } };
export const Confirm: Story = {
  args: {
    centered: true,
    title: "Are your booking details correct?",
    description: "You will not be able to change your booking details once you proceed to payment.",
    className: "max-w-[340px]",
    children: null,
    footer: (
      <>
        <Button fullWidth>Continue</Button>
        <Button fullWidth hierarchy="secondary-filled">
          Check Again
        </Button>
      </>
    ),
  },
};
