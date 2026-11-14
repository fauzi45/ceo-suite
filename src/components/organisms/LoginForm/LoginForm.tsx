"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/cn";
import { login } from "@/lib/auth";
import { loginSchema, type LoginFormValues } from "@/lib/validations/auth";
import { Button } from "@/components/atoms/Button/Button";
import { Checkbox } from "@/components/atoms/Checkbox/Checkbox";
import { TextLink } from "@/components/atoms/TextLink/TextLink";
import { FormField } from "@/components/molecules/FormField/FormField";
import { PasswordField } from "@/components/molecules/PasswordField/PasswordField";

export interface LoginFormProps {
  /**
   * Dipanggil dengan nilai yang sudah tervalidasi. Tanpa ini, form memakai login mock
   * (`@/lib/auth`: admin@admin.com / admin123), menyimpan status login, lalu pindah ke `redirectTo`.
   */
  onSubmit?: (values: LoginFormValues) => void | Promise<void>;
  /** Tujuan setelah login mock berhasil. */
  redirectTo?: string;
  className?: string;
}

const simulateDelay = () => new Promise<void>((resolve) => setTimeout(resolve, 800));

/** Form login: email, password, remember me, forgot password, Sign In, dan tautan Sign Up. */
export function LoginForm({ onSubmit, redirectTo = "/", className }: LoginFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  // Pesan "email atau password salah" hilang begitu pengguna mengubah isian.
  useEffect(() => {
    const subscription = watch(() => clearErrors("root"));
    return () => subscription.unsubscribe();
  }, [watch, clearErrors]);

  const submit = handleSubmit(async (values) => {
    if (onSubmit) {
      await onSubmit(values);
      return;
    }
    await simulateDelay();
    if (!login(values.email, values.password)) {
      setError("root", { message: "Invalid email or password" });
      return;
    }
    router.replace(redirectTo);
  });

  return (
    <form
      noValidate
      onSubmit={(event) => {
        // Enter di dalam input tidak boleh men-submit lagi saat submit sebelumnya masih jalan.
        if (isSubmitting) {
          event.preventDefault();
          return;
        }
        void submit(event);
      }}
      className={cn("flex flex-col", className)}
    >
      <div className="flex flex-col gap-8">
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
        <PasswordField
          inputSize="lg"
          className="gap-2"
          required
          label="Password"
          autoComplete="current-password"
          placeholder="Enter your password"
          errorText={errors.password?.message}
          {...register("password")}
        />
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <Checkbox label="Remember me" {...register("rememberMe")} />
        <TextLink href="/forgot-password">Forgot Password</TextLink>
      </div>

      {errors.root && (
        <p role="alert" className="mt-4 text-center text-caption text-error-500">
          {errors.root.message}
        </p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting || (!isValid && !errors.root)}
        iconLeft={isSubmitting ? "loading" : undefined}
        className="mt-12 w-full md:mt-16 md:w-77 md:self-center"
      >
        Sign In
      </Button>

      <p className="mt-6 text-center text-caption text-neutral-700">
        Don&apos;t have an account? <TextLink href="/sign-up">Sign Up Here</TextLink>
      </p>
    </form>
  );
}
