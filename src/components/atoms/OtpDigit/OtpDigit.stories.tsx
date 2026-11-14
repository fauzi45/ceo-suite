import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { OtpDigit } from "./OtpDigit";

const meta: Meta<typeof OtpDigit> = {
  title: "Atoms/OtpDigit",
  component: OtpDigit,
  args: { "aria-label": "Digit 1 of 6" },
  decorators: [(Story) => <div className="w-[84px]"><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof OtpDigit>;

export const Empty: Story = {};
export const Filled: Story = { args: { defaultValue: "9" } };
export const Invalid: Story = { args: { defaultValue: "9", invalid: true } };
export const Disabled: Story = { args: { defaultValue: "9", disabled: true } };
