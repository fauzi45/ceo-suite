import { cn } from "@/lib/cn";
import { Icon, type IconName } from "@/components/atoms/Icon/Icon";
import { Photo } from "@/components/atoms/Photo/Photo";

export interface SpaceCategoryCardProps {
  label: string;
  icon: IconName;
  image?: string;
  /** Tampilkan penanda panah merah. Default: hanya saat belum ada foto (foto dari Figma sudah memuatnya). */
  showMarker?: boolean;
  className?: string;
}

/** Warna ikon mengikuti warna tipe ruangan (sama dengan chip tipe ruangan di Figma). */
const ICON_COLORS: Partial<Record<IconName, string>> = {
  "room-office": "text-room-office-fg",
  "room-coworking": "text-room-coworking-fg",
  "room-meeting": "text-room-meeting-fg",
  "room-board": "text-room-board-fg",
  "room-class": "text-room-class-fg",
  "room-seminar": "text-room-seminar-fg",
  "room-theatre": "text-room-theatre-fg",
  "room-combined": "text-room-combined-fg",
};

/**
 * Kartu kategori ruang di "Browse Spaces": foto persegi dengan penanda panah merah, label di bawah.
 * Foto dari Figma sudah memuat penanda panah; penanda buatan hanya dipakai untuk placeholder.
 */
export function SpaceCategoryCard({ label, icon, image, showMarker = !image, className }: SpaceCategoryCardProps) {
  return (
    <article className={cn("group flex cursor-pointer flex-col gap-3", className)}>
      <div className="relative">
        <Photo
          src={image}
          alt={label}
          sizes="(min-width: 1024px) 25vw, 50vw"
          hoverZoom
          className="aspect-square rounded-lg"
        />
        {showMarker && (
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-0 inline-flex size-10 items-center justify-center rounded-bl-lg rounded-tr-lg bg-primary-800 text-white"
          >
            <Icon name="chevron-right" size={20} />
          </span>
        )}
      </div>
      <p className="flex items-center gap-2 text-body font-bold leading-[1.2] text-neutral-900 transition-colors group-hover:text-primary-800 md:text-heading-sm">
        <Icon name={icon} size={20} className={ICON_COLORS[icon] ?? "text-primary-800"} />
        {label}
      </p>
    </article>
  );
}
