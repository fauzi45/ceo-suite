# Login Page (slicing) — Design

Status: disetujui user di percakapan (2026-11-14).

## Intent
Slicing halaman login dari Figma "Take Home Test" › page Web › section "Login & Sign Up" (frame `home`, 1920×1061), responsif untuk web dan mobile. Tidak ada API; murni UI + validasi client. Sign up dikerjakan setelah ini dan akan memakai ulang template/molecule yang sama.

## Goals
- Pixel-faithful ke Figma desktop; mobile dirancang sendiri (Figma tidak punya frame mobile).
- Memakai komponen yang sudah ada dan atomic design.
- Form memakai react-hook-form + zod.

## Non-goals / anti-goals
- Tidak ada pemanggilan API, session, token, atau redirect nyata.
- Tidak membuat halaman sign up, forgot password, atau OTP di tahap ini.
- Tidak mengubah komponen atom yang sudah ada, kecuali tambahan kecil bila terpaksa.

## Approaches
Hanya satu jalur yang masuk akal: bangun dari komponen design system yang sudah ada. Alternatif (membuat markup login sekali pakai di page) ditolak karena melanggar atomic design dan tidak bisa dipakai ulang oleh sign up. Validasi: Zod dipilih dibanding Yup (tipe TS otomatis, skema bisa dipakai ulang).

## Design
- Atoms: pakai ulang `Button`, `Checkbox`, `Input`, `Logo`, `Icon`. Baru: `TextLink`, icon `eye-off`.
- Molecules: `PasswordField` (`FormField` + tombol mata), `AuthHeader` (logo + judul + subjudul).
- Organisms: `LoginForm` (email, password, remember me, forgot password, Sign In, teks Sign Up).
- Template: `AuthLayout` (layout tengah + glow merah muda), dipakai ulang oleh sign up.
- Page: `src/app/login/page.tsx`.
- Validasi: skema Zod di `src/lib/validations/auth.ts` (email wajib + valid, password wajib); `zodResolver`; pesan error lewat `errorText` `FormField`; pesan berbahasa Inggris.
- Perilaku submit: login tiruan, state loading sebentar, tetap di halaman. "Sign Up Here" → `/sign-up`.
- Responsif: desktop form ±320px terpusat, tombol tidak penuh; mobile satu kolom margin 16px, tombol penuh, judul lebih kecil (keputusan saya, bukan dari Figma).
- Semua komponen baru: file Storybook + export di `components/index.ts`.
- Dependency baru: `react-hook-form`, `zod`, `@hookform/resolvers`.

## Diserahkan ke builder
Ukuran tepat (spacing, font, lebar tombol) dibaca dari Figma saat membangun; breakpoint mobile/desktop memakai breakpoint Tailwind default.
