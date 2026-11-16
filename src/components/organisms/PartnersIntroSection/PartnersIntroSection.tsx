import { cn } from "@/lib/cn";
import { PARTNERS_INTRO } from "@/data/partners";
import { Container } from "@/components/atoms/Container/Container";

export interface PartnersIntroSectionProps {
  className?: string;
}

/** Intro halaman Partners: label merah + judul besar di kiri, paragraf deskripsi di kanan. */
export function PartnersIntroSection({ className }: PartnersIntroSectionProps) {
  return (
    <section className={cn("pt-12 md:pt-16", className)}>
      <Container className="grid gap-4 lg:grid-cols-2 lg:items-start lg:gap-16">
        <div className="flex flex-col gap-2">
          <p className="text-caption font-medium text-primary-800">{PARTNERS_INTRO.label}</p>
          <h2 className="max-w-xl text-heading-md font-bold leading-[1.2] text-neutral-950 md:text-heading-lg">
            {PARTNERS_INTRO.title}
          </h2>
        </div>
        <p className="text-caption leading-[1.6] text-neutral-500 md:text-body">{PARTNERS_INTRO.description}</p>
      </Container>
    </section>
  );
}
