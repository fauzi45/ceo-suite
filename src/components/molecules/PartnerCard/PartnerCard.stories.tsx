import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PARTNERS } from "@/data/landing";
import { PartnerCard } from "./PartnerCard";

const meta: Meta<typeof PartnerCard> = {
  title: "Molecules/PartnerCard",
  component: PartnerCard,
  args: { partner: PARTNERS[0] },
  decorators: [(Story) => <div className="w-96"><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof PartnerCard>;

export const Default: Story = {};
