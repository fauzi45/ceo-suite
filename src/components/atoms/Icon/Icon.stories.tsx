import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Icon, ICON_NAMES } from "./Icon";

const meta: Meta<typeof Icon> = {
  title: "Atoms/Icon",
  component: Icon,
  args: { name: "home", size: 24 },
  argTypes: {
    name: { control: "select", options: ICON_NAMES },
    size: { control: { type: "range", min: 12, max: 64, step: 4 } },
  },
};
export default meta;

type Story = StoryObj<typeof Icon>;

export const Playground: Story = {};

export const Colored: Story = {
  render: (args) => (
    <div className="flex gap-4">
      <Icon {...args} className="text-primary-800" />
      <Icon {...args} className="text-success-600" />
      <Icon {...args} className="text-error-500" />
      <Icon {...args} className="text-neutral-400" />
    </div>
  ),
};
