"use client";

import { CITY_OPTIONS } from "@/data/landing";
import type { SpaceCategoryPage } from "@/data/categories";
import { useSiteNavbar } from "@/lib/use-site-navbar";
import { CategoryHero } from "@/components/organisms/CategoryHero/CategoryHero";
import { OtherSpacesSection } from "@/components/organisms/OtherSpacesSection/OtherSpacesSection";
import { SearchResultsSection } from "@/components/organisms/SearchResultsSection/SearchResultsSection";
import { ServiceIntroSection } from "@/components/organisms/ServiceIntroSection/ServiceIntroSection";
import { LandingLayout } from "@/components/templates/LandingLayout/LandingLayout";

const LISTING_ID = "space-listing";

export interface CategoryContentProps {
  page: SpaceCategoryPage;
}

/**
 * Halaman kategori ruang: hero + "Book Now" (menggulir ke daftar), intro dengan 4 keunggulan (sudut atas
 * membulat menimpa hero), daftar ruang dengan peta, dan "Other Spaces". Halaman "All Spaces" tanpa intro.
 */
export function CategoryContent({ page }: CategoryContentProps) {
  const { navbarProps } = useSiteNavbar();

  const scrollToListing = () => {
    document.getElementById(LISTING_ID)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <LandingLayout navbarProps={navbarProps}>
      <CategoryHero title={page.title} tagline={page.tagline} image={page.heroImage} onAction={scrollToListing} />
      {page.intro && (
        <ServiceIntroSection
          title={page.intro.title}
          description={page.intro.description}
          features={page.intro.features}
          className="relative -mt-8 rounded-t-[2rem] bg-white md:py-32"
        />
      )}
      <SearchResultsSection
        id={LISTING_ID}
        heading={null}
        listTitle={page.listTitle}
        listSubtitle={page.listSubtitle}
        roomTypes={page.roomTypes}
        syncUrl={false}
        initialCriteria={{ location: CITY_OPTIONS[0], region: "All", dates: { start: null, end: null }, spaceTypes: [] }}
        className={page.intro ? "md:py-16" : "relative -mt-8 rounded-t-[2rem] bg-white md:py-16"}
      />
      <OtherSpacesSection />
    </LandingLayout>
  );
}
