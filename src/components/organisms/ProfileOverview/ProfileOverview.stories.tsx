import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProfileOverview } from "./ProfileOverview";

const meta: Meta<typeof ProfileOverview> = {
  title: "Organisms/ProfileOverview",
  component: ProfileOverview,
  parameters: { layout: "padded" },
};
export default meta;

export const Default: StoryObj<typeof ProfileOverview> = {};
