const KEY = "ceo-suite:pending-email";

/**
 * Email yang baru didaftarkan, disimpan di sessionStorage supaya halaman
 * verifikasi bisa menampilkannya tanpa menaruh email di URL.
 * Sementara (belum ada API); nanti diganti session dari server.
 */
export function setPendingEmail(email: string) {
  try {
    sessionStorage.setItem(KEY, email);
  } catch {
    // Storage diblokir (mode privat): halaman verifikasi memakai teks default.
  }
}

export function getPendingEmail(): string | null {
  try {
    return sessionStorage.getItem(KEY);
  } catch {
    return null;
  }
}
