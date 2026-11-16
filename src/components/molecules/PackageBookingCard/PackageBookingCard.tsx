import { cn } from "@/lib/cn";
import { formatLongDate } from "@/lib/format-date";
import type { MeetingPackage } from "@/data/packages";
import { Icon } from "@/components/atoms/Icon/Icon";

export interface PackageBookingCardProps {
  item: MeetingPackage;
  startDate: Date;
  className?: string;
}

/** Kartu ringkas paket di halaman booking: nama, akses, kapasitas, lalu tanggal mulai. */
export function PackageBookingCard({ item, startDate, className }: PackageBookingCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-lg bg-white p-4 shadow-input ring-1 ring-neutral-100 md:p-6",
        className,
      )}
    >
      <div className="flex flex-col gap-2 border-b border-neutral-100 pb-4">
        <h2 className="text-body font-bold leading-[1.2] text-neutral-950 md:text-heading-sm">{item.name}</h2>
        <p className="text-caption text-neutral-500">{item.access}</p>
        <span className="flex items-center gap-1.5 text-caption text-neutral-500">
          <Icon name="customers" size={16} />
          {item.capacity}
        </span>
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="text-tiny text-neutral-500">Starting Date:</span>
        <span className="flex items-center gap-2 text-caption font-medium text-neutral-950">
          <Icon name="calendar" size={16} className="text-neutral-500" />
          {formatLongDate(startDate)}
        </span>
      </div>
    </div>
  );
}
