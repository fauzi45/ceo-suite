import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RECOMMENDED_ROOMS } from "@/data/landing";
import { RoomCard } from "./RoomCard";

const meta: Meta<typeof RoomCard> = {
  title: "Molecules/RoomCard",
  component: RoomCard,
  args: { room: RECOMMENDED_ROOMS[0] },
  decorators: [(Story) => <div className="w-72"><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof RoomCard>;

export const Default: Story = {};
/** Dengan harga coret. */
export const Discounted: Story = { args: { room: RECOMMENDED_ROOMS[1] } };
export const Coworking: Story = { args: { room: RECOMMENDED_ROOMS[3] } };
