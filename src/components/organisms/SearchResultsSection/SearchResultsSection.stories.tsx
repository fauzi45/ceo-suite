import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SearchResultsSection } from "./SearchResultsSection";

const meta: Meta<typeof SearchResultsSection> = {
  title: "Organisms/SearchResultsSection",
  component: SearchResultsSection,
  parameters: { layout: "fullscreen" },
  args: {
    initialCriteria: { location: "Jakarta", region: "All", dates: { start: null, end: null }, spaceTypes: [] },
  },
};
export default meta;

type Story = StoryObj<typeof SearchResultsSection>;

/** Form filter + grid 3 kolom + See More, dengan peta Leaflet di kanan (di bawah grid pada layar kecil). */
export const Default: Story = {};

/** Kota tanpa ruangan contoh menampilkan keadaan kosong. */
export const NoResults: Story = {
  args: {
    initialCriteria: { location: "Medan", region: "All", dates: { start: null, end: null }, spaceTypes: [] },
  },
};
