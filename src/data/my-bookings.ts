import { formatLongDate } from "@/lib/format-date";
import { SEARCH_ROOMS } from "./landing";
import { PACKAGE_VAT_PERCENT, getPackageById } from "./packages";
import { formatRupiah, getProduct } from "./product";
import { ROOM_TYPE_LABELS, type RoomType } from "@/components/atoms/Chip/Chip";

/**
 * Data contoh My Booking (belum ada API). Booking yang dibuat lewat alur booking ruangan/paket disimpan di
 * localStorage (lihat `lib/my-bookings.ts`) dan digabung di depan data contoh ini.
 */

/** `completed` = selesai (tab History); sisanya tab Active. */
export type BookingStatus = "success" | "waiting" | "expired" | "completed";

export const BOOKING_STATUS_LABELS: Record<BookingStatus, string> = {
  success: "Success",
  waiting: "Waiting for payment",
  expired: "Expired by Midtrans",
  completed: "Completed",
};

export interface BookingAddOnLine {
  name: string;
  qty: number;
  /** Harga satuan (rupiah). */
  unitPrice: number;
}

export interface BookingRecord {
  id: string;
  invoice: string;
  kind: "room" | "package";
  /** Id ruangan (`kind: "room"`) atau id paket (`kind: "package"`). */
  refId: string;
  /** Tanggal sewa / mulai, "YYYY-MM-DD". */
  date: string;
  /** Jam sewa "HH:mm" (hanya ruangan). */
  start?: string;
  end?: string;
  status: BookingStatus;
  /** Harga ruangan atau paket sebelum potongan. */
  basePrice: number;
  /** Potongan voucher (rupiah). */
  discount: number;
  addOns: BookingAddOnLine[];
  request?: string;
  /** Penanda urutan untuk booking yang dibuat pengguna (lebih besar = lebih baru). */
  createdAt?: number;
}

export interface BookingTotals {
  basePrice: number;
  addOnPrice: number;
  discount: number;
  vat: number;
  deposit: number;
  total: number;
}

export function bookingTotals(record: BookingRecord): BookingTotals {
  const addOnPrice = record.addOns.reduce((sum, line) => sum + line.unitPrice * line.qty, 0);
  const subtotal = record.basePrice - record.discount + addOnPrice;
  const vat = Math.round((subtotal * PACKAGE_VAT_PERCENT) / 100);
  return { basePrice: record.basePrice, addOnPrice, discount: record.discount, vat, deposit: 0, total: subtotal + vat };
}

const roomIdByName = (name: string) => SEARCH_ROOMS.find((room) => room.name === name)?.id ?? SEARCH_ROOMS[0].id;

export const SAMPLE_BOOKINGS: BookingRecord[] = [
  {
    id: "bk-1",
    invoice: "AXA/458/08/2024",
    kind: "room",
    refId: roomIdByName("Suite 7 View"),
    date: "2024-07-10",
    start: "10:00",
    end: "18:00",
    status: "expired",
    basePrice: 2880000,
    discount: 0,
    addOns: [
      { name: "Coffee Break - Standard", qty: 1, unitPrice: 50000 },
      { name: "LCD Projector (Premium)", qty: 1, unitPrice: 1500000 },
    ],
    request: "Annual Meeting of 18 people",
  },
  {
    id: "bk-2",
    invoice: "AXA/459/08/2024",
    kind: "room",
    refId: roomIdByName("Suite 7 View"),
    date: "2024-07-10",
    start: "10:00",
    end: "18:00",
    status: "waiting",
    basePrice: 2880000,
    discount: 0,
    addOns: [],
  },
  {
    id: "bk-3",
    invoice: "AXA/460/08/2024",
    kind: "room",
    refId: roomIdByName("Suite 7 View"),
    date: "2024-07-10",
    start: "10:00",
    end: "18:00",
    status: "success",
    basePrice: 2880000,
    discount: 0,
    addOns: [{ name: "Flip Chart", qty: 1, unitPrice: 85000 }],
  },
];

const parseIsoDate = (value: string) => {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const dotted = (time: string) => time.replace(":", ".");

export interface BookingSummary {
  id: string;
  title: string;
  subtitle: string;
  schedule: string;
  status: BookingStatus;
  total: string;
}

/** Ringkasan satu booking untuk kartu daftar. `undefined` bila ruangan/paketnya tidak dikenal lagi. */
export function summarizeBooking(record: BookingRecord): BookingSummary | undefined {
  const date = formatLongDate(parseIsoDate(record.date));
  const total = formatRupiah(bookingTotals(record).total);

  if (record.kind === "package") {
    const item = getPackageById(record.refId);
    if (!item) return undefined;
    return { id: record.id, title: item.name, subtitle: "Meeting Room Package", schedule: `Starting ${date}`, status: record.status, total };
  }

  const product = getProduct(record.refId);
  if (!product) return undefined;
  const time = record.start && record.end ? ` • ${dotted(record.start)} - ${dotted(record.end)}` : "";
  return {
    id: record.id,
    title: product.room.name,
    subtitle: ROOM_TYPE_LABELS[product.room.roomType],
    schedule: `${date}${time}`,
    status: record.status,
    total,
  };
}

export interface BookingDetailRow {
  label: string;
  value: string;
}

export interface RoomBookingDetailData {
  invoice: string;
  status: BookingStatus;
  statusLabel: string;
  gallery: string[];
  roomName: string;
  roomTypeLabel: string;
  roomType: RoomType;
  customer: string;
  description?: string;
  info: BookingDetailRow[];
  addOns: BookingDetailRow[];
  addOnTotal: string;
  payment: BookingDetailRow[];
  summary: BookingDetailRow[];
  finalPrice: string;
}

const hoursBetween = (start: string, end: string) => {
  const toMinutes = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };
  return (toMinutes(end) - toMinutes(start)) / 60;
};

/** Model halaman Booking Details untuk booking ruangan. `undefined` bila ruangannya tidak dikenal. */
export function getRoomBookingDetail(record: BookingRecord): RoomBookingDetailData | undefined {
  const product = getProduct(record.refId);
  if (!product) return undefined;
  const totals = bookingTotals(record);
  const hours = record.start && record.end ? hoursBetween(record.start, record.end) : undefined;
  const room = product.room;

  return {
    invoice: record.invoice,
    status: record.status,
    statusLabel: BOOKING_STATUS_LABELS[record.status],
    gallery: product.gallery,
    roomName: room.name,
    roomType: room.roomType,
    roomTypeLabel: ROOM_TYPE_LABELS[room.roomType],
    customer: "Nisrina Thifal Khairunnisa",
    description: record.request,
    info: [
      { label: "Capacity", value: `${room.people} people` },
      { label: "Date", value: formatLongDate(parseIsoDate(record.date)) },
      ...(record.start && record.end ? [{ label: "Time", value: `${dotted(record.start)} - ${dotted(record.end)}` }] : []),
      ...(hours ? [{ label: "Duration", value: `${hours} ${hours === 1 ? "hour" : "hours"}` }] : []),
    ],
    addOns: [
      { label: `${room.name} x1`, value: formatRupiah(record.basePrice) },
      ...record.addOns.map((line) => ({ label: `${line.name} x${line.qty}`, value: formatRupiah(line.unitPrice * line.qty) })),
    ],
    addOnTotal: formatRupiah(record.basePrice + totals.addOnPrice),
    payment: [
      { label: "Invoice", value: "INV-17236485475843" },
      { label: "Expired by", value: "13 August 2024 16:51" },
      { label: "Status", value: record.status === "success" || record.status === "completed" ? "Paid" : BOOKING_STATUS_LABELS[record.status] },
      { label: "Type", value: "payment_gateway" },
    ],
    summary: [
      { label: "Room Booking Price", value: formatRupiah(totals.basePrice) },
      { label: "Add On Price", value: formatRupiah(totals.addOnPrice) },
      ...(totals.discount > 0 ? [{ label: "Voucher", value: `-${formatRupiah(totals.discount)}` }] : []),
      { label: `VAT ${PACKAGE_VAT_PERCENT}%`, value: formatRupiah(totals.vat) },
      { label: "Deposit", value: formatRupiah(totals.deposit) },
    ],
    finalPrice: formatRupiah(totals.total),
  };
}
