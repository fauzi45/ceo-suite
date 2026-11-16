"use client";

import { cn } from "@/lib/cn";
import { useNavigate } from "@/lib/use-navigate";

export interface BreadcrumbItem {
  label: string;
  /** Tanpa `href` = halaman saat ini (tebal, warna primary). */
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

/** Jejak halaman: "Promotions & Deals! › Promo Details". Item terakhir adalah halaman aktif. */
export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const navigate = useNavigate();

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-2 text-caption leading-[1.2]">
        {items.map((item, i) => {
          const current = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2">
              {item.href && !current ? (
                <button
                  type="button"
                  onClick={() => navigate(item.href)}
                  className="cursor-pointer text-neutral-400 transition-colors hover:text-primary-800"
                >
                  {item.label}
                </button>
              ) : (
                <span aria-current={current ? "page" : undefined} className={cn(current && "font-bold text-primary-800")}>
                  {item.label}
                </span>
              )}
              {!current && (
                <span aria-hidden className="text-neutral-400">
                  ›
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
