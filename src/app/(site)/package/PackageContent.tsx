"use client";

import { useRouter } from "next/navigation";
import { PACKAGES_HERO, buildPackageBookingHref } from "@/data/packages";
import { useSiteNavbar } from "@/lib/use-site-navbar";
import { Button } from "@/components/atoms/Button/Button";
import { OtherSpacesSection } from "@/components/organisms/OtherSpacesSection/OtherSpacesSection";
import { PackageBrowseSection } from "@/components/organisms/PackageBrowseSection/PackageBrowseSection";
import { PackageIntroSection } from "@/components/organisms/PackageIntroSection/PackageIntroSection";
import { PromoHero } from "@/components/organisms/PromoHero/PromoHero";
import { LandingLayout } from "@/components/templates/LandingLayout/LandingLayout";

const BROWSE_ID = "browse-packages";

/** Halaman Meeting Room Package: hero + "Book Now" (menggulir ke daftar), keunggulan, daftar paket, dan layanan lain. */
export function PackageContent() {
  const router = useRouter();
  const { navbarProps } = useSiteNavbar("package");

  const scrollToBrowse = () => {
    document.getElementById(BROWSE_ID)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <LandingLayout navbarProps={navbarProps}>
      <PromoHero
        title={PACKAGES_HERO.title}
        description={PACKAGES_HERO.description}
        image={PACKAGES_HERO.image}
        tone="900"
        overlap={false}
        action={
          <Button hierarchy="secondary-filled" size="mobile" onClick={scrollToBrowse} className="mt-2 self-start">
            Book Now
          </Button>
        }
      />
      <PackageIntroSection />
      <PackageBrowseSection
        id={BROWSE_ID}
        onBook={(item, startDate) => router.push(buildPackageBookingHref(item.id, startDate ?? new Date()))}
      />
      <OtherSpacesSection title="Other Services" />
    </LandingLayout>
  );
}
