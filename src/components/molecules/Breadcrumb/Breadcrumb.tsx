import Link from "next/link";
import { cn } from "@/lib/cn";

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
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-2 text-caption leading-[1.2]">
        {items.map((item, i) => {
          const current = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2">
              {item.href && !current ? (
                <Link href={item.href} className="text-neutral-400 transition-colors hover:text-primary-800">
                  {item.label}
                </Link>
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
