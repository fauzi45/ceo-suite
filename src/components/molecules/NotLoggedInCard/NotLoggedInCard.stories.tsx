import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NotLoggedInCard } from "./NotLoggedInCard";

const meta: Meta<typeof NotLoggedInCard> = {
  title: "Molecules/NotLoggedInCard",
  component: NotLoggedInCard,
  decorators: [
    (Story) => (
      <div className="max-w-3xl">
        <Story />
      </div>
    ),
  ],
};
export default meta;

export const Default: StoryObj<typeof NotLoggedInCard> = {};
