"use client";

import { useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { useOutsideClick } from "@/lib/use-outside-click";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Radio } from "@/components/atoms/Radio/Radio";

export interface SelectDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  /** Nama grup untuk pembaca layar. */
  label?: string;
  id?: string;
  className?: string;
}

/**
 * Dropdown pilihan tunggal dengan tampilan yang sama seperti `CheckboxDropdown`
 * (tombol + panel daftar), memakai radio. Panel menutup setelah memilih.
 */
export function SelectDropdown({ options, value, onChange, label = "Options", id, className }: SelectDropdownProps) {
  const autoId = useId();
  const buttonId = id ?? autoId;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => setOpen(false), open);

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
        <span className="truncate">{value}</span>
        <Icon name="chevron-down" size={20} className={cn("shrink-0 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div
          role="radiogroup"
          aria-label={label}
          className="absolute left-0 right-0 top-full z-30 mt-2 flex flex-col gap-3 rounded-lg border border-neutral-100 bg-white p-3 shadow-popover"
        >
          {options.map((option) => (
            <Radio
              key={option}
              size="mobile"
              name={buttonId}
              label={option}
              checked={option === value}
              onChange={() => {
                onChange(option);
                setOpen(false);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
