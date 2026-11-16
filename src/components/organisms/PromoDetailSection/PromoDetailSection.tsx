import { cn } from "@/lib/cn";
import type { PromoItem } from "@/data/promotions";

export interface PromoDetailSectionProps {
  /** Cukup field yang dibaca saja, supaya detail partner ikut memakai komponen ini. */
  promo: Pick<PromoItem, "title" | "description" | "headline" | "body" | "terms">;
  className?: string;
}

/** Kolom kiri detail promo: judul, deskripsi, headline + isi, lalu daftar Terms and Conditions. */
export function PromoDetailSection({ promo, className }: PromoDetailSectionProps) {
  return (
    <article className={cn("flex flex-col gap-6", className)}>
      <header className="flex flex-col gap-2">
        <h1 className="text-heading-md font-bold leading-[1.2] text-neutral-950 md:text-heading-lg">{promo.title}</h1>
        <p className="text-caption text-neutral-500 md:text-body">{promo.description}</p>
      </header>

      <div className="flex flex-col gap-2">
        <h2 className="text-body font-bold leading-[1.2] text-neutral-950">{promo.headline}</h2>
        <p className="text-caption leading-[1.5] text-neutral-500 md:text-body">{promo.body}</p>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="border-b border-neutral-100 pb-2 text-body font-bold leading-[1.2] text-neutral-950">
          Terms and Conditions
        </h2>
        <ul className="list-disc space-y-1 pl-5 text-caption leading-[1.5] text-neutral-500 md:text-body">
          {promo.terms.map((term) => (
            <li key={term}>{term}</li>
          ))}
        </ul>
      </section>
    </article>
  );
}
