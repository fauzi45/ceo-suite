import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchContent } from "./SearchContent";

export const metadata: Metadata = {
  title: "Search Results | CEO SUITE",
  description: "Find meeting rooms, offices, and co-working spaces across Asia's CBDs.",
};

export default function SearchPage() {
  // SearchContent membaca query string di client, jadi dibungkus Suspense.
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}
