import { cn } from "@/lib/cn";
import { Button } from "@/components/atoms/Button/Button";
import { Container } from "@/components/atoms/Container/Container";
import { Photo } from "@/components/atoms/Photo/Photo";

export interface CategoryHeroProps {
  title: string;
  tagline: string;
  image?: string;
  /** Teks tombol di bawah tagline. Default "Book Now". */
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

/** Hero halaman kategori ruang: foto penuh dengan lapisan gelap, judul + tagline di tengah, lalu tombol "Book Now". */
export function CategoryHero({ title, tagline, image, actionLabel = "Book Now", onAction, className }: CategoryHeroProps) {
  return (
    <section className={cn("relative isolate overflow-hidden", className)}>
      <div className="absolute inset-0 -z-10">
        <Photo src={image} alt="" priority sizes="100vw" className="size-full" />
        <div className="absolute inset-0 bg-neutral-1000/65" />
      </div>
      <Container className="flex flex-col items-center gap-4 pb-20 pt-12 text-center text-white md:pb-24 md:pt-16">
        <h1 className="text-heading-lg font-bold leading-[1.2] md:text-display-sm">{title}</h1>
        <p className="text-caption md:text-body">{tagline}</p>
        <Button size="mobile" onClick={onAction} className="mt-2">
          {actionLabel}
        </Button>
      </Container>
    </section>
  );
}
