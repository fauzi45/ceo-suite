import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ServicesSection } from "./ServicesSection";

const meta: Meta<typeof ServicesSection> = {
  title: "Organisms/ServicesSection",
  component: ServicesSection,
  parameters: { layout: "fullscreen" },
};
export default meta;

export const Default: StoryObj<typeof ServicesSection> = {};
