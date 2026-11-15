import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NEWS_POSTS } from "@/data/news";
import { NewsListItem } from "./NewsListItem";

const meta: Meta<typeof NewsListItem> = {
  title: "Molecules/NewsListItem",
  component: NewsListItem,
  args: { post: NEWS_POSTS[1] },
  decorators: [(Story) => <div className="w-full max-w-xl"><Story /></div>],
};
export default meta;

export const Default: StoryObj<typeof NewsListItem> = {};
