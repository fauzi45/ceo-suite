import { cn } from "@/lib/cn";
import { formatLongDate } from "@/lib/format-date";
import type { RoomListing } from "@/data/landing";
import { RoomTypeChip } from "@/components/atoms/Chip/Chip";
import { Icon, type IconName } from "@/components/atoms/Icon/Icon";
import { Photo } from "@/components/atoms/Photo/Photo";
import type { TimeRange } from "@/components/organisms/TimePicker/TimePicker";

export interface BookingRoomCardProps {
  room: RoomListing;
  date: Date;
  time: TimeRange;
  className?: string;
}

function Meta({ icon, children }: { icon: IconName; children: string }) {
  return (
    <span className="flex items-center gap-1.5 text-caption text-neutral-500">
      <Icon name={icon} size={16} />
      {children}
    </span>
  );
}

/** Kartu ringkas ruangan di halaman booking: foto, nama, tipe, kapasitas, tanggal, dan jam. */
export function BookingRoomCard({ room, date, time, className }: BookingRoomCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-lg bg-white p-4 shadow-input ring-1 ring-neutral-100 sm:flex-row",
        className,
      )}
    >
      <Photo
        src={room.image}
        alt={room.name}
        sizes="(min-width: 640px) 160px, 90vw"
        className="aspect-[119/95] w-full shrink-0 rounded-md sm:w-40"
      />
      <div className="flex min-w-0 flex-col justify-between gap-3">
        <div className="flex flex-col gap-2">
          <h2 className="text-body font-bold leading-[1.2] text-neutral-950 md:text-heading-sm">{room.name}</h2>
          <RoomTypeChip roomType={room.roomType} className="self-start" />
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <Meta icon="customers">{`${room.people} People`}</Meta>
          <Meta icon="calendar">{formatLongDate(date)}</Meta>
          <Meta icon="clock">{`${time.start} - ${time.end}`}</Meta>
        </div>
      </div>
    </div>
  );
}
