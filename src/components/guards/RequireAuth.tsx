"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/use-auth";

export interface RequireAuthProps {
  children: ReactNode;
  /** Tujuan jika belum login. */
  redirectTo?: string;
}

/**
 * Pembungkus untuk halaman yang wajib login (route group `(app)`).
 * Belum login → dialihkan ke `redirectTo`. Selama status belum diketahui, tidak merender apa pun.
 * Sementara membaca localStorage di client; saat API siap, pindahkan pengecekan ke `proxy.ts` dengan cookie.
 */
export function RequireAuth({ children, redirectTo = "/login" }: RequireAuthProps) {
  const email = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (email === null) router.replace(redirectTo);
  }, [email, router, redirectTo]);

  if (!email) return null;
  return <>{children}</>;
}
