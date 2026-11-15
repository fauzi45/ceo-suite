import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { getSimilarRooms } from "@/data/product";
import { SimilarSpacesSection } from "./SimilarSpacesSection";

const meta: Meta<typeof SimilarSpacesSection> = {
  title: "Organisms/SimilarSpacesSection",
  component: SimilarSpacesSection,
  args: { rooms: getSimilarRooms("search-room-7", "board") },
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof SimilarSpacesSection>;

export const Default: Story = {};
