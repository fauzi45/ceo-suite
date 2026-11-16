"use client";

import { useMemo, useState } from "react";
import type { Voucher } from "@/data/booking";
import { computePackageTotals, type MeetingPackage } from "@/data/packages";
import { Button } from "@/components/atoms/Button/Button";
import { Container } from "@/components/atoms/Container/Container";
import { BackHeader } from "@/components/molecules/BackHeader/BackHeader";
import { PackageBookingCard } from "@/components/molecules/PackageBookingCard/PackageBookingCard";
import { PackagePriceCard } from "@/components/molecules/PackagePriceCard/PackagePriceCard";
import { SelectRow } from "@/components/molecules/SelectRow/SelectRow";
import { BookingModal } from "@/components/organisms/BookingModal/BookingModal";
import { VoucherModal } from "@/components/organisms/VoucherModal/VoucherModal";

export interface PackageBookingFormProps {
  item: MeetingPackage;
  startDate: Date;
  voucher: Voucher | null;
  onVoucherChange: (value: Voucher | null) => void;
  onBack: () => void;
  /** Dipanggil setelah pengguna menjawab "Continue" di dialog konfirmasi. */
  onContinue: () => void;
}

/**
 * Halaman "Fill Booking Details" untuk paket: satu kolom selebar 1280 di tengah (kartu paket, voucher,
 * Price Summary) di atas latar background/25. "Continue to Payment" membuka dialog konfirmasi.
 */
export function PackageBookingForm({
  item,
  startDate,
  voucher,
  onVoucherChange,
  onBack,
  onContinue,
}: PackageBookingFormProps) {
  const [modal, setModal] = useState<"voucher" | "confirm" | null>(null);
  const totals = useMemo(() => computePackageTotals(item, voucher), [item, voucher]);
  const close = () => setModal(null);

  return (
    <div className="bg-neutral-25">
      <Container className="flex flex-col gap-8 py-8 md:py-12">
        <BackHeader title="Fill Booking Details" onBack={onBack} />

        {/* Satu kolom 1280 di tengah (Figma): kartu paket, voucher, lalu Price Summary lebar. */}
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-8">
          <PackageBookingCard item={item} startDate={startDate} />

          <section className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <h2 className="text-body font-bold leading-[1.2] text-neutral-950">Voucher</h2>
              <p className="text-caption text-neutral-500">Add voucher code</p>
            </div>
            <SelectRow
              icon={voucher ? "check" : "promo"}
              tone={voucher ? "success" : "default"}
              placeholder="Add Voucher Code"
              onClick={() => setModal("voucher")}
            >
              {voucher && (
                <>
                  <span className="font-medium text-success-600">Promo Code Applied!</span>
                  <span>{voucher.title}</span>
                </>
              )}
            </SelectRow>
          </section>

          <PackagePriceCard
            totals={totals}
            voucherPercent={voucher?.percent}
            onAction={() => setModal("confirm")}
          />
        </div>

        <VoucherModal
        open={modal === "voucher"}
        value={voucher}
        onClose={close}
        onSave={(next) => {
          onVoucherChange(next);
          close();
        }}
      />
      <BookingModal
        open={modal === "confirm"}
        onClose={close}
        centered
        title="Are your booking details correct?"
        description="You will not be able to change your booking details once you proceed to payment. Do you want to proceed?"
        className="max-w-[340px]"
        footer={
          <>
            <Button
              fullWidth
              onClick={() => {
                close();
                onContinue();
              }}
            >
              Continue
            </Button>
            <Button fullWidth hierarchy="secondary-filled" onClick={close}>
              Check Again
            </Button>
          </>
        }
      />
      </Container>
    </div>
  );
}
