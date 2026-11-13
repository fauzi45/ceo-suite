"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";
import { Input } from "@/components/atoms/Input/Input";
import { Button } from "@/components/atoms/Button/Button";

export interface EmailCaptureProps {
  placeholder?: string;
  buttonLabel?: string;
  onSubmit?: (email: string) => void;
  className?: string;
}

/** Input email + tombol Subscribe (gap 16), dipakai di footer. */
export function EmailCapture({
  placeholder = "Enter your email",
  buttonLabel = "Subscribe",
  onSubmit,
  className,
}: EmailCaptureProps) {
  const [email, setEmail] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit?.(email);
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex items-center gap-4", className)}>
      <Input
        type="email"
        name="email"
        aria-label="Email"
        placeholder={placeholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-11 w-[230px]"
        fullWidth={false}
      />
      <Button type="submit" size="mobile" className="h-11">
        {buttonLabel}
      </Button>
    </form>
  );
}
