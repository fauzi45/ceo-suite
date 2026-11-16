import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProfileSidebar } from "./ProfileSidebar";

const meta: Meta<typeof ProfileSidebar> = {
  title: "Molecules/ProfileSidebar",
  component: ProfileSidebar,
  args: { active: "overview" },
  decorators: [
    (Story) => (
      <div className="w-60">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof ProfileSidebar>;

export const Overview: Story = {};

export const ChangePassword: Story = { args: { active: "password" } };
