import { cn } from "@/lib/cn";
import { PROMO_CATEGORY_TABS, type PromoCategoryId } from "@/data/promotions";
import { OfficeTypeTabs } from "@/components/organisms/OfficeTypeTabs/OfficeTypeTabs";

export interface PromoCategoryTabsProps {
  value: PromoCategoryId;
  onChange?: (id: PromoCategoryId) => void;
  className?: string;
}

/** Kartu putih berisi 7 tab kategori promo, menimpa tepi bawah hero (pakai `-mt-*` dari pemakainya). */
export function PromoCategoryTabs({ value, onChange, className }: PromoCategoryTabsProps) {
  return (
    <div className={cn("rounded-2xl bg-white px-4 py-4 shadow-popover md:px-6", className)}>
      <OfficeTypeTabs
        size="lg"
        tabs={PROMO_CATEGORY_TABS}
        value={value}
        onChange={(id) => onChange?.(id as PromoCategoryId)}
        className="justify-between gap-6 border-b-0 md:gap-8"
      />
    </div>
  );
}
