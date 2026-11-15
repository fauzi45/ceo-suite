"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { useOutsideClick } from "@/lib/use-outside-click";
import { Avatar } from "@/components/atoms/Avatar/Avatar";
import { Icon } from "@/components/atoms/Icon/Icon";
import { DropdownMenu, type DropdownMenuItem } from "@/components/molecules/DropdownMenu/DropdownMenu";

export interface UserMenuProps {
  name: string;
  items: DropdownMenuItem[];
  onSelect?: (value: string) => void;
  className?: string;
}

/** Avatar + nama pengguna dengan dropdown menu (My Booking, Profile, Logout). */
export function UserMenu({ name, items, onSelect, className }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => setOpen(false), open);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-lg p-1 outline-none transition-colors hover:bg-neutral-50 focus-visible:ring-4 focus-visible:ring-primary-100"
      >
        <Avatar name={name} />
        <span className="hidden text-caption font-medium text-neutral-900 lg:inline">{name}</span>
        <Icon name="chevron-down" size={16} className={cn("transition-transform", open && "rotate-180")} />
        <span className="sr-only">Account menu for {name}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-40 mt-2">
          <DropdownMenu
            items={items}
            onSelect={(value) => {
              setOpen(false);
              onSelect?.(value);
            }}
          />
        </div>
      )}
    </div>
  );
}
