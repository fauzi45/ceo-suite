import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PackageBrowseSection } from "./PackageBrowseSection";

const meta: Meta<typeof PackageBrowseSection> = {
  title: "Organisms/PackageBrowseSection",
  component: PackageBrowseSection,
  parameters: { layout: "fullscreen" },
};
export default meta;

export const Default: StoryObj<typeof PackageBrowseSection> = {};
