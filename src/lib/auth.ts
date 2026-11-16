/**
 * Auth sementara (mock) tanpa API: kredensial di-hardcode dan status login
 * disimpan di localStorage. Ganti seluruh file ini dengan panggilan API
 * dan session/cookie dari server saat backend tersedia.
 */

const STORAGE_KEY = "ceo-suite:auth";

/** Event di window agar komponen di tab yang sama ikut tahu saat login/logout (event `storage` hanya untuk tab lain). */
export const AUTH_CHANGE_EVENT = "ceo-suite:auth-change";

const MOCK_EMAIL = "admin@admin.com";
const MOCK_PASSWORD = "admin123";

interface StoredAuth {
  email: string;
}

const notifyChange = () => window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));

/** Cocokkan kredensial; jika benar, simpan status login. Mengembalikan `true` bila berhasil. */
export function login(email: string, password: string): boolean {
  if (email.trim().toLowerCase() !== MOCK_EMAIL || password !== MOCK_PASSWORD) return false;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ email: MOCK_EMAIL } satisfies StoredAuth));
  } catch {
    // Storage diblokir (mode privat): login tidak bisa diingat.
    return false;
  }
  notifyChange();
  return true;
}

export function logout() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage diblokir: tidak ada yang perlu dihapus.
  }
  notifyChange();
}

/** Email pengguna yang sedang login, atau `null` bila belum login. Hanya untuk dipanggil di browser. */
export function getLoggedInEmail(): string | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredAuth>;
    return typeof parsed.email === "string" ? parsed.email : null;
  } catch {
    return null;
  }
}

/** Cocokkan password saat ini (mock: password tetap). Dipakai form Change Password. */
export const verifyPassword = (password: string) => password === MOCK_PASSWORD;

export function isLoggedIn(): boolean {
  return getLoggedInEmail() !== null;
}
