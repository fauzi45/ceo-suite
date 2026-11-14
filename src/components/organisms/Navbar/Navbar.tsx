"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/atoms/Logo/Logo";
import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Avatar } from "@/components/atoms/Avatar/Avatar";
import type { DropdownMenuItem } from "@/components/molecules/DropdownMenu/DropdownMenu";
import { UserMenu } from "@/components/molecules/UserMenu/UserMenu";

export interface NavLink {
  id: string;
  label: string;
  href?: string;
}

export const DEFAULT_NAV_LINKS: NavLink[] = [
  { id: "workspaces", label: "Workspaces", href: "#" },
  { id: "services", label: "Services", href: "#" },
  { id: "package", label: "Package", href: "#" },
  { id: "promotions", label: "Promotions & Deals!", href: "#" },
  { id: "news", label: "News", href: "#" },
];

export const DEFAULT_USER_MENU: DropdownMenuItem[] = [
  { value: "my-booking", label: "My Booking" },
  { value: "profile", label: "Profile" },
  { value: "logout", label: "Logout" },
];

export interface NavbarProps {
  links?: NavLink[];
  activeId?: string;
  /** Jika diisi, navbar menampilkan avatar + menu pengguna (versi login) sebagai ganti Sign In / Sign Up. */
  user?: { name: string };
  userMenuItems?: DropdownMenuItem[];
  onUserMenuSelect?: (value: string) => void;
  onSignIn?: () => void;
  onSignUp?: () => void;
  className?: string;
}

/**
 * Header (Frame 1618872511): bg putih + shadow. Desktop (xl): link 20px di tengah, kanan Sign In + Sign Up
 * atau menu pengguna. Di bawah xl link dilipat ke tombol hamburger.
 * Link 20px Medium grey/600, aktif Bold primary/800.
 */
export function Navbar({
  links = DEFAULT_NAV_LINKS,
  activeId,
  user,
  userMenuItems = DEFAULT_USER_MENU,
  onUserMenuSelect,
  onSignIn,
  onSignUp,
  className,
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={cn("relative w-full bg-white shadow-navbar", className)}>
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-8 xl:px-40 xl:py-8">
        <Link href="/" aria-label="CEO Suite, ke halaman utama" className="cursor-pointer">
          <Logo height={32} />
        </Link>

        <nav aria-label="Navigasi utama" className="hidden items-center gap-8 xl:flex">
          {links.map((link) => {
            const active = link.id === activeId;
            return (
              <a
                key={link.id}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "whitespace-nowrap text-heading-sm leading-[1.2] transition-colors",
                  active ? "font-bold text-primary-800" : "font-medium text-neutral-600 hover:text-primary-800",
                )}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <UserMenu name={user.name} items={userMenuItems} onSelect={onUserMenuSelect} />
          ) : (
            <div className="hidden items-center gap-3 sm:flex">
              <Button hierarchy="tertiary" className="min-w-[133px]" onClick={onSignIn}>
                Sign In
              </Button>
              <Button hierarchy="primary" className="min-w-[133px]" onClick={onSignUp}>
                Sign Up
              </Button>
            </div>
          )}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-lg text-neutral-900 outline-none transition-colors hover:bg-neutral-50 focus-visible:ring-4 focus-visible:ring-primary-100 xl:hidden"
          >
            <Icon name={menuOpen ? "close" : "menu"} size={24} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="mobile-nav" className="border-t border-neutral-100 bg-white px-4 pb-4 pt-2 sm:px-8 xl:hidden">
          <nav aria-label="Navigasi seluler" className="flex flex-col">
            {links.map((link) => {
              const active = link.id === activeId;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "border-b border-neutral-100 py-3 text-body",
                    active ? "font-bold text-primary-800" : "font-medium text-neutral-700",
                  )}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
          {!user && (
            <div className="mt-4 flex gap-3 sm:hidden">
              <Button hierarchy="secondary-outline" fullWidth onClick={onSignIn}>
                Sign In
              </Button>
              <Button hierarchy="primary" fullWidth onClick={onSignUp}>
                Sign Up
              </Button>
            </div>
          )}
          {user && (
            <div className="mt-4 flex items-center gap-3 sm:hidden">
              <Avatar name={user.name} />
              <span className="text-caption font-medium text-neutral-900">{user.name}</span>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
