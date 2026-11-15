import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LandingLayout } from "./LandingLayout";

const meta: Meta<typeof LandingLayout> = {
  title: "Templates/LandingLayout",
  component: LandingLayout,
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof LandingLayout>;

/** Navbar, isi, dan Footer; footer menempel ke dasar layar walau isi pendek. */
export const Default: Story = {
  args: {
    children: <div className="p-10 text-center text-caption text-neutral-500">Isi halaman</div>,
  },
};

export const LoggedIn: Story = {
  args: {
    children: <div className="p-10 text-center text-caption text-neutral-500">Isi halaman</div>,
    navbarProps: { user: { name: "Jane Doe" } },
  },
};
