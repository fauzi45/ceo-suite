import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { getProduct } from "@/data/product";
import { ProductDetailsSection } from "./ProductDetailsSection";

const meta: Meta<typeof ProductDetailsSection> = {
  title: "Organisms/ProductDetailsSection",
  component: ProductDetailsSection,
  args: { product: getProduct("search-room-7")! },
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="max-w-3xl"><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof ProductDetailsSection>;

export const Default: Story = {};
export const BestDeal: Story = { args: { product: getProduct("room-2")! } };
