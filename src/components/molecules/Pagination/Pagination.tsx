import { cn } from "@/lib/cn";
import { Icon } from "@/components/atoms/Icon/Icon";

export interface PaginationProps {
  /** Halaman aktif, mulai dari 1. */
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  className?: string;
}

/** Nomor halaman: tiga pertama, tiga terakhir, sekitar halaman aktif, dan "gap" di sela yang dilewati. */
function pageItems(page: number, pageCount: number): (number | "gap")[] {
  const keep = new Set([1, 2, 3, pageCount - 2, pageCount - 1, pageCount, page - 1, page, page + 1]);
  const pages = [...keep].filter((p) => p >= 1 && p <= pageCount).sort((a, b) => a - b);
  const items: (number | "gap")[] = [];
  pages.forEach((p, i) => {
    if (i > 0 && p - pages[i - 1] > 1) items.push("gap");
    items.push(p);
  });
  return items;
}

const itemClass =
  "inline-flex size-6 cursor-pointer items-center justify-center rounded text-caption leading-[1.2] outline-none transition-colors focus-visible:ring-4 focus-visible:ring-primary-100";

const arrowClass = "text-neutral-600 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:text-neutral-300";

/** Paginasi kecil rata kanan: `‹ 1 2 3 … 8 9 10 ›`. Halaman aktif diberi latar abu-abu. */
export function Pagination({ page, pageCount, onPageChange, className }: PaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <nav aria-label="Pagination" className={cn("flex items-center justify-end gap-2", className)}>
      <button
        type="button"
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className={cn(itemClass, arrowClass)}
      >
        <Icon name="chevron-left" size={14} />
      </button>
      {pageItems(page, pageCount).map((item, i) =>
        item === "gap" ? (
          <span key={`gap-${i}`} aria-hidden="true" className="px-1 text-caption text-neutral-500">
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            aria-current={item === page ? "page" : undefined}
            onClick={() => onPageChange(item)}
            className={cn(itemClass, item === page ? "bg-neutral-100 text-neutral-950" : "text-neutral-600 hover:bg-neutral-50")}
          >
            {item}
          </button>
        ),
      )}
      <button
        type="button"
        aria-label="Next page"
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
        className={cn(itemClass, arrowClass)}
      >
        <Icon name="chevron-right" size={14} />
      </button>
    </nav>
  );
}
