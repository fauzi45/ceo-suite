import { cn } from "@/lib/cn";
import { formatLongDate } from "@/lib/format-date";
import { formatRupiah } from "@/data/product";
import { Button } from "@/components/atoms/Button/Button";
import type { TimeRange } from "@/components/organisms/TimePicker/TimePicker";

export interface BookingSummaryCardProps {
  date: Date | null;
  time: TimeRange;
  /** Total sewa (rupiah). `null` selama tanggal/jam belum lengkap. */
  total: number | null;
  onBook?: () => void;
  className?: string;
}

/**
 * Kartu booking di kanan halaman detail: selama tanggal/jam belum lengkap tampil petunjuk dan tombol
 * Book nonaktif; setelah lengkap tampil ringkasan jadwal dan total harga.
 */
export function BookingSummaryCard({ date, time, total, onBook, className }: BookingSummaryCardProps) {
  const ready = Boolean(date) && total !== null;
  return (
    <aside
      aria-label="Booking summary"
      className={cn("flex flex-col gap-4 rounded-lg bg-white p-4 shadow-popover ring-1 ring-neutral-100", className)}
    >
      {ready && date ? (
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1 text-caption text-neutral-500">
            <span>{formatLongDate(date)}</span>
            <span>
              {time.start} - {time.end}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-caption text-neutral-500">Total</span>
            <span className="text-heading-sm font-bold leading-[1.2] text-primary-800">{formatRupiah(total ?? 0)}</span>
          </div>
        </div>
      ) : (
        <p className="text-caption text-neutral-400">{date ? "Select time to Book" : "Select date to Book"}</p>
      )}
      <Button fullWidth disabled={!ready} onClick={onBook}>
        Book
      </Button>
    </aside>
  );
}
