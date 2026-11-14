"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/cn";
import { loginSchema, type LoginFormValues } from "@/lib/validations/auth";
import { Button } from "@/components/atoms/Button/Button";
import { Checkbox } from "@/components/atoms/Checkbox/Checkbox";
import { TextLink } from "@/components/atoms/TextLink/TextLink";
import { FormField } from "@/components/molecules/FormField/FormField";
import { PasswordField } from "@/components/molecules/PasswordField/PasswordField";

export interface LoginFormProps {
  /** Dipanggil dengan nilai yang sudah tervalidasi. Tanpa ini, login disimulasikan ±800ms. */
  onSubmit?: (values: LoginFormValues) => void | Promise<void>;
  className?: string;
}

const simulateLogin = () => new Promise<void>((resolve) => setTimeout(resolve, 800));

const required = (
  <span aria-hidden="true" className="text-error-500">
    {" "}
    *
  </span>
);

/** Form login: email, password, remember me, forgot password, Sign In, dan tautan Sign Up. */
export function LoginForm({ onSubmit, className }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  const submit = handleSubmit(async (values) => {
    await (onSubmit ?? simulateLogin)(values);
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
          label={<>Email{required}</>}
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
          label={<>Password{required}</>}
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

      <Button
        type="submit"
        disabled={isSubmitting}
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
