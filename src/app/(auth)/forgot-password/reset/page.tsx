import type { Metadata } from "next";
import { AuthLayout } from "@/components/templates/AuthLayout/AuthLayout";
import { AuthHeader } from "@/components/molecules/AuthHeader/AuthHeader";
import { ResetPasswordForm } from "@/components/organisms/ResetPasswordForm/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password | CEO Suite",
};

export default function ResetPasswordPage() {
  return (
    <AuthLayout>
      <AuthHeader
        title="Reset your Password"
        subtitle="Please enter the One-Time Password(OTP) sent to your email to complete the verification process."
        titleSize="md"
        spacing="wide"
      />
      <ResetPasswordForm />
    </AuthLayout>
  );
}
