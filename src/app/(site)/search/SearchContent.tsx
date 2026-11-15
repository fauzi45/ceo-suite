"use client";

import { useSearchParams } from "next/navigation";
import { CITY_OPTIONS } from "@/data/landing";
import { parseSearchParams } from "@/lib/search-params";
import { useSiteNavbar } from "@/lib/use-site-navbar";
import { OtherSpacesSection } from "@/components/organisms/OtherSpacesSection/OtherSpacesSection";
import { SearchResultsSection } from "@/components/organisms/SearchResultsSection/SearchResultsSection";
import { LandingLayout } from "@/components/templates/LandingLayout/LandingLayout";

/** Halaman Search Results. Sama untuk pengguna login maupun belum login (hanya Navbar yang berbeda). */
export function SearchContent() {
  const params = useSearchParams();
  const { navbarProps } = useSiteNavbar();

  return (
    <LandingLayout navbarProps={navbarProps}>
      <SearchResultsSection initialCriteria={parseSearchParams(params, CITY_OPTIONS[0])} />
      <OtherSpacesSection />
    </LandingLayout>
  );
}
