import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProfileDetailCard } from "./ProfileDetailCard";

const meta: Meta<typeof ProfileDetailCard> = {
  title: "Organisms/ProfileDetailCard",
  component: ProfileDetailCard,
  parameters: { layout: "padded" },
};
export default meta;

export const Default: StoryObj<typeof ProfileDetailCard> = {};
