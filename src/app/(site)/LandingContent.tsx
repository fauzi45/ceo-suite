"use client";

import { useRouter } from "next/navigation";
import { logout } from "@/lib/auth";
import { useAuth } from "@/lib/use-auth";
import { AppDownloadSection } from "@/components/organisms/AppDownloadSection/AppDownloadSection";
import { BestDealsSection } from "@/components/organisms/BestDealsSection/BestDealsSection";
import { BrowseSpacesSection } from "@/components/organisms/BrowseSpacesSection/BrowseSpacesSection";
import { FaqSection } from "@/components/organisms/FaqSection/FaqSection";
import { HeroBanner } from "@/components/organisms/HeroBanner/HeroBanner";
import { HeroSearch } from "@/components/organisms/HeroSearch/HeroSearch";
import { MeetingPackageSection } from "@/components/organisms/MeetingPackageSection/MeetingPackageSection";
import { NewsSection } from "@/components/organisms/NewsSection/NewsSection";
import { PartnersSection } from "@/components/organisms/PartnersSection/PartnersSection";
import { PromotionsSection } from "@/components/organisms/PromotionsSection/PromotionsSection";
import { RecommendedSection } from "@/components/organisms/RecommendedSection/RecommendedSection";
import { StatsSection } from "@/components/organisms/StatsSection/StatsSection";
import { TrustedBySection } from "@/components/organisms/TrustedBySection/TrustedBySection";
import { LandingLayout } from "@/components/templates/LandingLayout/LandingLayout";

/** "admin@admin.com" -> "Admin". Nama asli belum ada, jadi diambil dari bagian depan email. */
const displayName = (email: string) => {
  const local = email.split("@")[0] ?? email;
  return local.charAt(0).toUpperCase() + local.slice(1);
};

/**
 * Landing page dengan dua versi:
 * - belum login: hero pencarian + 12 section lengkap
 * - sudah login: hero banner + Recommended, Promotions, Best Deals
 * Status login dibaca dari localStorage (client), jadi render pertama selalu versi belum login.
 */
export function LandingContent() {
  const email = useAuth();
  const router = useRouter();
  const user = email ? { name: displayName(email) } : undefined;

  return (
    <LandingLayout
      navbarProps={{
        activeId: "workspaces",
        user,
        onSignIn: () => router.push("/login"),
        onSignUp: () => router.push("/sign-up"),
        onUserMenuSelect: (value) => {
          if (value === "logout") logout();
        },
      }}
    >
      {user ? (
        <>
          <HeroBanner />
          <RecommendedSection />
          <PromotionsSection />
          <BestDealsSection />
        </>
      ) : (
        <>
          <HeroSearch />
          <BrowseSpacesSection />
          <RecommendedSection />
          <StatsSection />
          <PromotionsSection />
          <BestDealsSection />
          <MeetingPackageSection />
          <PartnersSection />
          <TrustedBySection />
          <NewsSection />
          <FaqSection />
          <AppDownloadSection />
        </>
      )}
    </LandingLayout>
  );
}
