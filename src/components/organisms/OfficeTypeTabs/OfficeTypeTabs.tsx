import { cn } from "@/lib/cn";
import type { IconName } from "@/components/atoms/Icon/Icon";
import { OfficeTypeTab } from "@/components/molecules/OfficeTypeTab/OfficeTypeTab";

export interface OfficeTypeTabEntry {
  id: string;
  label: string;
  icon: IconName;
  /** Warna icon saat tab tidak aktif. */
  iconClassName?: string;
}

/** Urutan tab persis seperti frame "Office type" di Figma. */
export const OFFICE_TYPE_TABS: OfficeTypeTabEntry[] = [
  { id: "all", label: "All Spaces", icon: "room-all" },
  { id: "meeting", label: "Meeting Room", icon: "room-meeting" },
  { id: "office", label: "Office", icon: "room-office" },
  { id: "coworking", label: "Co-working Space", icon: "room-coworking" },
  { id: "board", label: "Board Room", icon: "room-board" },
  { id: "class", label: "Class Room", icon: "room-class" },
  { id: "seminar", label: "Seminar Room", icon: "room-seminar" },
  { id: "theatre", label: "Theatre Room", icon: "room-theatre" },
  { id: "combined", label: "Combined Room", icon: "room-combined" },
];

export interface OfficeTypeTabsProps {
  tabs?: OfficeTypeTabEntry[];
  value: string;
  onChange?: (id: string) => void;
  /** Ukuran tab (lihat `OfficeTypeTab`). */
  size?: "sm" | "lg";
  className?: string;
}

/** Baris tab kategori ruangan, bisa di-scroll horizontal di layar sempit. */
export function OfficeTypeTabs({
  tabs = OFFICE_TYPE_TABS,
  value,
  onChange,
  size,
  className,
}: OfficeTypeTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Tipe ruangan"
      className={cn("flex gap-2 overflow-x-auto border-b border-neutral-100", className)}
    >
      {tabs.map((tab) => (
        <OfficeTypeTab
          key={tab.id}
          icon={tab.icon}
          label={tab.label}
          size={size}
          iconClassName={tab.iconClassName}
          active={tab.id === value}
          onClick={() => onChange?.(tab.id)}
        />
      ))}
    </div>
  );
}
