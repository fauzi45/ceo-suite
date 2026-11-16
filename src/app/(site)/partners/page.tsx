import type { Metadata } from "next";
import { PartnersContent } from "./PartnersContent";

export const metadata: Metadata = {
  title: "Corporate Partners | CEO SUITE",
  description:
    "Exclusive benefits and promotions from CEO SUITE corporate partners, tailored to businesses of all sizes.",
};

export default function PartnersPage() {
  return <PartnersContent />;
}
