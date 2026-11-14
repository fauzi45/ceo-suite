import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { Input } from "./Input";

const VisaBadge = () => (
  <span className="rounded-sm bg-[#1a1f71] px-1 text-[8px] font-bold italic leading-4 text-white">VISA</span>
);

const meta: Meta<typeof Input> = {
  title: "Atoms/Input",
  component: Input,
  args: {
    placeholder: "Placeholder",
    leadingIcon: "search",
    addOn: "Add-on",
    trailingIcon: "eye",
    suffix: <VisaBadge />,
  },
  decorators: [(Story) => <div className="w-[375px]"><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {};
export const Filled: Story = { args: { defaultValue: "Input" } };
export const Invalid: Story = { args: { invalid: true } };
export const Disabled: Story = { args: { disabled: true } };
/** Field halaman login/sign up di Figma: tinggi 48 (default 40). */
export const Large: Story = {
  args: { inputSize: "lg" },
  play: async ({ canvasElement }) => {
    const box = canvasElement.querySelector("input")!.closest("div.flex.h-12, div.flex.h-10");
    await expect(box!.getBoundingClientRect().height).toBe(48);
  },
};
export const Plain: Story = {
  args: { leadingIcon: undefined, addOn: undefined, trailingIcon: undefined, suffix: undefined },
};
