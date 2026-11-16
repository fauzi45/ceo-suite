import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { PACKAGES, getPackageById } from "@/data/packages";
import { MyBookingContent } from "./MyBookingContent";

type PageProps = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return PACKAGES.map((item) => ({ id: item.id }));
}

export const metadata: Metadata = { title: "Booking Details | CEO SUITE" };

// partialPrefetching aktif: `params` dibaca di dalam <Suspense> (bukan di level atas page).
export default function MyBookingPage({ params }: PageProps) {
  return (
    <Suspense>
      <MyBooking params={params} />
    </Suspense>
  );
}

async function MyBooking({ params }: PageProps) {
  const { id } = await params;
  const item = getPackageById(id);
  if (!item) notFound();

  // Tanggal mulai ada di query URL (dibaca di client), jadi isinya perlu Suspense saat prerender.
  return (
    <Suspense>
      <MyBookingContent item={item} />
    </Suspense>
  );
}
