import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ContactCtaCard } from "./ContactCtaCard";

const meta: Meta<typeof ContactCtaCard> = {
  title: "Molecules/ContactCtaCard",
  component: ContactCtaCard,
  args: {
    title: "Special offer for business and companies!",
    description:
      "We are always open to exploring new partnerships that will add value to our community and enhance the business ecosystem.",
  },
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj<typeof ContactCtaCard>;

export const Banner: Story = {};

export const Card: Story = {
  args: { variant: "card", title: "Interested in this offer?", description: "Contact us for more information!" },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};
