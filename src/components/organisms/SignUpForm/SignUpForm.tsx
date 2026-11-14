"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/cn";
import { setPendingEmail } from "@/lib/signup-session";
import { signUpSchema, type SignUpFormValues } from "@/lib/validations/auth";
import { Button } from "@/components/atoms/Button/Button";
import { TextLink } from "@/components/atoms/TextLink/TextLink";
import { FormField } from "@/components/molecules/FormField/FormField";
import { PasswordField } from "@/components/molecules/PasswordField/PasswordField";
import { PasswordRules } from "@/components/molecules/PasswordRules/PasswordRules";
import { IdentityModal } from "@/components/organisms/IdentityModal/IdentityModal";

export interface SignUpFormProps {
  className?: string;
}

/**
 * Form Sign Up. Setelah data valid, modal "Complete your identity" muncul;
 * "Save my Data" atau "Skip for Now" lanjut ke halaman verifikasi email.
 * Belum ada API: data hanya divalidasi di sisi client.
 */
export function SignUpForm({ className }: SignUpFormProps) {
  const router = useRouter();
  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: "onTouched",
    defaultValues: { name: "", email: "", phone: "", password: "" },
  });

  const goToVerification = () => {
    if (!registeredEmail) return;
    setPendingEmail(registeredEmail);
    router.push("/verify-email");
  };

  return (
    <>
      <form
        noValidate
        onSubmit={(event) => void handleSubmit((values) => setRegisteredEmail(values.email))(event)}
        className={cn("flex flex-col", className)}
      >
        <div className="flex flex-col gap-8 md:gap-10">
          <FormField
            inputSize="lg"
            className="gap-2"
            required
            label="Name"
            autoComplete="name"
            placeholder="your full name"
            errorText={errors.name?.message}
            {...register("name")}
          />
          <FormField
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
          <FormField
            inputSize="lg"
            className="gap-2"
            required
            label="Phone Number"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="Enter Phone Number"
            errorText={errors.phone?.message}
            {...register("phone")}
          />
          <div className="flex flex-col gap-3">
            <PasswordField
              inputSize="lg"
              className="gap-2"
              required
              label="Enter Password"
              autoComplete="new-password"
              placeholder="Enter your password"
              errorText={errors.password?.message}
              {...register("password")}
            />
            <PasswordRules value={watch("password")} />
          </div>
        </div>

        <Button
          type="submit"
          disabled={!isValid}
          className="mt-12 w-full md:mt-16 md:w-77 md:self-center"
        >
          Sign Up
        </Button>

        <p className="mt-6 text-center text-caption text-neutral-700">
          Already have an account? <TextLink href="/login">Sign In Here</TextLink>
        </p>
      </form>

      <IdentityModal
        open={registeredEmail !== null}
        onSave={goToVerification}
        onSkip={goToVerification}
      />
    </>
  );
}
