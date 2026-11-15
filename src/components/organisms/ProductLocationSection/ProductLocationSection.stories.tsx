import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { getProduct } from "@/data/product";
import { ProductLocationSection } from "./ProductLocationSection";

const meta: Meta<typeof ProductLocationSection> = {
  title: "Organisms/ProductLocationSection",
  component: ProductLocationSection,
  args: { product: getProduct("search-room-7")! },
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof ProductLocationSection>;

export const Default: Story = {};
