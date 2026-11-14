import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SPACE_TYPE_OPTIONS } from "@/data/landing";
import { SearchFieldFrame } from "@/components/molecules/SearchFieldFrame/SearchFieldFrame";
import { CheckboxDropdown } from "./CheckboxDropdown";

const meta: Meta<typeof CheckboxDropdown> = {
  title: "Molecules/CheckboxDropdown",
  component: CheckboxDropdown,
  args: { options: SPACE_TYPE_OPTIONS, value: [], onChange: () => {} },
  decorators: [(Story) => <div className="h-72 w-72"><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof CheckboxDropdown>;

/** Klik tombol untuk membuka daftar. "All Rooms" tercentang saat tidak ada pilihan lain. */
export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <SearchFieldFrame label="Space Type" icon="room-all" htmlFor="space-type-story">
        <CheckboxDropdown {...args} id="space-type-story" value={value} onChange={setValue} />
      </SearchFieldFrame>
    );
  },
};
