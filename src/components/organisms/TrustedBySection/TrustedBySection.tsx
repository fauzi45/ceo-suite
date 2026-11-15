import Image from "next/image";
import { cn } from "@/lib/cn";
import { TRUSTED_LOGOS } from "@/data/landing";
import { Container } from "@/components/atoms/Container/Container";

export interface TrustedBySectionProps {
  className?: string;
}

function LogoRow({ hidden }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-8 pr-8 md:gap-12 md:pr-12">
      {TRUSTED_LOGOS.map((logo) => (
        <li key={logo.id} className="shrink-0">
          <Image
            src={logo.src}
            alt={hidden ? "" : logo.alt}
            width={128}
            height={56}
            unoptimized
            className="h-8 w-auto opacity-60 grayscale md:h-12"
          />
        </li>
      ))}
    </ul>
  );
}

/**
 * "Trusted by 80,000+ customers": semua logo partner berjalan terus ke kanan di dalam lebar `Container`.
 * Daftar ditulis dua kali supaya putarannya tanpa putus; berhenti saat disorot kursor dan
 * saat pengguna memilih mengurangi animasi.
 */
export function TrustedBySection({ className }: TrustedBySectionProps) {
  return (
    <section className={cn("bg-neutral-25 py-10 md:py-16", className)}>
      <Container className="flex flex-col items-center gap-8 md:gap-10">
        <h2 className="text-center text-heading-md font-bold leading-[1.2] text-neutral-700 md:text-heading-lg">
          <span className="underline decoration-primary-400 decoration-4 underline-offset-8">Trusted</span> by{" "}
          <span className="text-primary-600">80,000+</span> customers
        </h2>
        <div className="group w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max animate-marquee-right motion-reduce:animate-none group-hover:[animation-play-state:paused]">
            <LogoRow />
            <LogoRow hidden />
          </div>
        </div>
      </Container>
    </section>
  );
}
