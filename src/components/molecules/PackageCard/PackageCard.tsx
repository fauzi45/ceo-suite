import { cn } from "@/lib/cn";
import { PACKAGE_BADGE_LABELS, type MeetingPackage, type PackageBadge } from "@/data/packages";
import { formatRupiah } from "@/data/product";
import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";

export interface PackageCardProps {
  item: MeetingPackage;
  onBook?: () => void;
  className?: string;
}

const BADGE_STYLES: Record<PackageBadge, string> = {
  "best-deal": "bg-success-50 text-success-700",
  "most-booked": "bg-blue-50 text-blue-600",
};

/** Kartu paket: badge opsional, nama, akses, kapasitas, harga (dengan harga coret + label diskon), dan tombol "Book Now". */
export function PackageCard({ item, onBook, className }: PackageCardProps) {
  return (
    <article
      className={cn("flex flex-col gap-3 rounded-xl bg-white p-4 shadow-input ring-1 ring-neutral-100", className)}
    >
      <div className="flex flex-col gap-2">
        {item.badge && (
          <span
            className={cn(
              "self-start rounded-full px-2 py-0.5 text-tiny font-medium leading-[1.2]",
              BADGE_STYLES[item.badge],
            )}
          >
            {PACKAGE_BADGE_LABELS[item.badge]}
          </span>
        )}
        <h3 className="text-body font-bold leading-[1.2] text-neutral-950">{item.name}</h3>
        <p className="text-caption text-neutral-500">{item.access}</p>
        <span className="flex items-center gap-1.5 text-caption text-neutral-400">
          <Icon name="customers" size={16} />
          {item.capacity}
        </span>
      </div>

      <div className="mt-auto flex flex-col gap-1">
        <span className="text-heading-sm font-bold leading-[1.2] text-primary-800">{formatRupiah(item.price)}</span>
        {item.originalPrice && (
          <div className="flex items-center gap-2">
            <span className="text-tiny text-neutral-400 line-through">{formatRupiah(item.originalPrice)}</span>
            {item.discountLabel && (
              <span className="rounded bg-fuchsia-700 px-1.5 py-0.5 text-tiny font-medium leading-[1.2] text-white">
                {item.discountLabel}
              </span>
            )}
          </div>
        )}
      </div>

      <Button hierarchy="secondary-filled" size="mobile" fullWidth onClick={onBook}>
        Book Now
      </Button>
    </article>
  );
}
