"use client";

import { cn } from "@/lib/cn";
import type { ProfileData } from "@/data/profile";
import { identitySchema, signUpSchema } from "@/lib/validations/auth";
import { useProfile } from "@/lib/use-profile";
import { Avatar } from "@/components/atoms/Avatar/Avatar";
import { Icon } from "@/components/atoms/Icon/Icon";
import { ProfileInfoRow } from "@/components/molecules/ProfileInfoRow/ProfileInfoRow";

export interface ProfileDetailCardProps {
  className?: string;
}

type Validator = (value: string) => string | undefined;

const required =
  (message: string): Validator =>
  (value) =>
    value ? undefined : message;

const fromSchema =
  (schema: { safeParse: (value: string) => { success: boolean; error?: { issues: { message: string }[] } } }): Validator =>
  (value) => {
    const result = schema.safeParse(value);
    return result.success ? undefined : result.error?.issues[0]?.message;
  };

const PERSONAL: { key: keyof ProfileData; label: string; validate: Validator }[] = [
  { key: "name", label: "Name", validate: required("Name is required") },
  { key: "email", label: "Email", validate: fromSchema(signUpSchema.shape.email) },
  { key: "phone", label: "Phone Number", validate: fromSchema(signUpSchema.shape.phone) },
  { key: "dateOfBirth", label: "Date of Birth", validate: fromSchema(identitySchema.shape.dob) },
];

/** Kolom perusahaan boleh kosong ("-"); hanya email yang diperiksa formatnya bila diisi. */
const optionalEmail: Validator = (value) => (value === "-" ? undefined : fromSchema(signUpSchema.shape.email)(value));

const COMPANY: { key: keyof ProfileData; label: string; validate: Validator }[] = [
  { key: "position", label: "Position", validate: () => undefined },
  { key: "companyName", label: "Company Name", validate: () => undefined },
  { key: "companyEmail", label: "Company Email", validate: optionalEmail },
  { key: "companyAddress", label: "Company Address", validate: () => undefined },
];

/** Isi menu Profile Detail: avatar, lalu dua kolom (Profile Information, Company Profile) dengan baris yang bisa diedit. */
export function ProfileDetailCard({ className }: ProfileDetailCardProps) {
  const { profile, update } = useProfile();

  const rowsOf = (fields: typeof PERSONAL) =>
    fields.map(({ key, label, validate }) => (
      <ProfileInfoRow
        key={key}
        label={label}
        value={profile[key]}
        onSave={(value) => {
          const next = value === "" && fields === COMPANY ? "-" : value;
          const message = validate(next);
          if (message) return message;
          update({ [key]: next });
          return undefined;
        }}
      />
    ));

  return (
    <section className={cn("flex flex-col gap-6 rounded-lg bg-white p-6 shadow-input ring-1 ring-neutral-100 md:p-8", className)}>
      <div className="relative w-fit">
        <Avatar name={profile.name} className="size-20 text-heading-sm" />
        <span
          aria-hidden="true"
          className="absolute bottom-0 right-0 inline-flex size-6 items-center justify-center rounded-full bg-primary-800 text-white ring-2 ring-white"
        >
          <Icon name="edit" size={12} />
        </span>
      </div>

      <div className="grid gap-8 md:grid-cols-2 md:gap-0">
        <div className="flex flex-col gap-4 md:pr-8">
          <h2 className="text-caption font-bold text-neutral-950">Profile Information</h2>
          {rowsOf(PERSONAL)}
        </div>
        <div className="flex flex-col gap-4 md:border-l md:border-neutral-100 md:pl-8">
          <h2 className="text-caption font-bold text-neutral-950">Company Profile</h2>
          {rowsOf(COMPANY)}
        </div>
      </div>
    </section>
  );
}
