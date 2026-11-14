import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BestDealsSection } from "./BestDealsSection";

const meta: Meta<typeof BestDealsSection> = {
  title: "Organisms/BestDealsSection",
  component: BestDealsSection,
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof BestDealsSection>;

/** Tombol See All Deals dan 3 kartu voucher. */
export const Default: Story = {};
