"use client";

import { useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { formatLongDate } from "@/lib/format-date";
import { useOutsideClick } from "@/lib/use-outside-click";
import {
  PACKAGES,
  PACKAGES_BROWSE,
  PACKAGES_PAGE_SIZE,
  PACKAGE_CITY_OPTIONS,
  filterPackages,
  getPackageRegions,
  type MeetingPackage,
} from "@/data/packages";
import { Button } from "@/components/atoms/Button/Button";
import { Container } from "@/components/atoms/Container/Container";
import { Icon } from "@/components/atoms/Icon/Icon";
import { PackageCard } from "@/components/molecules/PackageCard/PackageCard";
import { Pagination } from "@/components/molecules/Pagination/Pagination";
import { SearchFieldFrame } from "@/components/molecules/SearchFieldFrame/SearchFieldFrame";
import { SelectDropdown } from "@/components/molecules/SelectDropdown/SelectDropdown";
import { DatePicker } from "@/components/organisms/DatePicker/DatePicker";

export interface PackageBrowseSectionProps {
  id?: string;
  packages?: MeetingPackage[];
  /** Dipanggil saat "Book Now" ditekan; `startDate` null bila tanggal mulai belum dipilih. */
  onBook?: (item: MeetingPackage, startDate: Date | null) => void;
  className?: string;
}

/**
 * "Browse Meeting Room Package": filter kota, wilayah, dan tanggal mulai; pencarian; grid kartu 3 kolom
 * dengan paginasi. Kota, wilayah, dan pencarian menyaring daftar; tombol Filter hanya tampilan.
 */
export function PackageBrowseSection({ id, packages = PACKAGES, onBook, className }: PackageBrowseSectionProps) {
  const cityId = useId();
  const regionId = useId();
  const dateId = useId();
  const [city, setCity] = useState(PACKAGE_CITY_OPTIONS[0]);
  const [region, setRegion] = useState("All");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pickerOpen, setPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  useOutsideClick(pickerRef, () => setPickerOpen(false), pickerOpen);

  const regions = getPackageRegions(city);
  const filtered = filterPackages(packages, { city, region, query });
  const pageCount = Math.max(1, Math.ceil(filtered.length / PACKAGES_PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const visible = filtered.slice((current - 1) * PACKAGES_PAGE_SIZE, current * PACKAGES_PAGE_SIZE);

  return (
    <section id={id} className={cn("scroll-mt-4 py-12 md:py-16", className)}>
      <Container className="flex flex-col gap-8 md:gap-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <span aria-hidden="true" className="h-1.5 w-14 rounded-full bg-primary-800" />
          <h2 className="text-heading-md font-bold leading-[1.2] text-neutral-950 md:text-heading-lg">
            {PACKAGES_BROWSE.title}
          </h2>
          <p className="text-caption text-neutral-500 md:text-body">{PACKAGES_BROWSE.description}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          <SearchFieldFrame label="Select City" icon="map-pin" htmlFor={cityId}>
            <SelectDropdown
              id={cityId}
              label="Select City"
              options={PACKAGE_CITY_OPTIONS}
              value={city}
              onChange={(value) => {
                setCity(value);
                setRegion("All");
                setPage(1);
              }}
            />
          </SearchFieldFrame>
          <SearchFieldFrame label="Select Region" icon="map-pin" htmlFor={regionId}>
            <SelectDropdown
              id={regionId}
              label="Select Region"
              options={regions}
              value={region}
              onChange={(value) => {
                setRegion(value);
                setPage(1);
              }}
            />
          </SearchFieldFrame>
          <SearchFieldFrame label="Select Starting Date" icon="calendar" htmlFor={dateId}>
            <div ref={pickerRef} className="min-w-0 flex-1">
              <button
                id={dateId}
                type="button"
                aria-haspopup="dialog"
                aria-expanded={pickerOpen}
                onClick={() => setPickerOpen((v) => !v)}
                className={cn("w-full cursor-pointer truncate text-left outline-none", !startDate && "text-neutral-400")}
              >
                {startDate ? formatLongDate(startDate) : "Select date"}
              </button>
              {pickerOpen && (
                <div className="absolute left-0 top-full z-30 mt-2 max-w-[calc(100vw-2rem)] overflow-x-auto rounded-lg">
                  <DatePicker
                    single
                    value={{ start: startDate, end: null }}
                    onChange={({ start }) => setStartDate(start)}
                    onConfirm={() => setPickerOpen(false)}
                  />
                </div>
              )}
            </div>
          </SearchFieldFrame>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-body font-bold leading-[1.2] text-neutral-950 md:text-heading-sm">Available Packages</h3>
            <Button hierarchy="secondary-white" size="mobile" iconLeft="filter">
              Filter
            </Button>
          </div>
          <label className="flex h-10 w-full max-w-md items-center gap-2 rounded-lg border border-neutral-100 bg-white px-3 focus-within:border-focus-border focus-within:ring-4 focus-within:ring-focus-ring">
            <Icon name="search" size={20} className="shrink-0 text-neutral-500" />
            <input
              type="search"
              value={query}
              placeholder="Search for Meeting Room Package…"
              aria-label="Search for Meeting Room Package"
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              className="min-w-0 flex-1 bg-transparent text-caption text-neutral-900 outline-none placeholder:text-neutral-400"
            />
          </label>
        </div>

        {visible.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((item) => (
              <PackageCard key={item.id} item={item} onBook={() => onBook?.(item, startDate)} />
            ))}
          </div>
        ) : (
          <p className="py-10 text-center text-caption text-neutral-500">No packages match your search.</p>
        )}

        <Pagination page={current} pageCount={pageCount} onPageChange={setPage} />
      </Container>
    </section>
  );
}
