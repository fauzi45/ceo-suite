"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/cn";
import { otpSchema, OTP_LENGTH } from "@/lib/validations/auth";
import { Button } from "@/components/atoms/Button/Button";
import { OtpField } from "@/components/molecules/OtpField/OtpField";
import { ResendCode } from "@/components/molecules/ResendCode/ResendCode";
import { SuccessModal } from "@/components/organisms/SuccessModal/SuccessModal";

export interface VerifyEmailFormProps {
  /** Dipanggil dengan kode 6 digit. Tanpa ini, verifikasi disimulasikan ±800ms. */
  onVerify?: (code: string) => void | Promise<void>;
  onResend?: () => void;
  /** Judul modal sukses setelah verifikasi berhasil. */
  successTitle?: string;
  className?: string;
}

const simulateVerify = () => new Promise<void>((resolve) => setTimeout(resolve, 800));

/**
 * Form verifikasi email: kotak OTP, tombol Verify, dan kirim ulang kode dengan hitung mundur.
 * Setelah verifikasi berhasil, modal sukses muncul dan tombolnya membawa ke halaman login.
 */
export function VerifyEmailForm({
  onVerify,
  onResend,
  successTitle = "Successfully create your account!",
  className,
}: VerifyEmailFormProps) {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [verified, setVerified] = useState(false);
  const complete = otpSchema.safeParse({ code }).success;

  const submit = async () => {
    if (!complete || submitting) return;
    setSubmitting(true);
    try {
      await (onVerify ?? simulateVerify)(code);
      setVerified(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          void submit();
        }}
        className={cn("flex flex-col", className)}
      >
        <OtpField value={code} onChange={setCode} length={OTP_LENGTH} disabled={submitting} />

        <Button
          type="submit"
          disabled={!complete || submitting}
          iconLeft={submitting ? "loading" : undefined}
          className="mt-8 w-full md:mt-10 md:w-77 md:self-center"
        >
          Verify
        </Button>

        <ResendCode
          className="mt-6"
          onResend={() => {
            setCode("");
            onResend?.();
          }}
        />
      </form>

      <SuccessModal
        open={verified}
        title={successTitle}
        actionLabel="Go to Login"
        onAction={() => router.push("/login")}
      />
    </>
  );
}
