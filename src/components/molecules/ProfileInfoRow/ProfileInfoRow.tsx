"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/atoms/Icon/Icon";
import { FormField } from "@/components/molecules/FormField/FormField";

export interface ProfileInfoRowProps {
  label: string;
  value: string;
  /**
   * Dipanggil saat pengguna menyimpan. Kembalikan pesan error (string) untuk menolak,
   * atau `undefined` bila berhasil (baris kembali ke mode lihat).
   */
  onSave: (value: string) => string | undefined;
  className?: string;
}

/** Satu baris data profil: label kecil, nilai, dan pensil di kanan yang mengubah baris menjadi input (simpan / batal). */
export function ProfileInfoRow({ label, value, onSave, className }: ProfileInfoRowProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [error, setError] = useState<string>();

  const startEdit = () => {
    setDraft(value);
    setError(undefined);
    setEditing(true);
  };

  const save = () => {
    const message = onSave(draft.trim());
    if (message) setError(message);
    else setEditing(false);
  };

  if (editing) {
    return (
      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          save();
        }}
        className={cn("flex items-start gap-2", className)}
      >
        <FormField
          aria-label={label}
          label={label}
          value={draft}
          autoFocus
          errorText={error}
          onChange={(event) => setDraft(event.target.value)}
        />
        <div className="mt-6 flex shrink-0 gap-1">
          <button
            type="submit"
            aria-label={`Save ${label}`}
            className="inline-flex size-9 cursor-pointer items-center justify-center rounded-md text-success-600 outline-none hover:bg-success-50 focus-visible:ring-4 focus-visible:ring-primary-100"
          >
            <Icon name="check" size={20} />
          </button>
          <button
            type="button"
            aria-label={`Cancel editing ${label}`}
            onClick={() => setEditing(false)}
            className="inline-flex size-9 cursor-pointer items-center justify-center rounded-md text-neutral-500 outline-none hover:bg-neutral-50 focus-visible:ring-4 focus-visible:ring-primary-100"
          >
            <Icon name="close" size={20} />
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className={cn("flex items-start justify-between gap-3", className)}>
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="text-tiny text-neutral-400">{label}</span>
        <span className="break-words text-caption font-medium text-neutral-950">{value}</span>
      </div>
      <button
        type="button"
        aria-label={`Edit ${label}`}
        onClick={startEdit}
        className="inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded text-neutral-600 outline-none hover:text-primary-800 focus-visible:ring-4 focus-visible:ring-primary-100"
      >
        <Icon name="edit" size={16} />
      </button>
    </div>
  );
}
