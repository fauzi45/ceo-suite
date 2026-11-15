"use client";

import { useState } from "react";
import { BOOKING_ADD_ONS, type AddOnSelection } from "@/data/booking";
import { Button } from "@/components/atoms/Button/Button";
import { AddOnOption } from "@/components/molecules/AddOnOption/AddOnOption";
import { BookingModal } from "@/components/organisms/BookingModal/BookingModal";

export interface AddOnsModalProps {
  open: boolean;
  /** Pilihan yang sedang berlaku; jadi nilai awal setiap kali modal dibuka. */
  value: AddOnSelection;
  onClose: () => void;
  onSave: (selection: AddOnSelection) => void;
}

/** Modal "Select Add Ons": dua kolom add-on dengan checkbox + jumlah. Pilihan baru berlaku setelah Save. */
export function AddOnsModal({ open, value, onClose, onSave }: AddOnsModalProps) {
  // Draft dibuat ulang tiap modal dibuka (komponen isi di-mount hanya saat `open`), jadi Close = batal.
  return open ? <AddOnsModalBody value={value} onClose={onClose} onSave={onSave} /> : null;
}

function AddOnsModalBody({ value, onClose, onSave }: Omit<AddOnsModalProps, "open">) {
  const [draft, setDraft] = useState<AddOnSelection>(value);

  const setQuantity = (id: string, quantity: number) =>
    setDraft((current) => {
      const next = { ...current };
      if (quantity > 0) next[id] = quantity;
      else delete next[id];
      return next;
    });

  return (
    <BookingModal
      open
      onClose={onClose}
      title="Select Add Ons"
      footer={
        <Button fullWidth onClick={() => onSave(draft)}>
          Save
        </Button>
      }
    >
      <div className="grid gap-x-8 sm:grid-cols-2">
        {BOOKING_ADD_ONS.map((addOn) => (
          <AddOnOption
            key={addOn.id}
            addOn={addOn}
            quantity={draft[addOn.id] ?? 0}
            onQuantityChange={(quantity) => setQuantity(addOn.id, quantity)}
          />
        ))}
      </div>
    </BookingModal>
  );
}
