"use client";

import { useRef, useState } from "react";
import {
  PARTNERS_CTA,
  PARTNERS_HERO,
  PARTNERS_PAGE_SIZE,
  PARTNER_ITEMS,
} from "@/data/partners";
import { useSiteNavbar } from "@/lib/use-site-navbar";
import { Button } from "@/components/atoms/Button/Button";
import { Container } from "@/components/atoms/Container/Container";
import { ContactCtaCard } from "@/components/molecules/ContactCtaCard/ContactCtaCard";
import { PartnerCard } from "@/components/molecules/PartnerCard/PartnerCard";
import { Pagination } from "@/components/molecules/Pagination/Pagination";
import { OtherSpacesSection } from "@/components/organisms/OtherSpacesSection/OtherSpacesSection";
import { PartnersIntroSection } from "@/components/organisms/PartnersIntroSection/PartnersIntroSection";
import { PromoHero } from "@/components/organisms/PromoHero/PromoHero";
import { LandingLayout } from "@/components/templates/LandingLayout/LandingLayout";

const PAGE_COUNT = Math.ceil(PARTNER_ITEMS.length / PARTNERS_PAGE_SIZE);

/** Halaman daftar Corporate Partners: hero, intro, grid kartu 3 kolom dengan paginasi, banner kontak, dan layanan lain. */
export function PartnersContent() {
  const { navbarProps } = useSiteNavbar("partners");
  const [page, setPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  const changePage = (next: number) => {
    setPage(next);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const start = (page - 1) * PARTNERS_PAGE_SIZE;
  const items = PARTNER_ITEMS.slice(start, start + PARTNERS_PAGE_SIZE);

  return (
    <LandingLayout navbarProps={navbarProps}>
      <PromoHero
        title={PARTNERS_HERO.title}
        description={PARTNERS_HERO.description}
        image={PARTNERS_HERO.image}
        overlap={false}
        action={
          <Button hierarchy="secondary-filled" size="mobile" className="mt-2 self-start">
            Learn More
          </Button>
        }
      />
      <PartnersIntroSection />

      <Container className="flex flex-col gap-8 py-8 md:gap-10 md:py-12">
        <div ref={gridRef} className="grid scroll-mt-4 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} href={`/partners/${partner.id}`} />
          ))}
        </div>
        <Pagination page={page} pageCount={PAGE_COUNT} onPageChange={changePage} />
      </Container>

      <Container className="py-6 md:py-10">
        <ContactCtaCard title={PARTNERS_CTA.title} description={PARTNERS_CTA.description} />
      </Container>

      <OtherSpacesSection title="Other Services" />
    </LandingLayout>
  );
}
