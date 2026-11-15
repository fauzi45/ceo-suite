import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { PromoCategoryId } from "@/data/promotions";
import { PromoCategoryTabs } from "./PromoCategoryTabs";

const meta: Meta<typeof PromoCategoryTabs> = {
  title: "Organisms/PromoCategoryTabs",
  component: PromoCategoryTabs,
  args: { value: "all" },
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof PromoCategoryTabs>;
export const Default: Story = {};

function Demo() {
  const [value, setValue] = useState<PromoCategoryId>("vouchers");
  return <PromoCategoryTabs value={value} onChange={setValue} />;
}

export const Interactive: Story = {
  render: () => <Demo />,
  parameters: { controls: { disable: true } },
};
