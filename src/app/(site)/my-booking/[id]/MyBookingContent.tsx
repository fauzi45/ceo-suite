"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { parseDateParam } from "@/data/booking";
import { getMyBooking } from "@/data/my-booking";
import type { MeetingPackage } from "@/data/packages";
import { useSiteNavbar } from "@/lib/use-site-navbar";
import { MyBookingDetail } from "@/components/organisms/MyBookingDetail/MyBookingDetail";
import { LandingLayout } from "@/components/templates/LandingLayout/LandingLayout";

export interface MyBookingContentProps {
  item: MeetingPackage;
}

/** Halaman detail booking. Belum ada halaman daftar My Booking, jadi "back" kembali ke halaman sebelumnya. */
export function MyBookingContent({ item }: MyBookingContentProps) {
  const router = useRouter();
  const search = useSearchParams();
  const { navbarProps } = useSiteNavbar("package");
  const booking = useMemo(
    () => getMyBooking(item, parseDateParam(search.get("date")) ?? new Date()),
    [item, search],
  );

  return (
    <LandingLayout navbarProps={navbarProps}>
      <MyBookingDetail booking={booking} onBack={() => router.back()} />
    </LandingLayout>
  );
}
