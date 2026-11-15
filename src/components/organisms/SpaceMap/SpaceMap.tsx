"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/cn";
import type { RoomListing } from "@/data/landing";

export interface SpaceMapProps {
  /** Ruangan yang diberi pin (yang tanpa `lat`/`lng` dilewati). */
  rooms: RoomListing[];
  /** Id ruangan yang disorot (pin hijau). */
  activeId?: string | null;
  onSelect?: (id: string) => void;
  /** Titik tengah ([lat, lng]) saat belum ada pin. */
  center?: [number, number];
  /** Beri tinggi lewat class (mis. `h-80`). */
  className?: string;
}

const Canvas = dynamic(() => import("./SpaceMapCanvas"), {
  ssr: false,
  loading: () => <div className="size-full animate-pulse bg-neutral-100" />,
});

/** Peta ruangan (Leaflet + OpenStreetMap). Leaflet butuh `window`, jadi hanya dimuat di browser. */
export function SpaceMap({ className, ...props }: SpaceMapProps) {
  return (
    <div className={cn("relative isolate overflow-hidden bg-neutral-100", className)}>
      <Canvas {...props} />
    </div>
  );
}
