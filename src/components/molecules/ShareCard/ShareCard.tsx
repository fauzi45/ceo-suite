"use client";

import { cn } from "@/lib/cn";
import { Icon, type IconName } from "@/components/atoms/Icon/Icon";

export interface ShareCardProps {
  /** Teks yang ikut dibagikan (judul promo). */
  title?: string;
  /** Alamat yang dibagikan. Default: alamat halaman saat ini. */
  url?: string;
  /** Judul kartu. Default "Share this promo"; halaman News memakai "This Article is Helpful?". */
  heading?: string;
  className?: string;
}

interface ShareTarget {
  id: string;
  label: string;
  icon: IconName;
  /** Alamat tujuan; `null` = tombol bagikan bawaan perangkat. */
  href: ((url: string, title: string) => string) | null;
}

const enc = encodeURIComponent;

const TARGETS: ShareTarget[] = [
  { id: "share", label: "Bagikan", icon: "share", href: null },
  { id: "facebook", label: "Facebook", icon: "facebook", href: (url) => `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
  { id: "instagram", label: "Instagram", icon: "instagram", href: () => "https://www.instagram.com/" },
  { id: "x", label: "X", icon: "x-twitter", href: (url, title) => `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}` },
  { id: "linkedin", label: "LinkedIn", icon: "linkedin", href: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
  { id: "youtube", label: "YouTube", icon: "youtube", href: () => "https://www.youtube.com/" },
];

const buttonClass =
  "inline-flex size-8 cursor-pointer items-center justify-center rounded-lg bg-primary-800 text-white outline-none transition-colors " +
  "hover:bg-primary-600 active:bg-primary-900 focus-visible:ring-4 focus-visible:ring-primary-100";

/** Kartu "Share this promo": tombol bagikan + Facebook, Instagram, X, LinkedIn, YouTube. */
export function ShareCard({ title = "", url, heading = "Share this promo", className }: ShareCardProps) {
  const open = (target: ShareTarget) => {
    const shareUrl = url ?? window.location.href;
    if (target.href) {
      window.open(target.href(shareUrl, title), "_blank", "noopener,noreferrer");
    } else if (navigator.share) {
      navigator.share({ title, url: shareUrl }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(shareUrl).catch(() => {});
    }
  };

  return (
    <section className={cn("flex flex-col gap-3 rounded-xl bg-white p-6 shadow-popover", className)}>
      <h2 className="text-body font-bold leading-[1.2] text-neutral-950">{heading}</h2>
      <div className="flex gap-2">
        {TARGETS.map((target) => (
          <button
            key={target.id}
            type="button"
            aria-label={target.label}
            onClick={() => open(target)}
            className={buttonClass}
          >
            <Icon name={target.icon} size={18} />
          </button>
        ))}
      </div>
    </section>
  );
}
