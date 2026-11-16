import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PACKAGES } from "@/data/packages";
import { PackageConfirmation } from "./PackageConfirmation";

const meta: Meta<typeof PackageConfirmation> = {
  title: "Organisms/PackageConfirmation",
  component: PackageConfirmation,
  args: { item: PACKAGES[0], startDate: new Date(2024, 6, 10) },
  parameters: { layout: "fullscreen" },
};
export default meta;

export const Default: StoryObj<typeof PackageConfirmation> = {};
