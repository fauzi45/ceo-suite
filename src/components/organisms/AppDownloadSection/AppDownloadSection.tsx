import Image from "next/image";
import { cn } from "@/lib/cn";
import { Container } from "@/components/atoms/Container/Container";

export interface AppDownloadSectionProps {
  appStoreHref?: string;
  googlePlayHref?: string;
  className?: string;
}

/** Aset dari Figma (ekspor PNG transparan) di `public/images/app/`. */
const ASSETS = {
  phones: "/images/app/app-phones.png",
  shapeLeft: "/images/app/shape-left.png",
  shapeRight: "/images/app/shape-right.png",
  appStore: "/images/app/badge-app-store.png",
  googlePlay: "/images/app/badge-google-play.png",
};

function StoreBadge({
  href,
  src,
  width,
  height,
  label,
}: {
  href: string;
  src: string;
  width: number;
  height: number;
  label: string;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="inline-flex rounded-lg outline-none transition-opacity hover:opacity-90 focus-visible:ring-4 focus-visible:ring-neutral-300"
    >
      <Image src={src} alt={label} width={width} height={height} unoptimized className="h-12 w-auto md:h-[66px]" />
    </a>
  );
}

/**
 * "Download the CEO SUITE App Now!" (Figma): latar gradasi merah muda dengan dua bentuk vektor,
 * teks + badge App Store / Google Play di kiri, dan dua ponsel yang menempel di tepi atas-bawah section di kanan.
 * Di bawah lg ponsel pindah ke bawah teks.
 */
export function AppDownloadSection({
  appStoreHref = "#",
  googlePlayHref = "#",
  className,
}: AppDownloadSectionProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-gradient-to-r from-primary-50 via-primary-100 to-primary-200",
        "lg:min-h-[340px] xl:min-h-[420px] 2xl:min-h-[573px]",
        className,
      )}
    >
      {/* Dekorasi vektor dari Figma */}
      <Image
        src={ASSETS.shapeLeft}
        alt=""
        aria-hidden="true"
        width={565}
        height={413}
        unoptimized
        className="pointer-events-none absolute bottom-0 left-0 -z-10 w-1/3 max-w-[565px]"
      />
      <Image
        src={ASSETS.shapeRight}
        alt=""
        aria-hidden="true"
        width={418}
        height={489}
        unoptimized
        className="pointer-events-none absolute right-0 top-0 -z-10 hidden w-1/5 max-w-[418px] md:block"
      />

      <Container className="flex flex-col gap-6 pt-10 md:pt-16 lg:h-full lg:min-h-[inherit] lg:justify-center lg:py-16">
        <div className="flex flex-col gap-4 lg:max-w-[46%]">
          <h2 className="text-heading-lg font-bold leading-[1.2] text-primary-800 md:text-display-sm">
            Download the CEO SUITE App Now!
          </h2>
          <p className="text-caption text-neutral-600 md:text-body">
            Simplify your meeting planning with our app. Download now to enjoy seamless booking and more.
          </p>
          <div className="mt-2 flex flex-wrap gap-3 md:mt-4">
            <StoreBadge
              href={appStoreHref}
              src={ASSETS.appStore}
              width={543}
              height={198}
              label="Download on the App Store"
            />
            <StoreBadge
              href={googlePlayHref}
              src={ASSETS.googlePlay}
              width={530}
              height={198}
              label="Get it on Google Play"
            />
          </div>
        </div>
      </Container>

      {/* Ponsel: menempel di tepi bawah (dan atas) section, seperti di Figma. */}
      <div
        aria-hidden="true"
        className="relative mx-auto mt-6 w-full max-w-[560px] lg:absolute lg:inset-y-0 lg:right-0 lg:mx-0 lg:mt-0 lg:h-full lg:w-auto lg:max-w-none"
      >
        <Image
          src={ASSETS.phones}
          alt=""
          width={1478}
          height={860}
          unoptimized
          className="block h-auto w-full lg:h-full lg:w-auto lg:max-w-none"
        />
      </div>
    </section>
  );
}
