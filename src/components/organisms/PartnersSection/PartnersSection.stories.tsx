import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PartnersSection } from "./PartnersSection";

const meta: Meta<typeof PartnersSection> = {
  title: "Organisms/PartnersSection",
  component: PartnersSection,
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof PartnersSection>;

/** 3 kartu partner korporat. */
export const Default: Story = {};
