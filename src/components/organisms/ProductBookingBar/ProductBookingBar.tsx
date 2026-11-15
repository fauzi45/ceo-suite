"use client";

import { useId, useRef, useState } from "react";
import { formatLongDate } from "@/lib/format-date";
import { useOutsideClick } from "@/lib/use-outside-click";
import { cn } from "@/lib/cn";
import { Container } from "@/components/atoms/Container/Container";
import { SearchFieldFrame } from "@/components/molecules/SearchFieldFrame/SearchFieldFrame";
import { DatePicker } from "@/components/organisms/DatePicker/DatePicker";
import { TimePicker, type TimeRange } from "@/components/organisms/TimePicker/TimePicker";

export interface ProductBookingBarProps {
  date: Date | null;
  onDateChange: (date: Date | null) => void;
  time: TimeRange;
  onTimeChange: (time: TimeRange) => void;
  className?: string;
}

/**
 * Band merah di bawah Navbar halaman detail ruangan (Figma): "Select Date" dan "Select Time" sejajar
 * dengan lebar sama (masing-masing setengah container). "Select Time" baru muncul setelah tanggal dipilih.
 */
export function ProductBookingBar({ date, onDateChange, time, onTimeChange, className }: ProductBookingBarProps) {
  const dateId = useId();
  const timeId = useId();
  const [pickerOpen, setPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  useOutsideClick(pickerRef, () => setPickerOpen(false), pickerOpen);

  return (
    <div className={cn("bg-primary-800 py-6 md:py-8", className)}>
      <Container className="grid gap-4 md:grid-cols-2 md:gap-4">
        <SearchFieldFrame label="Select Date" icon="calendar" htmlFor={dateId} className="[&>label]:text-white">
          <div ref={pickerRef} className="min-w-0 flex-1">
            <button
              id={dateId}
              type="button"
              aria-haspopup="dialog"
              aria-expanded={pickerOpen}
              onClick={() => setPickerOpen((open) => !open)}
              className={cn("w-full truncate text-left outline-none", !date && "text-neutral-400")}
            >
              {date ? formatLongDate(date) : "Select Date"}
            </button>
            {pickerOpen && (
              <div className="absolute left-0 top-full z-30 mt-2 max-w-[calc(100vw-2rem)] overflow-x-auto rounded-lg">
                <DatePicker
                  single
                  value={{ start: date, end: null }}
                  onChange={({ start }) => onDateChange(start)}
                  onConfirm={() => setPickerOpen(false)}
                />
              </div>
            )}
          </div>
        </SearchFieldFrame>

        {date && (
          <div className="flex min-w-0 flex-col gap-2">
            <span id={timeId} className="text-caption font-medium text-white md:text-body">
              Select Time
            </span>
            <TimePicker
              value={time}
              onChange={onTimeChange}
              startPlaceholder="Select Time"
              endPlaceholder="End"
              className="block [&>button]:h-12 [&>button]:w-full [&>button]:gap-3 [&>button]:px-3 [&>button]:shadow-none"
            />
          </div>
        )}
      </Container>
    </div>
  );
}
