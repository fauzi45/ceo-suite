"use client";

import { REFERRAL } from "@/data/profile";
import { useCopy } from "@/lib/use-copy";
import { cn } from "@/lib/cn";
import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";
import { BookingModal } from "@/components/organisms/BookingModal/BookingModal";

export interface ReferralModalProps {
  open: boolean;
  onClose: () => void;
  code?: string;
  className?: string;
}

/** Modal "Referral" (Opsi 1 di Figma): ajakan membagikan kode, kotak kode yang bisa disalin, dan daftar reward. */
export function ReferralModal({ open, onClose, code = REFERRAL.code, className }: ReferralModalProps) {
  const { copied, copy } = useCopy();

  return (
    <BookingModal open={open} onClose={onClose} title="Referral" className={cn("max-w-[760px]", className)}>
      <div className="grid items-center gap-6 rounded-lg bg-gradient-to-br from-primary-50 to-primary-100 p-6 md:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col gap-4">
          <h3 className="text-heading-md font-bold leading-[1.2] text-primary-800">Share your Code &amp; Earn Rewards!</h3>

          <div className="flex flex-col gap-1.5">
            <span className="text-tiny font-medium uppercase tracking-wide text-neutral-500">Referral code</span>
            <div className="flex items-center justify-between gap-3 rounded-lg border border-dashed border-primary-600 bg-white px-3 py-2">
              <span className="text-caption font-bold tracking-wide text-primary-800">{code}</span>
              <button
                type="button"
                aria-label={copied ? "Code copied" : "Copy referral code"}
                onClick={() => void copy(code)}
                className="inline-flex cursor-pointer rounded text-primary-800 outline-none hover:text-primary-600 focus-visible:ring-4 focus-visible:ring-primary-100"
              >
                <Icon name={copied ? "check" : "copy"} size={16} />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-tiny font-medium text-neutral-500">Your Rewards</span>
            {REFERRAL.rewards.map((reward) => (
              <div
                key={reward.id}
                className={cn(
                  "flex items-center justify-between gap-3 rounded-md px-3 py-2 text-tiny font-medium",
                  reward.available ? "bg-warning-50 text-neutral-900" : "bg-white text-neutral-400",
                )}
              >
                <span className="flex items-center gap-2">
                  <Icon name="seal-percent-fill" size={14} className={reward.available ? "text-warning-500" : "text-neutral-300"} />
                  {reward.label}
                </span>
                <Button size="mobile" disabled={!reward.available} className="!px-3 !py-1">
                  Use
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Ilustrasi dari Figma belum diekspor: placeholder ikon megafon. */}
        <div aria-hidden="true" className="hidden items-center justify-center md:flex">
          <span className="inline-flex size-40 items-center justify-center rounded-full bg-white/70 text-primary-800">
            <Icon name="megaphone" size={72} />
          </span>
        </div>
      </div>
    </BookingModal>
  );
}
