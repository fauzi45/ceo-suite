"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/atoms/Icon/Icon";

export interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  description?: ReactNode;
  /** Tengah semua isi dan tanpa tombol tutup (dialog konfirmasi). */
  centered?: boolean;
  children?: ReactNode;
  /** Area bawah (tombol aksi). */
  footer?: ReactNode;
  className?: string;
}

/**
 * Kerangka modal halaman booking (Select Add Ons, Add Voucher, konfirmasi): panel putih radius 12 di atas overlay,
 * judul + tombol tutup, isi, lalu area tombol. Esc dan klik di luar panel menutup modal.
 */
export function BookingModal({
  open,
  onClose,
  title,
  description,
  centered,
  children,
  footer,
  className,
}: BookingModalProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-1000/40 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={cn(
          "flex max-h-[90dvh] w-full max-w-[680px] flex-col gap-6 overflow-y-auto rounded-xl bg-white p-6 shadow-modal outline-none",
          centered && "items-center text-center",
          className,
        )}
      >
        <div className={cn("flex w-full gap-4", centered ? "flex-col items-center" : "items-start justify-between")}>
          <div className={cn("flex flex-col gap-2", centered && "items-center")}>
            <h2 id={titleId} className="text-heading-sm font-bold leading-[1.2] text-neutral-1000">
              {title}
            </h2>
            {description && <p className="text-caption text-neutral-500">{description}</p>}
          </div>
          {!centered && (
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-md text-neutral-700 outline-none hover:bg-neutral-50 focus-visible:ring-4 focus-visible:ring-primary-100"
            >
              <Icon name="close" size={20} />
            </button>
          )}
        </div>
        {children}
        {footer && <div className="flex w-full flex-col gap-3">{footer}</div>}
      </div>
    </div>
  );
}
