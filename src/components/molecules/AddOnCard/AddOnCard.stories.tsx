import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PRODUCT_ADD_ONS } from "@/data/product";
import { AddOnCard } from "./AddOnCard";

const meta: Meta<typeof AddOnCard> = {
  title: "Molecules/AddOnCard",
  component: AddOnCard,
  args: { addOn: PRODUCT_ADD_ONS[1] },
  decorators: [(Story) => <div className="w-56"><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof AddOnCard>;

export const Default: Story = {};
