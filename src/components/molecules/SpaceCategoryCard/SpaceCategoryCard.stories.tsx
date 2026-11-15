import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SpaceCategoryCard } from "./SpaceCategoryCard";

const meta: Meta<typeof SpaceCategoryCard> = {
  title: "Molecules/SpaceCategoryCard",
  component: SpaceCategoryCard,
  args: { label: "Private Offices", icon: "room-office" },
  decorators: [(Story) => <div className="w-72"><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof SpaceCategoryCard>;

export const Default: Story = {};
