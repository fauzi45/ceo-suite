import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Breadcrumb } from "./Breadcrumb";

const meta: Meta<typeof Breadcrumb> = {
  title: "Molecules/Breadcrumb",
  component: Breadcrumb,
  args: { items: [{ label: "Promotions & Deals!", href: "/promotions" }, { label: "Promo Details" }] },
};
export default meta;

export const Default: StoryObj<typeof Breadcrumb> = {};
