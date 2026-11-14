"use client";

import { useSyncExternalStore } from "react";
import { getPendingEmail } from "@/lib/signup-session";
import { AuthHeader } from "@/components/molecules/AuthHeader/AuthHeader";
import { VerifyEmailForm } from "@/components/organisms/VerifyEmailForm/VerifyEmailForm";

const subscribe = () => () => {};
const getServerSnapshot = () => null;

/** Menampilkan email yang baru didaftarkan (dari sessionStorage), lalu form OTP. */
export function VerifyEmailContent() {
  const email = useSyncExternalStore(subscribe, getPendingEmail, getServerSnapshot);

  return (
    <>
      <AuthHeader
        title="Email Verification"
        subtitle={`We have sent a verification code to ${email ?? "your email"}`}
        titleSize="md"
        spacing="wide"
      />
      <VerifyEmailForm />
    </>
  );
}
