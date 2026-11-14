import type { Metadata } from "next";
import { AuthLayout } from "@/components/templates/AuthLayout/AuthLayout";
import { AuthHeader } from "@/components/molecules/AuthHeader/AuthHeader";
import { SignUpForm } from "@/components/organisms/SignUpForm/SignUpForm";

export const metadata: Metadata = {
  title: "Sign Up | CEO Suite",
};

export default function SignUpPage() {
  return (
    <AuthLayout>
      <AuthHeader
        title="Book your Room Now!"
        subtitle="Please logged in to flexible and easy access."
      />
      <SignUpForm />
    </AuthLayout>
  );
}
