import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NEWS_POSTS } from "@/data/news";
import { RelatedNewsSection } from "./RelatedNewsSection";

const meta: Meta<typeof RelatedNewsSection> = {
  title: "Organisms/RelatedNewsSection",
  component: RelatedNewsSection,
  args: { posts: NEWS_POSTS.slice(0, 3) },
  decorators: [(Story) => <div className="w-[525px] max-w-full"><Story /></div>],
};
export default meta;

export const Default: StoryObj<typeof RelatedNewsSection> = {};
