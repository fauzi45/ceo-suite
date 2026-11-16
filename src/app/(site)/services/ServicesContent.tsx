"use client";

import { SERVICES_HERO } from "@/data/services";
import { useSiteNavbar } from "@/lib/use-site-navbar";
import { Button } from "@/components/atoms/Button/Button";
import { OtherSpacesSection } from "@/components/organisms/OtherSpacesSection/OtherSpacesSection";
import { PromoHero } from "@/components/organisms/PromoHero/PromoHero";
import { ServiceIntroSection } from "@/components/organisms/ServiceIntroSection/ServiceIntroSection";
import { ServicesSection } from "@/components/organisms/ServicesSection/ServicesSection";
import { LandingLayout } from "@/components/templates/LandingLayout/LandingLayout";

const SERVICES_ID = "our-services";

/** Halaman Services: hero + "Book Now" (menggulir ke daftar layanan), keunggulan, layanan, dan ruang lainnya. */
export function ServicesContent() {
  const { navbarProps } = useSiteNavbar("services");

  const scrollToServices = () => {
    document.getElementById(SERVICES_ID)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <LandingLayout navbarProps={navbarProps}>
      <PromoHero
        title={SERVICES_HERO.title}
        description={SERVICES_HERO.description}
        image={SERVICES_HERO.image}
        tone="900"
        overlap={false}
        action={
          <Button hierarchy="secondary-filled" size="mobile" onClick={scrollToServices} className="mt-2 self-start">
            Book Now
          </Button>
        }
      />
      <ServiceIntroSection />
      <ServicesSection id={SERVICES_ID} />
      <OtherSpacesSection title="Other Services" />
    </LandingLayout>
  );
}
