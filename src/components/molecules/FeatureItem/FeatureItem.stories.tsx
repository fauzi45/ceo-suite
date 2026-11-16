import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SERVICE_FEATURES } from "@/data/services";
import { FeatureItem } from "./FeatureItem";

const meta: Meta<typeof FeatureItem> = {
  title: "Molecules/FeatureItem",
  component: FeatureItem,
  args: { feature: SERVICE_FEATURES[0] },
  decorators: [(Story) => <div className="w-72"><Story /></div>],
};
export default meta;

export const Default: StoryObj<typeof FeatureItem> = {};
