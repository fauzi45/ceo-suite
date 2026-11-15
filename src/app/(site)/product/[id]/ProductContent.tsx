"use client";

import { useMemo, useState } from "react";
import { computeTotal, type ProductDetail } from "@/data/product";
import type { RoomListing } from "@/data/landing";
import { useSiteNavbar } from "@/lib/use-site-navbar";
import { Container } from "@/components/atoms/Container/Container";
import { BookingSummaryCard } from "@/components/molecules/BookingSummaryCard/BookingSummaryCard";
import { ProductBookingBar } from "@/components/organisms/ProductBookingBar/ProductBookingBar";
import { ProductDetailsSection } from "@/components/organisms/ProductDetailsSection/ProductDetailsSection";
import { ProductGallery } from "@/components/organisms/ProductGallery/ProductGallery";
import { ProductLocationSection } from "@/components/organisms/ProductLocationSection/ProductLocationSection";
import { SimilarSpacesSection } from "@/components/organisms/SimilarSpacesSection/SimilarSpacesSection";
import type { TimeRange } from "@/components/organisms/TimePicker/TimePicker";
import { LandingLayout } from "@/components/templates/LandingLayout/LandingLayout";

export interface ProductContentProps {
  product: ProductDetail;
  similar: RoomListing[];
}

/**
 * Halaman detail ruangan. Ukuran kolom mengikuti Figma (container 1600): detail 1012 + kartu booking 525
 * (jarak 64) di atas, peta lokasi selebar penuh di bawahnya.
 */
export function ProductContent({ product, similar }: ProductContentProps) {
  const { navbarProps } = useSiteNavbar();
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<TimeRange>({ start: null, end: null });
  const total = useMemo(() => computeTotal(product.rates, time), [product.rates, time]);

  return (
    <LandingLayout navbarProps={navbarProps}>
      <ProductBookingBar
        date={date}
        onDateChange={(next) => {
          setDate(next);
          if (!next) setTime({ start: null, end: null });
        }}
        time={time}
        onTimeChange={setTime}
      />
      <Container className="flex flex-col gap-8 py-8 md:gap-10 md:py-12">
        <ProductGallery photos={product.gallery} alt={product.room.name} />
        <div className="grid gap-8 lg:grid-cols-[1012fr_525fr] lg:items-start lg:gap-x-16">
          <ProductDetailsSection product={product} className="min-w-0" />
          <BookingSummaryCard date={date} time={time} total={total} className="lg:sticky lg:top-4" />
        </div>
        <ProductLocationSection product={product} />
      </Container>
      <SimilarSpacesSection rooms={similar} />
    </LandingLayout>
  );
}
