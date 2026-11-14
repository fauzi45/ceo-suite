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

/** Dipanggil saat sebuah alur (sign up / reset password) selesai, supaya state lama tidak terbawa ke alur berikutnya. */
export function clearPendingEmail() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    // Storage diblokir: tidak ada yang perlu dihapus.
  }
}

export function getPendingEmail(): string | null {
  try {
    return sessionStorage.getItem(KEY);
  } catch {
    return null;
  }
}
