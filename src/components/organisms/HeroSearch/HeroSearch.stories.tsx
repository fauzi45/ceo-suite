import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { HeroSearch } from "./HeroSearch";

const meta: Meta<typeof HeroSearch> = {
  title: "Organisms/HeroSearch",
  component: HeroSearch,
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof HeroSearch>;

/** Hero versi belum login: judul, foto, dan kartu pencarian (bertumpuk di mobile). */
export const Default: Story = {};
