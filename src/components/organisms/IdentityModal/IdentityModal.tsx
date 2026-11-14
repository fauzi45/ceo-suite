"use client";

import { useEffect, useId } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { identitySchema, type IdentityFormValues } from "@/lib/validations/auth";
import { Button } from "@/components/atoms/Button/Button";
import { FormField } from "@/components/molecules/FormField/FormField";

export interface IdentityModalProps {
  open: boolean;
  /** Dipanggil dengan data yang valid saat "Save my Data" ditekan. */
  onSave: (values: IdentityFormValues) => void | Promise<void>;
  /** Dipanggil saat "Skip for Now" ditekan. */
  onSkip: () => void;
}

/** Ubah input angka menjadi DD/MM/YYYY sambil mengetik. */
const formatDob = (raw: string) => {
  const digits = raw.replace(/\D/g, "").slice(0, 8);
  return [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4)].filter(Boolean).join("/");
};

/**
 * Modal "Complete your identity" setelah Sign Up: tanggal lahir + nama perusahaan.
 * "Save my Data" aktif setelah kedua field valid; "Skip for Now" melewati langkah ini.
 */
export function IdentityModal({ open, onSave, onSkip }: IdentityModalProps) {
  const titleId = useId();
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isValid, isSubmitting },
  } = useForm<IdentityFormValues>({
    resolver: zodResolver(identitySchema),
    mode: "onChange",
    defaultValues: { dob: "", company: "" },
  });

  useEffect(() => {
    if (open) setFocus("dob");
  }, [open, setFocus]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-neutral-1000/40 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="my-auto flex w-full max-w-160 flex-col gap-8 rounded-lg bg-white p-6 shadow-modal md:p-12"
      >
        <div className="flex flex-col gap-2">
          <h2 id={titleId} className="text-heading-sm font-bold text-neutral-950 md:text-heading-md">
            Complete your identity
          </h2>
          <p className="text-caption text-neutral-600">
            For better experience complete your identity start from now.
          </p>
        </div>

        <form
          noValidate
          onSubmit={(event) => {
            if (isSubmitting) {
              event.preventDefault();
              return;
            }
            void handleSubmit(async (values) => {
              await onSave(values);
            })(event);
          }}
          className="flex flex-col gap-8"
        >
          <div className="flex flex-col gap-5">
            <FormField
              inputSize="lg"
              className="gap-2"
              label="Date of Birth"
              placeholder="19/08/2002"
              inputMode="numeric"
              autoComplete="bday"
              errorText={errors.dob?.message}
              {...register("dob", {
                onChange: (event) => {
                  event.target.value = formatDob(event.target.value);
                },
              })}
            />
            <FormField
              inputSize="lg"
              className="gap-2"
              label="Company Name"
              placeholder="Enter your company name"
              autoComplete="organization"
              errorText={errors.company?.message}
              {...register("company")}
            />
          </div>

          <div className="flex flex-col items-center gap-4">
            <Button
              type="submit"
              fullWidth
              disabled={!isValid || isSubmitting}
              iconLeft={isSubmitting ? "loading" : undefined}
            >
              Save my Data
            </Button>
            <Button type="button" hierarchy="tertiary" onClick={onSkip}>
              Skip for Now
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
