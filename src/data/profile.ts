/** Data contoh halaman Profile (belum ada API). Perubahan di Profile Detail disimpan di localStorage browser. */

export interface ProfileData {
  name: string;
  email: string;
  phone: string;
  /** Format DD/MM/YYYY. */
  dateOfBirth: string;
  position: string;
  companyName: string;
  companyEmail: string;
  companyAddress: string;
}

export const DEFAULT_PROFILE: ProfileData = {
  name: "Nisrina Thifal Khairunnisa",
  email: "nisrinath@gmail.com",
  phone: "08625374958596",
  dateOfBirth: "08/09/2003",
  position: "Supervisor",
  companyName: "-",
  companyEmail: "-",
  companyAddress: "-",
};

/** Nama pendek di banner Overview. */
export const PROFILE_DISPLAY_NAME = "Nisrina Thifal K";

export const MEMBER_CARD = {
  code: "NISC305",
  maskedNumber: "**** **** **** 3090",
};

export const REFERRAL = {
  code: MEMBER_CARD.code,
  rewards: [
    { id: "reward-15", label: "Discount 15% Off", available: true },
    { id: "reward-10", label: "Discount 10% Off", available: false },
  ],
};

export type ProfileSection = "overview" | "detail" | "password";

export const PROFILE_MENU: { id: ProfileSection; label: string; href: string }[] = [
  { id: "overview", label: "Overview", href: "/profile" },
  { id: "detail", label: "Profile Detail", href: "/profile/detail" },
  { id: "password", label: "Change Password", href: "/profile/password" },
];

export const PROFILE_TITLES: Record<ProfileSection, string> = {
  overview: "My Profile",
  detail: "Profile Detail",
  password: "Change Password",
};
