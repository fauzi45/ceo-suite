import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NewsPageHeader } from "./NewsPageHeader";

const meta: Meta<typeof NewsPageHeader> = {
  title: "Organisms/NewsPageHeader",
  component: NewsPageHeader,
  args: { search: "" },
};
export default meta;

export const Default: StoryObj<typeof NewsPageHeader> = {
  render: (args) => {
    const [search, setSearch] = useState(args.search);
    return <NewsPageHeader {...args} search={search} onSearchChange={setSearch} />;
  },
};
