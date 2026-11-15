"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { OTHER_SPACES, type OtherSpace } from "@/data/landing";
import { ROOM_TYPE_ICONS } from "@/components/atoms/Chip/Chip";
import { Button } from "@/components/atoms/Button/Button";
import { Container } from "@/components/atoms/Container/Container";
import { Icon } from "@/components/atoms/Icon/Icon";
import { SpaceCategoryCard } from "@/components/molecules/SpaceCategoryCard/SpaceCategoryCard";

export interface OtherSpacesSectionProps {
  spaces?: OtherSpace[];
  className?: string;
}

/** "Other Spaces": judul + panah kiri/kanan, lalu baris kartu kategori yang digulir horizontal. */
export function OtherSpacesSection({ spaces = OTHER_SPACES, className }: OtherSpacesSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const updateEdge = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setEdge({
      start: track.scrollLeft <= 1,
      end: track.scrollLeft + track.clientWidth >= track.scrollWidth - 1,
    });
  }, []);

  useEffect(() => {
    updateEdge();
    window.addEventListener("resize", updateEdge);
    return () => window.removeEventListener("resize", updateEdge);
  }, [updateEdge]);

  const scrollBy = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className={cn("py-10 md:py-16", className)}>
      <Container className="flex flex-col gap-6 md:gap-8">
        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-heading-md font-bold leading-[1.2] text-neutral-950 md:text-heading-lg">
              Other Spaces
            </h2>
            <p className="text-caption text-neutral-500 md:text-body">
              Find the perfect space for your next meeting or event.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              size="mobile"
              aria-label="Previous spaces"
              disabled={edge.start}
              onClick={() => scrollBy(-1)}
              className="w-10 !px-0"
            >
              <Icon name="arrow-left" size={20} />
            </Button>
            <Button
              size="mobile"
              aria-label="Next spaces"
              disabled={edge.end}
              onClick={() => scrollBy(1)}
              className="w-10 !px-0"
            >
              <Icon name="arrow-left" size={20} className="rotate-180" />
            </Button>
          </div>
        </div>

        <div
          ref={trackRef}
          onScroll={updateEdge}
          className="flex snap-x gap-4 overflow-x-auto pb-2 [scrollbar-width:none] md:gap-6 [&::-webkit-scrollbar]:hidden"
        >
          {spaces.map((space) => (
            <SpaceCategoryCard
              key={space.id}
              label={space.label}
              icon={ROOM_TYPE_ICONS[space.roomType]}
              image={space.image}
              showMarker={space.needsMarker}
              className="w-44 shrink-0 snap-start md:w-56"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
