import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Atoms/Checkbox",
  component: Checkbox,
  args: { label: "Checkbox" },
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true } };
export const DisabledChecked: Story = { args: { disabled: true, defaultChecked: true } };

/** State=Default|Disabled x Checked=On|Off. */
export const Matrix: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <Checkbox aria-label="off" />
      <Checkbox aria-label="on" defaultChecked />
      <Checkbox aria-label="disabled off" disabled />
      <Checkbox aria-label="disabled on" disabled defaultChecked />
    </div>
  ),
  parameters: { controls: { disable: true } },
};
