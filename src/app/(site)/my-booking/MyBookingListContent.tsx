"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/use-auth";
import { useMyBookings } from "@/lib/my-bookings";
import { useSiteNavbar } from "@/lib/use-site-navbar";
import { Container } from "@/components/atoms/Container/Container";
import { NotLoggedInCard } from "@/components/molecules/NotLoggedInCard/NotLoggedInCard";
import { MyBookingList } from "@/components/organisms/MyBookingList/MyBookingList";
import { LandingLayout } from "@/components/templates/LandingLayout/LandingLayout";

/** Halaman My Bookings: hanya untuk pengguna login (belum login = kartu "You're not Log in"). */
export function MyBookingListContent() {
  const router = useRouter();
  const email = useAuth();
  const bookings = useMyBookings();
  const { navbarProps } = useSiteNavbar("my-booking");

  return (
    <LandingLayout navbarProps={navbarProps}>
      <div className="bg-neutral-25">
        <Container className="flex flex-col gap-6 py-8 md:py-12">
          <h1 className="mx-auto w-full max-w-[784px] text-heading-sm font-bold leading-[1.2] text-neutral-950 md:text-heading-md">
            My Bookings
          </h1>
          {email === undefined || !bookings ? null : email === null ? (
            <NotLoggedInCard onSignIn={() => router.push("/login")} className="mx-auto w-full max-w-[784px]" />
          ) : (
            <MyBookingList
              bookings={bookings}
              onOpen={(id) => router.push(`/my-booking/${id}`)}
              onBook={() => router.push("/search")}
            />
          )}
        </Container>
      </div>
    </LandingLayout>
  );
}
