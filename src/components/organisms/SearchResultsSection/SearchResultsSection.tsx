"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import { CITY_CENTERS, SEARCH_ROOMS, type RoomListing } from "@/data/landing";
import { buildSearchHref } from "@/lib/search-params";
import { Button } from "@/components/atoms/Button/Button";
import { RoomCard } from "@/components/molecules/RoomCard/RoomCard";
import { SectionHeader } from "@/components/molecules/SectionHeader/SectionHeader";
import { OfficeTypeTabs } from "@/components/organisms/OfficeTypeTabs/OfficeTypeTabs";
import { SpaceMap } from "@/components/organisms/SpaceMap/SpaceMap";
import { SpaceSearchForm, type SearchCriteria } from "@/components/organisms/SpaceSearchForm/SpaceSearchForm";

export interface SearchResultsSectionProps {
  rooms?: RoomListing[];
  /** Kriteria awal (biasanya dibaca dari URL). */
  initialCriteria: SearchCriteria;
  className?: string;
}

const PAGE_SIZE = 6;

/**
 * Isi halaman Search Results (Figma): form filter (kota, wilayah, tipe, tanggal), "All Spaces" dengan tombol
 * Filter (tab tipe ruangan), grid kartu 3 kolom + See More, dan peta di kanan yang menyorot kartu yang di-hover.
 * Hasil memakai data contoh; filter tanggal belum berpengaruh karena belum ada data ketersediaan.
 */
export function SearchResultsSection({
  rooms = SEARCH_ROOMS,
  initialCriteria,
  className,
}: SearchResultsSectionProps) {
  const [criteria, setCriteria] = useState(initialCriteria);
  const [tab, setTab] = useState("all");
  const [tabsOpen, setTabsOpen] = useState(false);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [activeId, setActiveId] = useState<string | null>(null);

  const results = useMemo(
    () =>
      rooms.filter(
        (room) =>
          room.city === criteria.location &&
          (!criteria.region || criteria.region === "All" || room.region === criteria.region) &&
          (criteria.spaceTypes.length === 0 || criteria.spaceTypes.includes(room.roomType)) &&
          (tab === "all" || room.roomType === tab),
      ),
    [rooms, criteria, tab],
  );
  const shown = results.slice(0, visible);

  const handleCriteria = (next: SearchCriteria) => {
    setCriteria(next);
    setVisible(PAGE_SIZE);
    // Jaga URL tetap bisa dibagikan tanpa memuat ulang halaman.
    window.history.replaceState(null, "", buildSearchHref(next));
  };

  const selectOnMap = (id: string) => {
    setActiveId(id);
    document.getElementById(`room-${id}`)?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  };

  return (
    <section className={cn("py-8 md:py-12", className)}>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
        <div className="flex min-w-0 flex-1 flex-col gap-8 px-4 sm:px-8 xl:pl-40">
          <div className="flex flex-col gap-6">
            <h1 className="text-heading-md font-bold leading-[1.2] text-neutral-950 md:text-heading-lg">
              Search Results
            </h1>
            <SpaceSearchForm variant="inline" defaultCriteria={criteria} onChange={handleCriteria} />
          </div>

          <div className="flex flex-col gap-6">
            <SectionHeader
              title="All Spaces"
              subtitle="Explore top-rated meeting rooms and workspaces."
              actionLabel="Filter"
              actionIcon="filter"
              actionHierarchy="secondary-white"
              onAction={() => setTabsOpen((open) => !open)}
            />
            {tabsOpen && (
              <OfficeTypeTabs
                value={tab}
                onChange={(id) => {
                  setTab(id);
                  setVisible(PAGE_SIZE);
                }}
              />
            )}

            {shown.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-3">
                {shown.map((room) => (
                  <div
                    key={room.id}
                    id={`room-${room.id}`}
                    onMouseEnter={() => setActiveId(room.id)}
                    onMouseLeave={() => setActiveId(null)}
                  >
                    <RoomCard room={room} className={cn("h-full", activeId === room.id && "ring-primary-600")} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="rounded-lg bg-neutral-50 py-12 text-center text-body text-neutral-500">
                No spaces match your search. Try another city, region, or space type.
              </p>
            )}

            {visible < results.length && (
              <Button className="self-center" onClick={() => setVisible((count) => count + PAGE_SIZE)}>
                See More
              </Button>
            )}
          </div>
        </div>

        <div className="w-full px-4 sm:px-8 lg:w-[34%] lg:shrink-0 lg:p-0">
          <SpaceMap
            rooms={results}
            activeId={activeId}
            onSelect={selectOnMap}
            center={CITY_CENTERS[criteria.location]}
            className="h-80 rounded-lg lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)] lg:min-h-[480px] lg:rounded-none"
          />
        </div>
      </div>
    </section>
  );
}
