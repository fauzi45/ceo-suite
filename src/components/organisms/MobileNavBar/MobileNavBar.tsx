import { cn } from "@/lib/cn";
import type { IconName } from "@/components/atoms/Icon/Icon";
import { MobileNavItem, type MobileNavSize } from "@/components/molecules/MobileNavItem/MobileNavItem";

export interface MobileNavEntry {
  id: string;
  label: string;
  icon: IconName;
  activeIcon?: IconName;
}

/** Tiga item versi mobile (360px) di Figma. */
export const MOBILE_NAV_ITEMS: MobileNavEntry[] = [
  { id: "home", label: "Home", icon: "home-outline", activeIcon: "home" },
  { id: "booking", label: "Booking", icon: "receipt", activeIcon: "receipt-fill" },
  { id: "profile", label: "Profile", icon: "profile", activeIcon: "profile-fill" },
];

/** Empat item versi tablet (744px) di Figma. */
export const TAB_NAV_ITEMS: MobileNavEntry[] = [
  { id: "home", label: "Home", icon: "home-outline", activeIcon: "home" },
  { id: "wallet", label: "Wallet", icon: "wallet" },
  { id: "booking", label: "Booking", icon: "receipt", activeIcon: "receipt-fill" },
  { id: "profile", label: "Profile", icon: "profile", activeIcon: "profile-fill" },
];

export interface MobileNavBarProps {
  items?: MobileNavEntry[];
  activeId?: string;
  onNavigate?: (id: string) => void;
  /** `mobile` (360px, label 10px) atau `tab` (744px, label 13px). */
  size?: MobileNavSize;
  className?: string;
}

/** Bottom navigation: bg putih, padding kiri-kanan 8, gap 8, shadow ke atas. */
export function MobileNavBar({
  items,
  activeId,
  onNavigate,
  size = "mobile",
  className,
}: MobileNavBarProps) {
  const entries = items ?? (size === "tab" ? TAB_NAV_ITEMS : MOBILE_NAV_ITEMS);
  return (
    <nav
      aria-label="Navigasi bawah"
      className={cn("flex w-full gap-2 bg-white px-2 shadow-nav", className)}
    >
      {entries.map((item) => (
        <MobileNavItem
          key={item.id}
          icon={item.icon}
          activeIcon={item.activeIcon}
          label={item.label}
          size={size}
          active={item.id === activeId}
          onClick={() => onNavigate?.(item.id)}
        />
      ))}
    </nav>
  );
}
