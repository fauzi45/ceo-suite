import { PRODUCT_ADD_ONS, computeTotal, type AddOn, type ProductDetail } from "@/data/product";
import type { TimeRange } from "@/components/organisms/TimePicker/TimePicker";

/**
 * Data contoh alur booking (belum ada API): add-on, voucher, dan perhitungan harga.
 * Jadwal (tanggal + jam) dibawa dari halaman detail ruangan lewat query URL.
 */

export interface Voucher {
  id: string;
  code: string;
  title: string;
  /** Contoh: "Valid until 31 Dec 2026". */
  note: string;
  /** Potongan dalam persen dari harga sewa ruangan. */
  percent: number;
}

/** Add-on di modal booking: add-on halaman detail + "Overtime AC" yang hanya ada di modal Figma. */
export const BOOKING_ADD_ONS: AddOn[] = [
  ...PRODUCT_ADD_ONS,
  { id: "overtime-ac", name: "Overtime AC", price: 300000, unit: "/hour" },
];

export const VOUCHERS: Voucher[] = [
  { id: "v1", code: "MEETING10", title: "Discount 10% for Meeting Room", note: "Valid until 31 Dec 2026", percent: 10 },
  { id: "v2", code: "MEETING10B", title: "Discount 10% for Meeting Room", note: "Valid until 31 Dec 2026", percent: 10 },
  { id: "v3", code: "MEETING10C", title: "Discount 10% for Meeting Room", note: "Valid until 31 Dec 2026", percent: 10 },
  { id: "v4", code: "MEETING10D", title: "Discount 10% for Meeting Room", note: "Valid until 31 Dec 2026", percent: 10 },
];

/** Cari voucher dari kode yang diketik (tanpa membedakan huruf besar/kecil). */
export const findVoucherByCode = (code: string) =>
  VOUCHERS.find((voucher) => voucher.code.toLowerCase() === code.trim().toLowerCase());

/** Jumlah per add-on yang dipilih: `{ [addOnId]: qty }` (qty >= 1). */
export type AddOnSelection = Record<string, number>;

export interface BookingLine {
  label: string;
  amount: number;
}

export interface BookingTotals {
  lines: BookingLine[];
  /** Potongan voucher (rupiah, positif); 0 bila tanpa voucher. */
  discount: number;
  total: number;
}

/** Rincian harga: sewa ruangan, tiap add-on (harga x jumlah), potongan voucher, lalu total. */
export function computeBookingTotals(
  product: ProductDetail,
  time: TimeRange,
  selection: AddOnSelection,
  voucher: Voucher | null,
): BookingTotals {
  const room = computeTotal(product.rates, time) ?? 0;
  const lines: BookingLine[] = [{ label: `1x ${product.room.name} (Daily)`, amount: room }];
  for (const addOn of BOOKING_ADD_ONS) {
    const qty = selection[addOn.id];
    if (qty) lines.push({ label: `${qty}x ${addOn.name}`, amount: addOn.price * qty });
  }
  const discount = voucher ? Math.round((room * voucher.percent) / 100) : 0;
  const subtotal = lines.reduce((sum, line) => sum + line.amount, 0);
  return { lines, discount, total: subtotal - discount };
}

/** Date -> "YYYY-MM-DD" (zona waktu lokal) untuk query URL. */
export function toDateParam(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** Kebalikan `toDateParam`; `null` bila format salah atau tanggal tidak ada. */
export function parseDateParam(value: string | null): Date | null {
  const match = value?.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;
  const [year, month, day] = match.slice(1).map(Number);
  const date = new Date(year, month - 1, day);
  const valid = date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  return valid ? date : null;
}

/** Query URL halaman booking dari jadwal yang dipilih di halaman detail. */
export const buildBookingHref = (id: string, date: Date, time: TimeRange) =>
  `/booking/${id}?date=${toDateParam(date)}&start=${time.start ?? ""}&end=${time.end ?? ""}`;

const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

/** Jam "HH:mm" dari query URL; `null` bila tidak valid. */
export const parseTimeParam = (value: string | null) => (value && TIME_PATTERN.test(value) ? value : null);
