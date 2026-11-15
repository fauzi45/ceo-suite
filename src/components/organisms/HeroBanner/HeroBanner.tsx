"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { HERO_IMAGE, LOCATION_OPTIONS, PROMOTIONS } from "@/data/landing";
import { Container } from "@/components/atoms/Container/Container";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Photo } from "@/components/atoms/Photo/Photo";
import { SpaceSearchForm, type SpaceSearchFormProps } from "@/components/organisms/SpaceSearchForm/SpaceSearchForm";

export interface HeroBannerProps {
  /** Foto tiap slide. Tanpa ini tampil 3 placeholder. */
  slides?: { id: string; image?: string }[];
  onSearch?: SpaceSearchFormProps["onSearch"];
  className?: string;
}

const DEFAULT_SLIDES = [
  { id: "slide-1", image: HERO_IMAGE },
  { id: "slide-2", image: PROMOTIONS[0].image },
  { id: "slide-3", image: PROMOTIONS[2].image },
];

/**
 * Hero versi login: banner foto penuh dengan carousel (panah + titik), judul di tengah,
 * dan bar pencarian putih di bawahnya.
 */
export function HeroBanner({ slides = DEFAULT_SLIDES, onSearch, className }: HeroBannerProps) {
  const [index, setIndex] = useState(0);
  const go = (next: number) => setIndex((next + slides.length) % slides.length);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured workspaces"
      className={cn("relative isolate", className)}
    >
      <div className="absolute inset-0 -z-10">
        <Photo
          src={slides[index].image}
          alt=""
          priority
          sizes="100vw"
          className="size-full"
        />
        <div className="absolute inset-0 bg-neutral-1000/65" />
      </div>

      <Container className="flex flex-col items-center gap-6 py-12 text-center text-white md:gap-8 md:py-20">
        <div className="flex flex-col gap-3">
          <h1 className="text-heading-lg font-bold leading-[1.2] md:text-display-sm">
            <span className="underline decoration-primary-400 decoration-4 underline-offset-8">
              Elevate Your Workspace
            </span>{" "}
            with Premium Work Places.
          </h1>
          <p className="text-caption md:text-body">
            Discover the next generation of workspaces with our cutting-edge work places.
          </p>
        </div>

        <SpaceSearchForm
          variant="bar"
          locationLabel="Select Location"
          locationOptions={LOCATION_OPTIONS}
          onSearch={onSearch}
          className="w-full max-w-6xl text-left text-neutral-900"
        />

        <div className="flex items-center gap-2" role="group" aria-label="Choose slide">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Slide ${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={cn(
                "size-2.5 rounded-full transition-colors outline-none focus-visible:ring-4 focus-visible:ring-white/50",
                i === index ? "bg-primary-600" : "bg-white/60 hover:bg-white",
              )}
            />
          ))}
        </div>
      </Container>

      {(["prev", "next"] as const).map((direction) => (
        <button
          key={direction}
          type="button"
          aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
          onClick={() => go(direction === "prev" ? index - 1 : index + 1)}
          className={cn(
            "absolute top-1/2 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white outline-none transition-colors hover:bg-white/40 focus-visible:ring-4 focus-visible:ring-white/50 md:inline-flex",
            direction === "prev" ? "left-4 xl:left-10" : "right-4 xl:right-10",
          )}
        >
          <Icon name={direction === "prev" ? "chevron-left" : "chevron-right"} size={24} />
        </button>
      ))}
    </section>
  );
}
