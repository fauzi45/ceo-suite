import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type ContainerProps = HTMLAttributes<HTMLDivElement>;

/** Lebar konten halaman: maks 1920px, margin samping 16px (mobile) sampai 160px (desktop lebar). */
export function Container({ className, ...rest }: ContainerProps) {
  return <div className={cn("mx-auto w-full max-w-480 px-4 sm:px-8 xl:px-40", className)} {...rest} />;
}
