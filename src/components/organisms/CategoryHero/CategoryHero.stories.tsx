import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SPACE_CATEGORY_PAGES } from "@/data/categories";
import { CategoryHero } from "./CategoryHero";

const page = SPACE_CATEGORY_PAGES[0];

const meta: Meta<typeof CategoryHero> = {
  title: "Organisms/CategoryHero",
  component: CategoryHero,
  args: { title: page.title, tagline: page.tagline, image: page.heroImage },
  parameters: { layout: "fullscreen" },
};
export default meta;

export const Default: StoryObj<typeof CategoryHero> = {};
