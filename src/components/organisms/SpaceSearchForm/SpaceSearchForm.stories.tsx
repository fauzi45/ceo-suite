import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { LOCATION_OPTIONS } from "@/data/landing";
import { SpaceSearchForm } from "./SpaceSearchForm";

const meta: Meta<typeof SpaceSearchForm> = {
  title: "Organisms/SpaceSearchForm",
  component: SpaceSearchForm,
  args: { onSearch: fn() },
  decorators: [(Story) => <div className="min-h-[560px] w-full max-w-5xl p-4"><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof SpaceSearchForm>;

/** Kartu merah muda bertingkat (hero belum login). */
export const Card: Story = {};

/** Bar putih mendatar (hero login): tiga kolom dari md ke atas. */
export const Bar: Story = {
  args: { variant: "bar", locationLabel: "Select Location", locationOptions: LOCATION_OPTIONS },
};

/** Halaman Search Results: ada "Select Region", tanpa tombol Search (hasil ikut berubah saat field diubah). */
export const Inline: Story = {
  args: { variant: "inline", onChange: fn() },
};
