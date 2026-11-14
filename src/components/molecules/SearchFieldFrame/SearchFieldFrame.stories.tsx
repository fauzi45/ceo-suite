import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SearchFieldFrame } from "./SearchFieldFrame";

const meta: Meta<typeof SearchFieldFrame> = {
  title: "Molecules/SearchFieldFrame",
  component: SearchFieldFrame,
  args: { label: "Select City", icon: "map-pin" },
  decorators: [(Story) => <div className="w-72"><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof SearchFieldFrame>;

export const Default: Story = {
  render: (args) => (
    <SearchFieldFrame {...args}>
      <select className="min-w-0 flex-1 bg-transparent outline-none">
        <option>Jakarta</option>
        <option>Bandung</option>
      </select>
    </SearchFieldFrame>
  ),
};
