import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "@/components/atoms/Icon/Icon";

/* -------------------------------------------------------------------------- */
/* StatusChip — "chips/dashboard" di Figma                                     */
/* -------------------------------------------------------------------------- */

export type ChipStatus =
  | "failed"
  | "expired"
  | "success"
  | "canceled"
  | "warning"
  | "superadmin";

const statusStyles: Record<ChipStatus, string> = {
  failed: "bg-error-50 text-error-500",
  expired: "bg-neutral-100 text-neutral-900",
  success: "bg-success-50 text-success-700",
  canceled: "bg-status-canceled-bg text-status-canceled-fg",
  warning: "bg-warning-50 text-warning-500",
  superadmin: "bg-status-superadmin-bg text-status-superadmin-fg",
};

export interface StatusChipProps extends HTMLAttributes<HTMLSpanElement> {
  status: ChipStatus;
  children: ReactNode;
}

/** Badge status: radius 32, padding 8x12, teks 13px Medium. */
export function StatusChip({ status, className, children, ...rest }: StatusChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-2 text-caption font-medium leading-[1.2] whitespace-nowrap",
        statusStyles[status],
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* RoomTypeChip — "chips/office type" di Figma                                 */
/* -------------------------------------------------------------------------- */

export type RoomType =
  | "meeting"
  | "office"
  | "coworking"
  | "coworking-shared"
  | "board"
  | "class"
  | "seminar"
  | "theatre"
  | "combined";

export const ROOM_TYPE_LABELS: Record<RoomType, string> = {
  meeting: "Meeting Room",
  office: "Office",
  coworking: "Co-Working Space (Dedicated)",
  "coworking-shared": "Co-Working Space (Non-Dedicated)",
  board: "Board Room",
  class: "Class Room",
  seminar: "Seminar Room",
  theatre: "Theatre Room",
  combined: "Combined Boardroom Meeting Room",
};

export const ROOM_TYPE_ICONS: Record<RoomType, IconName> = {
  meeting: "room-meeting",
  office: "room-office",
  coworking: "room-coworking",
  "coworking-shared": "room-coworking",
  board: "room-board",
  class: "room-class",
  seminar: "room-seminar",
  theatre: "room-theatre",
  combined: "room-combined",
};

const roomStyles: Record<RoomType, string> = {
  meeting: "bg-room-meeting-bg text-room-meeting-fg",
  office: "bg-room-office-bg text-room-office-fg",
  coworking: "bg-room-coworking-bg text-room-coworking-fg",
  "coworking-shared": "bg-room-coworking-shared-bg text-room-coworking-shared-fg",
  board: "bg-room-board-bg text-room-board-fg",
  class: "bg-room-class-bg text-room-class-fg",
  seminar: "bg-room-seminar-bg text-room-seminar-fg",
  theatre: "bg-room-theatre-bg text-room-theatre-fg",
  combined: "bg-room-combined-bg text-room-combined-fg",
};

/** `mobile-card` = teks 8px, `desktop-card` = 13px (keduanya padding 4x8). */
export type RoomTypeChipSize = "mobile-card" | "desktop-card";

export interface RoomTypeChipProps extends HTMLAttributes<HTMLSpanElement> {
  roomType: RoomType;
  size?: RoomTypeChipSize;
  /** Teks pengganti; default memakai label resmi tipe ruangan. */
  children?: ReactNode;
}

export function RoomTypeChip({
  roomType,
  size = "desktop-card",
  className,
  children,
  ...rest
}: RoomTypeChipProps) {
  const isMobile = size === "mobile-card";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-2 py-1 font-medium leading-[1.2] whitespace-nowrap",
        isMobile ? "text-[8px]" : "text-caption",
        roomStyles[roomType],
        className,
      )}
      {...rest}
    >
      <Icon name={ROOM_TYPE_ICONS[roomType]} size={isMobile ? 12 : 16} />
      {children ?? ROOM_TYPE_LABELS[roomType]}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* FilterChip — "filter item" di Figma                                         */
/* -------------------------------------------------------------------------- */

export interface FilterChipProps extends HTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  size?: "desktop" | "mobile";
  disabled?: boolean;
  children: ReactNode;
}

/**
 * Chip filter yang bisa dipilih. Off: border grey/100, teks grey/400.
 * On: border dan teks primary/600.
 */
export function FilterChip({
  selected = false,
  size = "desktop",
  className,
  children,
  ...rest
}: FilterChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border bg-white text-caption font-medium leading-[1.2] whitespace-nowrap transition-colors outline-none focus-visible:ring-4 focus-visible:ring-primary-100 disabled:cursor-not-allowed disabled:opacity-50",
        size === "desktop" ? "px-6 py-3" : "px-3 py-2",
        selected
          ? "border-primary-600 text-primary-600"
          : "border-neutral-100 text-neutral-400 hover:border-neutral-200 hover:text-neutral-600",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
