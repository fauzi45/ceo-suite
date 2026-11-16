"use client";

import { cn } from "@/lib/cn";
import { BOOKING_STATUS_LABELS, type BookingStatus, type BookingSummary } from "@/data/my-bookings";
import { activateProps } from "@/lib/use-navigate";
import { Icon } from "@/components/atoms/Icon/Icon";

export interface BookingListCardProps {
  booking: BookingSummary;
  onOpen?: () => void;
  className?: string;
}

const STATUS_STYLES: Record<BookingStatus, string> = {
  expired: "bg-primary-50 text-primary-800",
  waiting: "bg-warning-50 text-warning-500",
  success: "bg-success-50 text-success-700",
  completed: "bg-neutral-50 text-neutral-600",
};

/** Kartu booking di daftar: baris status berwarna, ruang + tipe, jadwal, "Total Price", dan panah ke detail. */
export function BookingListCard({ booking, onOpen, className }: BookingListCardProps) {
  return (
    <article
      {...activateProps(() => onOpen?.())}
      className={cn(
        "cursor-pointer overflow-hidden rounded-lg bg-white shadow-popover outline-none transition-shadow hover:shadow-modal focus-visible:ring-4 focus-visible:ring-primary-100",
        className,
      )}
    >
      <p className={cn("px-4 py-2 text-caption font-medium", STATUS_STYLES[booking.status])}>
        {BOOKING_STATUS_LABELS[booking.status]}
      </p>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <Icon name="office-building" size={24} className="mt-0.5 text-room-office-fg" />
            <div className="flex flex-col gap-0.5">
              <h3 className="text-body font-bold leading-[1.2] text-neutral-950">{booking.title}</h3>
              <span className="text-caption text-neutral-500">{booking.subtitle}</span>
            </div>
          </div>
          <Icon name="chevron-right" size={20} className="shrink-0 text-primary-800" />
        </div>
        <p className="text-caption text-neutral-600">{booking.schedule}</p>
        <div className="flex flex-col gap-0.5">
          <span className="text-caption text-neutral-500">Total Price</span>
          <span className="text-body font-bold text-primary-800">{booking.total}</span>
        </div>
      </div>
    </article>
  );
}
