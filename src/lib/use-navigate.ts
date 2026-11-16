"use client";

import { useCallback, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";

/**
 * Pindah halaman lewat `onClick` (tanpa `<a href>`): alamat internal memakai router,
 * alamat `http(s)` dibuka di tab baru, dan `#` / kosong tidak melakukan apa-apa.
 */
export function useNavigate() {
  const router = useRouter();

  return useCallback(
    (href?: string) => {
      if (!href || href === "#") return;
      if (/^https?:\/\//.test(href)) {
        window.open(href, "_blank", "noopener,noreferrer");
        return;
      }
      router.push(href);
    },
    [router],
  );
}

/** Props untuk elemen non-button yang bertingkah seperti link: bisa diklik dan diaktifkan dengan Enter. */
export function activateProps(onActivate: () => void) {
  return {
    role: "link" as const,
    tabIndex: 0,
    onClick: onActivate,
    onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
      if (event.target === event.currentTarget && event.key === "Enter") onActivate();
    },
  };
}
