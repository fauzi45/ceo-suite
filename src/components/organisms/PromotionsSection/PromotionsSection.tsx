import { cn } from "@/lib/cn";
import { PROMOTIONS, type Promo } from "@/data/landing";
import { Container } from "@/components/atoms/Container/Container";
import { PromoCard } from "@/components/molecules/PromoCard/PromoCard";
import { SectionHeader } from "@/components/molecules/SectionHeader/SectionHeader";

export interface PromotionsSectionProps {
  promotions?: Promo[];
  onSeeAll?: () => void;
  className?: string;
}

/** "Promotions": tombol See All + 3 kartu promo (1 kolom di mobile, 3 di md ke atas). */
export function PromotionsSection({
  promotions = PROMOTIONS,
  onSeeAll,
  className,
}: PromotionsSectionProps) {
  return (
    <section className={cn("py-10 md:py-16", className)}>
      <Container className="flex flex-col gap-6 md:gap-8">
        <SectionHeader
          title="Promotions"
          subtitle="Don't miss this opportunity to elevate your workspace experience at unbeatable value."
          icon="seal-percent"
          actionLabel="See All"
          onAction={onSeeAll}
        />
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {promotions.map((promo) => (
            <PromoCard key={promo.id} promo={promo} href={`/promotions/${promo.id}`} />
          ))}
        </div>
      </Container>
    </section>
  );
}
