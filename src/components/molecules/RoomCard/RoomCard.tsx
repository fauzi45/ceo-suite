"use client";

import { cn } from "@/lib/cn";
import { activateProps, useNavigate } from "@/lib/use-navigate";
import type { RoomListing } from "@/data/landing";
import { RoomTypeChip } from "@/components/atoms/Chip/Chip";
import { Photo } from "@/components/atoms/Photo/Photo";

export interface RoomCardProps {
  room: RoomListing;
  className?: string;
}

/** Kartu ruangan: foto, nama, tipe, kapasitas, harga utama (dengan harga coret opsional) dan harga periode lain. */
export function RoomCard({ room, className }: RoomCardProps) {
  const navigate = useNavigate();

  return (
    <article
      {...activateProps(() => navigate(`/product/${room.id}`))}
      className={cn(
        "relative flex flex-col gap-3 rounded-lg bg-white p-3 shadow-input ring-1 ring-neutral-100 outline-none",
        "group cursor-pointer transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-popover",
        "focus-visible:ring-4 focus-visible:ring-primary-100",
        className,
      )}
    >
      <Photo
        src={room.image}
        alt={room.name}
        sizes="(min-width: 1280px) 20vw, (min-width: 640px) 45vw, 90vw"
        hoverZoom
        className="aspect-[356/192] rounded-md"
      />
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-body font-bold leading-[1.2] text-neutral-950">{room.name}</h3>
          <span className="shrink-0 text-caption text-neutral-500">{room.people} People</span>
        </div>
        <RoomTypeChip roomType={room.roomType} className="self-start" />
        <div className="flex flex-col gap-0.5">
          <span className="text-caption font-medium text-primary-800">{room.period}</span>
          {room.originalPrice && (
            <span className="text-tiny text-neutral-400 line-through">{room.originalPrice}</span>
          )}
          <span className="text-heading-sm font-bold leading-[1.2] text-primary-800">{room.price}</span>
          <span className="text-tiny text-neutral-400">{room.secondaryPrice}</span>
        </div>
      </div>
    </article>
  );
}
