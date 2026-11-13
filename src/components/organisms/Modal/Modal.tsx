"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "@/components/atoms/Icon/Icon";
import { Button } from "@/components/atoms/Button/Button";

export type ModalTone = "error" | "warning" | "success" | "primary";

const toneStyles: Record<ModalTone, { ring: string; bg: string; fg: string }> = {
  error: { ring: "border-error-50", bg: "bg-error-100", fg: "text-error-600" },
  warning: { ring: "border-warning-50", bg: "bg-warning-100", fg: "text-warning-600" },
  success: { ring: "border-success-50", bg: "bg-success-100", fg: "text-success-600" },
  primary: { ring: "border-primary-50", bg: "bg-primary-100", fg: "text-primary-800" },
};

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  description?: ReactNode;
  icon?: IconName;
  tone?: ModalTone;
  cancelLabel?: string;
  confirmLabel?: string;
  onConfirm?: () => void;
  /** Tombol konfirmasi memakai warna merah (aksi hapus). */
  destructive?: boolean;
  children?: ReactNode;
  className?: string;
}

/**
 * Dialog konfirmasi (Modal di Figma): lebar 400, radius 12, padding 24, gap 32,
 * featured icon 48px, judul + supporting text, dua tombol lebar penuh.
 */
export function Modal({
  open,
  onClose,
  title,
  description,
  icon = "alert-circle",
  tone = "error",
  cancelLabel = "Cancel",
  confirmLabel = "Delete",
  onConfirm,
  destructive = true,
  children,
  className,
}: ModalProps) {
  const titleId = useId();
  const descId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const t = toneStyles[tone];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-1000/40 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        tabIndex={-1}
        className={cn(
          "flex w-full max-w-[400px] flex-col gap-8 rounded-xl bg-white p-6 shadow-modal outline-none",
          className,
        )}
      >
        <div className="flex flex-col gap-4">
          <span
            className={cn(
              "inline-flex size-12 items-center justify-center rounded-full border-8",
              t.ring,
              t.bg,
              t.fg,
            )}
          >
            <Icon name={icon} size={24} />
          </span>
          <div className="flex flex-col gap-2">
            <h2 id={titleId} className="text-heading-sm font-bold leading-[1.2] text-neutral-1000">
              {title}
            </h2>
            {description && (
              <p id={descId} className="text-caption font-medium leading-[1.2] text-neutral-500">
                {description}
              </p>
            )}
          </div>
          {children}
        </div>

        <div className="flex gap-3">
          <Button hierarchy="secondary-white" fullWidth onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button hierarchy="secondary-outline" destructive={destructive} fullWidth onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
