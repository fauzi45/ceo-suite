import type { Metadata } from "next";
import { ChangePasswordForm } from "@/components/organisms/ChangePasswordForm/ChangePasswordForm";

export const metadata: Metadata = { title: "Change Password | CEO SUITE" };

export default function ChangePasswordPage() {
  return <ChangePasswordForm />;
}
