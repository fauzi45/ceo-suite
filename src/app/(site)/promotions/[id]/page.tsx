import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ALL_PROMO_IDS, getPromoById } from "@/data/promotions";
import { PromoDetailContent } from "./PromoDetailContent";

type PageProps = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return ALL_PROMO_IDS.map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const promo = getPromoById(id);
  return {
    title: promo ? `${promo.title} | CEO SUITE` : "Promo not found | CEO SUITE",
    description: promo?.description,
  };
}

// partialPrefetching aktif: `params` dibaca di dalam <Suspense> (bukan di level atas page).
export default function PromoDetailPage({ params }: PageProps) {
  return (
    <Suspense>
      <PromoDetail params={params} />
    </Suspense>
  );
}

async function PromoDetail({ params }: PageProps) {
  const { id } = await params;
  const promo = getPromoById(id);
  // Promo "Unavailable" tidak bisa dibuka (kartunya pun bukan link), jadi URL langsung juga ditolak.
  if (!promo || !promo.available) notFound();

  return <PromoDetailContent promo={promo} />;
}
