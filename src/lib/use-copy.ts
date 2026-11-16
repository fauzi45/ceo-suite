"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Salin teks ke clipboard; `copied` menyala 2 detik setelahnya. Gagal salin (mis. non-HTTPS) diabaikan. */
export function useCopy() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard tidak tersedia: teks tetap bisa disalin manual.
    }
  }, []);

  return { copied, copy };
}
