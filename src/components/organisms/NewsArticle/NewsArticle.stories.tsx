import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NEWS_POSTS } from "@/data/news";
import { NewsArticle } from "./NewsArticle";

const meta: Meta<typeof NewsArticle> = {
  title: "Organisms/NewsArticle",
  component: NewsArticle,
  args: { post: NEWS_POSTS[3] },
  decorators: [(Story) => <div className="max-w-3xl"><Story /></div>],
};
export default meta;

export const Default: StoryObj<typeof NewsArticle> = {};
