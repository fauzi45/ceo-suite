import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { NewsCategoryId } from "@/data/news";
import { NewsCategoryTabs } from "./NewsCategoryTabs";

const meta: Meta<typeof NewsCategoryTabs> = {
  title: "Organisms/NewsCategoryTabs",
  component: NewsCategoryTabs,
  args: { value: "all" },
};
export default meta;

export const Default: StoryObj<typeof NewsCategoryTabs> = {
  render: (args) => {
    const [value, setValue] = useState<NewsCategoryId>(args.value);
    return <NewsCategoryTabs {...args} value={value} onChange={setValue} />;
  },
};
