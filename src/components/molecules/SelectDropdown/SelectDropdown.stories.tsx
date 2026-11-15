import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CITY_OPTIONS } from "@/data/landing";
import { SearchFieldFrame } from "@/components/molecules/SearchFieldFrame/SearchFieldFrame";
import { SelectDropdown } from "./SelectDropdown";

const meta: Meta<typeof SelectDropdown> = {
  title: "Molecules/SelectDropdown",
  component: SelectDropdown,
  args: { options: CITY_OPTIONS, value: CITY_OPTIONS[0], onChange: () => {}, label: "City" },
  decorators: [(Story) => <div className="h-72 w-72"><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof SelectDropdown>;

/** Tampilan sama dengan CheckboxDropdown, tetapi pilihan tunggal. */
export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <SearchFieldFrame label="Select City" icon="map-pin" htmlFor="city-story">
        <SelectDropdown {...args} id="city-story" value={value} onChange={setValue} />
      </SearchFieldFrame>
    );
  },
};
