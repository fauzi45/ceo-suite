import type { ReactNode } from "react";
import { Footer, type FooterProps } from "@/components/organisms/Footer/Footer";
import { Navbar, type NavbarProps } from "@/components/organisms/Navbar/Navbar";

export interface LandingLayoutProps {
  children: ReactNode;
  navbarProps?: NavbarProps;
  footerProps?: FooterProps;
}

/** Kerangka halaman publik: Navbar di atas, isi di tengah, Footer di bawah (footer selalu menempel ke dasar layar). */
export function LandingLayout({ children, navbarProps, footerProps }: LandingLayoutProps) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar {...navbarProps} />
      <main className="flex-1">{children}</main>
      <Footer {...footerProps} />
    </div>
  );
}
