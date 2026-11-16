import type { Metadata } from "next";
import { ProfileDetailCard } from "@/components/organisms/ProfileDetailCard/ProfileDetailCard";

// Isi tergantung status login yang baru diketahui di browser (lihat layout.tsx).
export const instant = false;

export const metadata: Metadata = { title: "Profile Detail | CEO SUITE" };

export default function ProfileDetailPage() {
  return <ProfileDetailCard />;
}
