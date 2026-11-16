import type { Metadata } from "next";
import { ProfileDetailCard } from "@/components/organisms/ProfileDetailCard/ProfileDetailCard";

export const metadata: Metadata = { title: "Profile Detail | CEO SUITE" };

export default function ProfileDetailPage() {
  return <ProfileDetailCard />;
}
