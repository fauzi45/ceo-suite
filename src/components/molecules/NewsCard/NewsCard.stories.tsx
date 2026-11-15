import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NEWS_POSTS } from "@/data/news";
import { NewsCard } from "./NewsCard";

const meta: Meta<typeof NewsCard> = {
  title: "Molecules/NewsCard",
  component: NewsCard,
  args: { post: NEWS_POSTS[0] },
  decorators: [(Story) => <div className="w-[413px] max-w-full"><Story /></div>],
};
export default meta;

export const Default: StoryObj<typeof NewsCard> = {};
