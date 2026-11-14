# Design System

Diekspor dari Figma **Take Home Test** › page **• Design System**
(https://www.figma.com/design/5bxbVg27G3ZITjg2Sfwuiq/Take-Home-Test?node-id=3-489).

Token CSS ada di `src/app/globals.css` (blok `@theme`, Tailwind v4).
Komponen (button, chips, navbar, table, dll.) belum diekspor.

## Font

| Properti | Nilai |
| --- | --- |
| Family | Plus Jakarta Sans (Google Fonts, dimuat lewat `next/font/google` di `layout.tsx`) |
| Weight | Regular 400, Medium 500, Bold 700 |
| Base size | 16px |
| Scale ratio | 1.25 (Major Third) |

### Type scale

| Token | px | rem | Tailwind |
| --- | --- | --- | --- |
| display-lg | 61 | 3.812 | `text-display-lg` |
| display-md | 49 | 3.062 | `text-display-md` |
| display-sm | 39 | 2.438 | `text-display-sm` |
| heading-lg | 31 | 1.938 | `text-heading-lg` |
| heading-md | 25 | 1.562 | `text-heading-md` |
| heading-sm | 20 | 1.250 | `text-heading-sm` |
| body | 16 | 1.000 | `text-body` |
| caption | 13 | 0.812 | `text-caption` |
| tiny | 10 | 0.625 | `text-tiny` |

Setiap ukuran tersedia dalam tiga weight: `font-regular`, `font-medium`, `font-bold`.

## Warna

Semua palet dipakai sebagai utility Tailwind, contoh `bg-primary-600`, `text-neutral-700`, `border-error-300`.

### Primary — warna utama produk/brand (button, link, input)

| Step | Hex |
| --- | --- |
| 50 | #FCF4F4 |
| 100 | #F9E7E7 |
| 200 | #F5D3D3 |
| 300 | #EDB4B4 |
| 400 | #E28787 |
| 500 | #D36161 |
| 600 | #BE4444 |
| 700 | #9F3636 |
| 800 | #843030 |
| 900 | #6F2D2D |
| 950 | #3B1414 |

### Secondary — oranye

| Step | Hex |
| --- | --- |
| 50 | #FEF7EE |
| 100 | #FDECD7 |
| 200 | #FAD6AE |
| 300 | #F6B87B |
| 400 | #F19046 |
| 500 | #EE7B30 |
| 600 | #DE5918 |
| 700 | #B84316 |
| 800 | #933619 |
| 900 | #762F18 |
| 950 | #40150A |

### Neutral — teks, background, divider

| Step | Hex |
| --- | --- |
| 25 | #FCFCFD |
| 50 | #F6F6F6 (label di Figma tertulis #FCF4F4, fill swatch sebenarnya #F6F6F6) |
| 100 | #E7E7E7 |
| 200 | #D1D1D1 |
| 300 | #B0B0B0 |
| 400 | #888888 |
| 500 | #6D6D6D (dipakai sebagai `grey/500` untuk border) |
| 600 | #5D5D5D |
| 700 | #4F4F4F |
| 800 | #434343 |
| 900 | #3D3D3D |
| 950 | #262626 |
| 1000 | #1F1F1F |

### Success — aksi positif, konfirmasi berhasil

| Step | Hex |
| --- | --- |
| 25 | #F6FEF9 |
| 50 | #ECFDF3 |
| 100 | #D1FADF |
| 200 | #A6F4C5 |
| 300 | #6CE9A6 |
| 400 | #32D583 |
| 500 | #12B76A |
| 600 | #039855 |
| 700 | #027A48 |
| 800 | #05603A |
| 900 | #054F31 |

### Error — aksi destruktif/negatif

| Step | Hex |
| --- | --- |
| 25 | #FFFBFA |
| 50 | #FEF3F2 |
| 100 | #FEE4E2 |
| 200 | #FECDCA |
| 300 | #FDA29B |
| 400 | #F97066 |
| 500 | #F04438 |
| 600 | #D92D20 |
| 700 | #B42318 |
| 800 | #912018 |
| 900 | #7A271A |

### Warning — pesan peringatan, status tugas

| Step | Hex |
| --- | --- |
| 25 | #FFFCF5 |
| 50 | #FFFAEB |
| 100 | #FEF0C7 |
| 200 | #FEDF89 |
| 300 | #FEC84B |
| 400 | #FDB022 |
| 500 | #F79009 |
| 600 | #DC6803 |
| 700 | #B54708 |
| 800 | #93370D |
| 900 | #7A2E0E |

Warna lain yang muncul di file: `Gray/500 #667085` dan `Gray/900 #101828` (teks label di dokumen Figma, bukan bagian palet).

## Icon

Semua icon di Figma memakai nama Iconify, jadi SVG-nya diambil langsung dari
`https://api.iconify.design/<prefix>/<name>.svg` dan disimpan di `public/icons/`.
SVG memakai `currentColor`, jadi warnanya ikut `color` elemen pembungkus.

| File (`public/icons/`) | Nama layer di Figma | Iconify id |
| --- | --- | --- |
| home-outline.svg | Icons/material-symbols:home-outline | material-symbols:home-outline |
| home.svg | Icons/material-symbols:home | material-symbols:home |
| seal-percent.svg | Icons/ph:seal-percent-bold | ph:seal-percent-bold |
| seal-percent-fill.svg | Icons/ph:seal-percent-fill | ph:seal-percent-fill |
| receipt.svg | Icons/fluent:receipt-16-regular | fluent:receipt-16-regular |
| receipt-fill.svg | Icons/fluent:receipt-16-filled | fluent:receipt-16-filled |
| profile.svg | Icons/iconamoon:profile-light | iconamoon:profile-light |
| profile-fill.svg | Icons/iconamoon:profile-fill | iconamoon:profile-fill |
| chevron-down.svg | Icon/mingcute:down-line | mingcute:down-line |
| chevron-up.svg | Icons/mingcute:up-line | mingcute:up-line |
| chevron-left.svg | Icons/mingcute:left-line | mingcute:left-line |
| chevron-right.svg | Icons/mingcute:right-line | mingcute:right-line |
| plus.svg | Icons/ic:round-plus | ic:round-plus |
| minus.svg | Icons/ic:round-minus | ic:round-minus |
| checklist.svg | Icons/mage:checklist-note | mage:checklist-note |
| checklist-fill.svg | Icons/mage:checklist-note-fill | mage:checklist-note-fill |
| eye.svg | Icons/mdi:eye-outline | mdi:eye-outline |
| eye-off.svg | tidak ada di Figma (padanan toggle password) | mdi:eye-off-outline |
| download.svg | Icons/Arrow-Down-2--Streamline-Core.svg | streamline:arrow-down-2 |
| check.svg | Icons/ic:round-check | ic:round-check |
| grid.svg | Icons/ep:menu | ep:menu |
| share.svg | Icons/material-symbols:share | material-symbols:share |
| print.svg | Icons/fluent:print-24-filled | fluent:print-24-filled |
| close.svg | Icons/ph:x-bold | ph:x-bold |
| copy.svg | fi_9321839 (nama tidak deskriptif) | ion:copy — padanan terdekat secara visual |
| arrow-left.svg | Icons/ep:back | ep:back |
| loading.svg | eos-icons:loading | eos-icons:loading |
| publish.svg | Icons/material-symbols:publish | material-symbols:publish |
| whatsapp.svg | Icons/Whatsapp--Streamline-Font-Awesome.svg | fa6-brands:whatsapp |

## Graphics / Backgrounds

Satu aset di bawah heading "Graphics, Backgrounds, etc":

| File | Sumber Figma | Keterangan |
| --- | --- | --- |
| `public/graphics/pattern-maze.svg` | frame "Frame" (1051×591) | Pola garis labirin, stroke `#D36161` (primary-500) 3.5px, opacity grup 70%, tiap garis opacity bertingkat (fade) |

## Logo

Diekspor dari **Component 1** di page Design System (strip logo partner, versi abu-abu/monokrom)
dan frame **ceo suite** (logo brand). Semua di `public/logos/`.

| File | Layer Figma | Format | Catatan |
| --- | --- | --- | --- |
| ceo-suite.png | ceo suite (133×32 di Figma) | PNG 1014×246 | Logo brand; di Figma berupa image fill, raster diekstrak dari SVG ekspor |
| uber.svg | Company logo | SVG 128×86 | |
| dell.svg | Dell_Logo 1 | SVG 128×128 | |
| samsung.svg | Samsung_Logo 1 | SVG 128×43 | |
| nike.svg | Logo_NIKE 1 | SVG 128×46 | |
| etihad.svg | Etihad-airways-logo 1 | SVG 128×46 | |
| zurich.svg | Zurich_Insurance_Group_logo 1 | SVG 128×81 | |
| cisco.svg | Cisco_logo_blue_2016 1 | SVG 128×68 | |
| bp.svg | BP_Helios_logo 1 | SVG 128×170 | |
| exxonmobil.svg | Exxon_Mobil_Logo 1 | SVG 64×25 | |
| ey.svg | EY_logo_2019 1 | SVG 128×130 | Diambil dari baris kedua (Frame 1618872537); di baris pertama layer ini kosong |
| kpmg.svg | KPMG_logo 1 | SVG 128×53 | Sama seperti EY |
| pg.png | image 100 | PNG 256×256 | Di Figma berupa image fill, raster diekstrak dari SVG ekspor |

Warna logo partner di Figma: `#B0B0B0` (neutral-300) dan `#888888` (neutral-400).

## Lain-lain yang terbaca dari Figma

- Tag "Design System" di kanvas memakai `product color/200` (#F5D3D3) sebagai fill, border 6px, radius 100px.
- Heading section memakai border-bottom 1px `grey/500` (#6D6D6D), padding 32px.
- Spacing yang muncul di layout palet: padding 32px, gap 32px / 24px / 12px.
