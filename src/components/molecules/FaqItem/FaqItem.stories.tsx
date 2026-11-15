import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { FAQS } from "@/data/landing";
import { FaqItem } from "./FaqItem";

const meta: Meta<typeof FaqItem> = {
  title: "Molecules/FaqItem",
  component: FaqItem,
  args: { question: FAQS[0].question, answer: FAQS[0].answer, open: false, onToggle: fn() },
  decorators: [(Story) => <div className="w-full max-w-2xl"><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof FaqItem>;

export const Closed: Story = {};
export const Open: Story = { args: { open: true } };
