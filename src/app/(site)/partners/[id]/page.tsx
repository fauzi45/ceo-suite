import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { PARTNER_ITEMS, getPartnerById } from "@/data/partners";
import { PartnerDetailContent } from "./PartnerDetailContent";

type PageProps = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return PARTNER_ITEMS.map((partner) => ({ id: partner.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const partner = getPartnerById(id);
  return {
    title: partner ? `${partner.title} | CEO SUITE` : "Partner not found | CEO SUITE",
    description: partner?.description,
  };
}

// partialPrefetching aktif: `params` dibaca di dalam <Suspense> (bukan di level atas page).
export default function PartnerDetailPage({ params }: PageProps) {
  return (
    <Suspense>
      <PartnerDetail params={params} />
    </Suspense>
  );
}

async function PartnerDetail({ params }: PageProps) {
  const { id } = await params;
  const partner = getPartnerById(id);
  if (!partner) notFound();

  return <PartnerDetailContent partner={partner} />;
}
