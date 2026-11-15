"use client";

import type { PromoItem } from "@/data/promotions";
import { useSiteNavbar } from "@/lib/use-site-navbar";
import { Container } from "@/components/atoms/Container/Container";
import { Photo } from "@/components/atoms/Photo/Photo";
import { Breadcrumb } from "@/components/molecules/Breadcrumb/Breadcrumb";
import { PromoCodeCard } from "@/components/molecules/PromoCodeCard/PromoCodeCard";
import { ShareCard } from "@/components/molecules/ShareCard/ShareCard";
import { PromoDetailSection } from "@/components/organisms/PromoDetailSection/PromoDetailSection";
import { LandingLayout } from "@/components/templates/LandingLayout/LandingLayout";

export interface PromoDetailContentProps {
  promo: PromoItem;
}

/**
 * Halaman detail promo. Kolom mengikuti Figma (container 1600): isi 1012 + kartu kode/bagikan 525 (jarak 64),
 * seperti halaman Product.
 */
export function PromoDetailContent({ promo }: PromoDetailContentProps) {
  const { navbarProps } = useSiteNavbar("promotions");

  return (
    <LandingLayout navbarProps={navbarProps}>
      <Container className="flex flex-col gap-6 py-6 md:gap-8 md:py-8">
        <Breadcrumb
          items={[{ label: "Promotions & Deals!", href: "/promotions" }, { label: "Promo Details" }]}
        />
        <Photo
          src={promo.banner ?? promo.image}
          alt={promo.title}
          priority
          sizes="(min-width: 1920px) 1600px, 100vw"
          className="aspect-[16/7] rounded-2xl md:aspect-[16/5]"
        />
        <div className="grid gap-8 pb-8 lg:grid-cols-[1012fr_525fr] lg:items-start lg:gap-x-16 lg:pb-12">
          <PromoDetailSection promo={promo} className="min-w-0" />
          <div className="flex flex-col gap-6 lg:sticky lg:top-4">
            <PromoCodeCard code={promo.code} />
            <ShareCard title={promo.title} />
          </div>
        </div>
      </Container>
    </LandingLayout>
  );
}
