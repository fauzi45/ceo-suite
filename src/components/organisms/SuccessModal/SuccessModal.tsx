"use client";

import { useId } from "react";
import { Button } from "@/components/atoms/Button/Button";
import { SuccessBadge } from "@/components/atoms/SuccessBadge/SuccessBadge";

export interface SuccessModalProps {
  open: boolean;
  /** Contoh: "Successfully create your account!". */
  title: string;
  /** Label tombol, contoh: "Go to Login". */
  actionLabel: string;
  onAction: () => void;
}

/**
 * Modal sukses (Forgot Password di Figma): lebar 328, radius 24, ikon centang hijau,
 * judul tebal di tengah, dan satu tombol dengan panah.
 */
export function SuccessModal({ open, title, actionLabel, onAction }: SuccessModalProps) {
  const titleId = useId();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-neutral-1000/40 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="my-auto flex w-full max-w-82 flex-col items-center gap-8 rounded-3xl bg-white px-8 pb-8 pt-12 shadow-modal"
      >
        <div className="flex flex-col items-center gap-7">
          <SuccessBadge />
          <h2 id={titleId} className="text-center text-heading-sm font-bold text-neutral-950">
            {title}
          </h2>
        </div>
        <Button
          hierarchy="secondary-filled"
          size="mobile"
          iconRight="chevron-right"
          fullWidth
          autoFocus
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      </div>
    </div>
  );
}
