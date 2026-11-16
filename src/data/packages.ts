import { MEETING_PACKAGE, REGION_OPTIONS } from "./landing";
import { SERVICES_INTRO } from "./services";
import { toDateParam, type Voucher } from "./booking";
import type { IconName } from "@/components/atoms/Icon/Icon";

export const PACKAGES_HERO = {
  title: "Meeting Room Package",
  description: "Book your meeting room package today and make every meeting impactful.",
  /** Sementara memakai foto kolase paket di landing; ganti dengan foto Figma (ruang meeting dengan pemandangan kota). */
  image: MEETING_PACKAGE.images[0],
};

export const PACKAGES_INTRO = {
  title: "Meeting Room Package at a Special Rate",
  description:
    "Elevate your meetings with CEO SUITE's premium meeting rooms, now available at an exclusive special rate. Whether you're hosting a team brainstorming session, client presentations, or strategic workshops, our fully-equipped meeting spaces offer the perfect blend of professionalism and comfort.",
  trustedLabel: SERVICES_INTRO.trustedLabel,
  trustedLogos: SERVICES_INTRO.trustedLogos,
  trustedLogosAlt: SERVICES_INTRO.trustedLogosAlt,
};

export interface PackageFeature {
  id: string;
  icon: IconName;
  title: string;
  description: string;
}

export const PACKAGE_FEATURES: PackageFeature[] = [
  {
    id: "savings",
    icon: "wallet",
    title: "Exclusive Savings",
    description: "Enjoy special rates, giving you access to premium meeting spaces at exceptional value.",
  },
  {
    id: "flexible",
    icon: "calendar",
    title: "Flexible Bookings",
    description: "Choose from hourly, half-day, or full-day packages tailored to your needs.",
  },
  {
    id: "facilities",
    icon: "office-building",
    title: "State-of-the-Art Facilities",
    description:
      "Access to high-speed internet, video conferencing tools, projectors, and more to ensure seamless presentations.",
  },
  {
    id: "locations",
    icon: "map-pin",
    title: "Prime Locations",
    description:
      "Impress your clients with meeting venues located in prestigious business districts across Asia's key cities.",
  },
  {
    id: "support",
    icon: "customers",
    title: "Dedicated Support",
    description: "Our professional staff is on hand to assist with any setup or logistical needs.",
  },
];

export const PACKAGES_BROWSE = {
  title: "Browse Meeting Room Package",
  description: "Enhance your business engagements with premium spaces at a special rate.",
};

export type PackageBadge = "best-deal" | "most-booked";

export interface MeetingPackage {
  id: string;
  name: string;
  /** Baris di bawah nama, contoh "Access to all rooms within Jakarta". */
  access: string;
  city: string;
  region: string;
  /** Kapasitas, contoh "12 Pax or below". */
  capacity: string;
  badge?: PackageBadge;
  price: number;
  originalPrice?: number;
  /** Label potongan di samping harga coret, contoh "20% OFF". */
  discountLabel?: string;
}

export const PACKAGE_BADGE_LABELS: Record<PackageBadge, string> = {
  "best-deal": "Best Deals Today",
  "most-booked": "Most Booked",
};

interface PackageTemplate {
  name: string;
  /** `null` = akses semua ruang di kota; selain itu nama ruang tertentu. */
  room: string | null;
  space: "rooms" | "co-working spaces";
  capacity: string;
  badge?: PackageBadge;
  price: number;
  discounted: boolean;
}

const MEETING = "20-Hour Meeting Room Package";
const COWORKING = "20-Hour Co-working Space Subscription";

/** Sembilan kartu di Figma; diulang lintas wilayah supaya daftar punya beberapa halaman. */
const TEMPLATES: PackageTemplate[] = [
  { name: MEETING, room: null, space: "rooms", capacity: "12 Pax or below", badge: "best-deal", price: 4800000, discounted: true },
  { name: MEETING, room: null, space: "rooms", capacity: "12 Pax or below", badge: "best-deal", price: 4800000, discounted: true },
  { name: MEETING, room: "AXA Tower Boardroom", space: "rooms", capacity: "12 Pax or below", price: 4800000, discounted: true },
  { name: MEETING, room: null, space: "rooms", capacity: "12 Pax or below", badge: "best-deal", price: 4800000, discounted: true },
  { name: MEETING, room: null, space: "rooms", capacity: "12 Pax or below", badge: "most-booked", price: 4800000, discounted: true },
  { name: COWORKING, room: null, space: "co-working spaces", capacity: "1 Pax", price: 4800000, discounted: true },
  { name: MEETING, room: null, space: "rooms", capacity: "12 Pax or below", badge: "best-deal", price: 4800000, discounted: true },
  { name: COWORKING, room: null, space: "co-working spaces", capacity: "1 Pax", badge: "most-booked", price: 1200000, discounted: true },
  { name: COWORKING, room: null, space: "co-working spaces", capacity: "1 Pax", badge: "most-booked", price: 1200000, discounted: false },
];

const DISCOUNT_PERCENT = 20;

/** Kota + wilayah untuk tiap "putaran" 9 kartu. Jakarta dua putaran (= 2 halaman), sisanya kota lain. */
const PLACES = [
  { city: "Jakarta", region: "Central Jakarta" },
  { city: "Jakarta", region: "South Jakarta" },
  { city: "Surabaya", region: "Central Surabaya" },
];

export const PACKAGES: MeetingPackage[] = PLACES.flatMap(({ city, region }, round) =>
  TEMPLATES.map((template, index): MeetingPackage => {
    const original = Math.round(template.price / (1 - DISCOUNT_PERCENT / 100));
    return {
      id: `package-${round * TEMPLATES.length + index + 1}`,
      name: template.name,
      access: template.room
        ? `Access to ${template.room}`
        : `Access to all ${template.space} within ${city}`,
      city,
      region,
      capacity: template.capacity,
      badge: template.badge,
      price: template.price,
      originalPrice: template.discounted ? original : undefined,
      discountLabel: template.discounted ? `${DISCOUNT_PERCENT}% OFF` : undefined,
    };
  }),
);

export const PACKAGES_PAGE_SIZE = 9;

export const PACKAGE_CITY_OPTIONS = ["Jakarta", "Surabaya"];

export const getPackageRegions = (city: string) => REGION_OPTIONS[city] ?? ["All"];

export const getPackageById = (id: string) => PACKAGES.find((item) => item.id === id);

export interface PackageFilters {
  city: string;
  region: string;
  query: string;
}

/** Saring paket berdasarkan kota, wilayah ("All" = semua), dan kata kunci pada nama/akses. */
export function filterPackages(items: MeetingPackage[], { city, region, query }: PackageFilters) {
  const needle = query.trim().toLowerCase();
  return items.filter(
    (item) =>
      item.city === city &&
      (region === "All" || item.region === region) &&
      (!needle || `${item.name} ${item.access}`.toLowerCase().includes(needle)),
  );
}

export const PACKAGE_VAT_PERCENT = 11;

export interface PackageTotals {
  itemLabel: string;
  /** Harga paket sebelum potongan. */
  subtotal: number;
  /** Potongan voucher (rupiah, positif); 0 bila tanpa voucher. */
  discount: number;
  vat: number;
  total: number;
}

/** Rincian harga paket: subtotal, potongan voucher, PPN 11% dari harga setelah potongan, lalu total. */
export function computePackageTotals(item: MeetingPackage, voucher: Voucher | null): PackageTotals {
  const discount = voucher ? Math.round((item.price * voucher.percent) / 100) : 0;
  const vat = Math.round(((item.price - discount) * PACKAGE_VAT_PERCENT) / 100);
  return {
    itemLabel: `1x ${item.name} (All Access ${item.city})`,
    subtotal: item.price,
    discount,
    vat,
    total: item.price - discount + vat,
  };
}

/** Alamat form booking paket; tanggal mulai dibawa lewat query URL. */
export const buildPackageBookingHref = (id: string, date: Date) =>
  `/package/${id}/booking?date=${toDateParam(date)}`;

/** Langkah di kartu "How to Use This Package". */
export const PACKAGE_HOW_TO_USE = [
  "Download the CEO SUITE App on App Store or Play Store.",
  "When arriving at your room, open the app, log in with your personal details.",
  'Select "Check-in" in the app.',
  "Scan the QR Code.",
  "Enjoy your room.",
];
