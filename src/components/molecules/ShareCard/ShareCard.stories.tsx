import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ShareCard } from "./ShareCard";

const meta: Meta<typeof ShareCard> = {
  title: "Molecules/ShareCard",
  component: ShareCard,
  args: { title: "Special offer: Get 25% off any meeting room booking!" },
  decorators: [(Story) => <div className="w-[525px] max-w-full"><Story /></div>],
};
export default meta;

export const Default: StoryObj<typeof ShareCard> = {};
