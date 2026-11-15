import { cn } from "@/lib/cn";
import { formatRupiah, type ProductRates } from "@/data/product";
import { StatusChip } from "@/components/atoms/Chip/Chip";

export interface PriceSummaryProps {
  rates: ProductRates;
  /** Tampilkan badge "Best Deal". */
  bestDeal?: boolean;
  className?: string;
}

/** Kotak harga: tarif harian besar (dengan badge Best Deal) dan tarif jam, minggu, bulan di bawahnya. */
export function PriceSummary({ rates, bestDeal, className }: PriceSummaryProps) {
  const others = [
    { label: "Hourly", value: rates.hourly },
    { label: "Weekly", value: rates.weekly },
    { label: "Monthly", value: rates.monthly },
  ];
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-lg bg-gradient-to-r from-primary-50 to-white p-4 ring-1 ring-primary-100",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <span className="text-caption text-neutral-500">Daily</span>
        <span className="text-heading-sm font-bold leading-[1.2] text-primary-800">{formatRupiah(rates.daily)}</span>
        {bestDeal && (
          <StatusChip status="success" className="ml-auto !px-2 !py-1">
            Best Deal
          </StatusChip>
        )}
      </div>
      <dl className="flex flex-col gap-1 text-caption">
        {others.map(({ label, value }) => (
          <div key={label} className="flex gap-4">
            <dt className="w-14 text-neutral-500">{label}</dt>
            <dd className="font-medium text-primary-800">{formatRupiah(value)}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
