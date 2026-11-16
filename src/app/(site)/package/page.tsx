import type { Metadata } from "next";
import { PackageContent } from "./PackageContent";

export const metadata: Metadata = {
  title: "Meeting Room Package | CEO SUITE",
  description: "Book premium meeting room packages at a special rate across CEO SUITE locations.",
};

export default function PackagePage() {
  return <PackageContent />;
}
