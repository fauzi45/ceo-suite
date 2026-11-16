import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProfileInfoRow } from "./ProfileInfoRow";

const meta: Meta<typeof ProfileInfoRow> = {
  title: "Molecules/ProfileInfoRow",
  component: ProfileInfoRow,
  args: { label: "Name", value: "Nisrina Thifal Khairunnisa", onSave: () => undefined },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};
export default meta;

export const Default: StoryObj<typeof ProfileInfoRow> = {};
