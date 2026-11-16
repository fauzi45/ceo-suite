import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { PACKAGES, getPackageById } from "@/data/packages";
import { PackageBookingFlow } from "./PackageBookingFlow";

type PageProps = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return PACKAGES.map((item) => ({ id: item.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const item = getPackageById(id);
  return { title: item ? `Book ${item.name} | CEO SUITE` : "Package not found | CEO SUITE" };
}

// partialPrefetching aktif: `params` dibaca di dalam <Suspense> (bukan di level atas page).
export default function PackageBookingPage({ params }: PageProps) {
  return (
    <Suspense>
      <PackageBooking params={params} />
    </Suspense>
  );
}

async function PackageBooking({ params }: PageProps) {
  const { id } = await params;
  const item = getPackageById(id);
  if (!item) notFound();

  // Tanggal mulai ada di query URL (dibaca di client), jadi isinya perlu Suspense saat prerender.
  return (
    <Suspense>
      <PackageBookingFlow item={item} />
    </Suspense>
  );
}
