import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { MobileNavItem } from "./MobileNavItem";

const meta: Meta<typeof MobileNavItem> = {
  title: "Molecules/MobileNavItem",
  component: MobileNavItem,
  args: { icon: "home-outline", activeIcon: "home", label: "Home", size: "mobile", onClick: fn() },
  argTypes: { size: { control: "radio", options: ["mobile", "tab"] } },
  decorators: [(Story) => <div className="flex w-[120px] bg-white"><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof MobileNavItem>;

export const Off: Story = {};
export const On: Story = { args: { active: true } };
export const Tab: Story = { args: { size: "tab", active: true } };
