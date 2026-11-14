import type { Metadata } from "next";
import { AuthLayout } from "@/components/templates/AuthLayout/AuthLayout";
import { AuthHeader } from "@/components/molecules/AuthHeader/AuthHeader";
import { VerifyEmailForm } from "@/components/organisms/VerifyEmailForm/VerifyEmailForm";

export const metadata: Metadata = {
  title: "OTP Verification | CEO Suite",
};

export default function ForgotPasswordVerifyPage() {
  return (
    <AuthLayout>
      <AuthHeader
        title="OTP Verification"
        subtitle="Please enter the One-Time Password(OTP) sent to your email to complete the verification process."
        titleSize="md"
        spacing="wide"
      />
      <VerifyEmailForm nextHref="/forgot-password/reset" />
    </AuthLayout>
  );
}
