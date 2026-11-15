import type { RoomType } from "@/components/atoms/Chip/Chip";
import type { IconName } from "@/components/atoms/Icon/Icon";

/**
 * Data statis landing page (teks disalin dari Figma). Belum ada API.
 * Foto dipotong dari frame landing page di Figma dan disimpan di `public/images/landing/`.
 * Field `image` yang kosong membuat komponen menampilkan placeholder abu-abu.
 */

const img = (name: string) => `/images/landing/${name}.jpg`;

export const HERO_IMAGE = img("hero");

export interface RoomListing {
  id: string;
  name: string;
  roomType: RoomType;
  people: number;
  /** Periode harga utama, contoh "Daily" atau "Weekly". */
  period: string;
  price: string;
  /** Harga coret (sebelum diskon), opsional. */
  originalPrice?: string;
  /** Harga periode lebih kecil, contoh "Hourly Rp480,000". */
  secondaryPrice: string;
  image?: string;
  /** Lokasi, dipakai halaman Search Results (filter + pin peta). */
  city?: string;
  region?: string;
  lat?: number;
  lng?: number;
}

const ROOM_TEMPLATES: Omit<RoomListing, "id">[] = [
  {
    name: "AXA Tower Meeting Room",
    roomType: "meeting",
    people: 4,
    period: "Daily",
    price: "Rp2,880,000",
    secondaryPrice: "Hourly Rp480,000",
    image: img("room-1"),
  },
  {
    name: "AXA Tower Meeting Room",
    roomType: "meeting",
    people: 4,
    period: "Daily",
    price: "Rp1,200,000",
    originalPrice: "Rp1,600,000",
    secondaryPrice: "Hourly Rp200,000",
    image: img("room-2"),
  },
  {
    name: "Suite 7 View",
    roomType: "office",
    people: 8,
    period: "Daily",
    price: "Rp3,480,000",
    secondaryPrice: "Hourly Rp600,000",
    image: img("room-3"),
  },
  {
    name: "Suite VIP 5 Non View",
    roomType: "coworking",
    people: 1,
    period: "Weekly",
    price: "Rp750,000",
    secondaryPrice: "Daily Rp150,000",
    image: img("room-4"),
  },
];

/** 8 kartu (grid 4 x 2) seperti di Figma: 4 contoh yang diulang. */
export const RECOMMENDED_ROOMS: RoomListing[] = [...ROOM_TEMPLATES, ...ROOM_TEMPLATES].map(
  (room, index) => ({ ...room, id: `room-${index + 1}` }),
);

export interface SpaceCategory {
  id: string;
  label: string;
  icon: IconName;
  image?: string;
}

export const SPACE_CATEGORIES: SpaceCategory[] = [
  { id: "private-offices", label: "Private Offices", icon: "room-office", image: img("space-offices-sq") },
  { id: "coworking", label: "Coworking Space", icon: "room-coworking", image: img("space-coworking-sq") },
  { id: "meeting-room", label: "Meeting Room", icon: "room-meeting", image: img("space-meeting-sq") },
];

export interface Stat {
  id: string;
  icon: IconName;
  value: string;
  label: string;
}

export const STATS: Stat[] = [
  { id: "cities", icon: "city", value: "11", label: "Vibrant Cities" },
  { id: "locations", icon: "pin-radius", value: "22", label: "prime locations in Asia's CBDs" },
  { id: "years", icon: "briefcase", value: "25", label: "years in business" },
  { id: "buildings", icon: "office-building", value: "100%", label: "grade A+ Buildings" },
  { id: "businesses", icon: "handshake", value: "80,000+", label: "businesses served" },
];

export const WHY_CEO_SUITE = {
  eyebrow: "Why CEO SUITE?",
  title: "We revolutionize your workspace",
  paragraphs: [
    "In today's fast-paced business environment, finding the right workspace solution is crucial to your company's success. CEO SUITE offers an unparalleled workspace experience that combines premium locations, flexibility, top-notch amenities, and exceptional service to meet the needs of modern businesses.",
    "As Asia's leading serviced office provider, CEO SUITE stands out as the ideal partner for companies seeking more than just office space—a place where business can thrive.",
  ],
};

export interface Promo {
  id: string;
  title: string;
  description: string;
  image?: string;
}

export const PROMOTIONS: Promo[] = [
  {
    id: "promo-1",
    title: "Discount 20% for all co-working space booking!",
    description: "Limited time offer! Don't miss out on this incredible deal.",
    image: img("promo-1"),
  },
  {
    id: "promo-2",
    title: "Exclusive 30% discount on monthly co-working space subscriptions!",
    description: "Limited time offer! Don't miss out on this incredible deal.",
    image: img("promo-2"),
  },
  {
    id: "promo-3",
    title: "Special offer: Get 25% off any meeting room booking!",
    description: "Don't miss out on this exclusive deal! Limited time only.",
    image: img("promo-3"),
  },
];

export interface Deal {
  id: string;
  title: string;
  validity: string;
  image?: string;
}

export const BEST_DEALS: Deal[] = [1, 2, 3].map((n) => ({
  id: `deal-${n}`,
  title: "Rp200,000 Voucher for Office!",
  validity: "Valid until 31 August 2024",
  image: img("deal"),
}));

export const MEETING_PACKAGE = {
  title: "Meeting Room Package",
  paragraphs: [
    "Elevate your meetings with CEO SUITE's premium meeting rooms, now available at an exclusive special rate.",
    "Whether you're hosting a team brainstorming session, client presentations, or strategic workshops, our fully-equipped meeting spaces offer the perfect blend of professionalism and comfort.",
  ],
  highlights: ["exclusive special rate.", "blend of professionalism and comfort."],
  actionLabel: "Browse Packages",
  /** Urutan: kiri-atas, kanan-atas, kiri-bawah, kanan-bawah. */
  images: [img("package-1"), img("package-2"), img("package-3"), img("package-4")],
};

export interface Partner {
  id: string;
  title: string;
  description: string;
  /** Nama partner untuk lencana di atas foto. */
  partner: string;
  image?: string;
}

export const PARTNERS: Partner[] = [
  {
    id: "partner-mandiri",
    partner: "Mandiri",
    image: img("partner-1"),
    title: "Exclusive Corporate Rate | Bank Mandiri",
    description:
      "Enjoy substantial savings on meeting rooms, event spaces, and other business solutions when you partner with us.",
  },
  {
    id: "partner-member",
    partner: "Member",
    image: img("partner-2"),
    title: "Exclusive Member Benefits",
    description:
      "As a valued member, you'll enjoy a range of benefits designed to enhance your experience and provide exceptional value.",
  },
  {
    id: "partner-dbs",
    partner: "DBS",
    image: img("partner-3"),
    title: "10% Offer for DBS Credit Card Holder",
    description:
      "Exclusive to DBS Credit Card holders: Get a 10% discount on your next booking. Valid for corporate booking only.",
  },
];

/** Semua logo dari "Component 1" di page Design System; file ada di `public/logos/`. */
export const TRUSTED_LOGOS = [
  { id: "uber", src: "/logos/uber.svg", alt: "Uber" },
  { id: "dell", src: "/logos/dell.svg", alt: "Dell" },
  { id: "samsung", src: "/logos/samsung.svg", alt: "Samsung" },
  { id: "nike", src: "/logos/nike.svg", alt: "Nike" },
  { id: "etihad", src: "/logos/etihad.svg", alt: "Etihad Airways" },
  { id: "zurich", src: "/logos/zurich.svg", alt: "Zurich" },
  { id: "cisco", src: "/logos/cisco.svg", alt: "Cisco" },
  { id: "bp", src: "/logos/bp.svg", alt: "BP" },
  { id: "exxonmobil", src: "/logos/exxonmobil.svg", alt: "ExxonMobil" },
  { id: "ey", src: "/logos/ey.svg", alt: "EY" },
  { id: "kpmg", src: "/logos/kpmg.svg", alt: "KPMG" },
  { id: "pg", src: "/logos/pg.png", alt: "Procter & Gamble" },
];

export interface NewsArticle {
  id: string;
  meta: string;
  title: string;
  excerpt: string;
  image?: string;
}

const NEWS_EXCERPT =
  "NEW YORK—A 6-year-old horse died after being injured in a race at Belmont Park ahead of next week's";

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: "news-1",
    meta: "Race98 – 03 June 2023",
    title: "Does productivity increase when working remotely ?",
    excerpt: NEWS_EXCERPT,
    image: img("news-1"),
  },
  {
    id: "news-2",
    meta: "Race98 – 03 June 2023",
    title: "Morning routine to boost your mood",
    excerpt: NEWS_EXCERPT,
    image: img("news-2"),
  },
  {
    id: "news-3",
    meta: "Race98 – 03 June 2023",
    title: "5+ tips to find comfortable co-working space",
    excerpt: NEWS_EXCERPT,
    image: img("news-3"),
  },
];

export const NEWS_FEATURED = {
  tag: "TIPS",
  meta: "Debuts – 03 June 2023",
  title: "Minimal workspace for inspirations",
  image: img("news-featured-hd"),
};

export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
}

const FAQ_PLACEHOLDER_ANSWER = "The answer to this question will be available soon.";

export const FAQS: FaqEntry[] = [
  {
    id: "faq-1",
    question: "What types of office spaces does CEO SUITE offer?",
    answer:
      "We provide a variety of office spaces including private offices, co-working spaces, meeting rooms, and virtual offices. Whether you need a dedicated workspace or flexible hot-desking options, we have a solution to fit your needs.",
  },
  { id: "faq-2", question: "What amenities are included with a CEO SUITE membership?", answer: FAQ_PLACEHOLDER_ANSWER },
  { id: "faq-3", question: "Can I customize my office space?", answer: FAQ_PLACEHOLDER_ANSWER },
  { id: "faq-4", question: "How do I book meeting rooms?", answer: FAQ_PLACEHOLDER_ANSWER },
  {
    id: "faq-5",
    question: "Are there any additional costs for using meeting rooms or other facilities?",
    answer: FAQ_PLACEHOLDER_ANSWER,
  },
  { id: "faq-6", question: "What is included in the administrative support services?", answer: FAQ_PLACEHOLDER_ANSWER },
  { id: "faq-7", question: "How can I access CEO SUITE's high-speed internet?", answer: FAQ_PLACEHOLDER_ANSWER },
  { id: "faq-8", question: "Can I use CEO SUITE's facilities for events?", answer: FAQ_PLACEHOLDER_ANSWER },
  { id: "faq-9", question: "What are the operating hours for CEO SUITE locations?", answer: FAQ_PLACEHOLDER_ANSWER },
  {
    id: "faq-10",
    question: "How can I contact CEO SUITE for more information or support?",
    answer: FAQ_PLACEHOLDER_ANSWER,
  },
];

/** Opsi dropdown pencarian (contoh; belum ada API). */
export const CITY_OPTIONS = ["Jakarta", "Surabaya", "Bandung", "Medan", "Bali"];
export const LOCATION_OPTIONS = ["Jakarta, Wisma GKBI", "Jakarta, AXA Tower", "Jakarta, Sudirman CBD"];

/** Opsi "Space Type": opsi pertama = semua; nilai lainnya = `RoomType`. */
export const SPACE_TYPE_OPTIONS = [
  { value: "all", label: "All Space" },
  { value: "meeting", label: "Meeting Room" },
  { value: "office", label: "Office" },
  { value: "coworking", label: "Co-working Space" },
  { value: "board", label: "Board Room" },
  { value: "class", label: "Class Room" },
  { value: "seminar", label: "Seminar Room" },
  { value: "theatre", label: "Theatre Room" },
  { value: "combined", label: "Combined Room" },
];

/** Opsi "Select Region" per kota (opsi pertama = semua wilayah). */
export const REGION_OPTIONS: Record<string, string[]> = {
  Jakarta: ["All", "Central Jakarta", "South Jakarta", "West Jakarta"],
  Surabaya: ["All", "Central Surabaya", "East Surabaya"],
  Bandung: ["All", "North Bandung", "South Bandung"],
  Medan: ["All"],
  Bali: ["All", "Denpasar", "Kuta"],
};

/** Titik tengah peta per kota ([lat, lng]). */
export const CITY_CENTERS: Record<string, [number, number]> = {
  Jakarta: [-6.2088, 106.8456],
  Surabaya: [-7.2575, 112.7521],
  Bandung: [-6.9175, 107.6191],
  Medan: [3.5952, 98.6722],
  Bali: [-8.65, 115.2167],
};

type SearchRoomSeed = Omit<RoomListing, "id" | "period" | "secondaryPrice" | "price"> & {
  price: number;
};

const rupiah = (value: number) => `Rp${value.toLocaleString("en-US")}`;

const SEARCH_ROOM_SEEDS: SearchRoomSeed[] = [
  { name: "AXA Tower Meeting Room", roomType: "office", people: 4, price: 2880000, city: "Jakarta", region: "South Jakarta", lat: -6.2297, lng: 106.8305, image: img("room-1") },
  { name: "Suite 7 View", roomType: "coworking", people: 4, price: 2880000, city: "Jakarta", region: "Central Jakarta", lat: -6.1944, lng: 106.8229, image: img("room-3") },
  { name: "Suite VIP 5 Non View", roomType: "class", people: 4, price: 2880000, city: "Jakarta", region: "South Jakarta", lat: -6.2615, lng: 106.8106, image: img("room-4") },
  { name: "Suite 7 View", roomType: "seminar", people: 4, price: 2880000, city: "Jakarta", region: "Central Jakarta", lat: -6.2088, lng: 106.8199, image: img("room-3") },
  { name: "Suite VIP 5 Non View", roomType: "meeting", people: 4, price: 2880000, city: "Jakarta", region: "West Jakarta", lat: -6.1683, lng: 106.7589, image: img("room-4") },
  { name: "AXA Tower Meeting Room", roomType: "theatre", people: 4, price: 2880000, city: "Jakarta", region: "South Jakarta", lat: -6.2441, lng: 106.8003, image: img("room-1") },
  { name: "Wisma GKBI Board Room", roomType: "board", people: 12, price: 3600000, city: "Jakarta", region: "Central Jakarta", lat: -6.2146, lng: 106.8186, image: img("room-2") },
  { name: "Sudirman CBD Combined Room", roomType: "combined", people: 20, price: 4200000, city: "Jakarta", region: "South Jakarta", lat: -6.2255, lng: 106.8091, image: img("room-1") },
  { name: "Gatot Subroto Office", roomType: "office", people: 6, price: 3100000, city: "Jakarta", region: "South Jakarta", lat: -6.2349, lng: 106.8227, image: img("room-3") },
  { name: "Thamrin Meeting Room", roomType: "meeting", people: 8, price: 1900000, city: "Jakarta", region: "Central Jakarta", lat: -6.1936, lng: 106.8231, image: img("room-2") },
  { name: "Braga Co-working", roomType: "coworking", people: 2, price: 950000, city: "Bandung", region: "North Bandung", lat: -6.9147, lng: 107.6098, image: img("room-4") },
  { name: "Dago Meeting Room", roomType: "meeting", people: 6, price: 1500000, city: "Bandung", region: "North Bandung", lat: -6.8932, lng: 107.6132, image: img("room-2") },
  { name: "Tunjungan Office", roomType: "office", people: 6, price: 2400000, city: "Surabaya", region: "Central Surabaya", lat: -7.2625, lng: 112.7378, image: img("room-3") },
  { name: "Darmo Board Room", roomType: "board", people: 10, price: 2700000, city: "Surabaya", region: "Central Surabaya", lat: -7.2894, lng: 112.7387, image: img("room-1") },
  { name: "Seminyak Co-working", roomType: "coworking", people: 3, price: 1100000, city: "Bali", region: "Kuta", lat: -8.6913, lng: 115.1683, image: img("room-4") },
  { name: "Sanur Seminar Room", roomType: "seminar", people: 40, price: 5200000, city: "Bali", region: "Denpasar", lat: -8.6905, lng: 115.2632, image: img("room-2") },
];

/** Hasil pencarian contoh (belum ada API): tersebar di beberapa kota supaya filter City/Region terlihat bekerja. */
export const SEARCH_ROOMS: RoomListing[] = SEARCH_ROOM_SEEDS.map(({ price, ...room }, index) => ({
  ...room,
  id: `search-room-${index + 1}`,
  period: "Daily",
  price: rupiah(price),
  secondaryPrice: `Hourly ${rupiah(Math.round(price / 6 / 1000) * 1000)}`,
}));

export interface OtherSpace {
  id: string;
  label: string;
  roomType: RoomType;
  image: string;
  /** Foto belum memuat penanda panah merah (foto dari Figma untuk 3 kategori pertama sudah). */
  needsMarker?: boolean;
}

/** Carousel "Other Spaces" di halaman Search Results. */
export const OTHER_SPACES: OtherSpace[] = [
  { id: "coworking", label: "Coworking Space", roomType: "coworking", image: img("space-coworking-sq") },
  { id: "meeting", label: "Meeting Room", roomType: "meeting", image: img("other-meeting"), needsMarker: true },
  { id: "board", label: "Board Room", roomType: "board", image: img("other-board"), needsMarker: true },
  { id: "class", label: "Class Room", roomType: "class", image: img("other-class"), needsMarker: true },
  { id: "seminar", label: "Seminar Room", roomType: "seminar", image: img("other-seminar"), needsMarker: true },
  { id: "theatre", label: "Theatre Room", roomType: "theatre", image: img("other-theatre"), needsMarker: true },
  { id: "office", label: "Private Offices", roomType: "office", image: img("space-offices-sq") },
];
