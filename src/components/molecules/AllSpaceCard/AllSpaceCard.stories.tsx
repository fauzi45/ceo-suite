import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { AllSpaceCard } from "./AllSpaceCard";

const meta: Meta<typeof AllSpaceCard> = {
  title: "Molecules/AllSpaceCard",
  component: AllSpaceCard,
  args: { onClick: fn() },
  decorators: [(Story) => <div className="w-72"><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof AllSpaceCard>;

export const Default: Story = {};
