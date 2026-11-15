import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getProduct, getSimilarRooms, PRODUCT_IDS } from "@/data/product";
import { ProductContent } from "./ProductContent";

type PageProps = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return PRODUCT_IDS.map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  return {
    title: product ? `${product.room.name} | CEO SUITE` : "Space not found | CEO SUITE",
    description: product?.description,
  };
}

// partialPrefetching aktif: `params` dibaca di dalam <Suspense> (bukan di level atas page).
export default function ProductPage({ params }: PageProps) {
  return (
    <Suspense>
      <Product params={params} />
    </Suspense>
  );
}

async function Product({ params }: PageProps) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  return <ProductContent product={product} similar={getSimilarRooms(id, product.room.roomType)} />;
}
