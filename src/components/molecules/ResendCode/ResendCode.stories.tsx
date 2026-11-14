import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { ResendCode } from "./ResendCode";

const meta: Meta<typeof ResendCode> = {
  title: "Molecules/ResendCode",
  component: ResendCode,
  args: { onResend: fn() },
};
export default meta;

type Story = StoryObj<typeof ResendCode>;

/** Hitung mundur 01:59 berjalan. */
export const Counting: Story = {};
/** Waktu habis: muncul tombol "Resend Code". */
export const Expired: Story = { args: { initialSeconds: 0 } };
/** Hitung mundur singkat untuk melihat peralihan ke "Resend Code". */
export const AlmostDone: Story = { args: { initialSeconds: 3 } };
