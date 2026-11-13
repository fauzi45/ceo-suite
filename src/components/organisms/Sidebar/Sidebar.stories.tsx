import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { Sidebar } from "./Sidebar";

const meta: Meta<typeof Sidebar> = {
  title: "Organisms/Sidebar",
  component: Sidebar,
  args: { activeId: "dashboard", onNavigate: fn() },
  parameters: { layout: "fullscreen" },
  decorators: [(Story) => <div className="flex h-[900px] bg-neutral-50"><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {};
export const SubItemActive: Story = { args: { activeId: "office-category" } };

function Demo() {
  const [active, setActive] = useState("dashboard");
  return <Sidebar activeId={active} onNavigate={setActive} />;
}

export const Interactive: Story = {
  render: () => <Demo />,
  parameters: { controls: { disable: true } },
};
