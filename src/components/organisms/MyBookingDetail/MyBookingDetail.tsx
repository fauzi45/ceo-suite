import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { MyBookingDetail as MyBookingData, MyBookingRow } from "@/data/my-booking";
import { StatusChip } from "@/components/atoms/Chip/Chip";
import { Container } from "@/components/atoms/Container/Container";
import { Icon } from "@/components/atoms/Icon/Icon";

export interface MyBookingDetailProps {
  booking: MyBookingData;
  onBack?: () => void;
  className?: string;
}

function Card({ title, children, className }: { title?: string; children: ReactNode; className?: string }) {
  return (
    <section
      className={cn("flex flex-col gap-3 rounded-lg bg-white p-4 shadow-input ring-1 ring-neutral-100", className)}
    >
      {title && <h2 className="text-body font-bold leading-[1.2] text-neutral-950">{title}</h2>}
      {children}
    </section>
  );
}

function Rows({ rows }: { rows: MyBookingRow[] }) {
  return (
    <dl className="flex flex-col gap-2 text-caption">
      {rows.map(({ label, value }) => (
        <div key={label} className="flex items-baseline justify-between gap-4">
          <dt className="text-neutral-500">{label}</dt>
          <dd className="text-right font-medium text-neutral-950">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Halaman "Booking Details" (My Booking): info booking, payment, riwayat pemakaian di kiri; Price Details di kanan. */
export function MyBookingDetail({ booking, onBack, className }: MyBookingDetailProps) {
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

      <div className="grid gap-6 lg:grid-cols-[1fr_380px] lg:items-start">
        <div className="flex min-w-0 flex-col gap-6">
          <Card>
            <dl className="flex flex-col gap-2 text-caption">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-neutral-500">Booking Invoice</dt>
                <dd className="font-medium text-neutral-950">{booking.invoice}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-neutral-500">Booking Status</dt>
                <dd>
                  <StatusChip status={booking.status}>Success</StatusChip>
                </dd>
              </div>
            </dl>
            <div className="flex flex-col gap-1 border-t border-neutral-100 pt-3">
              <h2 className="text-body font-bold leading-[1.2] text-neutral-950">{booking.packageName}</h2>
              <p className="text-caption text-neutral-500">{booking.access}</p>
            </div>
            <div className="flex flex-col gap-0.5 text-caption">
              <span className="text-tiny text-neutral-400">Customer</span>
              <span className="font-medium text-neutral-950">{booking.customer}</span>
            </div>
            <div className="border-t border-neutral-100 pt-3">
              <Rows rows={booking.rows} />
            </div>
          </Card>

          <Card title="Payment Info">
            <Rows rows={booking.payment} />
          </Card>

          <Card title="Usage History">
            <ul className="flex flex-col">
              {booking.usage.map((entry, index) => (
                <li
                  key={`${entry.date}-${index}`}
                  className="flex items-center justify-between gap-4 border-b border-neutral-100 py-3 last:border-b-0"
                >
                  <div className="flex flex-col gap-1 text-caption">
                    <span className="flex items-center gap-2 font-medium text-neutral-950">
                      <Icon name="calendar" size={14} className="text-neutral-500" />
                      {entry.date}
                    </span>
                    <span className="text-tiny text-neutral-500">
                      Check-in: {entry.checkIn} · Check-out: {entry.checkOut}
                    </span>
                    <span className="flex items-center gap-1.5 text-tiny text-neutral-500">
                      <Icon name="map-pin" size={14} className="text-primary-800" />
                      {entry.location}
                    </span>
                  </div>
                  <span className="shrink-0 text-caption font-medium text-neutral-950">{entry.duration}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <Card title="Price Details" className="lg:sticky lg:top-4">
          <p className="flex items-baseline justify-between gap-4 text-caption text-neutral-500">
            <span>{`1x ${booking.packageName}`}</span>
          </p>
          <div className="border-t border-neutral-100 pt-3">
            <Rows rows={booking.priceLines} />
          </div>
          <div className="flex items-baseline justify-between gap-4 border-t border-neutral-100 pt-3">
            <span className="text-caption font-medium text-neutral-900">Total Price</span>
            <span className="text-body font-bold text-primary-800">{booking.total}</span>
          </div>
        </Card>
      </div>
    </Container>
  );
}
