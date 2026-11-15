import { cn } from "@/lib/cn";
import { BEST_DEALS, type Deal } from "@/data/landing";
import { Container } from "@/components/atoms/Container/Container";
import { DealCard } from "@/components/molecules/DealCard/DealCard";
import { SectionHeader } from "@/components/molecules/SectionHeader/SectionHeader";

export interface BestDealsSectionProps {
  deals?: Deal[];
  onSeeAll?: () => void;
  className?: string;
}

/** "Best Deals": tombol See All Deals + 3 kartu voucher. */
export function BestDealsSection({ deals = BEST_DEALS, onSeeAll, className }: BestDealsSectionProps) {
  return (
    <section className={cn("py-10 md:py-16", className)}>
      <Container className="flex flex-col gap-6 md:gap-8">
        <SectionHeader
          title="Best Deals"
          subtitle="Take advantage of our special promotions and enjoy exceptional savings on your workspace."
          icon="seal-percent-fill"
          actionLabel="See All Deals"
          onAction={onSeeAll}
        />
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {deals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      </Container>
    </section>
  );
}
