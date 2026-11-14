import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";
import { AuthHeader } from "./AuthHeader";

const meta: Meta<typeof AuthHeader> = {
  title: "Molecules/AuthHeader",
  component: AuthHeader,
  args: {
    title: "Book your Room Now!",
    subtitle: "Please logged in to flexible and easy access.",
  },
};
export default meta;

type Story = StoryObj<typeof AuthHeader>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    await expect(canvas.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Book your Room Now!",
    );
    await expect(canvas.getByText("Please logged in to flexible and easy access.")).toBeVisible();
  },
};

export const WithoutSubtitle: Story = { args: { subtitle: undefined } };
