import { cn } from "@/lib/cn";
import { Icon } from "@/components/atoms/Icon/Icon";

export interface CarouselArrowsProps {
  onPrev?: () => void;
  onNext?: () => void;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
  className?: string;
}

const arrowClass =
  "inline-flex h-11 w-16 items-center justify-center rounded-lg bg-primary-800 text-white outline-none transition-colors " +
  "hover:bg-primary-600 active:bg-primary-900 focus-visible:ring-4 focus-visible:ring-primary-100 " +
  "cursor-pointer disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:hover:bg-neutral-200";

/** Sepasang tombol panah kiri/kanan di kanan judul section (merah = aktif, abu-abu = sudah di ujung). */
export function CarouselArrows({ onPrev, onNext, prevDisabled, nextDisabled, className }: CarouselArrowsProps) {
  return (
    <div className={cn("flex gap-2 self-start", className)}>
      <button type="button" aria-label="Sebelumnya" disabled={prevDisabled} onClick={onPrev} className={arrowClass}>
        <Icon name="arrow-left" size={24} />
      </button>
      <button type="button" aria-label="Berikutnya" disabled={nextDisabled} onClick={onNext} className={arrowClass}>
        <Icon name="arrow-right" size={24} />
      </button>
    </div>
  );
}
