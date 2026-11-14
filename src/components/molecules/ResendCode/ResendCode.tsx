"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/atoms/Icon/Icon";

export interface ResendCodeProps {
  /** Lama hitung mundur sebelum kode bisa dikirim ulang (detik). Default 119 = 01:59. */
  initialSeconds?: number;
  onResend?: () => void;
  className?: string;
}

const formatTime = (total: number) =>
  `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;

/** "Didn't receive the code?" + hitung mundur, lalu tombol "Resend Code" saat waktu habis. */
export function ResendCode({ initialSeconds = 119, onResend, className }: ResendCodeProps) {
  const [remaining, setRemaining] = useState(initialSeconds);

  useEffect(() => {
    if (remaining <= 0) return;
    const timer = setTimeout(() => setRemaining((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [remaining]);

  return (
    <div className={cn("flex flex-col items-center gap-2 text-caption text-neutral-700", className)}>
      <p>Didn&apos;t receive the code?</p>
      {remaining > 0 ? (
        <p className="flex items-center gap-2" aria-live="off">
          <Icon name="loading" size={16} className="text-primary-600" />
          <span>
            Resend new code in{" "}
            <time className="font-medium text-primary-600">{formatTime(remaining)}</time>
          </span>
        </p>
      ) : (
        <button
          type="button"
          onClick={() => {
            setRemaining(initialSeconds);
            onResend?.();
          }}
          className="rounded-sm font-medium text-primary-800 outline-none transition-colors hover:text-primary-600 active:text-primary-900 focus-visible:ring-4 focus-visible:ring-primary-100"
        >
          Resend Code
        </button>
      )}
    </div>
  );
}
