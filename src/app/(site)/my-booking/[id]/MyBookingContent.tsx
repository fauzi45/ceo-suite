"use client";

import { useRouter } from "next/navigation";
import { getMyBooking } from "@/data/my-booking";
import { getRoomBookingDetail } from "@/data/my-bookings";
import { getPackageById } from "@/data/packages";
import { useAuth } from "@/lib/use-auth";
import { useMyBookings } from "@/lib/my-bookings";
import { useSiteNavbar } from "@/lib/use-site-navbar";
import { Container } from "@/components/atoms/Container/Container";
import { Button } from "@/components/atoms/Button/Button";
import { NotLoggedInCard } from "@/components/molecules/NotLoggedInCard/NotLoggedInCard";
import { MyBookingDetail } from "@/components/organisms/MyBookingDetail/MyBookingDetail";
import { RoomBookingDetail } from "@/components/organisms/RoomBookingDetail/RoomBookingDetail";
import { LandingLayout } from "@/components/templates/LandingLayout/LandingLayout";

export interface MyBookingContentProps {
  id: string;
}

const parseIsoDate = (value: string) => {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
};

/**
 * Halaman detail booking. `id` adalah id booking (contoh atau buatan pengguna); tampilannya mengikuti jenis booking
 * (ruangan atau paket). Hanya untuk pengguna login.
 */
export function MyBookingContent({ id }: MyBookingContentProps) {
  const router = useRouter();
  const email = useAuth();
  const bookings = useMyBookings();
  const { navbarProps } = useSiteNavbar("my-booking");
  const back = () => router.push("/my-booking");

  const record = bookings?.find((booking) => booking.id === id);
  const room = record?.kind === "room" ? getRoomBookingDetail(record) : undefined;
  const item = record?.kind === "package" ? getPackageById(record.refId) : undefined;

  let content = null;
  if (email === null) {
    content = (
      <Container className="py-8 md:py-12">
        <NotLoggedInCard onSignIn={() => router.push("/login")} />
      </Container>
    );
  } else if (email !== undefined && bookings) {
    if (record && room) content = <RoomBookingDetail booking={room} onBack={back} />;
    else if (record && item) {
      content = <MyBookingDetail booking={getMyBooking(item, parseIsoDate(record.date), record.invoice)} onBack={back} />;
    } else {
      content = (
        <Container className="flex flex-col items-center gap-4 py-20 text-center">
          <h1 className="text-heading-sm font-bold text-neutral-950">Booking not found</h1>
          <p className="text-caption text-neutral-500">This booking does not exist or was made on another device.</p>
          <Button size="mobile" onClick={back}>
            Back to My Booking
          </Button>
        </Container>
      );
    }
  }

  return <LandingLayout navbarProps={navbarProps}>{content}</LandingLayout>;
}
