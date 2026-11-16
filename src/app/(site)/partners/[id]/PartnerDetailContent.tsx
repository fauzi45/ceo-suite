"use client";

import { PARTNER_DETAIL_CTA, type PartnerItem } from "@/data/partners";
import { useSiteNavbar } from "@/lib/use-site-navbar";
import { Container } from "@/components/atoms/Container/Container";
import { Photo } from "@/components/atoms/Photo/Photo";
import { Breadcrumb } from "@/components/molecules/Breadcrumb/Breadcrumb";
import { ContactCtaCard } from "@/components/molecules/ContactCtaCard/ContactCtaCard";
import { ShareCard } from "@/components/molecules/ShareCard/ShareCard";
import { PromoDetailSection } from "@/components/organisms/PromoDetailSection/PromoDetailSection";
import { LandingLayout } from "@/components/templates/LandingLayout/LandingLayout";

export interface PartnerDetailContentProps {
  partner: PartnerItem;
}

/** Halaman detail partner: tata letak sama dengan detail promo, kartu kode diganti kartu "Interested in this offer?". */
export function PartnerDetailContent({ partner }: PartnerDetailContentProps) {
  const { navbarProps } = useSiteNavbar("partners");

  return (
    <LandingLayout navbarProps={navbarProps}>
      <Container className="flex flex-col gap-6 py-6 md:gap-8 md:py-8">
        <Breadcrumb
          items={[{ label: "Corporate Partner", href: "/partners" }, { label: "Partnership Details" }]}
        />
        <Photo
          src={partner.banner}
          alt={partner.title}
          priority
          sizes="(min-width: 1920px) 1600px, 100vw"
          className="aspect-[16/7] rounded-2xl md:aspect-[16/5]"
        />
        <div className="grid gap-8 pb-8 lg:grid-cols-[1012fr_525fr] lg:items-start lg:gap-x-16 lg:pb-12">
          <PromoDetailSection promo={partner} className="min-w-0" />
          <div className="flex flex-col gap-6 lg:sticky lg:top-4">
            <ContactCtaCard
              variant="card"
              title={PARTNER_DETAIL_CTA.title}
              description={PARTNER_DETAIL_CTA.description}
            />
            <ShareCard title={partner.title} heading="Share this partnership" />
          </div>
        </div>
      </Container>
    </LandingLayout>
  );
}
