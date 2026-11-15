import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MEETING_ROOM_PROMOS } from "@/data/promotions";
import { PromoCarouselSection } from "./PromoCarouselSection";

const meta: Meta<typeof PromoCarouselSection> = {
  title: "Organisms/PromoCarouselSection",
  component: PromoCarouselSection,
  parameters: { layout: "padded" },
  args: {
    title: "Meeting Rooms",
    subtitle: "Limited Time Offer",
    icon: "room-meeting",
    iconClassName: "bg-fuchsia-50 text-fuchsia-700",
    promos: MEETING_ROOM_PROMOS,
  },
};
export default meta;

type Story = StoryObj<typeof PromoCarouselSection>;
export const Default: Story = {};
/** Tiga kartu muat sekaligus: kedua panah abu-abu. */
export const NoOverflow: Story = { args: { promos: MEETING_ROOM_PROMOS.slice(0, 3) } };
