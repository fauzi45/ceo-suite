import { cn } from "@/lib/cn";
import { formatRupiah, type AddOn } from "@/data/product";
import { Checkbox } from "@/components/atoms/Checkbox/Checkbox";
import { Icon } from "@/components/atoms/Icon/Icon";
import { QuantityStepper } from "@/components/molecules/QuantityStepper/QuantityStepper";

export interface AddOnOptionProps {
  addOn: AddOn;
  /** Jumlah terpilih; 0 = tidak dipilih. */
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  className?: string;
}

/** Baris add-on di modal Select Add Ons: checkbox, icon, nama + harga, dan pengatur jumlah. */
export function AddOnOption({ addOn, quantity, onQuantityChange, className }: AddOnOptionProps) {
  const selected = quantity > 0;
  return (
    <div className={cn("flex items-center gap-2 border-b border-neutral-100 py-2", className)}>
      <Checkbox
        aria-label={`Select ${addOn.name}`}
        checked={selected}
        onChange={(event) => onQuantityChange(event.target.checked ? 1 : 0)}
      />
      <Icon name="add-ons" size={20} className="shrink-0 text-primary-800" />
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-tiny text-neutral-700">{addOn.name}</span>
        <span className="text-tiny font-bold text-neutral-950">
          {formatRupiah(addOn.price)} <span className="font-normal text-neutral-400">{addOn.unit}</span>
        </span>
      </div>
      <QuantityStepper value={quantity} onChange={onQuantityChange} disabled={!selected} min={1} />
    </div>
  );
}
