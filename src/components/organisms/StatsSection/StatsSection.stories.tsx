import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StatsSection } from "./StatsSection";

const meta: Meta<typeof StatsSection> = {
  title: "Organisms/StatsSection",
  component: StatsSection,
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof StatsSection>;

/** Statistik dan kartu "Why CEO SUITE?". */
export const Default: Story = {};
