import { cn } from "@/lib/cn";
import { PACKAGE_VAT_PERCENT, type PackageTotals } from "@/data/packages";
import { formatRupiah } from "@/data/product";
import { Button } from "@/components/atoms/Button/Button";

export interface PackagePriceCardProps {
  totals: PackageTotals;
  /** Persen voucher bila terpasang (untuk label baris potongan). */
  voucherPercent?: number;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

function Row({ label, value, tone }: { label: string; value: string; tone?: "success" }) {
  return (
    <li
      className={cn(
        "flex items-baseline justify-between gap-4 text-caption",
        tone === "success" ? "text-success-600" : "text-neutral-500",
      )}
    >
      <span>{label}</span>
      <span className="shrink-0">{value}</span>
    </li>
  );
}

/**
 * Kartu "Price Summary" lebar di halaman booking paket (Figma: 1280, padding 32, radius 12, jarak 24):
 * baris paket, garis, subtotal + PPN, garis, total, lalu tombol selebar kartu.
 */
export function PackagePriceCard({
  totals,
  voucherPercent,
  actionLabel = "Continue to Payment",
  onAction,
  className,
}: PackagePriceCardProps) {
  return (
    <section
      aria-label="Price summary"
      className={cn("flex flex-col gap-6 rounded-xl bg-white p-4 shadow-popover md:p-8", className)}
    >
      <h2 className="text-heading-sm font-bold leading-[1.2] text-neutral-950">Price Summary</h2>
      <div className="flex flex-col gap-3">
        <p className="flex items-baseline justify-between gap-4 text-caption text-neutral-500">
          <span>{totals.itemLabel}</span>
          <span className="shrink-0">{formatRupiah(totals.subtotal)}</span>
        </p>
        <hr className="border-neutral-100" />
        <ul className="flex flex-col gap-1.5">
          <Row label="Subtotal" value={formatRupiah(totals.subtotal)} />
          {totals.discount > 0 && (
            <Row
              label={voucherPercent ? `Voucher ${voucherPercent}%` : "Voucher"}
              value={`-${formatRupiah(totals.discount)}`}
              tone="success"
            />
          )}
          <Row label={`VAT ${PACKAGE_VAT_PERCENT}%`} value={formatRupiah(totals.vat)} />
        </ul>
        <hr className="border-neutral-100" />
        <p className="flex items-baseline justify-between gap-4">
          <span className="text-caption font-medium text-neutral-900">Total Price</span>
          <span className="text-body font-bold text-primary-800">{formatRupiah(totals.total)}</span>
        </p>
      </div>
      <Button fullWidth onClick={onAction}>
        {actionLabel}
      </Button>
    </section>
  );
}
