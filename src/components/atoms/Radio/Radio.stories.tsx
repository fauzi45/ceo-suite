import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Radio } from "./Radio";

const meta: Meta<typeof Radio> = {
  title: "Atoms/Radio",
  component: Radio,
  args: { label: "Radio", size: "desktop", name: "demo" },
  argTypes: { size: { control: "radio", options: ["desktop", "mobile"] } },
};
export default meta;

type Story = StoryObj<typeof Radio>;

export const Default: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const Mobile: Story = { args: { size: "mobile", defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true, defaultChecked: true } };

/** state=default|disabled x checked=on|off x size=desktop|mobile. */
export const Matrix: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(["desktop", "mobile"] as const).map((size) => (
        <div key={size} className="grid grid-cols-2 gap-4">
          <Radio size={size} name={`${size}-a`} aria-label="off" />
          <Radio size={size} name={`${size}-b`} aria-label="on" defaultChecked />
          <Radio size={size} name={`${size}-c`} aria-label="disabled off" disabled />
          <Radio size={size} name={`${size}-d`} aria-label="disabled on" disabled defaultChecked />
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const Group: Story = {
  render: () => (
    <fieldset className="flex flex-col gap-3">
      <legend className="mb-2 text-caption font-medium text-neutral-900">Tipe ruangan</legend>
      <Radio name="room" value="meeting" label="Meeting Room" defaultChecked />
      <Radio name="room" value="office" label="Office" />
      <Radio name="room" value="board" label="Board Room" />
    </fieldset>
  ),
  parameters: { controls: { disable: true } },
};
