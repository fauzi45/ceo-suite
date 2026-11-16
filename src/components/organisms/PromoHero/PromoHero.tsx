import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { PROMO_HERO } from "@/data/promotions";
import { Container } from "@/components/atoms/Container/Container";
import { Photo } from "@/components/atoms/Photo/Photo";

export interface PromoHeroProps {
  title?: string;
  description?: string;
  image?: string;
  /** Elemen di bawah deskripsi (mis. tombol "Book Now"). */
  action?: ReactNode;
  /**
   * `true` (default) memberi ruang bawah ekstra supaya kartu tab kategori bisa menimpa tepi bawah hero.
   * `false` untuk hero yang berdiri sendiri.
   */
  overlap?: boolean;
  /** Warna latar: `800` (Promotions) atau `900`, lebih gelap (Services). */
  tone?: "800" | "900";
  className?: string;
}

const TONES = {
  "800": {
    bg: "bg-primary-800",
    veil: "bg-primary-800/70 md:bg-transparent md:bg-gradient-to-r md:from-primary-800 md:via-primary-800/40 md:to-primary-800/10",
  },
  "900": {
    bg: "bg-primary-900",
    veil: "bg-primary-900/70 md:bg-transparent md:bg-gradient-to-r md:from-primary-900 md:via-primary-900/40 md:to-primary-900/10",
  },
} as const;

/**
 * Hero halaman Promotions & Deals: latar merah (primary/800) dengan foto di sisi kanan yang memudar ke merah.
 * Secara default beri ruang bawah ekstra (`overlap`) supaya kartu tab kategori bisa menimpa tepi bawahnya.
 */
export function PromoHero({
  title = PROMO_HERO.title,
  description = PROMO_HERO.description,
  image = PROMO_HERO.image,
  action,
  overlap = true,
  tone = "800",
  className,
}: PromoHeroProps) {
  return (
    <section className={cn("relative isolate overflow-hidden", TONES[tone].bg, className)}>
      <div className="absolute inset-y-0 right-0 -z-10 w-full md:w-3/5">
        <Photo src={image} alt="" priority sizes="60vw" className="size-full" />
        <div className={cn("absolute inset-0", TONES[tone].veil)} />
      </div>
      <Container
        className={cn(
          "flex flex-col gap-4 pt-12 text-white md:pt-16",
          overlap ? "pb-28 md:pb-32" : "pb-12 md:pb-16",
        )}
      >
        <h1 className="max-w-2xl text-heading-lg font-bold leading-[1.2] md:text-display-sm">{title}</h1>
        <p className="max-w-2xl text-caption leading-[1.4] md:text-body">{description}</p>
        {action}
      </Container>
    </section>
  );
}
