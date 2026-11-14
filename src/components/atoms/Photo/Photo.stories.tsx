import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Photo } from "./Photo";

const meta: Meta<typeof Photo> = {
  title: "Atoms/Photo",
  component: Photo,
  args: { className: "aspect-[16/10] w-80 rounded-lg" },
};
export default meta;

type Story = StoryObj<typeof Photo>;

/** Tanpa `src`: placeholder abu-abu sampai foto dari Figma tersedia. */
export const Placeholder: Story = {};
export const WithImage: Story = { args: { src: "/logos/ceo-suite.png", alt: "CEO Suite" } };
