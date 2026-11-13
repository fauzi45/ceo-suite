"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Button } from "@/components/atoms/Button/Button";

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface DatePickerProps {
  /** Rentang yang dipilih. `end` boleh null untuk pemilihan tanggal tunggal. */
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  /** Bulan pertama yang ditampilkan (tanggalnya diabaikan). */
  initialMonth?: Date;
  /** Hanya satu tanggal, bukan rentang. */
  single?: boolean;
  onConfirm?: (range: DateRange) => void;
  confirmLabel?: string;
  className?: string;
}

const WEEKDAYS = ["Mon", "Tue", "Wen", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function sameDay(a: Date | null, b: Date | null) {
  return (
    !!a &&
    !!b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/** 42 sel (6 minggu) mulai Senin, untuk bulan tertentu. */
function buildGrid(year: number, month: number) {
  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7; // Senin = 0
  const cells: { date: Date; outside: boolean }[] = [];
  for (let i = 0; i < 42; i++) {
    const date = new Date(year, month, 1 - offset + i);
    cells.push({ date, outside: date.getMonth() !== month });
  }
  return cells;
}

interface MonthPanelProps {
  year: number;
  month: number;
  range: DateRange;
  today: Date;
  onPick: (d: Date) => void;
  onPrevYear: () => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onNextYear: () => void;
}

function MonthPanel({
  year,
  month,
  range,
  today,
  onPick,
  onPrevYear,
  onPrevMonth,
  onNextMonth,
  onNextYear,
}: MonthPanelProps) {
  const cells = useMemo(() => buildGrid(year, month), [year, month]);

  const navBtn =
    "inline-flex size-7 items-center justify-center rounded text-neutral-400 hover:bg-neutral-50 hover:text-neutral-700 outline-none focus-visible:ring-4 focus-visible:ring-primary-100";

  return (
    <div className="flex w-[280px] flex-col">
      <div className="flex items-center justify-between border-b border-neutral-100 px-2 py-2">
        <div className="flex">
          <button type="button" aria-label="Tahun sebelumnya" onClick={onPrevYear} className={navBtn}>
            <Icon name="chevron-double-left" size={16} />
          </button>
          <button type="button" aria-label="Bulan sebelumnya" onClick={onPrevMonth} className={navBtn}>
            <Icon name="chevron-left" size={16} />
          </button>
        </div>
        <p className="text-body font-bold leading-[1.2] text-neutral-1000">
          {MONTHS[month]} {year}
        </p>
        <div className="flex">
          <button type="button" aria-label="Bulan berikutnya" onClick={onNextMonth} className={navBtn}>
            <Icon name="chevron-right" size={16} />
          </button>
          <button type="button" aria-label="Tahun berikutnya" onClick={onNextYear} className={navBtn}>
            <Icon name="chevron-double-right" size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 px-2 pt-2">
        {WEEKDAYS.map((d) => (
          <span key={d} className="py-1 text-center text-caption font-medium text-neutral-900">
            {d}
          </span>
        ))}
        {cells.map(({ date, outside }) => {
          const isStart = sameDay(date, range.start);
          const isEnd = sameDay(date, range.end);
          const selected = isStart || isEnd;
          const inRange =
            !!range.start && !!range.end && date > range.start && date < range.end;
          const isToday = sameDay(date, today);
          return (
            <button
              key={date.toISOString()}
              type="button"
              aria-pressed={selected}
              aria-label={date.toDateString()}
              onClick={() => onPick(startOfDay(date))}
              className={cn(
                "mx-auto my-0.5 inline-flex size-8 items-center justify-center rounded text-caption leading-[1.2] transition-colors outline-none focus-visible:ring-4 focus-visible:ring-primary-100",
                outside ? "text-neutral-300" : "text-neutral-900",
                !selected && !outside && "hover:bg-neutral-50",
                inRange && "bg-primary-50",
                isToday && !selected && "border border-primary-800",
                selected && "bg-primary-800 font-medium text-white",
              )}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Date picker desktop (Figma "date picker/desktop"): dua panel bulan berdampingan,
 * radius 8, shadow popover, footer dengan tombol "Select Date".
 * Hari ini = outline primary/800; terpilih = bg primary/800.
 */
export function DatePicker({
  value,
  onChange,
  initialMonth,
  single = false,
  onConfirm,
  confirmLabel = "Select Date",
  className,
}: DatePickerProps) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const base = initialMonth ?? value?.start ?? today;
  const [cursor, setCursor] = useState({ year: base.getFullYear(), month: base.getMonth() });
  const [inner, setInner] = useState<DateRange>({ start: null, end: null });
  const range = value ?? inner;

  function update(next: DateRange) {
    setInner(next);
    onChange?.(next);
  }

  function pick(d: Date) {
    if (single) return update({ start: d, end: null });
    if (!range.start || (range.start && range.end)) return update({ start: d, end: null });
    if (d < range.start) return update({ start: d, end: range.start });
    update({ start: range.start, end: d });
  }

  function shift(months: number) {
    setCursor((c) => {
      const d = new Date(c.year, c.month + months, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  }

  const second = new Date(cursor.year, cursor.month + 1, 1);
  const panelProps = {
    range,
    today,
    onPick: pick,
    onPrevYear: () => shift(-12),
    onPrevMonth: () => shift(-1),
    onNextMonth: () => shift(1),
    onNextYear: () => shift(12),
  };

  return (
    <div
      className={cn(
        "inline-flex flex-col overflow-hidden rounded-lg border border-neutral-100 bg-white shadow-popover",
        className,
      )}
    >
      <div className="flex divide-x divide-neutral-100">
        <MonthPanel year={cursor.year} month={cursor.month} {...panelProps} />
        <MonthPanel year={second.getFullYear()} month={second.getMonth()} {...panelProps} />
      </div>
      <div className="flex justify-end border-t border-neutral-100 px-4 py-3">
        <Button size="mobile" onClick={() => onConfirm?.(range)} disabled={!range.start}>
          {confirmLabel}
        </Button>
      </div>
    </div>
  );
}
