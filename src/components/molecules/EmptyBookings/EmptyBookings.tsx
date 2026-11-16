import { cn } from "@/lib/cn";
import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";

export interface EmptyBookingsProps {
  onBook?: () => void;
  className?: string;
}

/** Keadaan kosong daftar booking: ikon dokumen, ajakan memesan ruang, dan tombol "Book Now". */
export function EmptyBookings({ onBook, className }: EmptyBookingsProps) {
  return (
    <div className={cn("flex flex-col items-center gap-4 px-6 py-14 text-center", className)}>
      <span className="inline-flex size-16 items-center justify-center rounded-full bg-neutral-50 text-neutral-300">
        <Icon name="receipt" size={36} />
      </span>
      <p className="max-w-xs text-caption text-neutral-600">You have no booking. Book your meeting room now!</p>
      <Button size="mobile" onClick={onBook} className="min-w-40">
        Book Now
      </Button>
    </div>
  );
}
