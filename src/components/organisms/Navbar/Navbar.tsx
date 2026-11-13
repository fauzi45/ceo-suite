import { cn } from "@/lib/cn";
import { Logo } from "@/components/atoms/Logo/Logo";
import { Button } from "@/components/atoms/Button/Button";

export interface NavLink {
  id: string;
  label: string;
  href?: string;
}

export const DEFAULT_NAV_LINKS: NavLink[] = [
  { id: "workspaces", label: "Workspaces", href: "#" },
  { id: "services", label: "Services", href: "#" },
  { id: "promotions", label: "Promotions & Deals!", href: "#" },
  { id: "news", label: "News", href: "#" },
];

export interface NavbarProps {
  links?: NavLink[];
  activeId?: string;
  onSignIn?: () => void;
  onSignUp?: () => void;
  className?: string;
}

/**
 * Header desktop (Frame 1618872511): tinggi 112, padding 32x160, bg putih, shadow.
 * Link 20px Medium grey/600, aktif 20px Bold primary/800. Kanan: Sign In (tertiary) + Sign Up (primary).
 */
export function Navbar({
  links = DEFAULT_NAV_LINKS,
  activeId,
  onSignIn,
  onSignUp,
  className,
}: NavbarProps) {
  return (
    <header
      className={cn(
        "flex w-full items-center justify-between bg-white px-10 py-8 shadow-navbar xl:px-40",
        className,
      )}
    >
      <Logo height={32} />

      <nav aria-label="Navigasi utama" className="hidden items-center gap-8 md:flex">
        {links.map((link) => {
          const active = link.id === activeId;
          return (
            <a
              key={link.id}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "text-heading-sm leading-[1.2] transition-colors",
                active ? "font-bold text-primary-800" : "font-medium text-neutral-600 hover:text-primary-800",
              )}
            >
              {link.label}
            </a>
          );
        })}
      </nav>

      <div className="flex items-center gap-3">
        <Button hierarchy="tertiary" className="min-w-[133px]" onClick={onSignIn}>
          Sign In
        </Button>
        <Button hierarchy="primary" className="min-w-[133px]" onClick={onSignUp}>
          Sign Up
        </Button>
      </div>
    </header>
  );
}
