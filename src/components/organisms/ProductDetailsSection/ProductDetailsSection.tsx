import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { ProductDetail } from "@/data/product";
import { RoomTypeChip } from "@/components/atoms/Chip/Chip";
import { Icon } from "@/components/atoms/Icon/Icon";
import { AddOnCard } from "@/components/molecules/AddOnCard/AddOnCard";
import { PriceSummary } from "@/components/molecules/PriceSummary/PriceSummary";

export interface ProductDetailsSectionProps {
  product: ProductDetail;
  className?: string;
}

function Block({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3 border-t border-neutral-100 pt-6 first:border-0 first:pt-0">
      <div className="flex flex-col gap-1">
        <h2 className="text-body font-bold leading-[1.2] text-neutral-950 md:text-heading-sm">{title}</h2>
        {subtitle && <p className="text-caption text-neutral-500">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

/** Kolom kiri halaman detail ruangan: judul, rating, harga, detail, dan add-on (peta ada di `ProductLocationSection`). */
export function ProductDetailsSection({ product, className }: ProductDetailsSectionProps) {
  const { room, rating, locationLabel, description, rates, bestDeal, addOns } = product;
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <header className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-heading-md font-bold leading-[1.2] text-neutral-950 md:text-heading-lg">{room.name}</h1>
          <span className="flex shrink-0 items-center gap-1 text-caption font-medium text-neutral-700">
            <span aria-hidden className="text-warning-500">★</span>
            {rating.toFixed(1)}/5
          </span>
        </div>
        <RoomTypeChip roomType={room.roomType} className="self-start" />
        <div className="flex flex-wrap items-center justify-between gap-2 text-caption text-neutral-500">
          <span className="flex items-center gap-2">
            <Icon name="map-pin" size={16} />
            {locationLabel}
          </span>
          <span className="flex items-center gap-2">
            <Icon name="customers" size={16} />
            {room.people} People
          </span>
        </div>
      </header>

      <Block title="Price">
        <PriceSummary rates={rates} bestDeal={bestDeal} />
      </Block>
      <Block title="Details">
        <p className="text-caption text-neutral-600 md:text-body">{description}</p>
      </Block>
      <Block
        title="Add Ons"
        subtitle="Enhance your booking experience with a variety of add-ons, including catering, equipment rentals, and personalized services."
      >
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
          {addOns.map((addOn) => (
            <AddOnCard key={addOn.id} addOn={addOn} />
          ))}
        </div>
      </Block>
    </div>
  );
}
