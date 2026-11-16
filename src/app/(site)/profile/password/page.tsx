import type { Metadata } from "next";
import { ChangePasswordForm } from "@/components/organisms/ChangePasswordForm/ChangePasswordForm";

// Isi tergantung status login yang baru diketahui di browser (lihat layout.tsx).
export const instant = false;

export const metadata: Metadata = { title: "Change Password | CEO SUITE" };

export default function ChangePasswordPage() {
  return <ChangePasswordForm />;
}
