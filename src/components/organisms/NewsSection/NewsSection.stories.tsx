import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NewsSection } from "./NewsSection";

const meta: Meta<typeof NewsSection> = {
  title: "Organisms/NewsSection",
  component: NewsSection,
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof NewsSection>;

/** Daftar artikel dan kartu besar TIPS. */
export const Default: Story = {};
