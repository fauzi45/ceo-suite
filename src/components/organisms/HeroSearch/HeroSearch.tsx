import { cn } from "@/lib/cn";
import { HERO_IMAGE } from "@/data/landing";
import { Container } from "@/components/atoms/Container/Container";
import { Photo } from "@/components/atoms/Photo/Photo";
import { SpaceSearchForm, type SpaceSearchFormProps } from "@/components/organisms/SpaceSearchForm/SpaceSearchForm";

export interface HeroSearchProps {
  /** Foto hero di sisi kanan. Tanpa ini tampil placeholder. */
  image?: string;
  onSearch?: SpaceSearchFormProps["onSearch"];
  className?: string;
}

/**
 * Hero versi belum login: judul + deskripsi, foto besar, dan kartu "Find your space now"
 * yang menumpuk di atas foto (desktop) atau berada di atasnya (mobile).
 */
export function HeroSearch({ image = HERO_IMAGE, onSearch, className }: HeroSearchProps) {
  return (
    <section className={cn("py-8 md:py-12", className)}>
      <Container className="flex flex-col gap-8">
        <div className="grid gap-4 md:grid-cols-2 md:items-end md:gap-10">
          <h1 className="text-heading-lg font-bold leading-[1.1] text-neutral-950 md:text-display-sm xl:text-display-md">
            Discover Your Perfect Workspace at CEO SUITE.
          </h1>
          <p className="text-caption text-neutral-600 md:text-body">
            Experience the ultimate in flexible, premium workspaces where luxury meets
            productivity—CEO SUITE offers an inspiring environment tailored to elevate your
            business success.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-12 lg:items-center lg:gap-0">
          <SpaceSearchForm
            variant="card"
            onSearch={onSearch}
            className="relative z-10 lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:-mr-6"
          />
          {/* Rasio mengikuti foto asli (898x590) supaya tidak terpotong/diperbesar. */}
          <Photo
            src={image}
            alt="CEO SUITE workspace"
            priority
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="aspect-[898/590] rounded-lg lg:col-span-7 lg:col-start-6 lg:row-start-1"
          />
        </div>
      </Container>
    </section>
  );
}
