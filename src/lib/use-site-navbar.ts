"use client";

import { useRouter } from "next/navigation";
import { logout } from "@/lib/auth";
import { useAuth } from "@/lib/use-auth";
import type { NavbarProps } from "@/components/organisms/Navbar/Navbar";

/** "admin@admin.com" -> "Admin". Nama asli belum ada, jadi diambil dari bagian depan email. */
const displayName = (email: string) => {
  const local = email.split("@")[0] ?? email;
  return local.charAt(0).toUpperCase() + local.slice(1);
};

/** Props Navbar untuk halaman publik: versi login/belum login mengikuti status auth (dibaca di client). */
export function useSiteNavbar(activeId = "workspaces"): { navbarProps: NavbarProps; isLoggedIn: boolean } {
  const email = useAuth();
  const router = useRouter();
  const user = email ? { name: displayName(email) } : undefined;

  return {
    isLoggedIn: Boolean(user),
    navbarProps: {
      activeId,
      user,
      onSignIn: () => router.push("/login"),
      onSignUp: () => router.push("/sign-up"),
      onUserMenuSelect: (value) => {
        if (value === "logout") logout();
      },
    },
  };
}
