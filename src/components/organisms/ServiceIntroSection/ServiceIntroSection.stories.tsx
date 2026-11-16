import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ServiceIntroSection } from "./ServiceIntroSection";

const meta: Meta<typeof ServiceIntroSection> = {
  title: "Organisms/ServiceIntroSection",
  component: ServiceIntroSection,
  parameters: { layout: "fullscreen" },
};
export default meta;

export const Default: StoryObj<typeof ServiceIntroSection> = {};
