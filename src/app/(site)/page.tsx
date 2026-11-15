import type { Metadata } from "next";
import { LandingContent } from "./LandingContent";

export const metadata: Metadata = {
  title: "CEO SUITE | Discover Your Perfect Workspace",
  description:
    "Flexible, premium workspaces: private offices, co-working spaces, and meeting rooms across Asia's CBDs.",
};

export default function LandingPage() {
  return <LandingContent />;
}
