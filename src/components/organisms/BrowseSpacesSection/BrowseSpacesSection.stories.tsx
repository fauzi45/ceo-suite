import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BrowseSpacesSection } from "./BrowseSpacesSection";

const meta: Meta<typeof BrowseSpacesSection> = {
  title: "Organisms/BrowseSpacesSection",
  component: BrowseSpacesSection,
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof BrowseSpacesSection>;

/** 2 kolom di mobile, 4 kolom di desktop. */
export const Default: Story = {};
