import { cn } from "@/lib/cn";
import { Icon, type IconName } from "@/components/atoms/Icon/Icon";
import { Photo } from "@/components/atoms/Photo/Photo";

export interface SpaceCategoryCardProps {
  label: string;
  icon: IconName;
  image?: string;
  className?: string;
}

/**
 * Kartu kategori ruang di "Browse Spaces": foto persegi dengan penanda panah merah, label di bawah.
 * Foto dari Figma sudah memuat penanda panah; penanda buatan hanya dipakai untuk placeholder.
 */
export function SpaceCategoryCard({ label, icon, image, className }: SpaceCategoryCardProps) {
  return (
    <article className={cn("flex flex-col gap-3", className)}>
      <div className="relative">
        <Photo
          src={image}
          alt={label}
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="aspect-square rounded-lg"
        />
        {!image && (
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-0 inline-flex size-10 items-center justify-center rounded-bl-lg rounded-tr-lg bg-primary-800 text-white"
          >
            <Icon name="chevron-right" size={20} />
          </span>
        )}
      </div>
      <p className="flex items-center gap-2 text-caption font-medium text-neutral-900 md:text-body">
        <Icon name={icon} size={20} className="text-primary-800" />
        {label}
      </p>
    </article>
  );
}
