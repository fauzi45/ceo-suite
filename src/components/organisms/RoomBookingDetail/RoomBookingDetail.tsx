"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useCopy } from "@/lib/use-copy";
import type { BookingDetailRow, BookingStatus, RoomBookingDetailData } from "@/data/my-bookings";
import { Button } from "@/components/atoms/Button/Button";
import { RoomTypeChip } from "@/components/atoms/Chip/Chip";
import { Container } from "@/components/atoms/Container/Container";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Photo } from "@/components/atoms/Photo/Photo";

export interface RoomBookingDetailProps {
  booking: RoomBookingDetailData;
  onBack?: () => void;
  className?: string;
}

const STATUS_STYLES: Record<BookingStatus, string> = {
  expired: "bg-primary-50 text-primary-800",
  waiting: "bg-warning-50 text-warning-500",
  success: "bg-success-50 text-success-700",
  completed: "bg-neutral-50 text-neutral-600",
};

function Card({ title, children, className }: { title?: string; children: ReactNode; className?: string }) {
  return (
    <section className={cn("flex flex-col gap-3 rounded-lg bg-white p-4 shadow-input ring-1 ring-neutral-100", className)}>
      {title && <h2 className="text-body font-bold leading-[1.2] text-neutral-950">{title}</h2>}
      {children}
    </section>
  );
}

function Rows({ rows, muted }: { rows: BookingDetailRow[]; muted?: boolean }) {
  return (
    <dl className="flex flex-col gap-2 text-caption">
      {rows.map(({ label, value }) => (
        <div key={label} className="flex items-baseline justify-between gap-4">
          <dt className={muted ? "text-neutral-500" : "text-neutral-500"}>{label}</dt>
          <dd className="text-right font-medium text-neutral-950">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Foto ruangan satu per satu dengan panah kiri/kanan dan titik penanda. */
function Carousel({ photos, alt }: { photos: string[]; alt: string }) {
  const [index, setIndex] = useState(0);
  const go = (next: number) => setIndex((next + photos.length) % photos.length);

  return (
    <div className="relative">
      <Photo src={photos[index]} alt={alt} priority sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[2.2/1] w-full rounded-t-lg" />
      {photos.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={() => go(index - 1)}
            className="absolute left-3 top-1/2 inline-flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-neutral-900 shadow-input outline-none hover:bg-neutral-50 focus-visible:ring-4 focus-visible:ring-primary-100"
          >
            <Icon name="chevron-left" size={16} />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={() => go(index + 1)}
            className="absolute right-3 top-1/2 inline-flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-neutral-900 shadow-input outline-none hover:bg-neutral-50 focus-visible:ring-4 focus-visible:ring-primary-100"
          >
            <Icon name="chevron-right" size={16} />
          </button>
          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5" aria-hidden="true">
            {photos.map((photo, i) => (
              <span key={photo} className={cn("size-1.5 rounded-full", i === index ? "bg-white" : "bg-white/50")} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Halaman "Booking Details" booking ruangan: galeri + info, Add On Info, Payment Info di kiri; Booking Summary
 * di kanan; lalu tombol "Share Booking Details" (bagikan / salin tautan) dan "Print Booking".
 */
export function RoomBookingDetail({ booking, onBack, className }: RoomBookingDetailProps) {
  const { copied, copy } = useCopy();

  const share = () => {
    const url = window.location.href;
    if (navigator.share) navigator.share({ title: `Booking ${booking.invoice}`, url }).catch(() => {});
    else void copy(url);
  };

  return (
    <Container className={cn("flex flex-col gap-6 py-8 md:py-12", className)}>
      <div className="flex flex-col gap-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex w-fit cursor-pointer items-center gap-2 text-caption font-medium text-primary-800 outline-none hover:text-primary-600 focus-visible:ring-4 focus-visible:ring-primary-100"
        >
          <Icon name="arrow-left" size={16} />
          back to My Booking
        </button>
        <h1 className="text-heading-sm font-bold leading-[1.2] text-neutral-950 md:text-heading-md">Booking Details</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_420px] lg:items-start">
        <div className="flex min-w-0 flex-col gap-6">
          <section className="overflow-hidden rounded-lg bg-white shadow-input ring-1 ring-neutral-100">
            <Carousel photos={booking.gallery} alt={booking.roomName} />
            <div className="flex flex-col gap-3 p-4">
              <dl className="flex flex-col gap-2 text-caption">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-neutral-500">Booking Invoice</dt>
                  <dd className="font-medium text-neutral-950">{booking.invoice}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-neutral-500">Booking Status</dt>
                  <dd className={cn("rounded-full px-2 py-0.5 text-tiny font-medium", STATUS_STYLES[booking.status])}>
                    {booking.statusLabel}
                  </dd>
                </div>
              </dl>
              <div className="flex flex-col gap-2 border-t border-neutral-100 pt-3">
                <h2 className="text-heading-sm font-bold leading-[1.2] text-neutral-950">{booking.roomName}</h2>
                <RoomTypeChip roomType={booking.roomType} className="self-start" />
              </div>
              <div className="flex flex-col gap-0.5 border-t border-neutral-100 pt-3 text-caption">
                <span className="text-tiny text-neutral-400">Customer</span>
                <span className="font-medium text-neutral-950">{booking.customer}</span>
              </div>
              {booking.description && (
                <div className="flex flex-col gap-0.5 border-t border-neutral-100 pt-3 text-caption">
                  <span className="text-tiny text-neutral-400">Description</span>
                  <span className="font-medium text-neutral-950">{booking.description}</span>
                </div>
              )}
              <div className="border-t border-neutral-100 pt-3">
                <Rows rows={booking.info} />
              </div>
            </div>
          </section>

          <Card title="Add On Info">
            <Rows rows={booking.addOns} />
            <div className="flex items-baseline justify-between gap-4 border-t border-neutral-100 pt-3 text-caption">
              <span className="text-neutral-500">Total Price</span>
              <span className="font-bold text-neutral-950">{booking.addOnTotal}</span>
            </div>
          </Card>

          <Card title="Payment Info">
            <Rows rows={booking.payment} />
          </Card>

          <div className="flex flex-wrap gap-3">
            <Button size="mobile" iconLeft={copied ? "check" : "share"} onClick={share}>
              {copied ? "Link copied" : "Share Booking Details"}
            </Button>
            <Button size="mobile" hierarchy="secondary-outline" iconLeft="print" onClick={() => window.print()}>
              Print Booking
            </Button>
          </div>
        </div>

        <Card title="Booking Summary" className="lg:sticky lg:top-4">
          <Rows rows={booking.summary} />
          <div className="flex items-baseline justify-between gap-4 border-t border-neutral-100 pt-3">
            <span className="text-caption font-medium text-neutral-900">Final Price</span>
            <span className="text-body font-bold text-primary-800">{booking.finalPrice}</span>
          </div>
        </Card>
      </div>
    </Container>
  );
}
