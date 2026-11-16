import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PackageIntroSection } from "./PackageIntroSection";

const meta: Meta<typeof PackageIntroSection> = {
  title: "Organisms/PackageIntroSection",
  component: PackageIntroSection,
  parameters: { layout: "fullscreen" },
};
export default meta;

export const Default: StoryObj<typeof PackageIntroSection> = {};
