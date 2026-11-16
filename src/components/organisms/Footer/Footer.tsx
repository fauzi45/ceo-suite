"use client";

import { cn } from "@/lib/cn";
import { useNavigate } from "@/lib/use-navigate";
import { Container } from "@/components/atoms/Container/Container";
import { Logo } from "@/components/atoms/Logo/Logo";
import { EmailCapture } from "@/components/molecules/EmailCapture/EmailCapture";

export interface FooterLink {
  id: string;
  label: string;
  href?: string;
}

export const DEFAULT_FOOTER_LINKS: FooterLink[] = [
  { id: "home", label: "Home", href: "#" },
  { id: "workspaces", label: "Workspaces", href: "#" },
  { id: "services", label: "Services", href: "/services" },
  { id: "promotions", label: "Promotion & Deals!", href: "/promotions" },
  { id: "news", label: "News", href: "/news" },
];

export interface FooterProps {
  links?: FooterLink[];
  copyright?: string;
  onSubscribe?: (email: string) => void;
  className?: string;
}

/**
 * Footer: bg grey/50, padding atas 64 bawah 48, gap 64. Konten selebar `Container` (sejajar section halaman):
 * logo + link, garis pemisah, lalu email capture dan copyright (space-between).
 */
export function Footer({
  links = DEFAULT_FOOTER_LINKS,
  copyright = "© 1997-2024 CEO Suite. All rights reserved.",
  onSubscribe,
  className,
}: FooterProps) {
  const navigate = useNavigate();

  return (
    <footer className={cn("flex w-full flex-col items-center gap-16 bg-neutral-50 pb-12 pt-16", className)}>
      <Container className="flex flex-col gap-8">
        <Logo height={32} />
        <nav aria-label="Navigasi footer" className="flex flex-wrap gap-6">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => navigate(link.href)}
              className="cursor-pointer text-body font-medium leading-[1.2] text-neutral-600 transition-colors hover:text-primary-800"
            >
              {link.label}
            </button>
          ))}
        </nav>
      </Container>

      <Container className="flex flex-col gap-8">
        <hr className="border-neutral-100" />
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <EmailCapture onSubmit={onSubscribe} />
          <p className="text-body leading-[1.2] text-neutral-400">{copyright}</p>
        </div>
      </Container>
    </footer>
  );
}
