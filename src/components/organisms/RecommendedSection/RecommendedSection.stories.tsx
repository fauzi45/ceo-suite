import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RecommendedSection } from "./RecommendedSection";

const meta: Meta<typeof RecommendedSection> = {
  title: "Organisms/RecommendedSection",
  component: RecommendedSection,
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof RecommendedSection>;

/** Grid kartu ruangan: 1 / 2 / 4 kolom. */
export const Default: Story = {};
