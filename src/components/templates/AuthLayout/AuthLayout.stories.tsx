import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";
import { AuthLayout } from "./AuthLayout";

const meta: Meta<typeof AuthLayout> = {
  title: "Templates/AuthLayout",
  component: AuthLayout,
  parameters: { layout: "fullscreen" },
  args: {
    children: (
      <div className="rounded-lg border border-dashed border-neutral-300 p-6 text-center text-caption text-neutral-500">
        Konten (header + form)
      </div>
    ),
  },
};
export default meta;

type Story = StoryObj<typeof AuthLayout>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const main = within(canvasElement).getByRole("main");
    await expect(within(main).getByText("Konten (header + form)")).toBeVisible();
  },
};

export const Mobile: Story = {
  globals: { viewport: { value: "mobile1", isRotated: false } },
};
