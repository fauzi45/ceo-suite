"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/atoms/Icon/Icon";

export interface FaqItemProps {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
  className?: string;
}

/** Satu baris accordion FAQ: pertanyaan dengan panah, jawaban muncul saat dibuka. */
export function FaqItem({ question, answer, open, onToggle, className }: FaqItemProps) {
  const panelId = useId();

  return (
    <div className={cn("border-b border-neutral-100", className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-4 text-left outline-none focus-visible:ring-4 focus-visible:ring-primary-100"
      >
        <span className="text-caption font-medium text-neutral-950 md:text-body">{question}</span>
        <Icon
          name="chevron-down"
          size={20}
          className={cn("text-neutral-950 transition-transform", open && "rotate-180")}
        />
      </button>
      <div
        id={panelId}
        role="region"
        hidden={!open}
        className="pb-4 text-caption text-neutral-500"
      >
        {answer}
      </div>
    </div>
  );
}
