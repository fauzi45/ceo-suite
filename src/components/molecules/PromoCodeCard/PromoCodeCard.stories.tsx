import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PromoCodeCard } from "./PromoCodeCard";

const meta: Meta<typeof PromoCodeCard> = {
  title: "Molecules/PromoCodeCard",
  component: PromoCodeCard,
  args: { code: "DISCOUNT25" },
  decorators: [(Story) => <div className="w-[525px] max-w-full"><Story /></div>],
};
export default meta;

export const Default: StoryObj<typeof PromoCodeCard> = {};
