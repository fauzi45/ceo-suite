import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AppDownloadSection } from "./AppDownloadSection";

const meta: Meta<typeof AppDownloadSection> = {
  title: "Organisms/AppDownloadSection",
  component: AppDownloadSection,
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof AppDownloadSection>;

/** Ajakan unduh aplikasi dengan badge toko dan mockup ponsel. */
export const Default: Story = {};
