import type { Metadata } from "next";
import { Suspense } from "react";
import { PromotionsContent } from "./PromotionsContent";

export const metadata: Metadata = {
  title: "Promotions & Deals | CEO SUITE",
  description:
    "Exclusive offers on office spaces, meeting rooms, co-working and event spaces, plus vouchers for your next booking.",
};

export default function PromotionsPage() {
  // useSearchParams (tab kategori) di client component wajib dibungkus Suspense.
  return (
    <Suspense>
      <PromotionsContent />
    </Suspense>
  );
}
