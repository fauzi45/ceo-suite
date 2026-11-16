import type { Metadata } from "next";
import { ProfileOverview } from "@/components/organisms/ProfileOverview/ProfileOverview";

export const metadata: Metadata = { title: "My Profile | CEO SUITE" };

export default function ProfilePage() {
  return <ProfileOverview />;
}
