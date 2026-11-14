"use client";

import { useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { useOutsideClick } from "@/lib/use-outside-click";
import { Checkbox } from "@/components/atoms/Checkbox/Checkbox";
import { Icon } from "@/components/atoms/Icon/Icon";

export interface CheckboxOption {
  value: string;
  label: string;
}

export interface CheckboxDropdownProps {
  /** Opsi pertama dianggap "semua": tercentang saat tidak ada pilihan lain. */
  options: CheckboxOption[];
  /** Nilai opsi yang dipilih (tanpa opsi "semua"). Kosong = semua. */
  value: string[];
  onChange: (value: string[]) => void;
  /** Teks tombol saat tidak ada pilihan spesifik. */
  allLabel?: string;
  id?: string;
  className?: string;
}

/** Tombol dropdown dengan daftar checkbox (multi-pilih), contoh: "Space Type". */
export function CheckboxDropdown({
  options,
  value,
  onChange,
  allLabel = "All Space",
  id,
  className,
}: CheckboxDropdownProps) {
  const autoId = useId();
  const buttonId = id ?? autoId;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => setOpen(false), open);

  const [allOption, ...specific] = options;
  const summary =
    value.length === 0
      ? allLabel
      : value.length <= 2
        ? specific
            .filter((option) => value.includes(option.value))
            .map((option) => option.label)
            .join(", ")
        : `${value.length} types selected`;

  const toggle = (optionValue: string) =>
    onChange(
      value.includes(optionValue) ? value.filter((v) => v !== optionValue) : [...value, optionValue],
    );

  return (
    <div ref={ref} className={cn("min-w-0 flex-1", className)}>
      <button
        id={buttonId}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full min-w-0 items-center justify-between gap-2 text-left outline-none"
      >
        <span className="truncate">{summary}</span>
        <Icon name="chevron-down" size={20} className={cn("shrink-0 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div
          role="group"
          aria-label="Space type"
          className="absolute left-0 right-0 top-full z-30 mt-2 flex flex-col gap-3 rounded-lg border border-neutral-100 bg-white p-3 shadow-popover"
        >
          <Checkbox
            label={allOption.label}
            checked={value.length === 0}
            onChange={() => onChange([])}
          />
          {specific.map((option) => (
            <Checkbox
              key={option.value}
              label={option.label}
              checked={value.includes(option.value)}
              onChange={() => toggle(option.value)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
