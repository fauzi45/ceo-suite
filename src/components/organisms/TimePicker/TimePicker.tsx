"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Button } from "@/components/atoms/Button/Button";

export interface TimeRange {
  start: string | null; // "HH:mm"
  end: string | null;
}

export interface TimePickerProps {
  value?: TimeRange;
  onChange?: (range: TimeRange) => void;
  /** Langkah menit di panel (default 30). */
  stepMinutes?: number;
  startPlaceholder?: string;
  endPlaceholder?: string;
  className?: string;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function buildSlots(step: number) {
  const slots: string[] = [];
  for (let m = 0; m < 24 * 60; m += step) {
    slots.push(`${pad(Math.floor(m / 60))}:${pad(m % 60)}`);
  }
  return slots;
}

function nowSlot(step: number) {
  const d = new Date();
  const total = d.getHours() * 60 + d.getMinutes();
  const rounded = Math.round(total / step) * step;
  return `${pad(Math.floor(rounded / 60) % 24)}:${pad(rounded % 60)}`;
}

interface TimeColumnProps {
  label: string;
  slots: string[];
  value: string | null;
  onPick: (v: string) => void;
}

function TimeColumn({ label, slots, value, onPick }: TimeColumnProps) {
  return (
    <div className="flex flex-col">
      <p className="px-3 py-2 text-tiny font-medium uppercase tracking-wide text-neutral-400">{label}</p>
      <ul role="listbox" aria-label={label} className="max-h-56 w-24 overflow-y-auto py-1">
        {slots.map((slot) => {
          const selected = slot === value;
          return (
            <li key={slot}>
              <button
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => onPick(slot)}
                className={cn(
                  "w-full px-3 py-1.5 text-left text-caption leading-[1.2] text-neutral-900 transition-colors outline-none hover:bg-neutral-50 focus-visible:bg-neutral-50",
                  selected && "bg-primary-100 font-medium text-primary-800",
                )}
              >
                {slot}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * Time picker rentang ("Time-Picker" + "Picker-Dropdown/Time" di Figma):
 * input "Start time → End time" dengan icon jam, membuka panel dua kolom jam,
 * footer berisi tautan "Now" dan tombol "Ok".
 */
export function TimePicker({
  value,
  onChange,
  stepMinutes = 30,
  startPlaceholder = "Start time",
  endPlaceholder = "End time",
  className,
}: TimePickerProps) {
  const [open, setOpen] = useState(false);
  const [inner, setInner] = useState<TimeRange>({ start: null, end: null });
  const [draft, setDraft] = useState<TimeRange>(value ?? inner);
  const rootRef = useRef<HTMLDivElement>(null);
  const slots = buildSlots(stepMinutes);
  const range = value ?? inner;

  useEffect(() => {
    if (!open) return;
    setDraft(range);
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function commit(next: TimeRange) {
    setInner(next);
    onChange?.(next);
    setOpen(false);
  }

  const hasValue = Boolean(range.start || range.end);

  return (
    <div ref={rootRef} className={cn("relative inline-block", className)}>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex min-w-[200px] items-center gap-2 rounded-lg border border-neutral-100 bg-white px-4 py-2 text-caption shadow-input outline-none transition-[border-color,box-shadow] focus-visible:border-primary-300 focus-visible:ring-4 focus-visible:ring-primary-50",
          hasValue ? "text-neutral-900" : "text-neutral-400",
        )}
      >
        <span className="flex-1 text-left">
          {range.start ?? startPlaceholder}
          <span className="mx-2 text-neutral-400">→</span>
          {range.end ?? endPlaceholder}
        </span>
        <Icon name="clock" size={16} className="text-neutral-400" />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Pilih jam"
          className="absolute left-0 top-[calc(100%+4px)] z-20 flex flex-col overflow-hidden rounded-lg border border-neutral-100 bg-white shadow-popover"
        >
          <div className="flex divide-x divide-neutral-100">
            <TimeColumn
              label="Start"
              slots={slots}
              value={draft.start}
              onPick={(v) => setDraft((d) => ({ ...d, start: v }))}
            />
            <TimeColumn
              label="End"
              slots={slots.filter((s) => !draft.start || s > draft.start)}
              value={draft.end}
              onPick={(v) => setDraft((d) => ({ ...d, end: v }))}
            />
          </div>
          <div className="flex items-center justify-between border-t border-neutral-100 px-3 py-2">
            <button
              type="button"
              onClick={() => setDraft((d) => ({ ...d, start: nowSlot(stepMinutes) }))}
              className="text-caption font-medium text-primary-800 hover:text-primary-600"
            >
              Now
            </button>
            <Button size="mobile" className="h-7 px-3" onClick={() => commit(draft)} disabled={!draft.start}>
              Ok
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
