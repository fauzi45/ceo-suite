import { cn } from "@/lib/cn";
import { PARTNERS, type Partner } from "@/data/landing";
import { Container } from "@/components/atoms/Container/Container";
import { PartnerCard } from "@/components/molecules/PartnerCard/PartnerCard";
import { SectionHeader } from "@/components/molecules/SectionHeader/SectionHeader";

export interface PartnersSectionProps {
  partners?: Partner[];
  onSeeAll?: () => void;
  className?: string;
}

/** "Our Corporate Partners": tombol See All + 3 kartu partner. */
export function PartnersSection({ partners = PARTNERS, onSeeAll, className }: PartnersSectionProps) {
  return (
    <section className={cn("py-10 md:py-16", className)}>
      <Container className="flex flex-col gap-6 md:gap-8">
        <SectionHeader
          title="Our Corporate Partners"
          subtitle="Exclusive benefits and promotions tailored to meet the needs of businesses of all sizes."
          actionLabel="See All"
          onAction={onSeeAll}
        />
        <div className="grid gap-6 md:grid-cols-3">
          {partners.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} href={`/partners/${partner.id}`} />
          ))}
        </div>
      </Container>
    </section>
  );
}
