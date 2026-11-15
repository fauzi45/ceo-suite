"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/atoms/Icon/Icon";

export interface PromoCodeCardProps {
  code: string;
  className?: string;
}

/** Kartu "Promo Code": kode di kotak putus-putus merah muda, tombol copy menyalin ke clipboard. */
export function PromoCodeCard({ code, className }: PromoCodeCardProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard tidak tersedia (mis. non-HTTPS): kode tetap bisa disalin manual.
    }
  };

  return (
    <section className={cn("flex flex-col gap-3 rounded-xl bg-white p-6 shadow-popover", className)}>
      <h2 className="text-caption font-medium leading-[1.2] text-neutral-950">Promo Code</h2>
      <div className="flex items-center justify-between gap-3 rounded-lg border border-dashed border-primary-600 bg-primary-50 px-4 py-3">
        <span className="text-body font-bold leading-[1.2] tracking-wide text-primary-800">{code}</span>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Kode disalin" : "Salin kode promo"}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded text-primary-800 outline-none transition-colors hover:text-primary-600 focus-visible:ring-4 focus-visible:ring-primary-100"
        >
          {copied && <span className="text-caption font-medium">Copied</span>}
          <Icon name={copied ? "check" : "copy"} size={18} />
        </button>
      </div>
    </section>
  );
}
