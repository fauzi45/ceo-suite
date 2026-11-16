"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { MEMBER_CARD, PROFILE_DISPLAY_NAME } from "@/data/profile";
import { useProfile } from "@/lib/use-profile";
import { Avatar } from "@/components/atoms/Avatar/Avatar";
import { Icon } from "@/components/atoms/Icon/Icon";
import { MemberCard } from "@/components/molecules/MemberCard/MemberCard";
import { ReferralModal } from "@/components/organisms/ReferralModal/ReferralModal";

export interface ProfileOverviewProps {
  className?: string;
}

/**
 * Isi menu Overview ("My Profile"): banner merah berisi avatar, nama, email, ajakan referral (membuka modal),
 * dan kartu member di kanan.
 */
export function ProfileOverview({ className }: ProfileOverviewProps) {
  const { profile } = useProfile();
  const [referralOpen, setReferralOpen] = useState(false);

  return (
    <>
      <section
        className={cn(
          "grid items-center gap-6 rounded-xl bg-primary-800 p-6 text-white md:p-8 lg:grid-cols-[1fr_400px]",
          className,
        )}
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <Avatar name={profile.name} className="size-20 bg-primary-600 text-heading-sm" />
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="text-body font-bold leading-[1.2] md:text-heading-sm">{PROFILE_DISPLAY_NAME}</span>
              <span className="truncate text-caption">{profile.email}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setReferralOpen(true)}
            className="flex w-full max-w-[360px] cursor-pointer items-center gap-2 rounded-md bg-white/15 px-3 py-2 text-left text-tiny outline-none transition-colors hover:bg-white/25 focus-visible:ring-4 focus-visible:ring-white/40"
          >
            <Icon name="seal-percent-fill" size={16} />
            <span className="flex-1">Refer a friend, get discount with your code!</span>
            <Icon name="chevron-right" size={14} />
          </button>
        </div>
        <MemberCard name={PROFILE_DISPLAY_NAME.replace(" K", "")} code={MEMBER_CARD.code} maskedNumber={MEMBER_CARD.maskedNumber} />
      </section>

      <ReferralModal open={referralOpen} onClose={() => setReferralOpen(false)} />
    </>
  );
}
