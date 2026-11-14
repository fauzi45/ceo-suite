import { cn } from "@/lib/cn";
import type { Partner } from "@/data/landing";
import { Photo } from "@/components/atoms/Photo/Photo";

export interface PartnerCardProps {
  partner: Partner;
  className?: string;
}

/**
 * Kartu partner korporat: foto (watermark "CEO SUITE x partner" sudah menjadi bagian foto dari Figma),
 * judul, dan deskripsi.
 */
export function PartnerCard({ partner, className }: PartnerCardProps) {
  return (
    <article className={cn("flex flex-col gap-4", className)}>
      <Photo
        src={partner.image}
        alt={partner.title}
        sizes="(min-width: 768px) 33vw, 90vw"
        className="aspect-[7/4] rounded-lg"
      />
      <div className="flex flex-col gap-2">
        <h3 className="text-body font-bold leading-[1.2] text-neutral-950 md:text-heading-sm">
          {partner.title}
        </h3>
        <p className="text-caption text-neutral-500 md:text-body">{partner.description}</p>
      </div>
    </article>
  );
}
