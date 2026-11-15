import type { Metadata } from "next";
import { Suspense } from "react";
import { NewsContent } from "./NewsContent";

export const metadata: Metadata = {
  title: "News | CEO SUITE",
  description: "Expert insights, workspace tips and community stories from across the CEO SUITE member network.",
};

export default function NewsPage() {
  // useSearchParams (tab kategori) di client component wajib dibungkus Suspense.
  return (
    <Suspense>
      <NewsContent />
    </Suspense>
  );
}
