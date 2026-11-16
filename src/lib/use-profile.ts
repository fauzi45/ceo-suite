"use client";

import { useCallback, useEffect, useState } from "react";
import { DEFAULT_PROFILE, type ProfileData } from "@/data/profile";

const STORAGE_KEY = "ceo-suite:profile";

/** Data profil dari data contoh, ditimpa perubahan yang tersimpan di localStorage (dibaca setelah mount). */
export function useProfile() {
  const [profile, setProfile] = useState<ProfileData>(DEFAULT_PROFILE);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage hanya ada di browser, jadi baru bisa dibaca setelah mount
      if (raw) setProfile({ ...DEFAULT_PROFILE, ...(JSON.parse(raw) as Partial<ProfileData>) });
    } catch {
      // Storage diblokir atau isinya rusak: pakai data contoh.
    }
  }, []);

  const update = useCallback((patch: Partial<ProfileData>) => {
    setProfile((prev) => {
      const next = { ...prev, ...patch };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Storage diblokir: perubahan hanya berlaku sampai halaman dimuat ulang.
      }
      return next;
    });
  }, []);

  return { profile, update };
}
