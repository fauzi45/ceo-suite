import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { OfficeTypeTabs } from "./OfficeTypeTabs";

const meta: Meta<typeof OfficeTypeTabs> = {
  title: "Organisms/OfficeTypeTabs",
  component: OfficeTypeTabs,
  args: { value: "all", onChange: fn() },
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof OfficeTypeTabs>;

export const Default: Story = {};

function Demo() {
  const [value, setValue] = useState("meeting");
  return <OfficeTypeTabs value={value} onChange={setValue} />;
}

export const Interactive: Story = {
  render: () => <Demo />,
  parameters: { controls: { disable: true } },
};
