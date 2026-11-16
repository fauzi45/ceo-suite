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
 * Isi menu Overview ("My Profile"). Mengikuti Figma: banner merah radius 12 setinggi ±426 (padding isi ±80),
 * avatar 120, nama + email, ajakan referral (membuka modal), dan kartu member 483x264 di kanan.
 */
export function ProfileOverview({ className }: ProfileOverviewProps) {
  const { profile } = useProfile();
  const [referralOpen, setReferralOpen] = useState(false);

  return (
    <>
      <section
        className={cn(
          "grid items-center gap-8 rounded-xl bg-primary-800 p-6 text-white md:p-10 2xl:grid-cols-[1fr_483px] 2xl:p-20",
          className,
        )}
      >
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-5">
            <Avatar name={profile.name} className="size-20 bg-primary-600 text-heading-sm md:size-24 md:text-heading-lg 2xl:size-[120px] 2xl:text-display-sm" />
            <div className="flex min-w-0 flex-col gap-1">
              <span className="text-heading-sm font-bold leading-[1.2] md:text-heading-md">{PROFILE_DISPLAY_NAME}</span>
              <span className="truncate text-caption md:text-body">{profile.email}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setReferralOpen(true)}
            className="flex w-full max-w-[548px] cursor-pointer items-center gap-3 rounded-lg bg-white/15 px-4 py-3 text-left text-caption outline-none transition-colors hover:bg-white/25 focus-visible:ring-4 focus-visible:ring-white/40 md:px-6 md:py-5 md:text-body"
          >
            <Icon name="seal-percent-fill" size={24} />
            <span className="flex-1">Refer a friend, get discount with your code!</span>
            <Icon name="chevron-right" size={20} />
          </button>
        </div>
        <MemberCard
          name={PROFILE_DISPLAY_NAME.replace(" K", "")}
          code={MEMBER_CARD.code}
          maskedNumber={MEMBER_CARD.maskedNumber}
          className="max-w-[483px] 2xl:justify-self-end"
        />
      </section>

      <ReferralModal open={referralOpen} onClose={() => setReferralOpen(false)} />
    </>
  );
}
