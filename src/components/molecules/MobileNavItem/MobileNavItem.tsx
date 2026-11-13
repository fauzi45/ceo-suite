import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "@/components/atoms/Icon/Icon";

export type MobileNavSize = "mobile" | "tab";

export interface MobileNavItemProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** Icon versi outline (state off). */
  icon: IconName;
  /** Icon versi filled (state on). Default memakai `icon`. */
  activeIcon?: IconName;
  label: ReactNode;
  active?: boolean;
  /** `mobile` = label 10px, `tab` = label 13px. */
  size?: MobileNavSize;
}

/**
 * Item bottom navigation: icon 24 + label, vertikal, padding atas 12 bawah 16, gap 4.
 * on: primary/800 Bold, off: grey/600 Medium.
 */
export function MobileNavItem({
  icon,
  activeIcon,
  label,
  active = false,
  size = "mobile",
  className,
  ...rest
}: MobileNavItemProps) {
  return (
    <button
      type="button"
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex flex-1 flex-col items-center gap-1 pb-4 pt-3 leading-[1.2] transition-colors outline-none focus-visible:ring-4 focus-visible:ring-primary-100",
        size === "mobile" ? "text-tiny" : "text-caption",
        active ? "font-bold text-primary-800" : "font-medium text-neutral-600 hover:text-primary-800",
        className,
      )}
      {...rest}
    >
      <Icon name={active ? (activeIcon ?? icon) : icon} size={24} />
      <span>{label}</span>
    </button>
  );
}
