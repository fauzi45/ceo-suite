import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NEWS_POSTS } from "@/data/news";
import { NewsFeaturedSection } from "./NewsFeaturedSection";

const meta: Meta<typeof NewsFeaturedSection> = {
  title: "Organisms/NewsFeaturedSection",
  component: NewsFeaturedSection,
  args: { featured: NEWS_POSTS[0], others: NEWS_POSTS.slice(1, 4) },
};
export default meta;

export const Default: StoryObj<typeof NewsFeaturedSection> = {};
