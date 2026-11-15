"use client";

import { useState, type ChangeEvent } from "react";
import { signUpSchema } from "@/lib/validations/auth";
import { Button } from "@/components/atoms/Button/Button";
import { Container } from "@/components/atoms/Container/Container";
import { BackHeader } from "@/components/molecules/BackHeader/BackHeader";
import { FormField } from "@/components/molecules/FormField/FormField";

export interface GuestDetails {
  name: string;
  email: string;
  phone: string;
}

const guestSchema = signUpSchema.pick({ name: true, email: true, phone: true });

export interface GuestDetailsFormProps {
  /** Nilai awal (mis. saat pengguna kembali dari langkah berikutnya). */
  defaultValues?: GuestDetails;
  onBack: () => void;
  onSubmit: (details: GuestDetails) => void;
}

/** Halaman "Fill Personal Data / Book as Guest": nama, email, dan nomor telepon untuk pemesan yang belum login. */
export function GuestDetailsForm({ defaultValues, onBack, onSubmit }: GuestDetailsFormProps) {
  const [values, setValues] = useState<GuestDetails>(defaultValues ?? { name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof GuestDetails, string>>>({});

  const update = (field: keyof GuestDetails) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const submit = () => {
    const result = guestSchema.safeParse(values);
    if (!result.success) {
      const next: typeof errors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof GuestDetails;
        next[field] ??= issue.message;
      }
      setErrors(next);
      return;
    }
    onSubmit(values);
  };

  return (
    <Container className="flex flex-col gap-8 py-8 md:py-12">
      <BackHeader title="Fill Personal Data" onBack={onBack} />
      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
        className="mx-auto flex w-full max-w-[800px] flex-col gap-6"
      >
        <div className="flex flex-col gap-1">
          <h2 className="text-heading-sm font-bold leading-[1.2] text-neutral-950">Book as Guest</h2>
          <p className="text-caption text-neutral-500">Please enter your personal details to proceed with your booking.</p>
        </div>
        <FormField
          label="Name"
          required
          placeholder="Your Full Name"
          autoComplete="name"
          value={values.name}
          onChange={update("name")}
          errorText={errors.name}
        />
        <FormField
          label="Email"
          required
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          value={values.email}
          onChange={update("email")}
          errorText={errors.email}
        />
        <FormField
          label="Phone Number"
          required
          type="tel"
          placeholder="+62 Enter Phone Number"
          autoComplete="tel"
          value={values.phone}
          onChange={update("phone")}
          errorText={errors.phone}
        />
        <Button type="submit" className="w-full self-center md:w-77">
          Continue
        </Button>
      </form>
    </Container>
  );
}
