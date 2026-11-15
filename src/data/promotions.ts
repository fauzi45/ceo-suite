import { BEST_DEALS, PROMOTIONS, type Deal, type Promo } from "@/data/landing";
import type { IconName } from "@/components/atoms/Icon/Icon";

const img = (name: string) => `/images/landing/${name}.jpg`;

/** Promo lengkap: dipakai kartu di daftar dan halaman detail. */
export interface PromoItem extends Promo {
  /** `false` = kartu abu-abu berlabel "Unavailable" dan tidak bisa dibuka. */
  available: boolean;
  /** Foto banner halaman detail: wajib beresolusi tinggi (tampil selebar sampai 1600px), beda dari foto kartu. */
  banner?: string;
  /** Kode promo yang ditampilkan di halaman detail. */
  code: string;
  /** Judul pendek di bawah deskripsi detail. */
  headline: string;
  body: string;
  terms: string[];
}

const buildTerms = (subject: string, discount: string) => [
  `The ${discount} discount is valid for all ${subject} bookings made between [Start Date] and [End Date].`,
  "The offer cannot be combined with any other promotions or discounts.",
  "The discount will be automatically applied to your total booking amount.",
  "Cancellation policies will follow our standard terms and conditions.",
  "Please refer to our website or contact our customer service for detailed information on cancellation fees.",
  "Any amendments to your booking, such as changes in dates, times, or room configurations, may be subject to additional charges.",
  "Please contact our customer service for assistance with any changes.",
  "No refunds will be issued for unused portions of the booking or for cancellations made after the booking deadline.",
  "In the event of unforeseen circumstances beyond our control, such as natural disasters or government restrictions, we may be unable to fulfill the booking. In such cases, we will offer alternative arrangements or a full refund.",
];

const bodyFor = (subject: string, discount: string) =>
  `Book any of our ${subject} and enjoy a substantial discount of ${discount}. Whether you're hosting a small team meeting or a large conference, our state-of-the-art facilities and personalized service will make your event a success.`;

const [coworking20, coworking30, meeting25] = PROMOTIONS.map((promo) => ({ ...promo, banner: promo.image }));

/** Enam promo di section "Promotions" (kartu keenam tidak tersedia, seperti Figma). */
export const PROMO_ITEMS: PromoItem[] = [
  {
    ...coworking20,
    available: true,
    code: "COWORKING20",
    headline: "Elevate Your Co-working Days with 20% Off!",
    body: bodyFor("co-working spaces", "20%"),
    terms: buildTerms("co-working space", "20%"),
  },
  {
    ...coworking30,
    available: true,
    code: "MONTHLY30",
    headline: "Subscribe Monthly and Save 30%!",
    body: bodyFor("monthly co-working subscriptions", "30%"),
    terms: buildTerms("monthly co-working subscription", "30%"),
  },
  {
    ...meeting25,
    available: true,
    code: "DISCOUNT25",
    headline: "Elevate Your Meetings with 25% Off!",
    body: bodyFor("meeting rooms", "25%"),
    terms: buildTerms("meeting room", "25%"),
  },
  { ...coworking20, id: "promo-4", available: true, code: "COWORKING20B", headline: "Elevate Your Co-working Days with 20% Off!", body: bodyFor("co-working spaces", "20%"), terms: buildTerms("co-working space", "20%") },
  { ...coworking30, id: "promo-5", available: true, code: "MONTHLY30B", headline: "Subscribe Monthly and Save 30%!", body: bodyFor("monthly co-working subscriptions", "30%"), terms: buildTerms("monthly co-working subscription", "30%") },
  { ...meeting25, id: "promo-6", available: false, code: "DISCOUNT25B", headline: "Elevate Your Meetings with 25% Off!", body: bodyFor("meeting rooms", "25%"), terms: buildTerms("meeting room", "25%") },
];

export const PROMO_IDS = PROMO_ITEMS.map((promo) => promo.id);

export const getPromo = (id: string) => PROMO_ITEMS.find((promo) => promo.id === id);

/** Section kategori (Meeting Rooms dst.): foto berbeda, judul promo sama dengan Figma. */
const section = (prefix: string, images: string[], count = 6): PromoItem[] =>
  Array.from({ length: count }, (_, i) => {
    const base = PROMO_ITEMS[i % 3];
    return {
      ...base,
      id: `${prefix}-${i + 1}`,
      image: img(images[i % images.length]),
      banner: base.banner ?? base.image,
      available: true,
    };
  });

export const MEETING_ROOM_PROMOS = section("meeting", ["promo-1", "promo-2", "promo-3"]);
export const OFFICE_PROMOS = section("office", ["room-1", "room-2", "room-3"]);
export const COWORKING_PROMOS = section("coworking", ["space-coworking-sq", "room-4", "promo-1"]);
export const EVENT_SPACE_PROMOS = section("event", ["other-seminar", "other-theatre", "other-meeting"]);

/** Id promo section kategori ikut dibuka lewat halaman detail (memakai template yang sama). */
export const ALL_PROMO_ITEMS = [
  ...PROMO_ITEMS,
  ...MEETING_ROOM_PROMOS,
  ...OFFICE_PROMOS,
  ...COWORKING_PROMOS,
  ...EVENT_SPACE_PROMOS,
];

export const getPromoById = (id: string) => ALL_PROMO_ITEMS.find((promo) => promo.id === id);
export const ALL_PROMO_IDS = ALL_PROMO_ITEMS.map((promo) => promo.id);

/** Voucher: tiga di "Best Deals", enam di "Vouchers". */
export const BEST_DEAL_VOUCHERS: Deal[] = BEST_DEALS;
export const VOUCHER_DEALS: Deal[] = Array.from({ length: 6 }, (_, i) => ({
  ...BEST_DEALS[0],
  id: `voucher-${i + 1}`,
}));

/** Tab kategori di bawah hero. Urutan dan warna icon mengikuti Figma. */
export type PromoCategoryId =
  | "all"
  | "best-deals"
  | "vouchers"
  | "meeting-rooms"
  | "office"
  | "co-working"
  | "event-spaces";

export interface PromoCategoryTab {
  id: PromoCategoryId;
  label: string;
  icon: IconName;
  iconClassName: string;
}

export const PROMO_CATEGORY_TABS: PromoCategoryTab[] = [
  { id: "all", label: "All Promotions", icon: "megaphone", iconClassName: "text-primary-400" },
  { id: "best-deals", label: "Best Deals", icon: "seal-percent-fill", iconClassName: "text-primary-600" },
  { id: "vouchers", label: "Vouchers", icon: "voucher", iconClassName: "text-teal-600" },
  { id: "meeting-rooms", label: "Meeting Rooms", icon: "room-meeting", iconClassName: "text-fuchsia-700" },
  { id: "office", label: "Office", icon: "room-office", iconClassName: "text-blue-600" },
  { id: "co-working", label: "Co-working", icon: "room-coworking", iconClassName: "text-green-600" },
  { id: "event-spaces", label: "Event Spaces", icon: "room-seminar", iconClassName: "text-indigo-900" },
];

export const parsePromoCategory = (value: string | null): PromoCategoryId =>
  PROMO_CATEGORY_TABS.find((tab) => tab.id === value)?.id ?? "all";

export const PROMO_HERO = {
  title: "Elevate Your Events with Exclusive Offers!",
  description:
    "Not only can you access special deals on office spaces, meeting rooms, and virtual office services, but you'll also enjoy exclusive business affiliation discounts with our partner companies across the region.",
  image: PROMOTIONS[0].image,
};
