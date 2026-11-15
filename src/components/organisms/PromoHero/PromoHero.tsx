import { cn } from "@/lib/cn";
import { PROMO_HERO } from "@/data/promotions";
import { Container } from "@/components/atoms/Container/Container";
import { Photo } from "@/components/atoms/Photo/Photo";

export interface PromoHeroProps {
  title?: string;
  description?: string;
  image?: string;
  className?: string;
}

/**
 * Hero halaman Promotions & Deals: latar merah (primary/800) dengan foto di sisi kanan yang memudar ke merah.
 * Beri ruang bawah ekstra (`pb-28`) supaya kartu tab kategori bisa menimpa tepi bawahnya.
 */
export function PromoHero({
  title = PROMO_HERO.title,
  description = PROMO_HERO.description,
  image = PROMO_HERO.image,
  className,
}: PromoHeroProps) {
  return (
    <section className={cn("relative isolate overflow-hidden bg-primary-800", className)}>
      <div className="absolute inset-y-0 right-0 -z-10 w-full md:w-3/5">
        <Photo src={image} alt="" priority sizes="60vw" className="size-full" />
        <div className="absolute inset-0 bg-primary-800/70 md:bg-transparent md:bg-gradient-to-r md:from-primary-800 md:via-primary-800/40 md:to-primary-800/10" />
      </div>
      <Container className="flex flex-col gap-4 pb-28 pt-12 text-white md:pb-32 md:pt-16">
        <h1 className="max-w-2xl text-heading-lg font-bold leading-[1.2] md:text-display-sm">{title}</h1>
        <p className="max-w-2xl text-caption leading-[1.4] md:text-body">{description}</p>
      </Container>
    </section>
  );
}
