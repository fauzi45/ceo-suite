import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Footer, type FooterProps } from "@/components/organisms/Footer/Footer";
import { Navbar, type NavbarProps } from "@/components/organisms/Navbar/Navbar";

export interface LandingLayoutProps {
  children: ReactNode;
  navbarProps?: NavbarProps;
  footerProps?: FooterProps;
  /** Class tambahan untuk `<main>`, mis. latar abu-abu yang harus mengisi seluruh area isi. */
  mainClassName?: string;
}

/** Kerangka halaman publik: Navbar di atas, isi di tengah, Footer di bawah (footer selalu menempel ke dasar layar). */
export function LandingLayout({ children, navbarProps, footerProps, mainClassName }: LandingLayoutProps) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar {...navbarProps} />
      <main className={cn("flex-1", mainClassName)}>{children}</main>
      <Footer {...footerProps} />
    </div>
  );
}
