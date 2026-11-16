import { cn } from "@/lib/cn";
import type { Service } from "@/data/services";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Photo } from "@/components/atoms/Photo/Photo";

export interface ServiceCardProps {
  service: Service;
  /** Aksi tombol. Default: belum mengarah ke mana pun. */
  onClick?: () => void;
  className?: string;
}

/** Kartu layanan: foto berwarna dengan ikon + judul di atasnya, deskripsi, lalu tombol kecil merah muda. */
export function ServiceCard({ service, onClick, className }: ServiceCardProps) {
  return (
    <article className={cn("group flex flex-col gap-4", className)}>
      <div className="relative">
        <Photo
          src={service.image}
          alt=""
          hoverZoom
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="aspect-[517/400] w-full rounded-2xl"
        />
        <h3 className="absolute inset-x-4 bottom-4 flex items-center gap-2 text-body font-bold leading-[1.2] text-white md:text-heading-sm">
          <Icon name={service.icon} size={24} className="shrink-0" />
          {service.title}
        </h3>
      </div>
      <p className="text-caption leading-[1.5] text-neutral-600 md:text-body">{service.description}</p>
      <button
        type="button"
        onClick={onClick}
        className="mt-auto inline-flex cursor-pointer w-fit items-center gap-1 rounded-md bg-primary-100 px-3 py-2 text-caption font-medium leading-[1.2] text-primary-800 outline-none transition-colors hover:bg-primary-200 focus-visible:ring-4 focus-visible:ring-primary-100"
      >
        {service.cta}
        <Icon name="chevron-right" size={14} />
      </button>
    </article>
  );
}
