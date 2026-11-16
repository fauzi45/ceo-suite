import Image from "next/image";
import { cn } from "@/lib/cn";
import { SERVICES_INTRO, SERVICE_FEATURES, type ServiceFeature } from "@/data/services";
import { Container } from "@/components/atoms/Container/Container";
import { FeatureItem } from "@/components/molecules/FeatureItem/FeatureItem";

export interface ServiceIntroSectionProps {
  features?: ServiceFeature[];
  className?: string;
}

/** "Streamline Your Business Operations": teks + logo klien di kiri, grid 2x2 keunggulan di kanan. */
export function ServiceIntroSection({ features = SERVICE_FEATURES, className }: ServiceIntroSectionProps) {
  return (
    <section className={cn("py-12 md:py-20", className)}>
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="flex flex-col gap-6">
          <h2 className="text-heading-md font-bold leading-[1.2] text-neutral-950 md:text-heading-lg">
            {SERVICES_INTRO.title}
          </h2>
          <p className="text-caption leading-[1.6] text-neutral-500 md:text-body">{SERVICES_INTRO.description}</p>
          <div className="flex flex-col gap-3">
            <p className="text-caption font-medium text-neutral-600">{SERVICES_INTRO.trustedLabel}</p>
            <Image
              src={SERVICES_INTRO.trustedLogos}
              alt={SERVICES_INTRO.trustedLogosAlt}
              width={560}
              height={40}
              unoptimized
              className="h-8 w-auto self-start md:h-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
          {features.map((feature) => (
            <FeatureItem key={feature.id} feature={feature} />
          ))}
        </div>
      </Container>
    </section>
  );
}
