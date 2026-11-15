"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { FAQS, type FaqEntry } from "@/data/landing";
import { Button } from "@/components/atoms/Button/Button";
import { Container } from "@/components/atoms/Container/Container";
import { FaqItem } from "@/components/molecules/FaqItem/FaqItem";

export interface FaqSectionProps {
  faqs?: FaqEntry[];
  onContact?: () => void;
  className?: string;
}

/** FAQ: judul + kartu "Contact Us" di kiri, accordion di kanan (satu jawaban terbuka sekali waktu). */
export function FaqSection({ faqs = FAQS, onContact, className }: FaqSectionProps) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <section className={cn("py-10 md:py-16", className)}>
      <Container className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <div className="flex flex-col gap-6 justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="text-heading-lg font-bold leading-[1.2] text-neutral-950 md:text-display-sm">
              Frequently Asked Questions
            </h2>
            <p className="text-caption text-neutral-500">
              Everything You Need to Know About CEO SUITE Services &amp; Facilities!
            </p>
          </div>
          <div className="relative isolate flex flex-col items-start gap-4 overflow-hidden rounded-lg bg-primary-50 p-5">
            {/* Dekorasi vektor dari Figma: gelembung chat besar pucat di sisi kanan, terpotong tepi kartu. */}
            <Image
              src="/graphics/faq-chat-bubble.svg"
              alt=""
              aria-hidden="true"
              width={141}
              height={160}
              unoptimized
              className="pointer-events-none absolute -right-4 -top-2 -z-10 h-32 w-auto max-w-none"
            />
            <p className="text-body font-medium text-primary-800">Haven&apos;t answered your question?</p>
            <Button size="mobile" iconLeft="chat" onClick={onContact}>
              Contact Us
            </Button>
          </div>
        </div>

        <div className="flex flex-col border-t border-neutral-100">
          {faqs.map((faq) => (
            <FaqItem
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              open={openId === faq.id}
              onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
