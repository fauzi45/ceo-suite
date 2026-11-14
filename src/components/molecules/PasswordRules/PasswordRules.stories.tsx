import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PasswordRules } from "./PasswordRules";

const meta: Meta<typeof PasswordRules> = {
  title: "Molecules/PasswordRules",
  component: PasswordRules,
  args: { value: "" },
};
export default meta;

type Story = StoryObj<typeof PasswordRules>;

/** Belum ada yang terpenuhi: semua abu-abu. */
export const Empty: Story = {};
/** Hanya "At least 8 character" yang terpenuhi. */
export const Partial: Story = { args: { value: "abcdefgh" } };
/** Semua aturan terpenuhi: hijau. */
export const AllMet: Story = { args: { value: "Abcdefg1" } };
