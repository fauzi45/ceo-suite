"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  BEST_DEAL_VOUCHERS,
  COWORKING_PROMOS,
  EVENT_SPACE_PROMOS,
  MEETING_ROOM_PROMOS,
  OFFICE_PROMOS,
  PROMO_ITEMS,
  VOUCHER_DEALS,
  parsePromoCategory,
  type PromoCategoryId,
} from "@/data/promotions";
import { useSiteNavbar } from "@/lib/use-site-navbar";
import { Container } from "@/components/atoms/Container/Container";
import { DealCard } from "@/components/molecules/DealCard/DealCard";
import { PromoCard } from "@/components/molecules/PromoCard/PromoCard";
import { PromoCarouselSection } from "@/components/organisms/PromoCarouselSection/PromoCarouselSection";
import { PromoCategoryTabs } from "@/components/organisms/PromoCategoryTabs/PromoCategoryTabs";
import { PromoGridSection } from "@/components/organisms/PromoGridSection/PromoGridSection";
import { PromoHero } from "@/components/organisms/PromoHero/PromoHero";
import { LandingLayout } from "@/components/templates/LandingLayout/LandingLayout";

/**
 * Halaman daftar Promotions & Deals. Tab "All Promotions" menampilkan semua section;
 * tab lain hanya section-nya. Pilihan tab disimpan di URL (`?category=vouchers`).
 */
export function PromotionsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { navbarProps } = useSiteNavbar("promotions");
  const category = parsePromoCategory(searchParams.get("category"));

  const selectCategory = (next: PromoCategoryId) => {
    router.replace(next === "all" ? pathname : `${pathname}?category=${next}`, { scroll: false });
  };

  const show = (id: PromoCategoryId) => category === "all" || category === id;

  return (
    <LandingLayout navbarProps={navbarProps}>
      <PromoHero />
      <Container>
        <PromoCategoryTabs value={category} onChange={selectCategory} className="-mt-16 relative z-10" />
      </Container>

      <Container className="flex flex-col gap-16 py-12 md:py-16">
        {category === "all" && (
          <PromoGridSection
            id="promotions"
            title="Promotions"
            subtitle="Don't miss this opportunity to elevate your workspace experience at unbeatable value."
            icon="megaphone"
          >
            {PROMO_ITEMS.map((promo) => (
              <PromoCard
                key={promo.id}
                promo={promo}
                href={`/promotions/${promo.id}`}
                unavailable={!promo.available}
                className="shadow-input"
              />
            ))}
          </PromoGridSection>
        )}

        {show("best-deals") && (
          <PromoGridSection
            id="best-deals"
            title="Best Deals"
            subtitle="Take advantage of our special promotions and enjoy exceptional savings on your workspace."
            icon="seal-percent-fill"
          >
            {BEST_DEAL_VOUCHERS.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </PromoGridSection>
        )}

        {show("vouchers") && (
          <PromoGridSection
            id="vouchers"
            title="Vouchers"
            subtitle="Save on Your Dream Workspace"
            icon="voucher"
            iconClassName="bg-teal-50 text-teal-600"
          >
            {VOUCHER_DEALS.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </PromoGridSection>
        )}

        {show("meeting-rooms") && (
          <PromoCarouselSection
            id="meeting-rooms"
            title="Meeting Rooms"
            subtitle="Limited Time Offer"
            icon="room-meeting"
            iconClassName="bg-fuchsia-50 text-fuchsia-700"
            promos={MEETING_ROOM_PROMOS}
          />
        )}

        {show("office") && (
          <PromoCarouselSection
            id="office"
            title="Office"
            subtitle="Limited Time Offer"
            icon="room-office"
            iconClassName="bg-blue-50 text-blue-600"
            promos={OFFICE_PROMOS}
          />
        )}

        {show("co-working") && (
          <PromoCarouselSection
            id="co-working"
            title="Co-Working"
            subtitle="Limited Time Offer"
            icon="room-coworking"
            iconClassName="bg-green-50 text-green-600"
            promos={COWORKING_PROMOS}
          />
        )}

        {show("event-spaces") && (
          <PromoCarouselSection
            id="event-spaces"
            title="Event Spaces"
            subtitle="Limited Time Offer"
            icon="room-seminar"
            iconClassName="bg-indigo-50 text-indigo-900"
            promos={EVENT_SPACE_PROMOS}
          />
        )}
      </Container>
    </LandingLayout>
  );
}
