import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Toggle } from "./Toggle";

const meta: Meta<typeof Toggle> = {
  title: "Atoms/Toggle",
  component: Toggle,
  args: { label: "Toggle" },
};
export default meta;

type Story = StoryObj<typeof Toggle>;

export const Off: Story = {};
export const On: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true, defaultChecked: true } };
export const WithoutLabel: Story = { args: { label: undefined, "aria-label": "Aktifkan" } };
