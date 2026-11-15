"use client";

import { useState } from "react";
import { VOUCHERS, findVoucherByCode, type Voucher } from "@/data/booking";
import { Button } from "@/components/atoms/Button/Button";
import { FormField } from "@/components/molecules/FormField/FormField";
import { VoucherOption } from "@/components/molecules/VoucherOption/VoucherOption";
import { BookingModal } from "@/components/organisms/BookingModal/BookingModal";

export interface VoucherModalProps {
  open: boolean;
  /** Voucher yang sedang terpasang; jadi pilihan awal setiap kali modal dibuka. */
  value: Voucher | null;
  onClose: () => void;
  onSave: (voucher: Voucher | null) => void;
}

/** Modal "Add Voucher": ketik kode lalu Apply, atau pilih dari daftar voucher yang tersedia. */
export function VoucherModal({ open, value, onClose, onSave }: VoucherModalProps) {
  return open ? <VoucherModalBody value={value} onClose={onClose} onSave={onSave} /> : null;
}

function VoucherModalBody({ value, onClose, onSave }: Omit<VoucherModalProps, "open">) {
  const [selected, setSelected] = useState<Voucher | null>(value);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string>();

  const apply = () => {
    const found = findVoucherByCode(code);
    if (!found) {
      setError("Voucher code is not valid");
      return;
    }
    setError(undefined);
    setSelected(found);
    setCode("");
  };

  return (
    <BookingModal
      open
      onClose={onClose}
      title="Add Voucher"
      footer={
        <Button fullWidth onClick={() => onSave(selected)}>
          Save
        </Button>
      }
    >
      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          apply();
        }}
        className="flex items-start gap-3"
      >
        <FormField
          aria-label="Voucher code"
          placeholder="Enter voucher code"
          value={code}
          onChange={(event) => {
            setCode(event.target.value);
            setError(undefined);
          }}
          errorText={error}
        />
        <Button type="submit" disabled={!code.trim()} className="shrink-0 !py-2.5">
          Apply
        </Button>
      </form>

      <div className="flex flex-col gap-3">
        <h3 className="text-caption font-medium text-neutral-900">Available Vouchers</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {VOUCHERS.map((voucher) => (
            <VoucherOption
              key={voucher.id}
              voucher={voucher}
              selected={selected?.id === voucher.id}
              onToggle={() => setSelected((current) => (current?.id === voucher.id ? null : voucher))}
            />
          ))}
        </div>
      </div>
    </BookingModal>
  );
}
