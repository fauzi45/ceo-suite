import type { Metadata } from "next";
import { ServicesContent } from "./ServicesContent";

export const metadata: Metadata = {
  title: "Services | CEO SUITE",
  description:
    "Virtual office setup, administrative, IT, accounting and company registration services: a one-stop solution for your business.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}
