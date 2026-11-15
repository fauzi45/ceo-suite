import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MeetingPackageSection } from "./MeetingPackageSection";

const meta: Meta<typeof MeetingPackageSection> = {
  title: "Organisms/MeetingPackageSection",
  component: MeetingPackageSection,
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof MeetingPackageSection>;

/** Kolase foto di kiri, teks dan tombol di kanan. */
export const Default: Story = {};
