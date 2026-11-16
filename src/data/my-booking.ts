import { formatLongDate as formatDate } from "@/lib/format-date";
import { PACKAGE_VAT_PERCENT, type MeetingPackage } from "./packages";

/** Data contoh halaman detail booking (belum ada API): sebagian besar isinya tetap, sisanya diturunkan dari paket. */

export interface MyBookingRow {
  label: string;
  value: string;
}

export interface MyBookingUsage {
  date: string;
  checkIn: string;
  checkOut: string;
  location: string;
  duration: string;
}

export interface MyBookingDetail {
  invoice: string;
  status: "success";
  packageName: string;
  access: string;
  customer: string;
  rows: MyBookingRow[];
  payment: MyBookingRow[];
  usage: MyBookingUsage[];
  priceLines: MyBookingRow[];
  total: string;
}

const formatRupiah = (value: number) => `Rp${value.toLocaleString("en-US")}`;

const addDays = (date: Date, days: number) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);

export function getMyBooking(item: MeetingPackage, start: Date, invoice = "AXA/458/08/2024"): MyBookingDetail {
  const vat = Math.round((item.price * PACKAGE_VAT_PERCENT) / 100);
  return {
    invoice,
    status: "success",
    packageName: item.name,
    access: item.access,
    customer: "Nisrina Thifal Khairunnisa",
    rows: [
      { label: "Capacity", value: item.capacity.replace(" or below", "").toLowerCase() },
      { label: "Start Date", value: formatDate(start) },
      { label: "Valid Until", value: formatDate(addDays(start, 20)) },
    ],
    payment: [
      { label: "Invoice", value: "INV-17236485475843" },
      { label: "Expired by", value: "13 August 2024 16:51" },
      { label: "Status", value: "Paid" },
      { label: "Type", value: "payment_gateway" },
    ],
    usage: [
      { date: "11/09/2024", checkIn: "10:00", checkOut: "13:00", location: "Axa Tower Meeting Room", duration: "3 Hours" },
      { date: "10/09/2024", checkIn: "10:00", checkOut: "13:00", location: "Axa Tower Meeting Room", duration: "3 Hours" },
      { date: "10/09/2024", checkIn: "10:00", checkOut: "13:00", location: "Axa Tower Meeting Room", duration: "3 Hours" },
    ],
    priceLines: [
      { label: "Subtotal", value: formatRupiah(item.price) },
      { label: `VAT ${PACKAGE_VAT_PERCENT}%`, value: formatRupiah(vat) },
      { label: "Deposit", value: "Rp0" },
    ],
    total: formatRupiah(item.price + vat),
  };
}
