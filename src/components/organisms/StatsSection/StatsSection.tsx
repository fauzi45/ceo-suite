import { cn } from "@/lib/cn";
import { STATS, WHY_CEO_SUITE } from "@/data/landing";
import { Container } from "@/components/atoms/Container/Container";
import { StatItem } from "@/components/molecules/StatItem/StatItem";

export interface StatsSectionProps {
  className?: string;
}

/** Statistik perusahaan (kiri) dan kartu merah "Why CEO SUITE?" (kanan); bertumpuk di mobile. */
export function StatsSection({ className }: StatsSectionProps) {
  return (
    <section className={cn("py-10 md:py-16", className)}>
      <Container className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:gap-y-12">
          {STATS.map((stat) => (
            <StatItem key={stat.id} stat={stat} />
          ))}
        </div>

        <div className="flex flex-col gap-4 rounded-lg bg-primary-800 p-6 text-white md:p-10">
          <p className="flex items-center gap-4 text-caption font-medium">
            {WHY_CEO_SUITE.eyebrow}
            <span aria-hidden="true" className="h-px w-16 bg-white/70" />
          </p>
          <h2 className="text-heading-md font-bold leading-[1.2] md:text-heading-lg">
            {WHY_CEO_SUITE.title}
          </h2>
          {WHY_CEO_SUITE.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-caption leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </Container>
    </section>
  );
}
