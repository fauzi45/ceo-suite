"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { summarizeBooking, type BookingRecord, type BookingSummary } from "@/data/my-bookings";
import { BookingListCard } from "@/components/molecules/BookingListCard/BookingListCard";
import { BookingTabs } from "@/components/molecules/BookingTabs/BookingTabs";
import { EmptyBookings } from "@/components/molecules/EmptyBookings/EmptyBookings";

export interface MyBookingListProps {
  bookings: BookingRecord[];
  onOpen?: (id: string) => void;
  onBook?: () => void;
  className?: string;
}

const TABS = [
  { id: "active", label: "Active" },
  { id: "history", label: "History" },
] as const;

type TabId = (typeof TABS)[number]["id"];

/** Isi halaman My Bookings: tab Active / History, lalu kartu booking (atau keadaan kosong) selebar 784 di tengah. */
export function MyBookingList({ bookings, onOpen, onBook, className }: MyBookingListProps) {
  const [tab, setTab] = useState<TabId>("active");

  const summaries = bookings
    .map(summarizeBooking)
    .filter((summary): summary is BookingSummary => Boolean(summary))
    .filter((summary) => (tab === "history") === (summary.status === "completed"));

  return (
    <section className={cn("mx-auto flex w-full max-w-[784px] flex-col gap-6", className)}>
      <BookingTabs tabs={[...TABS]} value={tab} onChange={setTab} />
      {summaries.length > 0 ? (
        <div className="flex flex-col gap-6">
          {summaries.map((summary) => (
            <BookingListCard key={summary.id} booking={summary} onOpen={() => onOpen?.(summary.id)} />
          ))}
        </div>
      ) : (
        <EmptyBookings onBook={onBook} />
      )}
    </section>
  );
}
