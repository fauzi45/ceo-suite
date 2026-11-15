import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { DEFAULT_USER_MENU } from "@/components/organisms/Navbar/Navbar";
import { UserMenu } from "./UserMenu";

const meta: Meta<typeof UserMenu> = {
  title: "Molecules/UserMenu",
  component: UserMenu,
  args: { name: "Jane Doe", items: DEFAULT_USER_MENU, onSelect: fn() },
  decorators: [(Story) => <div className="flex h-48 justify-end p-4"><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof UserMenu>;

export const Default: Story = {};
