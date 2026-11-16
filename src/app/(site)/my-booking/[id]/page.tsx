import type { Metadata } from "next";
import { Suspense } from "react";
import { SAMPLE_BOOKINGS } from "@/data/my-bookings";
import { MyBookingContent } from "./MyBookingContent";

type PageProps = { params: Promise<{ id: string }> };

// Hanya booking contoh yang di-prerender; booking buatan pengguna (disimpan di browser) dirender saat diminta.
export function generateStaticParams() {
  return SAMPLE_BOOKINGS.map((booking) => ({ id: booking.id }));
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
  return <MyBookingContent id={id} />;
}
