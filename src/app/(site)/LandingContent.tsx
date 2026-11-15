"use client";

import { useRouter } from "next/navigation";
import { buildSearchHref } from "@/lib/search-params";
import { useSiteNavbar } from "@/lib/use-site-navbar";
import { AppDownloadSection } from "@/components/organisms/AppDownloadSection/AppDownloadSection";
import { BestDealsSection } from "@/components/organisms/BestDealsSection/BestDealsSection";
import { BrowseSpacesSection } from "@/components/organisms/BrowseSpacesSection/BrowseSpacesSection";
import { FaqSection } from "@/components/organisms/FaqSection/FaqSection";
import { HeroBanner } from "@/components/organisms/HeroBanner/HeroBanner";
import { HeroSearch } from "@/components/organisms/HeroSearch/HeroSearch";
import { MeetingPackageSection } from "@/components/organisms/MeetingPackageSection/MeetingPackageSection";
import { NewsSection } from "@/components/organisms/NewsSection/NewsSection";
import { PartnersSection } from "@/components/organisms/PartnersSection/PartnersSection";
import { PromotionsSection } from "@/components/organisms/PromotionsSection/PromotionsSection";
import { RecommendedSection } from "@/components/organisms/RecommendedSection/RecommendedSection";
import { StatsSection } from "@/components/organisms/StatsSection/StatsSection";
import { TrustedBySection } from "@/components/organisms/TrustedBySection/TrustedBySection";
import type { SpaceSearchFormProps } from "@/components/organisms/SpaceSearchForm/SpaceSearchForm";
import { LandingLayout } from "@/components/templates/LandingLayout/LandingLayout";

/**
 * Landing page dengan dua versi:
 * - belum login: hero pencarian + 12 section lengkap
 * - sudah login: hero banner + Recommended, Promotions, Best Deals
 * Status login dibaca dari localStorage (client), jadi render pertama selalu versi belum login.
 */
export function LandingContent() {
  const router = useRouter();
  const { navbarProps, isLoggedIn } = useSiteNavbar();
  const onSearch: SpaceSearchFormProps["onSearch"] = (criteria) => router.push(buildSearchHref(criteria));

  return (
    <LandingLayout navbarProps={navbarProps}>
      {isLoggedIn ? (
        <>
          <HeroBanner onSearch={onSearch} />
          <RecommendedSection />
          <PromotionsSection onSeeAll={() => router.push("/promotions")} />
          <BestDealsSection onSeeAll={() => router.push("/promotions?category=best-deals")} />
        </>
      ) : (
        <>
          <HeroSearch onSearch={onSearch} />
          <BrowseSpacesSection />
          <RecommendedSection />
          <StatsSection />
          <PromotionsSection onSeeAll={() => router.push("/promotions")} />
          <BestDealsSection onSeeAll={() => router.push("/promotions?category=best-deals")} />
          <MeetingPackageSection />
          <PartnersSection />
          <TrustedBySection />
          <NewsSection />
          <FaqSection />
          <AppDownloadSection />
        </>
      )}
    </LandingLayout>
  );
}
