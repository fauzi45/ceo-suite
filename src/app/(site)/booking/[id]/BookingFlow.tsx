"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { parseDateParam, parseTimeParam, type AddOnSelection, type Voucher } from "@/data/booking";
import type { ProductDetail } from "@/data/product";
import { useAuth } from "@/lib/use-auth";
import { useSiteNavbar } from "@/lib/use-site-navbar";
import { AuthHeader } from "@/components/molecules/AuthHeader/AuthHeader";
import { BookingConfirmation } from "@/components/organisms/BookingConfirmation/BookingConfirmation";
import { BookingDetailsForm } from "@/components/organisms/BookingDetailsForm/BookingDetailsForm";
import { BookingTerms } from "@/components/organisms/BookingTerms/BookingTerms";
import { GuestDetailsForm, type GuestDetails } from "@/components/organisms/GuestDetailsForm/GuestDetailsForm";
import { VerifyEmailForm } from "@/components/organisms/VerifyEmailForm/VerifyEmailForm";
import { AuthLayout } from "@/components/templates/AuthLayout/AuthLayout";
import { LandingLayout } from "@/components/templates/LandingLayout/LandingLayout";

type Step = "guest" | "verify" | "details" | "terms" | "confirmed";

export interface BookingFlowProps {
  product: ProductDetail;
}

/**
 * Alur booking satu halaman. Jadwal dibaca dari query URL (diisi halaman detail ruangan).
 * Sudah login: details -> terms -> confirmed. Belum login (guest): guest -> verify -> details -> terms -> confirmed.
 * Panah kembali mundur satu langkah; di langkah pertama kembali ke halaman detail ruangan.
 */
export function BookingFlow({ product }: BookingFlowProps) {
  const router = useRouter();
  const search = useSearchParams();
  const email = useAuth();
  const { navbarProps } = useSiteNavbar();

  const date = useMemo(() => parseDateParam(search.get("date")), [search]);
  const start = parseTimeParam(search.get("start"));
  const end = parseTimeParam(search.get("end"));
  const time = useMemo(() => ({ start, end }), [start, end]);
  const hasSchedule = Boolean(date && start && end);

  // `null` = belum memilih langkah: langkah awal ditentukan dari status login begitu sudah diketahui.
  const [step, setStep] = useState<Step | null>(null);
  const [guest, setGuest] = useState<GuestDetails>();
  const [request, setRequest] = useState("");
  const [addOns, setAddOns] = useState<AddOnSelection>({});
  const [voucher, setVoucher] = useState<Voucher | null>(null);

  const productHref = `/product/${product.room.id}`;
  const isGuest = email === null;
  const current: Step | null = step ?? (email === undefined ? null : isGuest ? "guest" : "details");

  // Tanpa jadwal yang valid di URL, booking tidak bisa dilanjutkan: kembali ke halaman detail.
  useEffect(() => {
    if (!hasSchedule) router.replace(productHref);
  }, [hasSchedule, router, productHref]);

  if (!hasSchedule || !date || !current) return null;

  const backFromDetails = () => (isGuest ? setStep("guest") : router.push(productHref));

  if (current === "verify") {
    return (
      <AuthLayout>
        <AuthHeader
          title="Email Verification"
          subtitle={`We have sent a verification code to ${guest?.email ?? "your email"}`}
          titleSize="md"
          spacing="wide"
        />
        <VerifyEmailForm onVerified={() => setStep("details")} />
      </AuthLayout>
    );
  }

  return (
    <LandingLayout navbarProps={navbarProps}>
      {current === "guest" && (
        <GuestDetailsForm
          defaultValues={guest}
          onBack={() => router.push(productHref)}
          onSubmit={(details) => {
            setGuest(details);
            setStep("verify");
          }}
        />
      )}
      {current === "details" && (
        <BookingDetailsForm
          product={product}
          date={date}
          time={time}
          request={request}
          onRequestChange={setRequest}
          addOns={addOns}
          onAddOnsChange={setAddOns}
          voucher={voucher}
          onVoucherChange={setVoucher}
          onBack={backFromDetails}
          onContinue={() => setStep("terms")}
        />
      )}
      {current === "terms" && <BookingTerms onBack={() => setStep("details")} onContinue={() => setStep("confirmed")} />}
      {current === "confirmed" && <BookingConfirmation product={product} date={date} time={time} />}
    </LandingLayout>
  );
}
