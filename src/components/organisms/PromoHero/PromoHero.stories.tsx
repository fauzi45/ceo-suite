import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PromoHero } from "./PromoHero";

const meta: Meta<typeof PromoHero> = {
  title: "Organisms/PromoHero",
  component: PromoHero,
  parameters: { layout: "fullscreen" },
};
export default meta;

export const Default: StoryObj<typeof PromoHero> = {};
