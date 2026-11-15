import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TrustedBySection } from "./TrustedBySection";

const meta: Meta<typeof TrustedBySection> = {
  title: "Organisms/TrustedBySection",
  component: TrustedBySection,
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof TrustedBySection>;

/** Strip logo yang membungkus di layar sempit. */
export const Default: Story = {};
