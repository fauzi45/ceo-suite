import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { CarouselArrows } from "./CarouselArrows";

const meta: Meta<typeof CarouselArrows> = {
  title: "Molecules/CarouselArrows",
  component: CarouselArrows,
  args: { onPrev: fn(), onNext: fn() },
};
export default meta;

type Story = StoryObj<typeof CarouselArrows>;
export const Default: Story = {};
export const AtStart: Story = { args: { prevDisabled: true } };
export const AtEnd: Story = { args: { nextDisabled: true } };
