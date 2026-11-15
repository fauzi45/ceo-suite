import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NEWS_POSTS } from "@/data/news";
import { NewsGridSection } from "./NewsGridSection";

const meta: Meta<typeof NewsGridSection> = {
  title: "Organisms/NewsGridSection",
  component: NewsGridSection,
  args: { posts: NEWS_POSTS.slice(0, 6) },
};
export default meta;

export const Default: StoryObj<typeof NewsGridSection> = {};
