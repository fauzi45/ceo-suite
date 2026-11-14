"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/cn";
import { clearPendingEmail, setPendingEmail } from "@/lib/signup-session";
import { forgotPasswordSchema, type ForgotPasswordFormValues } from "@/lib/validations/auth";
import { Button } from "@/components/atoms/Button/Button";
import { TextLink } from "@/components/atoms/TextLink/TextLink";
import { AuthHeader } from "@/components/molecules/AuthHeader/AuthHeader";
import { FormField } from "@/components/molecules/FormField/FormField";

export interface ForgotPasswordFormProps {
  /** Dipanggil saat "Resend Email" ditekan. Tanpa ini, pengiriman ulang disimulasikan ±800ms. */
  onResend?: (email: string) => void | Promise<void>;
  /** Mulai langsung di state "email terkirim" (untuk dokumentasi/Storybook). */
  initialSentTo?: string;
  className?: string;
}

const simulateResend = () => new Promise<void>((resolve) => setTimeout(resolve, 800));

/**
 * Halaman "Forget Password" dalam dua state:
 * 1. Email + tombol Reset Password (nonaktif sampai email valid).
 * 2. "Email terkirim": subjudul memuat email, field terkunci, tombol Resend Email dan Back to Login.
 * OTP dibuka dari link di email (/forgot-password/verify), bukan dari halaman ini.
 * State hanya hidup selama halaman terbuka, jadi membuka lagi selalu mulai dari state 1.
 */
export function ForgotPasswordForm({ onResend, initialSentTo, className }: ForgotPasswordFormProps) {
  const [sentTo, setSentTo] = useState<string | null>(initialSentTo ?? null);
  const [resending, setResending] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onTouched",
    defaultValues: { email: "" },
  });

  const resend = async () => {
    if (!sentTo || resending) return;
    setResending(true);
    try {
      await (onResend ?? simulateResend)(sentTo);
    } finally {
      setResending(false);
    }
  };

  return (
    <>
      <AuthHeader
        title="Forget Password"
        subtitle={
          sentTo
            ? `We have sent you an email with a password reset link to ${sentTo}`
            : "Forgot your password? Enter your email address below to reset it and regain access to your account."
        }
        spacing="wide"
      />

      <form
        noValidate
        onSubmit={(event) =>
          void handleSubmit((values) => {
            setPendingEmail(values.email);
            setSentTo(values.email);
          })(event)
        }
        className={cn("flex flex-col", className)}
      >
        {sentTo ? (
          <>
            <FormField
              key="sent"
              inputSize="lg"
              className="gap-2"
              required
              label="Email"
              type="email"
              defaultValue={sentTo}
              readOnly
              disabled
            />
            <Button
              type="button"
              hierarchy="secondary-filled"
              fullWidth
              disabled={resending}
              iconLeft={resending ? "loading" : undefined}
              onClick={() => void resend()}
              className="mt-10"
            >
              Resend Email
            </Button>
          </>
        ) : (
          <>
            <FormField
              key="request"
              inputSize="lg"
              className="gap-2"
              required
              label="Email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              errorText={errors.email?.message}
              {...register("email")}
            />
            <Button type="submit" fullWidth disabled={!isValid} className="mt-10">
              Reset Password
            </Button>
          </>
        )}

        <TextLink href="/login" onClick={clearPendingEmail} className="mt-6 self-center">
          Back to Login
        </TextLink>
      </form>
    </>
  );
}
