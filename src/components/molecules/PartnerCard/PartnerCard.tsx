"use client";

import { cn } from "@/lib/cn";
import { activateProps, useNavigate } from "@/lib/use-navigate";
import type { Partner } from "@/data/landing";
import { Photo } from "@/components/atoms/Photo/Photo";

export interface PartnerCardProps {
  partner: Partner;
  /** Jika diisi, seluruh kartu menjadi link (mis. ke halaman detail partner). */
  href?: string;
  className?: string;
}

/**
 * Kartu partner korporat: foto (watermark "CEO SUITE x partner" sudah menjadi bagian foto dari Figma),
 * judul, dan deskripsi.
 */
export function PartnerCard({ partner, href, className }: PartnerCardProps) {
  const navigate = useNavigate();
  const card = (
    <article className={cn("group flex cursor-pointer flex-col gap-4", className)}>
      <Photo
        src={partner.image}
        alt={partner.title}
        sizes="(min-width: 768px) 33vw, 90vw"
        hoverZoom
        className="aspect-[7/4] rounded-lg"
      />
      <div className="flex flex-col gap-2">
        <h3 className="text-body font-bold leading-[1.2] text-neutral-950 transition-colors group-hover:text-primary-800 md:text-heading-sm">
          {partner.title}
        </h3>
        <p className="text-caption text-neutral-500 md:text-body">{partner.description}</p>
      </div>
    </article>
  );

  if (!href) return card;
  return (
    <div
      {...activateProps(() => navigate(href))}
      className="block rounded-lg outline-none focus-visible:ring-4 focus-visible:ring-primary-100"
    >
      {card}
    </div>
  );
}
