import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NEWS_ARTICLES } from "@/data/landing";
import { NewsItem } from "./NewsItem";

const meta: Meta<typeof NewsItem> = {
  title: "Molecules/NewsItem",
  component: NewsItem,
  args: { article: NEWS_ARTICLES[0] },
  decorators: [(Story) => <div className="w-full max-w-xl"><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof NewsItem>;

export const Default: Story = {};
