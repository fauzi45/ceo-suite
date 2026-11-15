import { cn } from "@/lib/cn";
import { formatRupiah } from "@/data/product";
import type { BookingTotals } from "@/data/booking";
import { Button } from "@/components/atoms/Button/Button";

export interface BookingPriceCardProps {
  totals: BookingTotals;
  /** Persen voucher bila terpasang (untuk label baris potongan). */
  voucherPercent?: number;
  actionLabel?: string;
  /** Tombol aksi nonaktif sampai syarat halaman terpenuhi. */
  actionDisabled?: boolean;
  onAction?: () => void;
  className?: string;
}

/** Kartu "Price Summary" di kanan halaman booking: rincian harga, total, dan tombol lanjut. */
export function BookingPriceCard({
  totals,
  voucherPercent,
  actionLabel = "Continue to Payment",
  actionDisabled,
  onAction,
  className,
}: BookingPriceCardProps) {
  return (
    <aside
      aria-label="Price summary"
      className={cn("flex flex-col gap-4 rounded-lg bg-white p-4 shadow-popover ring-1 ring-neutral-100", className)}
    >
      <h2 className="text-heading-sm font-bold leading-[1.2] text-neutral-950">Price Summary</h2>
      <ul className="flex flex-col gap-1.5 text-caption text-neutral-500">
        {totals.lines.map((line) => (
          <li key={line.label} className="flex items-baseline justify-between gap-4">
            <span>{line.label}</span>
            <span className="shrink-0">{formatRupiah(line.amount)}</span>
          </li>
        ))}
        {totals.discount > 0 && (
          <li className="flex items-baseline justify-between gap-4 text-success-600">
            <span>{voucherPercent ? `Voucher ${voucherPercent}%` : "Voucher"}</span>
            <span className="shrink-0">-{formatRupiah(totals.discount)}</span>
          </li>
        )}
      </ul>
      <div className="flex items-baseline justify-between gap-4 border-t border-neutral-100 pt-3">
        <span className="text-caption font-medium text-neutral-900">Total Price</span>
        <span className="text-body font-bold text-primary-800">{formatRupiah(totals.total)}</span>
      </div>
      <Button fullWidth disabled={actionDisabled} onClick={onAction}>
        {actionLabel}
      </Button>
    </aside>
  );
}
