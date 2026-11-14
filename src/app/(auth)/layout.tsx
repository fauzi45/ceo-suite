import type { ReactNode } from "react";
import { RedirectIfAuthenticated } from "@/components/guards/RedirectIfAuthenticated";

/** Halaman publik (login, sign up, verifikasi, forgot password): yang sudah login dialihkan ke `/`. */
export default function AuthGroupLayout({ children }: { children: ReactNode }) {
  return <RedirectIfAuthenticated>{children}</RedirectIfAuthenticated>;
}
