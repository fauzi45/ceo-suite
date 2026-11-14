import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { IdentityModal } from "./IdentityModal";

const meta: Meta<typeof IdentityModal> = {
  title: "Organisms/IdentityModal",
  component: IdentityModal,
  parameters: { layout: "fullscreen" },
  args: { open: true, onSave: fn(), onSkip: fn() },
};
export default meta;

type Story = StoryObj<typeof IdentityModal>;

/** "Save my Data" abu-abu sampai tanggal lahir (DD/MM/YYYY) dan nama perusahaan terisi. */
export const Default: Story = {};
export const Closed: Story = { args: { open: false } };
