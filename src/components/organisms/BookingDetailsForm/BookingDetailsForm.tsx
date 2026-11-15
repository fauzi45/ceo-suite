"use client";

import { useMemo, useState, type ReactNode } from "react";
import { BOOKING_ADD_ONS, computeBookingTotals, type AddOnSelection, type Voucher } from "@/data/booking";
import type { ProductDetail } from "@/data/product";
import { Button } from "@/components/atoms/Button/Button";
import { Container } from "@/components/atoms/Container/Container";
import { BackHeader } from "@/components/molecules/BackHeader/BackHeader";
import { BookingPriceCard } from "@/components/molecules/BookingPriceCard/BookingPriceCard";
import { BookingRoomCard } from "@/components/molecules/BookingRoomCard/BookingRoomCard";
import { SelectRow } from "@/components/molecules/SelectRow/SelectRow";
import { AddOnsModal } from "@/components/organisms/AddOnsModal/AddOnsModal";
import { BookingModal } from "@/components/organisms/BookingModal/BookingModal";
import { VoucherModal } from "@/components/organisms/VoucherModal/VoucherModal";
import type { TimeRange } from "@/components/organisms/TimePicker/TimePicker";

export interface BookingDetailsFormProps {
  product: ProductDetail;
  date: Date;
  time: TimeRange;
  request: string;
  onRequestChange: (value: string) => void;
  addOns: AddOnSelection;
  onAddOnsChange: (value: AddOnSelection) => void;
  voucher: Voucher | null;
  onVoucherChange: (value: Voucher | null) => void;
  onBack: () => void;
  /** Dipanggil setelah pengguna menjawab "Continue" di dialog konfirmasi. */
  onContinue: () => void;
}

function Block({ title, subtitle, children }: { title: ReactNode; subtitle?: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h2 className="text-body font-bold leading-[1.2] text-neutral-950">{title}</h2>
        {subtitle && <p className="text-caption text-neutral-500">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

/**
 * Halaman "Fill Booking Details": kartu ruangan, permintaan tambahan, add-on, dan voucher di kiri;
 * Price Summary di kanan (kolom 1012 + 525, jarak 64 seperti Figma). "Continue to Payment" membuka dialog konfirmasi.
 */
export function BookingDetailsForm({
  product,
  date,
  time,
  request,
  onRequestChange,
  addOns,
  onAddOnsChange,
  voucher,
  onVoucherChange,
  onBack,
  onContinue,
}: BookingDetailsFormProps) {
  const [modal, setModal] = useState<"add-ons" | "voucher" | "confirm" | null>(null);
  const totals = useMemo(
    () => computeBookingTotals(product, time, addOns, voucher),
    [product, time, addOns, voucher],
  );
  const selectedAddOns = BOOKING_ADD_ONS.filter((addOn) => addOns[addOn.id]);
  const close = () => setModal(null);

  return (
    <Container className="flex flex-col gap-8 py-8 md:py-12">
      <BackHeader title="Fill Booking Details" onBack={onBack} />

      <div className="grid gap-8 lg:grid-cols-[1012fr_525fr] lg:items-start lg:gap-x-16">
        <div className="flex min-w-0 flex-col gap-8">
          <BookingRoomCard room={product.room} date={date} time={time} />

          <Block title={<>Additional Request <span className="font-normal text-neutral-500">(Optional)</span></>}>
            <textarea
              aria-label="Additional request"
              value={request}
              onChange={(event) => onRequestChange(event.target.value)}
              placeholder="Let us know if you need anything extra!"
              rows={4}
              className="w-full resize-none rounded-md border border-neutral-100 bg-white px-3 py-2 text-caption text-neutral-900 shadow-input outline-none transition-[border-color,box-shadow] placeholder:text-neutral-400 focus:border-focus-border focus:ring-4 focus:ring-focus-ring"
            />
          </Block>

          <Block title="Add Ons" subtitle="Enhance your booking experience with a variety of add-ons.">
            <SelectRow icon="add-ons" placeholder="Select add ons" onClick={() => setModal("add-ons")}>
              {selectedAddOns.length > 0 && (
                <>
                  <span className="font-medium text-primary-800">{selectedAddOns.length} Selected</span>
                  {selectedAddOns.map((addOn) => (
                    <span key={addOn.id}>{addOns[addOn.id] > 1 ? `${addOn.name} x${addOns[addOn.id]}` : addOn.name}</span>
                  ))}
                </>
              )}
            </SelectRow>
          </Block>

          <Block title="Voucher" subtitle="Add voucher code">
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
          </Block>
        </div>

        <BookingPriceCard
          totals={totals}
          voucherPercent={voucher?.percent}
          onAction={() => setModal("confirm")}
          className="lg:sticky lg:top-4"
        />
      </div>

      <AddOnsModal
        open={modal === "add-ons"}
        value={addOns}
        onClose={close}
        onSave={(next) => {
          onAddOnsChange(next);
          close();
        }}
      />
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
  );
}
