"use client";

import { forwardRef, useState } from "react";
import { Icon } from "@/components/atoms/Icon/Icon";
import { FormField, type FormFieldProps } from "@/components/molecules/FormField/FormField";

export type PasswordFieldProps = Omit<FormFieldProps, "type" | "suffix" | "trailingIcon">;

/** `FormField` untuk password dengan tombol mata (tampilkan/sembunyikan). */
export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  function PasswordField(props, ref) {
    const [visible, setVisible] = useState(false);

    return (
      <FormField
        ref={ref}
        {...props}
        type={visible ? "text" : "password"}
        suffix={
          <button
            type="button"
            aria-label={visible ? "Hide password" : "Show password"}
            aria-pressed={visible}
            disabled={props.disabled}
            onClick={() => setVisible((v) => !v)}
            className="-m-1 inline-flex rounded p-1 text-neutral-400 outline-none transition-colors hover:text-neutral-600 focus-visible:ring-2 focus-visible:ring-focus-ring disabled:cursor-not-allowed"
          >
            <Icon name={visible ? "eye-off" : "eye"} size={20} />
          </button>
        }
      />
    );
  },
);
