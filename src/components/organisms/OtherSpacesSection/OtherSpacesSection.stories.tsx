import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { OtherSpacesSection } from "./OtherSpacesSection";

const meta: Meta<typeof OtherSpacesSection> = {
  title: "Organisms/OtherSpacesSection",
  component: OtherSpacesSection,
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof OtherSpacesSection>;

/** Baris kartu kategori yang bisa digulir; panah kiri nonaktif di awal, kanan nonaktif di akhir. */
export const Default: Story = {};
