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

/** Aturan kustom (Reset Password): panjang, angka, dan "Password is match". */
export const CustomRules: Story = {
  args: {
    value: "abc123",
    rules: [
      { id: "length", label: "At least 6 character", test: (v: string) => v.length >= 6 },
      { id: "number", label: "At least 1 number", test: (v: string) => /\d/.test(v) },
      { id: "match", label: "Password is match", test: () => false },
    ],
  },
};
