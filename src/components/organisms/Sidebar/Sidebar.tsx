"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import type { IconName } from "@/components/atoms/Icon/Icon";
import { Logo } from "@/components/atoms/Logo/Logo";
import {
  SidebarNavItem,
  SidebarSubItem,
} from "@/components/molecules/SidebarNavItem/SidebarNavItem";

export interface SidebarMenuChild {
  id: string;
  label: string;
}

export interface SidebarMenuEntry {
  id: string;
  label: string;
  icon: IconName;
  children?: SidebarMenuChild[];
}

/** Struktur menu persis seperti "Dashboard Components" di Figma. */
export const DEFAULT_SIDEBAR_MENU: SidebarMenuEntry[] = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard" },
  { id: "admin", label: "Admin", icon: "admin", children: [{ id: "admin-list", label: "List Admin" }] },
  {
    id: "customers",
    label: "Customers",
    icon: "customers",
    children: [{ id: "customers-list", label: "List Customers" }],
  },
  {
    id: "add-ons",
    label: "Add Ons",
    icon: "add-ons",
    children: [{ id: "add-ons-list", label: "List Add Ons" }],
  },
  {
    id: "booking",
    label: "Booking",
    icon: "receipt",
    children: [{ id: "booking-list", label: "List Booking" }],
  },
  {
    id: "promo",
    label: "Promo",
    icon: "promo",
    children: [
      { id: "promo-discount", label: "Discount" },
      { id: "promo-partner", label: "Corporate Partner" },
    ],
  },
  {
    id: "cms",
    label: "CMS",
    icon: "cms",
    children: [
      { id: "cms-news", label: "News" },
      { id: "cms-information", label: "Information" },
    ],
  },
  {
    id: "office",
    label: "Office",
    icon: "office",
    children: [
      { id: "office-list", label: "List Office" },
      { id: "office-category", label: "Office Category" },
    ],
  },
  {
    id: "pricing",
    label: "Pricing",
    icon: "pricing",
    children: [{ id: "pricing-config", label: "Price Configuration" }],
  },
];

export interface SidebarProps {
  menu?: SidebarMenuEntry[];
  /** id item atau sub-item yang aktif. */
  activeId?: string;
  onNavigate?: (id: string) => void;
  className?: string;
}

/** Sidebar dashboard (Frame 33): logo, label MENU, daftar item dengan sub-menu yang bisa dibuka. */
export function Sidebar({
  menu = DEFAULT_SIDEBAR_MENU,
  activeId,
  onNavigate,
  className,
}: SidebarProps) {
  const [openIds, setOpenIds] = useState<string[]>(() =>
    menu.filter((m) => m.children?.some((c) => c.id === activeId)).map((m) => m.id),
  );

  function toggle(id: string) {
    setOpenIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  return (
    <aside
      className={cn(
        "flex w-[227px] flex-col gap-6 border-r border-neutral-100 bg-white px-4 py-6",
        className,
      )}
    >
      <div className="px-2">
        <Logo height={32} />
      </div>

      <nav aria-label="Menu utama" className="flex flex-col gap-2">
        <p className="px-4 text-tiny font-medium uppercase tracking-wide text-neutral-400">Menu</p>
        {menu.map((entry) => {
          const hasChildren = Boolean(entry.children?.length);
          const expanded = openIds.includes(entry.id);
          const childActive = entry.children?.some((c) => c.id === activeId) ?? false;
          const active = entry.id === activeId || childActive;
          return (
            <div key={entry.id} className="flex flex-col gap-1">
              <SidebarNavItem
                icon={entry.icon}
                label={entry.label}
                active={active}
                expandable={hasChildren}
                expanded={expanded}
                onClick={() => {
                  if (hasChildren) toggle(entry.id);
                  else onNavigate?.(entry.id);
                }}
              />
              {hasChildren && expanded && (
                <div className="flex flex-col gap-1">
                  {entry.children!.map((child) => (
                    <SidebarSubItem
                      key={child.id}
                      label={child.label}
                      active={child.id === activeId}
                      onClick={() => onNavigate?.(child.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
