"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { PromoItem } from "@/data/promotions";
import type { IconName } from "@/components/atoms/Icon/Icon";
import { CarouselArrows } from "@/components/molecules/CarouselArrows/CarouselArrows";
import { PromoCard } from "@/components/molecules/PromoCard/PromoCard";
import { SectionHeader } from "@/components/molecules/SectionHeader/SectionHeader";

export interface PromoCarouselSectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  icon?: IconName;
  iconClassName?: string;
  promos: PromoItem[];
  /** Awal alamat detail; id promo ditambahkan di belakangnya. */
  hrefBase?: string;
  className?: string;
}

/**
 * Section promo yang bisa digeser: 3 kartu terlihat sekaligus (1 di mobile), panah menggeser satu "halaman".
 * Panah abu-abu bila sudah di ujung.
 */
export function PromoCarouselSection({
  id,
  title,
  subtitle,
  icon,
  iconClassName,
  promos,
  hrefBase = "/promotions",
  className,
}: PromoCarouselSectionProps) {
  const scroller = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: true });

  const measure = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    setEdge({
      start: el.scrollLeft <= 1,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1,
    });
  }, []);

  useEffect(() => {
    measure();
    const el = scroller.current;
    if (!el) return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [measure, promos.length]);

  const scrollPage = (direction: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    // Jarak antar kartu 24px (gap-6) ikut dihitung agar kartu berhenti rapi di tepi kiri.
    el.scrollBy({ left: direction * (el.clientWidth + 24), behavior: "smooth" });
  };

  return (
    <section id={id} className={cn("flex flex-col gap-6", className)}>
      <SectionHeader
        title={title}
        subtitle={subtitle}
        icon={icon}
        iconClassName={iconClassName}
        className="sm:items-start"
        actions={
          <CarouselArrows
            prevDisabled={edge.start}
            nextDisabled={edge.end}
            onPrev={() => scrollPage(-1)}
            onNext={() => scrollPage(1)}
          />
        }
      />
      <div
        ref={scroller}
        onScroll={measure}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {promos.map((promo) => (
          <div key={promo.id} className="grid w-full shrink-0 snap-start sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)]">
            <PromoCard
              promo={promo}
              href={`${hrefBase}/${promo.id}`}
              unavailable={!promo.available}
              className="shadow-input"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
