"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/atoms/Icon/Icon";
import { DropdownMenu, type DropdownMenuItem } from "@/components/molecules/DropdownMenu/DropdownMenu";

export const DEFAULT_SEARCH_SCOPES: DropdownMenuItem[] = [
  { value: "all", label: "All" },
  { value: "customer", label: "Customer" },
  { value: "office", label: "Office" },
  { value: "booking-id", label: "Booking ID" },
];

export interface SearchBookingBarProps {
  scopes?: DropdownMenuItem[];
  scope?: string;
  onScopeChange?: (scope: string) => void;
  query?: string;
  onQueryChange?: (query: string) => void;
  onSubmit?: (payload: { scope: string; query: string }) => void;
  placeholder?: string;
  className?: string;
}

/**
 * "dropdown search booking" di Figma: 545x40, radius 8, border grey/100.
 * Kiri: pilihan scope + chevron, pemisah, lalu icon cari + input.
 */
export function SearchBookingBar({
  scopes = DEFAULT_SEARCH_SCOPES,
  scope: scopeProp,
  onScopeChange,
  query: queryProp,
  onQueryChange,
  onSubmit,
  placeholder = "Search Bookings",
  className,
}: SearchBookingBarProps) {
  const [open, setOpen] = useState(false);
  const [innerScope, setInnerScope] = useState(scopes[0]?.value ?? "all");
  const [innerQuery, setInnerQuery] = useState("");
  const rootRef = useRef<HTMLFormElement>(null);

  const scope = scopeProp ?? innerScope;
  const query = queryProp ?? innerQuery;
  const scopeLabel = scopes.find((s) => s.value === scope)?.label ?? scope;

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  return (
    <form
      ref={rootRef}
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.({ scope, query });
      }}
      className={cn(
        "relative flex h-10 w-full max-w-[545px] items-stretch rounded-lg border border-neutral-100 bg-white focus-within:border-primary-300 focus-within:ring-4 focus-within:ring-primary-50",
        className,
      )}
    >
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-l-lg px-3 text-caption font-medium text-neutral-900 outline-none hover:bg-neutral-50"
      >
        <span>{scopeLabel}</span>
        <Icon name={open ? "chevron-up" : "chevron-down"} size={16} className="text-neutral-600" />
      </button>
      <span aria-hidden className="my-2 w-px bg-neutral-100" />
      <label className="flex flex-1 items-center gap-2 px-3">
        <Icon name="search" size={20} className="text-neutral-500" />
        <input
          type="search"
          value={query}
          placeholder={placeholder}
          onChange={(e) => {
            setInnerQuery(e.target.value);
            onQueryChange?.(e.target.value);
          }}
          className="min-w-0 flex-1 bg-transparent text-caption text-neutral-900 outline-none placeholder:text-neutral-400"
        />
      </label>

      {open && (
        <DropdownMenu
          items={scopes}
          value={scope}
          onSelect={(v) => {
            setInnerScope(v);
            onScopeChange?.(v);
            setOpen(false);
          }}
          className="absolute left-0 top-[calc(100%+4px)] z-20"
        />
      )}
    </form>
  );
}
