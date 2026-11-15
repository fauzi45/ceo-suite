import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { IconName } from "@/components/atoms/Icon/Icon";
import { SectionHeader } from "@/components/molecules/SectionHeader/SectionHeader";

export interface PromoGridSectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  icon?: IconName;
  iconClassName?: string;
  /** Kartu-kartunya (PromoCard / DealCard). */
  children: ReactNode;
  className?: string;
}

/** Section daftar promo: judul + grid 3 kolom (1 kolom di mobile, 2 di sm) dengan jarak 24. */
export function PromoGridSection({ id, title, subtitle, icon, iconClassName, children, className }: PromoGridSectionProps) {
  return (
    <section id={id} className={cn("flex flex-col gap-6", className)}>
      <SectionHeader title={title} subtitle={subtitle} icon={icon} iconClassName={iconClassName} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
    </section>
  );
}
