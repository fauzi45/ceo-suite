import Image from "next/image";
import { cn } from "@/lib/cn";

export interface LogoProps {
  /** Tinggi logo dalam px. Lebar mengikuti rasio asli (1014x246). */
  height?: number;
  className?: string;
}

const RATIO = 1014 / 246;

/** Logo CEO SUITE (raster dari Figma, `public/logos/ceo-suite.png`). */
export function Logo({ height = 32, className }: LogoProps) {
  const width = Math.round(height * RATIO);
  return (
    <Image
      src="/logos/ceo-suite.png"
      alt="CEO Suite, first choice for global workplace"
      width={width}
      height={height}
      priority
      className={cn("h-auto", className)}
      style={{ width, height }}
    />
  );
}
