import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/atoms/Logo/Logo";

export interface AuthHeaderProps {
  title: string;
  subtitle?: ReactNode;
  /** `lg` untuk login/sign up, `md` untuk layar verifikasi. */
  titleSize?: "lg" | "md";
  /** `wide` = jarak logo ke judul lebih lebar (layar verifikasi). */
  spacing?: "default" | "wide";
  className?: string;
}

const titleSizes = {
  lg: "text-heading-md md:text-heading-lg",
  md: "text-heading-sm md:text-heading-md",
} as const;

const spacings = {
  default: "gap-8 md:gap-24",
  wide: "gap-12 md:gap-60",
} as const;

/** Logo + judul + subjudul di atas form login/sign up/verifikasi (rata tengah). */
export function AuthHeader({
  title,
  subtitle,
  titleSize = "lg",
  spacing = "default",
  className,
}: AuthHeaderProps) {
  return (
    <header className={cn("flex flex-col items-center text-center", spacings[spacing], className)}>
      <Logo height={40} />
      <div className="flex flex-col items-center gap-2">
        <h1 className={cn("font-bold text-neutral-950", titleSizes[titleSize])}>{title}</h1>
        {subtitle && <p className="text-caption text-neutral-600">{subtitle}</p>}
      </div>
    </header>
  );
}
