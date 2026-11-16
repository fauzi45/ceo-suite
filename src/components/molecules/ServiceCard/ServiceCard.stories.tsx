import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SERVICES } from "@/data/services";
import { ServiceCard } from "./ServiceCard";

const meta: Meta<typeof ServiceCard> = {
  title: "Molecules/ServiceCard",
  component: ServiceCard,
  args: { service: SERVICES[0] },
  decorators: [(Story) => <div className="w-[413px] max-w-full"><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof ServiceCard>;

export const LearnMore: Story = {};
export const ContactUs: Story = { args: { service: SERVICES[1] } };
