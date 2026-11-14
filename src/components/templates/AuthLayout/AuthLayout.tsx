import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface AuthLayoutProps {
  children: ReactNode;
  className?: string;
}

/**
 * Layout halaman auth (login, sign up): latar terang dengan glow merah muda
 * di atas, konten satu kolom terpusat (maks 480px, margin 16px di mobile).
 */
export function AuthLayout({ children, className }: AuthLayoutProps) {
  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-neutral-25">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(ellipse_at_top,var(--color-primary-100),transparent_70%)] opacity-70"
      />
      <main
        className={cn(
          "relative mx-auto flex w-full max-w-154 flex-col gap-10 px-4 pb-12 pt-12 md:pt-16",
          className,
        )}
      >
        {children}
      </main>
    </div>
  );
}
