import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LogoutButton } from "./LogoutButton";

const meta: Meta<typeof LogoutButton> = {
  title: "Molecules/LogoutButton",
  component: LogoutButton,
  // LogoutButton memakai useRouter dari App Router (kembali ke /login).
  parameters: { nextjs: { appDirectory: true } },
};
export default meta;

type Story = StoryObj<typeof LogoutButton>;

/** Menghapus status login dari localStorage lalu pindah ke /login. */
export const Default: Story = {};
