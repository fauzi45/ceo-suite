import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FaqSection } from "./FaqSection";

const meta: Meta<typeof FaqSection> = {
  title: "Organisms/FaqSection",
  component: FaqSection,
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof FaqSection>;

/** Accordion FAQ; satu jawaban terbuka sekali waktu. */
export const Default: Story = {};
