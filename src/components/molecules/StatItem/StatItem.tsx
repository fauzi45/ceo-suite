import { cn } from "@/lib/cn";
import type { Stat } from "@/data/landing";
import { Icon } from "@/components/atoms/Icon/Icon";

export interface StatItemProps {
  stat: Pick<Stat, "icon" | "value" | "label">;
  className?: string;
}

/** Satu statistik: icon, angka besar, dan keterangan. */
export function StatItem({ stat, className }: StatItemProps) {
  return (
    <div className={cn("flex items-start gap-3", className)}>
      <Icon name={stat.icon} size={32} className="mt-1 shrink-0 text-primary-950" />
      <div className="flex flex-col">
        <span className="text-heading-md font-bold leading-[1.2] text-primary-950 md:text-heading-lg">
          {stat.value}
        </span>
        <span className="text-caption text-neutral-500">{stat.label}</span>
      </div>
    </div>
  );
}
