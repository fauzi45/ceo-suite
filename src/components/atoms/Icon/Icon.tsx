import type { CSSProperties, HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/** Nama file SVG di `public/icons/` (tanpa ekstensi). */
export const ICON_NAMES = [
  "home",
  "home-outline",
  "seal-percent",
  "seal-percent-fill",
  "receipt",
  "receipt-fill",
  "profile",
  "profile-fill",
  "chevron-down",
  "chevron-up",
  "chevron-left",
  "chevron-right",
  "chevron-double-left",
  "chevron-double-right",
  "plus",
  "minus",
  "checklist",
  "checklist-fill",
  "eye",
  "eye-off",
  "map-pin",
  "menu",
  "filter",
  "chat",
  "city",
  "pin-radius",
  "briefcase",
  "office-building",
  "handshake",
  "apple",
  "google-play",
  "download",
  "check",
  "check-small",
  "grid",
  "share",
  "print",
  "close",
  "copy",
  "arrow-left",
  "loading",
  "publish",
  "whatsapp",
  "search",
  "clock",
  "calendar",
  "mail",
  "alert-circle",
  "trash",
  "edit",
  "dashboard",
  "admin",
  "customers",
  "add-ons",
  "promo",
  "cms",
  "office",
  "pricing",
  "wallet",
  "logout",
  "room-all",
  "room-meeting",
  "room-office",
  "room-coworking",
  "room-board",
  "room-class",
  "room-seminar",
  "room-theatre",
  "room-combined",
  "dot",
] as const;

export type IconName = (typeof ICON_NAMES)[number];

export interface IconProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  name: IconName;
  /** Ukuran dalam px. Default 24 (ukuran icon di Figma). */
  size?: number;
  /** Label aksesibilitas. Tanpa label, icon dianggap dekoratif. */
  label?: string;
}

/**
 * Icon monokrom dari `public/icons/*.svg`.
 * Dirender lewat CSS mask supaya warnanya mengikuti `currentColor`
 * (atur lewat class `text-*`).
 */
export function Icon({ name, size = 24, label, className, style, ...rest }: IconProps) {
  const maskStyle: CSSProperties = {
    width: size,
    height: size,
    WebkitMaskImage: `url(/icons/${name}.svg)`,
    maskImage: `url(/icons/${name}.svg)`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    backgroundColor: "currentColor",
    ...style,
  };

  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn("inline-block shrink-0 align-middle", className)}
      style={maskStyle}
      {...rest}
    />
  );
}
