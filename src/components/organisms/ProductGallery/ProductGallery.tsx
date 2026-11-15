import { cn } from "@/lib/cn";
import { Button } from "@/components/atoms/Button/Button";
import { Photo } from "@/components/atoms/Photo/Photo";

export interface ProductGalleryProps {
  /** Foto ruangan: yang pertama besar, empat berikutnya kecil. */
  photos: string[];
  alt: string;
  onShowAll?: () => void;
  className?: string;
}

/**
 * Galeri halaman detail (Figma): foto besar 1051x498 di kiri dan grid 2x2 selebar 525 di kanan (jarak 24/16),
 * tombol "Show All Photos" menempel di pojok kanan bawah foto terakhir.
 */
export function ProductGallery({ photos, alt, onShowAll, className }: ProductGalleryProps) {
  const [main, ...rest] = photos;
  const small = rest.slice(0, 4);
  return (
    <div className={cn("grid gap-3 md:grid-cols-[1051fr_525fr] md:gap-6", className)}>
      <Photo
        src={main}
        alt={alt}
        priority
        sizes="(min-width: 1280px) 65vw, 100vw"
        className="aspect-[1051/498] rounded-xl"
      />
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        {small.map((src, index) => (
          <div key={src} className="relative min-h-0">
            <Photo
              src={src}
              alt={`${alt} ${index + 2}`}
              sizes="(min-width: 1280px) 16vw, 45vw"
              className="aspect-square rounded-xl md:aspect-auto md:size-full"
            />
            {index === small.length - 1 && (
              <Button
                hierarchy="secondary-white"
                size="mobile"
                iconLeft="grid"
                onClick={onShowAll}
                className="absolute bottom-2 right-2 shadow-popover md:bottom-3 md:right-3"
              >
                Show All Photos
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
