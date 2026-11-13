"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "@/components/atoms/Icon/Icon";

export interface SidebarNavItemProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  icon: IconName;
  label: ReactNode;
  /** Item aktif: bg primary/800, teks putih. */
  active?: boolean;
  /** Tampilkan chevron (item yang punya sub-menu). */
  expandable?: boolean;
  /** Sub-menu sedang terbuka (chevron ke atas). */
  expanded?: boolean;
}

/**
 * Item menu sidebar dashboard: 195px, tinggi 44, radius 8, padding 10x16, gap 12.
 * off: grey/600 · hover: bg grey/50 + primary/800 · on: bg primary/800 + putih.
 */
export function SidebarNavItem({
  icon,
  label,
  active = false,
  expandable = false,
  expanded = false,
  className,
  ...rest
}: SidebarNavItemProps) {
  return (
    <button
      type="button"
      aria-current={active ? "page" : undefined}
      aria-expanded={expandable ? expanded : undefined}
      className={cn(
        "flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-left text-body font-medium leading-[1.2] transition-colors outline-none focus-visible:ring-4 focus-visible:ring-primary-100",
        active
          ? "bg-primary-800 text-white"
          : "text-neutral-600 hover:bg-neutral-50 hover:text-primary-800",
        className,
      )}
      {...rest}
    >
      <Icon name={icon} size={24} />
      <span className="flex-1 truncate">{label}</span>
      {expandable && (
        <Icon name={expanded ? "chevron-up" : "chevron-down"} size={20} />
      )}
    </button>
  );
}

export interface SidebarSubItemProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  label: ReactNode;
  active?: boolean;
}

/** Sub-menu (komponen "List" di Figma): 13px Medium grey/600, aktif bg primary/100. */
export function SidebarSubItem({ label, active = false, className, ...rest }: SidebarSubItemProps) {
  return (
    <button
      type="button"
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex w-full items-center rounded-lg py-2 pl-[52px] pr-4 text-left text-caption font-medium leading-[1.2] transition-colors outline-none focus-visible:ring-4 focus-visible:ring-primary-100",
        active
          ? "bg-primary-100 text-primary-800"
          : "text-neutral-600 hover:bg-neutral-50 hover:text-primary-800",
        className,
      )}
      {...rest}
    >
      {label}
    </button>
  );
}
