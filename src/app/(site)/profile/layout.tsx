import type { ReactNode } from "react";
import { ProfileShell } from "./ProfileShell";

/**
 * Isi halaman profil bergantung pada status login yang baru diketahui di browser (localStorage), jadi
 * `ProfileShell` tidak merender `children` sebelum itu. Validasi "instant navigation" tidak berlaku di sini.
 */
export const instant = false;

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return <ProfileShell>{children}</ProfileShell>;
}
