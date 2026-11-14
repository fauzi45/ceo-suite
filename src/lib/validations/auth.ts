import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .min(1, "Email is required")
  .pipe(z.email("Enter a valid email address"));

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

/** Aturan password yang ditampilkan sebagai checklist di form Sign Up (teks sesuai Figma). */
export const PASSWORD_RULES = [
  { id: "length", label: "At least 8 character", test: (v: string) => v.length >= 8 },
  { id: "number", label: "At least 1 number", test: (v: string) => /\d/.test(v) },
  {
    id: "case",
    label: "Both upper and lower case",
    test: (v: string) => /[a-z]/.test(v) && /[A-Z]/.test(v),
  },
] as const;

export const isPasswordValid = (value: string) => PASSWORD_RULES.every((rule) => rule.test(value));

export const signUpSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: emailSchema,
  // Spasi, tanda hubung, titik, dan kurung dibuang dulu: "0812-3456-7890" dan "+62 812 3456 7890" valid.
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .transform((value) => value.replace(/[\s().-]/g, ""))
    .pipe(z.string().regex(/^\+?[0-9]{8,15}$/, "Enter a valid phone number")),
  password: z
    .string()
    .min(1, "Password is required")
    .refine(isPasswordValid, "Password does not meet the requirements"),
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;

const isRealDate = (value: string) => {
  const [day, month, year] = value.split("/").map(Number);
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day &&
    date <= new Date()
  );
};

/** Modal "Complete your identity": tanggal lahir (DD/MM/YYYY) dan nama perusahaan. */
export const identitySchema = z.object({
  dob: z
    .string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Use the format DD/MM/YYYY")
    .refine(isRealDate, "Enter a valid date of birth"),
  company: z.string().trim().min(1, "Company name is required"),
});

export type IdentityFormValues = z.infer<typeof identitySchema>;

export const forgotPasswordSchema = z.object({ email: emailSchema });

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

/** Aturan password baru di form Reset Password (teks sesuai Figma). "Password is match" dihitung di form. */
export const RESET_PASSWORD_RULES = [
  { id: "length", label: "At least 6 character", test: (v: string) => v.length >= 6 },
  { id: "number", label: "At least 1 number", test: (v: string) => /\d/.test(v) },
] as const;

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required")
      .refine(
        (value) => RESET_PASSWORD_RULES.every((rule) => rule.test(value)),
        "Password does not meet the requirements",
      ),
    confirmPassword: z.string().min(1, "Please retype your new password"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export const OTP_LENGTH = 6;

export const otpSchema = z.object({
  code: z.string().regex(new RegExp(`^\\d{${OTP_LENGTH}}$`), "Enter the 6-digit code"),
});

export type OtpFormValues = z.infer<typeof otpSchema>;
