"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/use-auth";

export interface RedirectIfAuthenticatedProps {
  children: ReactNode;
  /** Tujuan jika sudah login. */
  redirectTo?: string;
}

/**
 * Pembungkus untuk halaman publik seperti login dan sign up (route group `(auth)`).
 * Sudah login → dialihkan ke `redirectTo`. Halaman tetap dirender saat status belum diketahui
 * supaya HTML dari server tidak kosong.
 */
export function RedirectIfAuthenticated({ children, redirectTo = "/" }: RedirectIfAuthenticatedProps) {
  const email = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (typeof email === "string") router.replace(redirectTo);
  }, [email, router, redirectTo]);

  if (typeof email === "string") return null;
  return <>{children}</>;
}
