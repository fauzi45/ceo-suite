"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/cn";
import { clearPendingEmail } from "@/lib/signup-session";
import {
  RESET_PASSWORD_RULES,
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/lib/validations/auth";
import { Button } from "@/components/atoms/Button/Button";
import { PasswordField } from "@/components/molecules/PasswordField/PasswordField";
import { PasswordRules } from "@/components/molecules/PasswordRules/PasswordRules";
import { SuccessModal } from "@/components/organisms/SuccessModal/SuccessModal";

export interface ResetPasswordFormProps {
  className?: string;
}

/**
 * Form "Reset your Password": password baru + ulangi password, checklist aturan,
 * tombol Save (nonaktif sampai valid). Setelah Save, modal sukses mengarah ke login.
 * Belum ada API: data hanya divalidasi di sisi client.
 */
export function ResetPasswordForm({ className }: ResetPasswordFormProps) {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onTouched",
    defaultValues: { password: "", confirmPassword: "" },
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const rules = [
    ...RESET_PASSWORD_RULES,
    {
      id: "match",
      label: "Password is match",
      test: () => password.length > 0 && password === confirmPassword,
    },
  ];

  return (
    <>
      <form
        noValidate
        onSubmit={(event) => void handleSubmit(() => setSaved(true))(event)}
        className={cn("flex flex-col", className)}
      >
        <div className="flex flex-col gap-8">
          <PasswordField
            inputSize="lg"
            className="gap-2"
            required
            label="New Password"
            autoComplete="new-password"
            placeholder="type your new password"
            errorText={errors.password?.message}
            {...register("password")}
          />
          <PasswordField
            inputSize="lg"
            className="gap-2"
            required
            label="Retype new Password"
            autoComplete="new-password"
            placeholder="retype your new password"
            errorText={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
        </div>

        <PasswordRules value={password} rules={rules} className="mt-4" />

        <Button type="submit" fullWidth disabled={!isValid} className="mt-10">
          Save
        </Button>
      </form>

      <SuccessModal
        open={saved}
        title="Successfully reset your password!"
        actionLabel="Go to Login"
        onAction={() => {
          // Alur selesai: hapus email tersimpan dan ganti riwayat supaya Back tidak kembali ke sini.
          clearPendingEmail();
          router.replace("/login");
        }}
      />
    </>
  );
}
