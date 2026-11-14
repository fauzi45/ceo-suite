import { cn } from "@/lib/cn";
import type { Promo } from "@/data/landing";
import { Photo } from "@/components/atoms/Photo/Photo";

export interface PromoCardProps {
  promo: Promo;
  className?: string;
}

/** Kartu promo: foto lebar, judul tebal, dan keterangan singkat. */
export function PromoCard({ promo, className }: PromoCardProps) {
  return (
    <article
      className={cn("flex flex-col overflow-hidden rounded-lg bg-white ring-1 ring-neutral-100", className)}
    >
      <Photo
        src={promo.image}
        alt={promo.title}
        sizes="(min-width: 768px) 33vw, 90vw"
        className="aspect-[9/4]"
      />
      <div className="flex flex-col gap-1 p-4">
        <h3 className="text-body font-bold leading-[1.2] text-neutral-950">{promo.title}</h3>
        <p className="text-caption text-neutral-400">{promo.description}</p>
      </div>
    </article>
  );
}
