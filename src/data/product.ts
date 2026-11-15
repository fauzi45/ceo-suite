import { CITY_CENTERS, RECOMMENDED_ROOMS, SEARCH_ROOMS, type RoomListing } from "@/data/landing";
import { ROOM_TYPE_LABELS } from "@/components/atoms/Chip/Chip";
import type { TimeRange } from "@/components/organisms/TimePicker/TimePicker";

/**
 * Data contoh halaman detail ruangan (belum ada API). Daftar ruangan diambil dari data landing/search;
 * rating, alamat, tarif periode lain, deskripsi, add-on, dan galeri diturunkan di sini.
 */

export interface ProductRates {
  hourly: number;
  daily: number;
  weekly: number;
  monthly: number;
}

export interface AddOn {
  id: string;
  name: string;
  /** Harga dalam rupiah. */
  price: number;
  unit: string;
}

export interface ProductDetail {
  /** Ruangan dengan `lat`/`lng` yang pasti terisi (dipakai pin peta). */
  room: RoomListing & { lat: number; lng: number };
  rating: number;
  /** Contoh: "Wisma GKBI, Jakarta". */
  locationLabel: string;
  address: string;
  description: string;
  rates: ProductRates;
  /** Ada harga coret, jadi ditandai "Best Deal". */
  bestDeal: boolean;
  addOns: AddOn[];
  /** 5 foto: 1 besar + 4 kecil. */
  gallery: string[];
}

/** Add-on contoh dari Figma (satuan tidak terbaca jelas di frame, jadi ini perkiraan). */
export const PRODUCT_ADD_ONS: AddOn[] = [
  { id: "corkage", name: "Corkage Fee", price: 270000, unit: "/event" },
  { id: "lunch-executive", name: "Lunch Package - Executive", price: 110000, unit: "/pax" },
  { id: "lunch-standard", name: "Lunch Package - Standard", price: 85000, unit: "/pax" },
  { id: "coffee-executive", name: "Coffee Break - Executive", price: 75000, unit: "/pax" },
  { id: "coffee-standard", name: "Coffee Break - Standard", price: 50000, unit: "/pax" },
  { id: "flip-chart", name: "Flip Chart", price: 85000, unit: "/day" },
  { id: "lcd-projector", name: "LCD Projector", price: 250000, unit: "/day" },
  { id: "lcd-projector-premium", name: "LCD Projector (Premium)", price: 1500000, unit: "/day" },
];

/** Foto galeri (dipotong dari Figma dalam resolusi tinggi): 1 besar + 4 kecil. */
const GALLERY = [1, 2, 3, 4, 5].map((n) => `/images/product/gallery-${n}.jpg`);

const ALL_ROOMS = [...SEARCH_ROOMS, ...RECOMMENDED_ROOMS];

const toNumber = (price: string) => Number(price.replace(/\D/g, ""));
const roundThousand = (value: number) => Math.round(value / 1000) * 1000;

export const formatRupiah = (value: number) => `Rp${value.toLocaleString("en-US")}`;

function buildRates(room: RoomListing): ProductRates {
  const isDaily = room.period === "Daily";
  const daily = isDaily ? toNumber(room.price) : toNumber(room.secondaryPrice);
  return {
    daily,
    hourly: isDaily ? toNumber(room.secondaryPrice) : roundThousand(daily / 6),
    weekly: room.period === "Weekly" ? toNumber(room.price) : roundThousand(daily * 5.5),
    monthly: roundThousand(daily * 18),
  };
}

/** Detail ruangan berdasarkan id (param URL). `undefined` bila id tidak dikenal. */
export function getProduct(id: string): ProductDetail | undefined {
  const base = ALL_ROOMS.find((room) => room.id === id);
  if (!base) return undefined;

  const city = base.city ?? "Jakarta";
  const [lat, lng] = CITY_CENTERS[city] ?? CITY_CENTERS.Jakarta;
  const room = { ...base, city, lat: base.lat ?? lat, lng: base.lng ?? lng };

  return {
    room,
    rating: 4.8,
    locationLabel: `${room.name}, ${city}`,
    address: [room.region, city].filter(Boolean).join(", "),
    description: `${ROOM_TYPE_LABELS[room.roomType]} in ${room.region ?? city}, fully equipped with amenities and fullboard facilities.`,
    rates: buildRates(room),
    bestDeal: Boolean(room.originalPrice),
    addOns: PRODUCT_ADD_ONS,
    gallery: GALLERY,
  };
}

/** Ruangan serupa: tipe yang sama didahulukan, sisanya diisi ruangan lain. */
export function getSimilarRooms(id: string, roomType: RoomListing["roomType"], count = 4): RoomListing[] {
  const others = SEARCH_ROOMS.filter((room) => room.id !== id);
  return [
    ...others.filter((room) => room.roomType === roomType),
    ...others.filter((room) => room.roomType !== roomType),
  ].slice(0, count);
}

const toMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

/** Total sewa satu hari: tarif per jam x durasi, tetapi tidak melebihi tarif harian. `null` bila jam belum lengkap. */
export function computeTotal(rates: ProductRates, time: TimeRange): number | null {
  if (!time.start || !time.end) return null;
  const hours = (toMinutes(time.end) - toMinutes(time.start)) / 60;
  if (hours <= 0) return null;
  return Math.min(rates.daily, Math.round(rates.hourly * hours));
}

/** Semua id ruangan yang punya halaman detail (untuk `generateStaticParams`). */
export const PRODUCT_IDS = ALL_ROOMS.map((room) => room.id);
