import { cn } from "@/lib/cn";
import { formatRupiah, type AddOn } from "@/data/product";
import { Icon } from "@/components/atoms/Icon/Icon";

export interface AddOnCardProps {
  addOn: AddOn;
  className?: string;
}

/** Kartu add-on di halaman detail ruangan: icon, nama, harga, dan satuan. */
export function AddOnCard({ addOn, className }: AddOnCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-lg border border-neutral-100 bg-white p-3",
        className,
      )}
    >
      <Icon name="add-ons" size={20} className="text-primary-800" />
      <div className="flex flex-col gap-0.5">
        <span className="text-caption text-neutral-700">{addOn.name}</span>
        <span className="text-body font-bold leading-[1.2] text-neutral-950">{formatRupiah(addOn.price)}</span>
        <span className="text-tiny text-neutral-400">{addOn.unit}</span>
      </div>
    </div>
  );
}
