import type { Metadata } from "next";
import { AuthLayout } from "@/components/templates/AuthLayout/AuthLayout";
import { AuthHeader } from "@/components/molecules/AuthHeader/AuthHeader";
import { LoginForm } from "@/components/organisms/LoginForm/LoginForm";

export const metadata: Metadata = {
  title: "Sign In | CEO Suite",
};

export default function LoginPage() {
  return (
    <AuthLayout>
      <AuthHeader
        title="Book your Room Now!"
        subtitle="Please logged in to flexible and easy access."
      />
      <LoginForm />
    </AuthLayout>
  );
}
