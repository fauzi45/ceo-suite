import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SEARCH_ROOMS } from "@/data/landing";
import { SpaceMap } from "./SpaceMap";

const meta: Meta<typeof SpaceMap> = {
  title: "Organisms/SpaceMap",
  component: SpaceMap,
  args: { rooms: SEARCH_ROOMS.filter((room) => room.city === "Jakarta"), className: "h-[480px] w-full" },
};
export default meta;

type Story = StoryObj<typeof SpaceMap>;

/** Peta Leaflet (OpenStreetMap) dengan satu pin per ruangan. */
export const Default: Story = {};

/** Pin yang disorot berwarna hijau. */
export const Highlighted: Story = { args: { activeId: "search-room-1" } };
