import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { OtpField, type OtpFieldProps } from "./OtpField";

function Controlled(args: OtpFieldProps) {
  const [value, setValue] = useState(args.value);
  return <OtpField {...args} value={value} onChange={setValue} />;
}

const meta: Meta<typeof OtpField> = {
  title: "Molecules/OtpField",
  component: OtpField,
  args: { value: "", onChange: () => {} },
  render: (args) => <Controlled {...args} />,
  decorators: [(Story) => <div className="w-full max-w-146"><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof OtpField>;

/** Ketik, hapus dengan Backspace, atau paste 6 digit sekaligus. */
export const Default: Story = {};
export const Filled: Story = { args: { value: "999999" } };
export const Invalid: Story = { args: { value: "999999", invalid: true } };
export const Disabled: Story = { args: { value: "123456", disabled: true } };
