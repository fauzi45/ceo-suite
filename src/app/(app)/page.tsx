import type { Metadata } from "next";
import { Logo } from "@/components/atoms/Logo/Logo";
import { LogoutButton } from "@/components/molecules/LogoutButton/LogoutButton";

export const metadata: Metadata = {
  title: "Dashboard | CEO Suite",
};

/** Placeholder dashboard (halaman wajib login) sampai desain halaman utamanya dikerjakan. */
export default function DashboardPage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-146 flex-col items-center justify-center gap-6 px-4 text-center">
      <Logo height={40} />
      <h1 className="text-heading-md font-bold text-neutral-950">Dashboard</h1>
      <p className="text-caption text-neutral-600">
        Anda sudah login. Halaman ini hanya bisa dibuka setelah login.
      </p>
      <LogoutButton />
    </main>
  );
}
