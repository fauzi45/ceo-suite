import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PromotionsSection } from "./PromotionsSection";

const meta: Meta<typeof PromotionsSection> = {
  title: "Organisms/PromotionsSection",
  component: PromotionsSection,
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof PromotionsSection>;

/** Tombol See All dan 3 kartu promo. */
export const Default: Story = {};
