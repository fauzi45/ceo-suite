"use client";

import { useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { formatLongDate } from "@/lib/format-date";
import { useOutsideClick } from "@/lib/use-outside-click";
import { CITY_OPTIONS, SPACE_TYPE_OPTIONS } from "@/data/landing";
import { Button } from "@/components/atoms/Button/Button";
import { CheckboxDropdown } from "@/components/molecules/CheckboxDropdown/CheckboxDropdown";
import { SelectDropdown } from "@/components/molecules/SelectDropdown/SelectDropdown";
import { SearchFieldFrame } from "@/components/molecules/SearchFieldFrame/SearchFieldFrame";
import { DatePicker, type DateRange } from "@/components/organisms/DatePicker/DatePicker";

export interface SearchCriteria {
  location: string;
  dates: DateRange;
  /** Nilai tipe ruang yang dipilih; kosong = semua. */
  spaceTypes: string[];
}

export interface SpaceSearchFormProps {
  /** `card` = kartu merah muda bertingkat (hero belum login), `bar` = bar putih mendatar (hero login). */
  variant?: "card" | "bar";
  locationLabel?: string;
  locationOptions?: string[];
  onSearch?: (criteria: SearchCriteria) => void;
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
  onSearch,
  className,
}: SpaceSearchFormProps) {
  const locationId = useId();
  const dateId = useId();
  const [location, setLocation] = useState(locationOptions[0] ?? "");
  const [dates, setDates] = useState<DateRange>({ start: null, end: null });
  const [spaceTypes, setSpaceTypes] = useState<string[]>([]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  useOutsideClick(pickerRef, () => setPickerOpen(false), pickerOpen);

  const isBar = variant === "bar";

  const locationField = (
    <SearchFieldFrame key="location" label={locationLabel} icon="map-pin" htmlFor={locationId}>
      <SelectDropdown
        id={locationId}
        label={locationLabel}
        options={locationOptions}
        value={location}
        onChange={setLocation}
      />
    </SearchFieldFrame>
  );

  const dateField = (
    <SearchFieldFrame key="date" label="Select Date" icon="calendar" htmlFor={dateId}>
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
              onChange={setDates}
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
        onChange={setSpaceTypes}
      />
    </SearchFieldFrame>
  );

  const submit = () => onSearch?.({ location, dates, spaceTypes });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
      aria-label="Search spaces"
      className={cn(
        "flex flex-col gap-4 rounded-xl p-4 sm:p-6",
        isBar ? "bg-white shadow-popover md:grid md:grid-cols-3 md:gap-6" : "bg-primary-100",
        className,
      )}
    >
      {!isBar && (
        <h2 className="text-heading-sm font-bold leading-[1.2] text-neutral-950 md:text-heading-md">
          Find your space now
        </h2>
      )}
      {isBar ? [locationField, typeField, dateField] : [locationField, dateField, typeField]}
      <Button
        type="submit"
        className={cn("w-full sm:w-auto sm:self-start", isBar && "md:col-span-3 md:justify-self-end")}
      >
        Search
      </Button>
    </form>
  );
}
