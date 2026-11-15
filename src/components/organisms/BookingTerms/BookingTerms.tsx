"use client";

import { useState } from "react";
import { Button } from "@/components/atoms/Button/Button";
import { Checkbox } from "@/components/atoms/Checkbox/Checkbox";
import { Container } from "@/components/atoms/Container/Container";
import { BackHeader } from "@/components/molecules/BackHeader/BackHeader";

/** Isi syarat dan ketentuan (disalin dari Figma; teks di frame kecil, jadi redaksinya perkiraan). */
const TERMS: { title: string; items: string[] }[] = [
  {
    title: "Cancellation Policy:",
    items: [
      "Meeting Room and Boardroom",
      "Less than 24 hours notice - 100% of the rental fee is chargeable.",
      "24-48 hours notice - 50% of the rental fee is chargeable.",
      "*Please note that the booking fee and full payment for office rentals are non-refundable. However, the amount paid can be retained as a credit balance, which may be used for our services and future rentals.",
    ],
  },
  {
    title: "Event Space:",
    items: [
      "Less than 3 working days from the event date - 100% of the fee is chargeable.",
      "*Less than 7 working days from the event date - 50% of the fee is chargeable.",
    ],
  },
  {
    title: "Catering Service:",
    items: [
      "Non-refundable for catering/food and beverage deposits upon confirmation.",
      "Food items may be subject to change without prior notice due to availability of the products and will be replaced with an equivalent.",
    ],
  },
  {
    title: "Services:",
    items: [
      "*Please consult us for the full legal disclaimer. Services provided may vary at CEO SUITE's sole discretion and shall be provided during our normal office hours.",
      "Services provided after normal business hours will be subject to after-office-hour fees.",
    ],
  },
];

export interface BookingTermsProps {
  onBack: () => void;
  onContinue: () => void;
}

/** Halaman "Terms and Conditions": isi ketentuan, checkbox persetujuan, dan tombol lanjut (aktif setelah dicentang). */
export function BookingTerms({ onBack, onContinue }: BookingTermsProps) {
  const [agreed, setAgreed] = useState(false);

  return (
    <Container className="flex flex-col gap-8 py-8 md:py-12">
      <BackHeader title="Terms and Conditions" onBack={onBack} />
      <div className="flex flex-col gap-6 rounded-lg bg-white p-6 shadow-input ring-1 ring-neutral-100">
        {TERMS.map((section) => (
          <section key={section.title} className="flex flex-col gap-1 text-caption text-neutral-700">
            <h2 className="font-bold text-neutral-950">{section.title}</h2>
            {section.items.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </section>
        ))}
      </div>
      <Checkbox
        label="I have read and agree to the terms and conditions."
        checked={agreed}
        onChange={(event) => setAgreed(event.target.checked)}
      />
      <Button disabled={!agreed} onClick={onContinue} className="w-full self-center md:w-77">
        Continue to Payment
      </Button>
    </Container>
  );
}
