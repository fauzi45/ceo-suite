import Image from "next/image";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/atoms/Icon/Icon";

export interface PhotoProps {
  /** Path foto (mis. "/images/landing/room-1.jpg"). Tanpa ini, tampil placeholder abu-abu. */
  src?: string;
  alt?: string;
  priority?: boolean;
  /** Atribut `sizes` untuk next/image. */
  sizes?: string;
  /** Foto membesar pelan saat kartu induk (yang memakai class `group`) di-hover. */
  hoverZoom?: boolean;
  className?: string;
}

/**
 * Area foto yang mengisi wadahnya (beri tinggi/aspect lewat `className`).
 * Belum ada foto dari Figma, jadi placeholder dipakai sampai `src` diisi.
 */
export function Photo({ src, alt = "", priority, sizes = "100vw", hoverZoom, className }: PhotoProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-neutral-200 to-neutral-100",
        className,
      )}
    >
      {src ? (
        // Foto lokal sumbernya sudah kecil (hasil potongan Figma): disajikan apa adanya agar optimizer
        // tidak mengecilkannya lagi (yang membuat tampilan blur).
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          unoptimized
          className={cn(
            "object-cover",
            hoverZoom && "transition-transform duration-500 ease-out group-hover:scale-105",
          )}
        />
      ) : (
        <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center text-neutral-300">
          <Icon name="room-office" size={40} />
        </span>
      )}
    </div>
  );
}
