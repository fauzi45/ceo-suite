import { cn } from "@/lib/cn";
import type { Voucher } from "@/data/booking";
import { Checkbox } from "@/components/atoms/Checkbox/Checkbox";
import { Icon } from "@/components/atoms/Icon/Icon";

export interface VoucherOptionProps {
  voucher: Voucher;
  selected: boolean;
  onToggle: () => void;
  className?: string;
}

/** Kartu voucher di modal Add Voucher: bisa dipilih (border merah saat terpilih). */
export function VoucherOption({ voucher, selected, onToggle, className }: VoucherOptionProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-2 overflow-hidden rounded-lg border bg-white p-3 transition-colors",
        selected ? "border-primary-800" : "border-neutral-100",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-success-100 text-success-600">
          <Icon name="promo" size={16} />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-caption font-medium text-neutral-900">{voucher.title}</span>
          <span className="text-tiny text-neutral-400">{voucher.note}</span>
        </div>
        <Checkbox aria-label={`Select voucher ${voucher.code}`} checked={selected} onChange={onToggle} />
      </div>
      <span className="self-end text-tiny font-medium text-primary-800">Code: {voucher.code}</span>
    </div>
  );
}
