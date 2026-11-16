"use client";

import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { PROFILE_MENU, PROFILE_TITLES, type ProfileSection } from "@/data/profile";
import { logout } from "@/lib/auth";
import { useAuth } from "@/lib/use-auth";
import { useSiteNavbar } from "@/lib/use-site-navbar";
import { Container } from "@/components/atoms/Container/Container";
import { NotLoggedInCard } from "@/components/molecules/NotLoggedInCard/NotLoggedInCard";
import { ProfileSidebar } from "@/components/molecules/ProfileSidebar/ProfileSidebar";
import { LandingLayout } from "@/components/templates/LandingLayout/LandingLayout";

function sectionOf(pathname: string): ProfileSection {
  if (pathname.startsWith("/profile/detail")) return "detail";
  if (pathname.startsWith("/profile/password")) return "password";
  return "overview";
}

/**
 * Kerangka semua halaman /profile: sidebar di kiri, judul + isi di kanan. Belum login: isi diganti kartu
 * "You're not Log in" (sidebar tetap tampil). Isi hanya dirender setelah status login diketahui.
 */
export function ProfileShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const email = useAuth();
  const { navbarProps } = useSiteNavbar("profile");
  const section = sectionOf(pathname);

  return (
    <LandingLayout navbarProps={navbarProps} mainClassName="bg-neutral-25">
      <div>
        <Container className="grid gap-6 py-8 lg:grid-cols-[240px_1fr] lg:items-start lg:gap-10 lg:py-12">
          <ProfileSidebar
            active={section}
            onSelect={(next) => router.push(PROFILE_MENU.find((item) => item.id === next)?.href ?? "/profile")}
            onBack={() => router.push("/")}
            onLogout={() => {
              logout();
              router.push("/");
            }}
          />
          <div className="flex min-w-0 flex-col gap-4">
            <h1 className="text-heading-sm font-bold leading-[1.2] text-neutral-950 md:text-heading-md">
              {PROFILE_TITLES[section]}
            </h1>
            {email === undefined ? null : email === null ? (
              <NotLoggedInCard onSignIn={() => router.push("/login")} />
            ) : (
              children
            )}
          </div>
        </Container>
      </div>
    </LandingLayout>
  );
}
