import Image from "next/image";
import { cn } from "@/lib/cn";
import { PACKAGES_INTRO, PACKAGE_FEATURES, type PackageFeature } from "@/data/packages";
import { Container } from "@/components/atoms/Container/Container";
import { FeatureItem } from "@/components/molecules/FeatureItem/FeatureItem";

export interface PackageIntroSectionProps {
  features?: PackageFeature[];
  className?: string;
}

/** Intro halaman Package: teks + logo klien di kiri, grid 3 kolom keunggulan (3 + 2) di kanan. */
export function PackageIntroSection({ features = PACKAGE_FEATURES, className }: PackageIntroSectionProps) {
  return (
    <section className={cn("py-12 md:py-20", className)}>
      <Container className="grid gap-10 lg:grid-cols-[2fr_3fr] lg:items-center lg:gap-16">
        <div className="flex flex-col gap-6">
          <h2 className="text-heading-md font-bold leading-[1.2] text-neutral-950 md:text-heading-lg">
            {PACKAGES_INTRO.title}
          </h2>
          <p className="text-caption leading-[1.6] text-neutral-500 md:text-body">{PACKAGES_INTRO.description}</p>
          <div className="flex flex-col gap-3">
            <p className="text-caption font-medium text-neutral-600">{PACKAGES_INTRO.trustedLabel}</p>
            <Image
              src={PACKAGES_INTRO.trustedLogos}
              alt={PACKAGES_INTRO.trustedLogosAlt}
              width={560}
              height={40}
              unoptimized
              className="h-8 w-auto self-start md:h-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureItem key={feature.id} feature={feature} />
          ))}
        </div>
      </Container>
    </section>
  );
}
