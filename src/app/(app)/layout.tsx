import type { ReactNode } from "react";
import { RequireAuth } from "@/components/guards/RequireAuth";

/** Halaman yang wajib login: yang belum login dialihkan ke `/login`. */
export default function AppGroupLayout({ children }: { children: ReactNode }) {
  return <RequireAuth>{children}</RequireAuth>;
}
