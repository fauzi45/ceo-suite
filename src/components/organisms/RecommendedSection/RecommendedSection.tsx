"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { RECOMMENDED_ROOMS, type RoomListing } from "@/data/landing";
import { ROOM_TYPE_ICONS, ROOM_TYPE_LABELS, type RoomType } from "@/components/atoms/Chip/Chip";
import { Container } from "@/components/atoms/Container/Container";
import { RoomCard } from "@/components/molecules/RoomCard/RoomCard";
import { SectionHeader } from "@/components/molecules/SectionHeader/SectionHeader";
import {
  OFFICE_TYPE_TABS,
  OfficeTypeTabs,
  type OfficeTypeTabEntry,
} from "@/components/organisms/OfficeTypeTabs/OfficeTypeTabs";

export interface RecommendedSectionProps {
  rooms?: RoomListing[];
  onFilter?: () => void;
  className?: string;
}

/** Tab "Office type" dengan label lengkap tipe ruangan (mis. "Combined Boardroom Meeting Room"). */
const RECOMMENDED_TABS: OfficeTypeTabEntry[] = [
  OFFICE_TYPE_TABS[0],
  ...(
    ["meeting", "office", "coworking", "board", "class", "seminar", "theatre", "combined"] as RoomType[]
  ).map((type) => ({ id: type, label: ROOM_TYPE_LABELS[type], icon: ROOM_TYPE_ICONS[type] })),
];

/**
 * "Recommended For You": tombol Filter membuka deretan tab tipe ruangan (ikon di atas label, tab aktif
 * merah dengan garis bawah, memakai `OfficeTypeTabs`) lalu grid kartu ruangan (1 / 2 / 4 kolom).
 */
export function RecommendedSection({
  rooms = RECOMMENDED_ROOMS,
  onFilter,
  className,
}: RecommendedSectionProps) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  const visibleRooms = filter === "all" ? rooms : rooms.filter((room) => room.roomType === filter);

  return (
    <section className={cn("py-10 md:py-16", className)}>
      <Container className="flex flex-col gap-6 md:gap-8">
        <SectionHeader
          title="Recommended For You"
          subtitle="Explore top-rated meeting rooms and workspaces."
          actionLabel="Filter"
          actionIcon="filter"
          actionHierarchy="secondary-white"
          onAction={() => {
            setFilterOpen((open) => !open);
            onFilter?.();
          }}
        />

        {filterOpen && (
          <OfficeTypeTabs tabs={RECOMMENDED_TABS} value={filter} onChange={setFilter} className="-mt-2" />
        )}

        {visibleRooms.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
            {visibleRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        ) : (
          <p className="rounded-lg bg-neutral-50 py-12 text-center text-body text-neutral-500">
            No {ROOM_TYPE_LABELS[filter as RoomType]} available right now.
          </p>
        )}
      </Container>
    </section>
  );
}
