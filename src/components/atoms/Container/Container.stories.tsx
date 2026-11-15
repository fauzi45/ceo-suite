import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Container } from "./Container";

const meta: Meta<typeof Container> = {
  title: "Atoms/Container",
  component: Container,
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof Container>;

/** Margin samping 16px (mobile), 32px (sm), 160px (xl); maksimal 1920px. */
export const Default: Story = {
  render: (args) => (
    <Container {...args}>
      <div className="rounded-lg bg-primary-100 p-6 text-center text-caption text-primary-800">
        Konten selebar Container
      </div>
    </Container>
  ),
};
