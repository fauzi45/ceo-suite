import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Button, type ButtonHierarchy } from "@/components/atoms/Button/Button";
import { Icon, type IconName } from "@/components/atoms/Icon/Icon";

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  /** Icon bulat merah muda di kiri judul (Promotions, Best Deals). */
  icon?: IconName;
  /** Warna lingkaran + icon (default merah muda). Mis. `bg-teal-50 text-teal-600`. */
  iconClassName?: string;
  /** Teks tombol di kanan (mis. "See All"). Tombol hanya tampil jika diisi. */
  actionLabel?: string;
  /** Icon di kiri teks tombol (mis. "filter"). */
  actionIcon?: IconName;
  /** Gaya tombol aksi. Default `secondary-filled` (See All); Filter memakai `secondary-white`. */
  actionHierarchy?: ButtonHierarchy;
  onAction?: () => void;
  /** Elemen bebas di kanan (mis. panah carousel), tampil setelah tombol aksi. */
  actions?: ReactNode;
  className?: string;
}

/** Judul section + subjudul, dengan tombol aksi opsional (turun ke bawah di mobile). */
export function SectionHeader({
  title,
  subtitle,
  icon,
  iconClassName = "bg-primary-100 text-primary-600",
  actionLabel,
  actionIcon,
  actionHierarchy = "secondary-filled",
  onAction,
  actions,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="flex flex-col gap-2">
        <h2 className="flex items-center gap-3 text-heading-md font-bold leading-[1.2] text-neutral-950 md:text-heading-lg">
          {icon && (
            <span
              aria-hidden="true"
              className={cn("inline-flex size-8 shrink-0 items-center justify-center rounded-full", iconClassName)}
            >
              <Icon name={icon} size={18} />
            </span>
          )}
          {title}
        </h2>
        {subtitle && <p className="text-caption text-neutral-500 md:text-body">{subtitle}</p>}
      </div>
      {actionLabel && (
        <Button
          hierarchy={actionHierarchy}
          size="mobile"
          iconLeft={actionIcon}
          onClick={onAction}
          className="self-start"
        >
          {actionLabel}
        </Button>
      )}
      {actions}
    </div>
  );
}
