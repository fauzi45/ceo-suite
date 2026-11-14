import { cn } from "@/lib/cn";
import type { Deal } from "@/data/landing";
import { Photo } from "@/components/atoms/Photo/Photo";

export interface DealCardProps {
  deal: Deal;
  className?: string;
}

/** Kartu voucher: foto dengan lapisan merah di bawah dan teks putih. */
export function DealCard({ deal, className }: DealCardProps) {
  return (
    <article className={cn("relative overflow-hidden rounded-lg", className)}>
      <Photo
        src={deal.image}
        alt=""
        sizes="(min-width: 768px) 33vw, 90vw"
        className="aspect-[522/241]"
      />
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-gradient-to-t from-primary-900 via-primary-900/80 to-transparent px-4 pb-4 pt-12 text-white">
        <h3 className="text-body font-bold leading-[1.2]">{deal.title}</h3>
        <p className="text-tiny opacity-80">{deal.validity}</p>
      </div>
    </article>
  );
}
