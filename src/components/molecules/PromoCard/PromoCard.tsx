import Link from "next/link";
import { cn } from "@/lib/cn";
import type { Promo } from "@/data/landing";
import { Photo } from "@/components/atoms/Photo/Photo";

export interface PromoCardProps {
  promo: Promo;
  /** Tujuan saat kartu diklik (halaman detail). Tanpa ini kartu tidak berupa link. */
  href?: string;
  /** Kartu abu-abu berlabel "Unavailable": tidak bisa diklik dan tanpa efek hover. */
  unavailable?: boolean;
  className?: string;
}

/** Kartu promo: foto lebar, judul tebal, dan keterangan singkat. */
export function PromoCard({ promo, href, unavailable = false, className }: PromoCardProps) {
  const card = (
    <article
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-lg ring-1 ring-neutral-100",
        unavailable
          ? "bg-neutral-50"
          : "group cursor-pointer bg-white transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-popover",
        className,
      )}
    >
      <div className="relative">
        <Photo
          src={promo.image}
          alt={promo.title}
          sizes="(min-width: 768px) 33vw, 90vw"
          hoverZoom={!unavailable}
          className={cn("aspect-[9/4]", unavailable && "grayscale")}
        />
        {unavailable && (
          <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-caption font-medium text-primary-800">
            Unavailable
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1 p-4">
        <h3
          className={cn(
            "text-body font-bold leading-[1.2]",
            unavailable ? "text-neutral-300" : "text-neutral-950",
          )}
        >
          {promo.title}
        </h3>
        <p className={cn("text-caption", unavailable ? "text-neutral-200" : "text-neutral-400")}>
          {promo.description}
        </p>
      </div>
    </article>
  );

  if (!href || unavailable) return card;
  return (
    <Link href={href} className="block h-full rounded-lg outline-none focus-visible:ring-4 focus-visible:ring-primary-100">
      {card}
    </Link>
  );
}
