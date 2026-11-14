"use client";

import { useSyncExternalStore } from "react";
import { AUTH_CHANGE_EVENT, getLoggedInEmail } from "@/lib/auth";

const subscribe = (onChange: () => void) => {
  window.addEventListener(AUTH_CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(AUTH_CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
};

/**
 * Status login dari localStorage.
 * - `undefined`: belum diketahui (render di server / saat hydration)
 * - `null`: belum login
 * - `string`: email pengguna yang login
 */
export function useAuth(): string | null | undefined {
  return useSyncExternalStore(subscribe, getLoggedInEmail, () => undefined);
}
