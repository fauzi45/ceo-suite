import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface DropdownMenuItem<T extends string = string> {
  value: T;
  label: ReactNode;
  disabled?: boolean;
}

export interface DropdownMenuProps<T extends string = string>
  extends Omit<HTMLAttributes<HTMLUListElement>, "onSelect"> {
  items: DropdownMenuItem<T>[];
  value?: T;
  onSelect?: (value: T) => void;
}

/**
 * Daftar pilihan ("Dropdown Components" di Figma): item tinggi 32, padding 8x12,
 * teks 13px, bg putih, hover grey/50, terpilih primary/100.
 */
export function DropdownMenu<T extends string = string>({
  items,
  value,
  onSelect,
  className,
  ...rest
}: DropdownMenuProps<T>) {
  return (
    <ul
      role="listbox"
      className={cn(
        "min-w-[162px] overflow-hidden rounded-lg border border-neutral-100 bg-white py-1 shadow-popover",
        className,
      )}
      {...rest}
    >
      {items.map((item) => {
        const selected = item.value === value;
        return (
          <li key={item.value} role="presentation">
            <button
              type="button"
              role="option"
              aria-selected={selected}
              disabled={item.disabled}
              onClick={() => onSelect?.(item.value)}
              className={cn(
                "flex h-8 w-full items-center gap-2.5 px-3 py-2 text-left text-caption leading-[1.2] text-neutral-900 transition-colors outline-none",
                "hover:bg-neutral-50 focus-visible:bg-neutral-50 disabled:cursor-not-allowed disabled:text-neutral-300",
                selected && "bg-primary-100 font-medium text-primary-800",
              )}
            >
              {item.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
