import type { IconName } from "@/components/atoms/Icon/Icon";

const img = (name: string) => `/images/services/${name}.jpg`;

export const SERVICES_HERO = {
  title: "Your One-Stop Solution for Business Services",
  description: "Streamline your operations with our expert business services solutions.",
  image: img("hero"),
};

export const SERVICES_INTRO = {
  title: "Streamline Your Business Operations",
  description:
    "We leverage our broad connections and experience to enable you to make an impact in a region where every city has its own regulations, culture and ways of conducting business. By joining one of CEO SUITE locations, you are supported at our premium locations across Asia.",
  trustedLabel: "Trusted by 8,000+ established company",
  /** Tiga logo (CloudNex, MarketEase, Sourcer) dalam satu gambar, diekspor dari Figma. */
  trustedLogos: "/images/services/trusted-logos.svg",
  trustedLogosAlt: "CloudNex, MarketEase, Sourcer",
};

export interface ServiceFeature {
  id: string;
  icon: IconName;
  title: string;
  description: string;
}

export const SERVICE_FEATURES: ServiceFeature[] = [
  {
    id: "tailored",
    icon: "feature-tailored",
    title: "Tailored Solutions",
    description: "Our services are customized to meet your specific business needs, ensuring maximum efficiency and effectiveness.",
  },
  {
    id: "team",
    icon: "feature-team",
    title: "Expert Team",
    description: "Our team of experienced professionals brings a wealth of knowledge and expertise.",
  },
  {
    id: "time",
    icon: "feature-time",
    title: "Time-Saving",
    description: "You can free up your time to focus on core activities.",
  },
  {
    id: "cost",
    icon: "feature-cost",
    title: "Cost-Effective",
    description: "Our competitive pricing and efficient processes help you maximize your resources.",
  },
];

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  /** Foto sudah memuat gradasi warna dari Figma. */
  image: string;
  /** Teks tombol di bawah deskripsi. */
  cta: "Learn More" | "Contact Us";
}

export const SERVICES: Service[] = [
  {
    id: "virtual-office",
    title: "Virtual Office Setup",
    description:
      "Sign up for virtual office services directly through the app, selecting your preferred business address and package, mail forwarding, and call answering services in just a few clicks.",
    icon: "service-virtual-office",
    image: img("virtual-office"),
    cta: "Learn More",
  },
  {
    id: "administrative",
    title: "Administrative Services",
    description:
      "Book an administrative support services such as document printing, courier services, and receptionist assistance, streamlining operational tasks based on demand.",
    icon: "service-administrative",
    image: img("administrative"),
    cta: "Contact Us",
  },
  {
    id: "it-support",
    title: "IT and Technical Support",
    description:
      "Access a wide range of IT support services directly, ensuring swift resolution of technical issues without disrupting workflow.",
    icon: "service-it-support",
    image: img("it-support"),
    cta: "Contact Us",
  },
  {
    id: "accounting",
    title: "Accounting and Tax Services",
    description:
      "Optimize financial administration with ease, ensuring precise and timely handling of all accounting and tax-related matters.",
    icon: "service-accounting",
    image: img("accounting"),
    cta: "Contact Us",
  },
  {
    id: "company-registration",
    title: "Company Registration Services",
    description:
      "Simplify the process of establishing your business with comprehensive support for efficient and hassle-free company registration.",
    icon: "service-company-registration",
    image: img("company-registration"),
    cta: "Contact Us",
  },
];
