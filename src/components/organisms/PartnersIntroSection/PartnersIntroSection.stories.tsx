import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PartnersIntroSection } from "./PartnersIntroSection";

const meta: Meta<typeof PartnersIntroSection> = {
  title: "Organisms/PartnersIntroSection",
  component: PartnersIntroSection,
  parameters: { layout: "fullscreen" },
};
export default meta;

export const Default: StoryObj<typeof PartnersIntroSection> = {};
