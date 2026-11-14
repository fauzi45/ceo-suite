import type { Metadata } from "next";
import { AuthLayout } from "@/components/templates/AuthLayout/AuthLayout";
import { VerifyEmailContent } from "./VerifyEmailContent";

export const metadata: Metadata = {
  title: "Verify Email | CEO Suite",
};

export default function VerifyEmailPage() {
  return (
    <AuthLayout>
      <VerifyEmailContent />
    </AuthLayout>
  );
}
