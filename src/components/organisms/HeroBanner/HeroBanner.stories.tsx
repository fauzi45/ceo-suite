import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { HeroBanner } from "./HeroBanner";

const meta: Meta<typeof HeroBanner> = {
  title: "Organisms/HeroBanner",
  component: HeroBanner,
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof HeroBanner>;

/** Hero versi login: banner carousel (panah dan titik) dengan bar pencarian putih. */
export const Default: Story = {};
