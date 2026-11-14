import type { Metadata } from "next";
import { AuthLayout } from "@/components/templates/AuthLayout/AuthLayout";
import { ForgotPasswordForm } from "@/components/organisms/ForgotPasswordForm/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password | CEO Suite",
};

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
