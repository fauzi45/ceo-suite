import { Fragment } from "react";
import { cn } from "@/lib/cn";
import { MEETING_PACKAGE } from "@/data/landing";
import { Button } from "@/components/atoms/Button/Button";
import { Container } from "@/components/atoms/Container/Container";
import { Photo } from "@/components/atoms/Photo/Photo";

export interface MeetingPackageSectionProps {
  /** Empat foto kolase. Tanpa ini tampil placeholder. */
  images?: (string | undefined)[];
  onBrowse?: () => void;
  className?: string;
}

/** Pecah teks dan beri warna merah pada frasa yang ada di `highlights`. */
function highlight(text: string, highlights: string[]) {
  const pattern = new RegExp(`(${highlights.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`);
  return text.split(pattern).map((part, index) =>
    highlights.includes(part) ? (
      <span key={index} className="text-primary-800">
        {part}
      </span>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  );
}

/** "Meeting Room Package": kolase 4 foto di kiri, teks + tombol di kanan (bertumpuk di mobile). */
export function MeetingPackageSection({
  images = MEETING_PACKAGE.images,
  onBrowse,
  className,
}: MeetingPackageSectionProps) {
  return (
    <section className={cn("py-10 md:py-16", className)}>
      <Container className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
        {/* Lebar dibatasi seperti di Figma (±440px) agar foto sumber kecil tidak diperbesar. */}
        <div className="mx-auto grid w-full max-w-[440px] grid-cols-2 gap-3 md:gap-4" aria-hidden="true">
          <div className="flex flex-col gap-3 md:gap-4">
            <Photo src={images[0]} sizes="25vw" className="aspect-[206/200] rounded-lg shadow-popover" />
            <Photo src={images[2]} sizes="25vw" className="aspect-[206/247] rounded-lg shadow-popover" />
          </div>
          <div className="mt-6 flex flex-col gap-3 md:mt-8 md:gap-4">
            <Photo src={images[1]} sizes="25vw" className="aspect-[206/247] rounded-lg shadow-popover" />
            <Photo src={images[3]} sizes="25vw" className="aspect-[206/200] rounded-lg shadow-popover" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-heading-md font-bold leading-[1.2] text-neutral-950 md:text-heading-lg">
            {MEETING_PACKAGE.title}
          </h2>
          {MEETING_PACKAGE.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-caption text-neutral-600 md:text-body">
              {highlight(paragraph, MEETING_PACKAGE.highlights)}
            </p>
          ))}
          <Button iconRight="chevron-right" size="mobile" onClick={onBrowse} className="self-start">
            {MEETING_PACKAGE.actionLabel}
          </Button>
        </div>
      </Container>
    </section>
  );
}
