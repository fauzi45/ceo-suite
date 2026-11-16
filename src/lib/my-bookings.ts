"use client";

import { useEffect, useState } from "react";
import { SAMPLE_BOOKINGS, type BookingRecord } from "@/data/my-bookings";

const STORAGE_KEY = "ceo-suite:bookings";
const CHANGE_EVENT = "ceo-suite:bookings-change";

function readStored(): BookingRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as BookingRecord[]) : [];
  } catch {
    return [];
  }
}

/** Simpan booking baru (dari alur booking ruangan/paket) di localStorage dan kembalikan id-nya. */
export function addBooking(input: Omit<BookingRecord, "id" | "invoice" | "createdAt">): string {
  const createdAt = Date.now();
  const id = `bk-${createdAt}`;
  const now = new Date();
  const invoice = `CEO/${String(createdAt).slice(-4)}/${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()}`;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([{ ...input, id, invoice, createdAt }, ...readStored()]));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch {
    // Storage diblokir: booking tidak bisa diingat, tetapi alur booking tetap selesai.
  }
  return id;
}

/** Booking pengguna: yang tersimpan (terbaru dulu) lalu data contoh. `undefined` selama belum dibaca dari browser. */
export function useMyBookings(): BookingRecord[] | undefined {
  const [bookings, setBookings] = useState<BookingRecord[]>();

  useEffect(() => {
    const load = () => setBookings([...readStored(), ...SAMPLE_BOOKINGS]);
    load();
    window.addEventListener(CHANGE_EVENT, load);
    window.addEventListener("storage", load);
    return () => {
      window.removeEventListener(CHANGE_EVENT, load);
      window.removeEventListener("storage", load);
    };
  }, []);

  return bookings;
}
