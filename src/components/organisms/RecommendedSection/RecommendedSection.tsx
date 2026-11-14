"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { RECOMMENDED_ROOMS, type RoomListing } from "@/data/landing";
import { Icon, type IconName } from "@/components/atoms/Icon/Icon";
import { ROOM_TYPE_ICONS, ROOM_TYPE_LABELS, type RoomType } from "@/components/atoms/Chip/Chip";
import { Container } from "@/components/atoms/Container/Container";
import { RoomCard } from "@/components/molecules/RoomCard/RoomCard";
import { SectionHeader } from "@/components/molecules/SectionHeader/SectionHeader";

export interface RecommendedSectionProps {
  rooms?: RoomListing[];
  onFilter?: () => void;
  className?: string;
}

type FilterValue = "all" | RoomType;

/** Urutan dan isi tab mengikuti "Office type" di Figma (System Design). */
const FILTER_TYPES: RoomType[] = [
  "meeting",
  "office",
  "coworking",
  "board",
  "class",
  "seminar",
  "theatre",
  "combined",
];

const FILTER_OPTIONS: { value: FilterValue; label: string; icon: IconName }[] = [
  { value: "all", label: "All Spaces", icon: "room-all" },
  ...FILTER_TYPES.map((type) => ({
    value: type,
    label: ROOM_TYPE_LABELS[type],
    icon: ROOM_TYPE_ICONS[type],
  })),
];

/**
 * "Recommended For You": tombol Filter membuka deretan tab tipe ruangan (ikon di atas label, tab aktif
 * merah dengan garis bawah, seperti "Office type" di Figma) lalu grid kartu ruangan (1 / 2 / 4 kolom).
 */
export function RecommendedSection({
  rooms = RECOMMENDED_ROOMS,
  onFilter,
  className,
}: RecommendedSectionProps) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [filter, setFilter] = useState<FilterValue>("all");

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
          <div
            role="tablist"
            aria-label="Filter by office type"
            className="-mt-2 flex overflow-x-auto border-b border-neutral-100"
          >
            {FILTER_OPTIONS.map((option) => {
              const active = option.value === filter;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(option.value)}
                  className={cn(
                    "flex shrink-0 cursor-pointer flex-col items-center gap-2 border-b-2 px-4 pb-3 pt-2 text-caption font-medium leading-[1.2] whitespace-nowrap outline-none transition-colors",
                    "focus-visible:ring-4 focus-visible:ring-primary-100 md:px-6 md:text-body",
                    active
                      ? "border-primary-800 text-primary-800"
                      : "border-transparent text-neutral-400 hover:text-neutral-600",
                  )}
                >
                  <Icon name={option.icon} size={28} />
                  {option.label}
                </button>
              );
            })}
          </div>
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
