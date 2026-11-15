import { cn } from "@/lib/cn";
import { NEWS_CATEGORY_TABS, type NewsCategoryId } from "@/data/news";

export interface NewsCategoryTabsProps {
  value: NewsCategoryId;
  onChange?: (id: NewsCategoryId) => void;
  className?: string;
}

/** Tab kategori berita (hanya teks, garis bawah pada tab aktif). Bisa di-scroll horizontal di layar sempit. */
export function NewsCategoryTabs({ value, onChange, className }: NewsCategoryTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Kategori berita"
      className={cn(
        "flex gap-6 overflow-x-auto overflow-y-hidden border-b border-neutral-100 md:justify-center md:gap-10",
        className,
      )}
    >
      {NEWS_CATEGORY_TABS.map((tab) => {
        const active = tab.id === value;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange?.(tab.id)}
            className={cn(
              "shrink-0 cursor-pointer border-b-2 px-1 py-3 text-caption font-medium leading-[1.2] whitespace-nowrap outline-none transition-colors focus-visible:ring-4 focus-visible:ring-primary-100 md:text-body",
              active
                ? "border-primary-800 font-bold text-primary-800"
                : "border-transparent text-neutral-400 hover:text-neutral-600",
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
