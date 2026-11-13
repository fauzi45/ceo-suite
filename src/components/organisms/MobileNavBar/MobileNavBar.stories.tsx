import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { MobileNavBar } from "./MobileNavBar";

const meta: Meta<typeof MobileNavBar> = {
  title: "Organisms/MobileNavBar",
  component: MobileNavBar,
  args: { activeId: "home", size: "mobile", onNavigate: fn() },
  argTypes: { size: { control: "radio", options: ["mobile", "tab"] } },
  parameters: { layout: "fullscreen", backgrounds: { value: "canvas" } },
  decorators: [
    (Story, ctx) => (
      <div className="p-6">
        <div style={{ width: ctx.args.size === "tab" ? 744 : 360 }}>
          <Story />
        </div>
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof MobileNavBar>;

export const Mobile: Story = {};
export const Tablet: Story = { args: { size: "tab" } };

function Demo() {
  const [active, setActive] = useState("home");
  return <MobileNavBar activeId={active} onNavigate={setActive} />;
}

export const Interactive: Story = {
  render: () => <Demo />,
  parameters: { controls: { disable: true } },
};
