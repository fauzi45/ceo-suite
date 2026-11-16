"use client";

import { cn } from "@/lib/cn";
import { useCopy } from "@/lib/use-copy";
import { Icon } from "@/components/atoms/Icon/Icon";

export interface MemberCardProps {
  name: string;
  code: string;
  maskedNumber: string;
  className?: string;
}

/** Kartu member CEO SUITE: gradasi oranye ke magenta, nomor tersamar, dan baris gelap berisi nama + kode (bisa disalin). */
export function MemberCard({ name, code, maskedNumber, className }: MemberCardProps) {
  const { copied, copy } = useCopy();

  return (
    <div
      className={cn(
        "flex aspect-[1.7/1] w-full max-w-[400px] flex-col overflow-hidden rounded-xl text-white shadow-modal",
        "bg-[linear-gradient(135deg,#ff9f45_0%,#f0476a_55%,#c2268e_100%)]",
        className,
      )}
    >
      <div className="flex flex-1 flex-col justify-between p-4">
        <span aria-hidden="true" className="size-8 rounded-md border border-white/60 bg-white/25" />
        <div className="flex flex-col items-end gap-1">
          <span className="text-heading-sm font-bold leading-[1.2] tracking-wide">CEO SUITE</span>
          <span className="text-tiny tracking-widest">{maskedNumber}</span>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 bg-neutral-1000/80 px-4 py-3 text-tiny">
        <span>{name}</span>
        <span className="flex items-center gap-2 font-medium">
          {code}
          <button
            type="button"
            aria-label={copied ? "Code copied" : "Copy member code"}
            onClick={() => void copy(code)}
            className="inline-flex cursor-pointer rounded outline-none hover:opacity-80 focus-visible:ring-2 focus-visible:ring-white"
          >
            <Icon name={copied ? "check" : "copy"} size={14} />
          </button>
        </span>
      </div>
    </div>
  );
}
