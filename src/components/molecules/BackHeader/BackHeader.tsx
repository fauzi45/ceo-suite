import { cn } from "@/lib/cn";
import { Icon } from "@/components/atoms/Icon/Icon";

export interface BackHeaderProps {
  title: string;
  onBack?: () => void;
  className?: string;
}

/** Judul halaman dengan tombol panah kembali di kiri ("← Fill Booking Details"). */
export function BackHeader({ title, onBack, className }: BackHeaderProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <button
        type="button"
        aria-label="Back"
        onClick={onBack}
        className="inline-flex size-8 cursor-pointer items-center justify-center rounded-md text-neutral-900 outline-none hover:bg-neutral-50 focus-visible:ring-4 focus-visible:ring-primary-100"
      >
        <Icon name="arrow-left" size={24} />
      </button>
      <h1 className="text-heading-sm font-bold leading-[1.2] text-neutral-950 md:text-heading-md">{title}</h1>
    </div>
  );
}
