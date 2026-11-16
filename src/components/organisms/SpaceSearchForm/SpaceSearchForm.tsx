"use client";

import { useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { formatLongDate } from "@/lib/format-date";
import { useOutsideClick } from "@/lib/use-outside-click";
import { CITY_OPTIONS, REGION_OPTIONS, SPACE_TYPE_OPTIONS } from "@/data/landing";
import { Button } from "@/components/atoms/Button/Button";
import { CheckboxDropdown } from "@/components/molecules/CheckboxDropdown/CheckboxDropdown";
import { SelectDropdown } from "@/components/molecules/SelectDropdown/SelectDropdown";
import { SearchFieldFrame } from "@/components/molecules/SearchFieldFrame/SearchFieldFrame";
import { DatePicker, type DateRange } from "@/components/organisms/DatePicker/DatePicker";

export interface SearchCriteria {
  location: string;
  /** Wilayah dalam kota ("All" = semua). Hanya diisi oleh varian `inline`. */
  region?: string;
  dates: DateRange;
  /** Nilai tipe ruang yang dipilih; kosong = semua. */
  spaceTypes: string[];
}

export interface SpaceSearchFormProps {
  /**
   * `card` = kartu merah muda bertingkat (hero belum login), `bar` = bar putih mendatar (hero login),
   * `inline` = halaman Search Results: ada "Select Region", tanpa tombol Search (hasil ikut berubah saat field diubah).
   */
  variant?: "card" | "bar" | "inline";
  locationLabel?: string;
  locationOptions?: string[];
  /** Nilai awal field (dipakai Search Results untuk memulihkan pilihan dari URL). */
  defaultCriteria?: Partial<SearchCriteria>;
  onSearch?: (criteria: SearchCriteria) => void;
  /** Dipanggil setiap field berubah. */
  onChange?: (criteria: SearchCriteria) => void;
  /** Sembunyikan field "Space Type" (varian `inline`; dipakai halaman kategori yang tipenya sudah tertentu). */
  hideSpaceType?: boolean;
  className?: string;
}

const describeDates = ({ start, end }: DateRange) => {
  if (!start) return "Select date";
  return end ? `${formatLongDate(start)} - ${formatLongDate(end)}` : formatLongDate(start);
};

/**
 * Form pencarian ruang: lokasi/kota, tanggal (rentang), dan tipe ruang, plus tombol Search.
 * Responsif: field bertumpuk di mobile; di `bar` menjadi tiga kolom mulai md.
 */
export function SpaceSearchForm({
  variant = "card",
  locationLabel = "Select City",
  locationOptions = CITY_OPTIONS,
  defaultCriteria,
  onSearch,
  onChange,
  hideSpaceType = false,
  className,
}: SpaceSearchFormProps) {
  const locationId = useId();
  const dateId = useId();
  const [criteria, setCriteria] = useState<SearchCriteria>(() => ({
    location: defaultCriteria?.location ?? locationOptions[0] ?? "",
    region: defaultCriteria?.region ?? "All",
    dates: defaultCriteria?.dates ?? { start: null, end: null },
    spaceTypes: defaultCriteria?.spaceTypes ?? [],
  }));
  const { location, dates, spaceTypes } = criteria;
  const region = criteria.region ?? "All";
  const update = (patch: Partial<SearchCriteria>) => {
    const next = { ...criteria, ...patch };
    setCriteria(next);
    onChange?.(next);
  };
  const [pickerOpen, setPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  useOutsideClick(pickerRef, () => setPickerOpen(false), pickerOpen);

  const isBar = variant === "bar";
  const isInline = variant === "inline";
  const regionId = useId();
  const regionOptions = REGION_OPTIONS[location] ?? ["All"];

  const locationField = (
    <SearchFieldFrame key="location" label={locationLabel} icon="map-pin" htmlFor={locationId}>
      <SelectDropdown
        id={locationId}
        label={locationLabel}
        options={locationOptions}
        value={location}
        onChange={(value) => update({ location: value, region: "All" })}
      />
    </SearchFieldFrame>
  );

  const regionField = (
    <SearchFieldFrame key="region" label="Select Region" icon="map-pin" htmlFor={regionId}>
      <SelectDropdown
        id={regionId}
        label="Select Region"
        options={regionOptions}
        value={regionOptions.includes(region) ? region : "All"}
        onChange={(value) => update({ region: value })}
      />
    </SearchFieldFrame>
  );

  const dateField = (
    <SearchFieldFrame
      key="date"
      label="Select Date"
      icon="calendar"
      htmlFor={dateId}
      className={cn(isInline && "md:col-span-2 md:max-w-md")}
    >
      <div ref={pickerRef} className="min-w-0 flex-1">
        <button
          id={dateId}
          type="button"
          aria-haspopup="dialog"
          aria-expanded={pickerOpen}
          onClick={() => setPickerOpen((v) => !v)}
          className={cn(
            "w-full truncate text-left outline-none",
            !dates.start && "text-neutral-400",
          )}
        >
          {describeDates(dates)}
        </button>
        {pickerOpen && (
          <div
            className={cn(
              "absolute left-0 top-full z-30 mt-2 max-w-[calc(100vw-2rem)] overflow-x-auto rounded-lg",
              isBar && "lg:left-auto lg:right-0",
            )}
          >
            <DatePicker
              value={dates}
              onChange={(value) => update({ dates: value })}
              onConfirm={() => setPickerOpen(false)}
            />
          </div>
        )}
      </div>
    </SearchFieldFrame>
  );

  const typeField = (
    <SearchFieldFrame key="type" label="Space Type" icon="room-all" htmlFor="space-type">
      <CheckboxDropdown
        id="space-type"
        options={SPACE_TYPE_OPTIONS}
        value={spaceTypes}
        onChange={(value) => update({ spaceTypes: value })}
      />
    </SearchFieldFrame>
  );

  const submit = () => onSearch?.({ location, region, dates, spaceTypes });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
      aria-label="Search spaces"
      className={cn(
        isInline
          ? "grid gap-4 md:grid-cols-3"
          : cn(
              "flex flex-col gap-4 rounded-xl p-4 sm:p-6",
              isBar ? "bg-white shadow-popover md:grid md:grid-cols-3 md:gap-6" : "bg-primary-100",
            ),
        className,
      )}
    >
      {variant === "card" && (
        <h2 className="text-heading-sm font-bold leading-[1.2] text-neutral-950 md:text-heading-md">
          Find your space now
        </h2>
      )}
      {isInline
        ? hideSpaceType
          ? [locationField, regionField, dateField]
          : [locationField, regionField, typeField, dateField]
        : isBar
          ? [locationField, typeField, dateField]
          : [locationField, dateField, typeField]}
      {!isInline && (
        <Button
          type="submit"
          className={cn("w-full sm:w-auto sm:self-start", isBar && "md:col-span-3 md:justify-self-end")}
        >
          Search
        </Button>
      )}
    </form>
  );
}
