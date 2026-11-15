import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getProduct, PRODUCT_IDS } from "@/data/product";
import { BookingFlow } from "./BookingFlow";

type PageProps = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return PRODUCT_IDS.map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  return { title: product ? `Book ${product.room.name} | CEO SUITE` : "Space not found | CEO SUITE" };
}

export default async function BookingPage({ params }: PageProps) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  // Jadwal ada di query URL (dibaca di client), jadi isinya perlu Suspense saat prerender.
  return (
    <Suspense>
      <BookingFlow product={product} />
    </Suspense>
  );
}
