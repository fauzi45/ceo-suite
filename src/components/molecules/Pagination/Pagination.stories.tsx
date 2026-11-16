"use client";

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Pagination } from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Molecules/Pagination",
  component: Pagination,
  args: { page: 1, pageCount: 10 },
};
export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: (args) => {
    const [page, setPage] = useState(args.page);
    return <Pagination {...args} page={page} onPageChange={setPage} />;
  },
};
