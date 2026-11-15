import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { QuantityStepper } from "./QuantityStepper";

const meta: Meta<typeof QuantityStepper> = {
  title: "Molecules/QuantityStepper",
  component: QuantityStepper,
  args: { value: 1 },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return <QuantityStepper {...args} value={value} onChange={setValue} />;
  },
};
export default meta;

type Story = StoryObj<typeof QuantityStepper>;
export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
