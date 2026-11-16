"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { parseDateParam, type Voucher } from "@/data/booking";
import { buildMyBookingHref, type MeetingPackage } from "@/data/packages";
import { useAuth } from "@/lib/use-auth";
import { useSiteNavbar } from "@/lib/use-site-navbar";
import { AppDownloadSection } from "@/components/organisms/AppDownloadSection/AppDownloadSection";
import { GuestDetailsForm, type GuestDetails } from "@/components/organisms/GuestDetailsForm/GuestDetailsForm";
import { PackageBookingForm } from "@/components/organisms/PackageBookingForm/PackageBookingForm";
import { PackageConfirmation } from "@/components/organisms/PackageConfirmation/PackageConfirmation";
import { LandingLayout } from "@/components/templates/LandingLayout/LandingLayout";

type Step = "guest" | "details" | "confirmed";

export interface PackageBookingFlowProps {
  item: MeetingPackage;
}

/**
 * Alur booking paket satu halaman. Tanggal mulai dibaca dari query URL (diisi halaman Package, default hari ini).
 * Sudah login: details -> confirmed. Belum login (guest): guest -> details -> confirmed (tanpa verifikasi email/OTP).
 * Panah kembali mundur satu langkah; di langkah pertama kembali ke halaman Package.
 */
export function PackageBookingFlow({ item }: PackageBookingFlowProps) {
  const router = useRouter();
  const search = useSearchParams();
  const email = useAuth();
  const { navbarProps } = useSiteNavbar("package");

  // Tanpa tanggal valid di URL, pakai hari ini. Dihitung sekali supaya tidak berubah antar-render.
  const [startDate] = useState(() => parseDateParam(search.get("date")) ?? new Date());

  // `null` = belum memilih langkah: langkah awal ditentukan dari status login begitu sudah diketahui.
  const [step, setStep] = useState<Step | null>(null);
  const [guest, setGuest] = useState<GuestDetails>();
  const [voucher, setVoucher] = useState<Voucher | null>(null);

  const isGuest = email === null;
  const current: Step | null = step ?? (email === undefined ? null : isGuest ? "guest" : "details");
  if (!current) return null;

  const backToList = () => router.push("/package");

  return (
    <LandingLayout navbarProps={navbarProps}>
      {current === "guest" && (
        <GuestDetailsForm
          defaultValues={guest}
          onBack={backToList}
          onSubmit={(details) => {
            setGuest(details);
            setStep("details");
          }}
        />
      )}
      {current === "details" && (
        <PackageBookingForm
          item={item}
          startDate={startDate}
          voucher={voucher}
          onVoucherChange={setVoucher}
          onBack={() => (isGuest ? setStep("guest") : backToList())}
          onContinue={() => setStep("confirmed")}
        />
      )}
      {current === "confirmed" && (
        <>
          <PackageConfirmation
            item={item}
            startDate={startDate}
            onViewBooking={() => router.push(buildMyBookingHref(item.id, startDate))}
          />
          <AppDownloadSection />
        </>
      )}
    </LandingLayout>
  );
}
