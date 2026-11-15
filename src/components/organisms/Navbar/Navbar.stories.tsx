import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { Navbar } from "./Navbar";

const meta: Meta<typeof Navbar> = {
  title: "Organisms/Navbar",
  component: Navbar,
  args: { activeId: "services", onSignIn: fn(), onSignUp: fn() },
  parameters: { layout: "fullscreen", backgrounds: { value: "canvas" } },
};
export default meta;

type Story = StoryObj<typeof Navbar>;

export const Default: Story = {};
export const NoActiveLink: Story = { args: { activeId: undefined } };

/** Versi login: avatar + nama dengan dropdown (My Booking, Profile, Logout). */
export const LoggedIn: Story = { args: { user: { name: "Jane Doe" }, onUserMenuSelect: fn() } };

/** Di bawah 1280px link dilipat ke tombol hamburger. */
export const Mobile: Story = { globals: { viewport: { value: "mobile1", isRotated: false } } };
