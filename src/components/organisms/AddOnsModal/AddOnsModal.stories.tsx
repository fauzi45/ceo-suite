import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { AddOnsModal } from "./AddOnsModal";

const meta: Meta<typeof AddOnsModal> = {
  title: "Organisms/AddOnsModal",
  component: AddOnsModal,
  args: { open: true, value: {}, onClose: fn(), onSave: fn() },
};
export default meta;

type Story = StoryObj<typeof AddOnsModal>;
export const Empty: Story = {};
export const WithSelection: Story = { args: { value: { "coffee-standard": 1, "lcd-projector-premium": 1 } } };
