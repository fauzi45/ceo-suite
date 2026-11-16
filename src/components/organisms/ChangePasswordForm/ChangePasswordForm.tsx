"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/cn";
import { verifyPassword } from "@/lib/auth";
import { PASSWORD_RULES, isPasswordValid } from "@/lib/validations/auth";
import { Button } from "@/components/atoms/Button/Button";
import { PasswordField } from "@/components/molecules/PasswordField/PasswordField";
import { PasswordRules } from "@/components/molecules/PasswordRules/PasswordRules";
import { SuccessModal } from "@/components/organisms/SuccessModal/SuccessModal";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    password: z
      .string()
      .min(1, "New password is required")
      .refine(isPasswordValid, "Password does not meet the requirements"),
    confirmPassword: z.string().min(1, "Retype your new password"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type ChangePasswordValues = z.infer<typeof changePasswordSchema>;

export interface ChangePasswordFormProps {
  className?: string;
}

/**
 * Isi menu Change Password: password saat ini, password baru + ulangi, checklist aturan, dan Save (abu-abu sampai valid).
 * Belum ada API: password saat ini dicocokkan dengan password mock, lalu modal sukses mengarah kembali ke Overview.
 */
export function ChangePasswordForm({ className }: ChangePasswordFormProps) {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isValid },
  } = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onTouched",
    defaultValues: { currentPassword: "", password: "", confirmPassword: "" },
  });

  const password = watch("password");

  const onSubmit = (values: ChangePasswordValues) => {
    if (!verifyPassword(values.currentPassword)) {
      setError("currentPassword", { message: "Current password is incorrect" });
      return;
    }
    setSaved(true);
  };

  return (
    <>
      <form
        noValidate
        onSubmit={(event) => void handleSubmit(onSubmit)(event)}
        className={cn("rounded-lg bg-white p-6 shadow-input ring-1 ring-neutral-100 md:p-10", className)}
      >
        <div className="mx-auto flex w-full max-w-[380px] flex-col gap-5">
          <PasswordField
            required
            label="Current Password"
            autoComplete="current-password"
            placeholder="type your current password"
            errorText={errors.currentPassword?.message}
            {...register("currentPassword")}
          />
          <PasswordField
            required
            label="New Password"
            autoComplete="new-password"
            placeholder="type your new password"
            errorText={errors.password?.message}
            {...register("password")}
          />
          <PasswordField
            required
            label="Retype new Password"
            autoComplete="new-password"
            placeholder="retype your new password"
            errorText={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
          <PasswordRules value={password} rules={PASSWORD_RULES} />
          <Button type="submit" size="mobile" disabled={!isValid} className="mt-4 self-center px-10">
            Save
          </Button>
        </div>
      </form>

      <SuccessModal
        open={saved}
        title="Successfully change your password!"
        actionLabel="Back to Profile"
        onAction={() => router.replace("/profile")}
      />
    </>
  );
}
