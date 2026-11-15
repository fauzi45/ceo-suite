import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BOOKING_ADD_ONS } from "@/data/booking";
import { AddOnOption } from "./AddOnOption";

const meta: Meta<typeof AddOnOption> = {
  title: "Molecules/AddOnOption",
  component: AddOnOption,
  args: { addOn: BOOKING_ADD_ONS[0], quantity: 0 },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
  render: (args) => {
    const [quantity, setQuantity] = useState(args.quantity);
    return <AddOnOption {...args} quantity={quantity} onQuantityChange={setQuantity} />;
  },
};
export default meta;

type Story = StoryObj<typeof AddOnOption>;
export const Unselected: Story = {};
export const Selected: Story = { args: { quantity: 2 } };
