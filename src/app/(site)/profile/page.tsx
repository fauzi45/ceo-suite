import type { Metadata } from "next";
import { ProfileOverview } from "@/components/organisms/ProfileOverview/ProfileOverview";

// Isi tergantung status login yang baru diketahui di browser (lihat layout.tsx).
export const instant = false;

export const metadata: Metadata = { title: "My Profile | CEO SUITE" };

export default function ProfilePage() {
  return <ProfileOverview />;
}
