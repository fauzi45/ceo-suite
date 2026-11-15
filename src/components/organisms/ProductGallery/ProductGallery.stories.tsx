import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { getProduct } from "@/data/product";
import { ProductGallery } from "./ProductGallery";

const meta: Meta<typeof ProductGallery> = {
  title: "Organisms/ProductGallery",
  component: ProductGallery,
  args: { photos: getProduct("search-room-7")!.gallery, alt: "Wisma GKBI Board Room", onShowAll: fn() },
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof ProductGallery>;

export const Default: Story = {};
