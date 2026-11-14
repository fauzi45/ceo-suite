import { cn } from "@/lib/cn";
import { Icon } from "@/components/atoms/Icon/Icon";

export interface AllSpaceCardProps {
  onClick?: () => void;
  className?: string;
}

/**
 * Kartu merah "All Space" di akhir "Browse Spaces" (Figma): setinggi satu kolom penuh (foto + label),
 * pola garis diagonal di pojok kanan atas, teks di tengah, dan tombol oranye "Check availability"
 * yang menempel di sisi kiri-bawah kartu.
 */
export function AllSpaceCard({ onClick, className }: AllSpaceCardProps) {
  return (
    <article
      className={cn(
        "relative flex h-full min-h-56 flex-col overflow-hidden rounded-md bg-primary-800 text-white shadow-modal",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute right-0 top-0 size-16 bg-[repeating-linear-gradient(135deg,rgb(255_255_255/0.35)_0_1px,transparent_1px_9px)] md:size-20"
      />
      <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 pb-6 pt-10 text-center">
        <h3 className="text-heading-sm font-bold leading-[1.2] md:text-heading-md">All Space</h3>
        <p className="text-caption">
          Comfortable space, Full speed wifi, Free coffe &amp; Snack and many more
        </p>
      </div>
      <button
        type="button"
        onClick={onClick}
        className="flex items-center justify-between gap-6 self-start bg-secondary-600 px-4 py-2.5 text-caption font-bold text-white outline-none transition-colors hover:bg-secondary-700 focus-visible:ring-4 focus-visible:ring-secondary-200"
      >
        Check availability
        <Icon name="chevron-right" size={16} />
      </button>
    </article>
  );
}
