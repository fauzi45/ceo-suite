import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "@/components/atoms/Icon/Icon";

export interface OfficeTypeTabProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  icon: IconName;
  label: ReactNode;
  active?: boolean;
}

/**
 * Tab kategori ruangan ("Office type" di Figma): icon 24 + label 10px Medium,
 * aktif = primary/800 dengan garis bawah 2px, tidak aktif = grey/400.
 */
export function OfficeTypeTab({ icon, label, active = false, className, ...rest }: OfficeTypeTabProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      className={cn(
        "flex min-w-[72px] flex-col items-center gap-2 px-2 pt-2 text-tiny font-medium leading-[1.2] transition-colors outline-none focus-visible:ring-4 focus-visible:ring-primary-100",
        active ? "text-primary-800" : "text-neutral-400 hover:text-neutral-600",
        className,
      )}
      {...rest}
    >
      <Icon name={icon} size={24} />
      <span className="whitespace-nowrap">{label}</span>
      <span
        aria-hidden
        className={cn("mt-1 h-0.5 w-full rounded-full", active ? "bg-primary-800" : "bg-transparent")}
      />
    </button>
  );
}
