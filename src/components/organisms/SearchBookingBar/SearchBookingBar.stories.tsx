import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { SearchBookingBar } from "./SearchBookingBar";

const meta: Meta<typeof SearchBookingBar> = {
  title: "Organisms/SearchBookingBar",
  component: SearchBookingBar,
  args: { onSubmit: fn(), onScopeChange: fn() },
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="h-[260px] w-[600px]"><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof SearchBookingBar>;

export const Default: Story = {};
export const WithQuery: Story = { args: { scope: "customer", query: "Olivia" } };
