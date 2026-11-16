import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MEMBER_CARD } from "@/data/profile";
import { MemberCard } from "./MemberCard";

const meta: Meta<typeof MemberCard> = {
  title: "Molecules/MemberCard",
  component: MemberCard,
  args: { name: "Nisrina Thifal", code: MEMBER_CARD.code, maskedNumber: MEMBER_CARD.maskedNumber },
};
export default meta;

export const Default: StoryObj<typeof MemberCard> = {};
