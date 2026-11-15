import { cn } from "@/lib/cn";
import type { ProductDetail } from "@/data/product";
import { SpaceMap } from "@/components/organisms/SpaceMap/SpaceMap";

export interface ProductLocationSectionProps {
  product: ProductDetail;
  className?: string;
}

/** "Location": peta selebar penuh (Figma 1600x430) dengan satu pin, lalu nama dan alamat tempat. */
export function ProductLocationSection({ product, className }: ProductLocationSectionProps) {
  const { room, locationLabel, address } = product;
  return (
    <section className={cn("flex flex-col gap-3", className)}>
      <h2 className="text-body font-bold leading-[1.2] text-neutral-950 md:text-heading-sm">Location</h2>
      <SpaceMap
        rooms={[room]}
        activeId={room.id}
        center={[room.lat, room.lng]}
        className="h-64 rounded-lg md:h-[430px]"
      />
      <div className="flex flex-col gap-1">
        <span className="text-caption font-medium text-neutral-900">{locationLabel}</span>
        <span className="text-caption text-neutral-500">{address}</span>
      </div>
    </section>
  );
}
