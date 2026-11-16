import Image from "next/image";
import { cn } from "@/lib/cn";
import { Button } from "@/components/atoms/Button/Button";

export interface ContactCtaCardProps {
  title: string;
  description: string;
  /** `banner`: lebar, teks di tengah (halaman daftar). `card`: rata kiri, untuk kolom samping (halaman detail). */
  variant?: "banner" | "card";
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

/** Kotak merah muda dengan gelembung chat pucat, judul, deskripsi, dan tombol "Contact Us". */
export function ContactCtaCard({
  title,
  description,
  variant = "banner",
  actionLabel = "Contact Us",
  onAction,
  className,
}: ContactCtaCardProps) {
  const banner = variant === "banner";

  return (
    <section
      className={cn(
        "relative isolate flex flex-col gap-3 overflow-hidden rounded-2xl bg-primary-50",
        banner ? "items-center px-6 py-10 text-center md:py-14" : "items-start p-6",
        className,
      )}
    >
      <Image
        src="/graphics/faq-chat-bubble.svg"
        alt=""
        aria-hidden="true"
        width={141}
        height={160}
        unoptimized
        className={cn(
          "pointer-events-none absolute -z-10 w-auto max-w-none",
          banner ? "-right-6 top-1/2 h-40 -translate-y-1/2" : "-right-4 -top-2 h-28",
        )}
      />
      <h2
        className={cn(
          "font-bold leading-[1.2] text-primary-800",
          banner ? "text-heading-md md:text-heading-lg" : "text-body",
        )}
      >
        {title}
      </h2>
      <p className={cn("leading-[1.5] text-neutral-500", banner ? "max-w-xl text-caption md:text-body" : "text-caption")}>
        {description}
      </p>
      <Button size="mobile" iconLeft="chat" onClick={onAction} className={banner ? "mt-2" : "mt-1"}>
        {actionLabel}
      </Button>
    </section>
  );
}
