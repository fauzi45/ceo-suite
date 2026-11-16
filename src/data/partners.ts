import { PARTNERS, type Partner } from "./landing";
import { PROMO_HERO } from "./promotions";

export const PARTNERS_HERO = {
  title: "Our Corporate Partners",
  description:
    "We proudly collaborate with a diverse network of corporate partners to deliver exclusive benefits and unparalleled service.",
  /** Sementara memakai foto hero Promotions; ganti dengan foto Figma "Corporate Partners". */
  image: PROMO_HERO.image,
};

export const PARTNERS_INTRO = {
  label: "Our Partners",
  title: "At CEO SUITE, we believe in the power of strong partnerships.",
  description:
    "Our partners benefit from tailored solutions that enhance productivity, improve operational efficiency, and add value to a global network of business professionals. By joining forces with CEO SUITE, you align with a trusted brand known for its premium office spaces and seamless business support.",
};

export const PARTNERS_CTA = {
  title: "Special offer for business and companies!",
  description:
    "We are always open to exploring new partnerships that will add value to our community and enhance the business ecosystem.",
};

export const PARTNER_DETAIL_CTA = {
  title: "Interested in this offer?",
  description: "Contact us for more information!",
};

/** Bentuk yang dibaca `PromoDetailSection` (title, description, headline, body, terms) ditambah data kartu. */
export interface PartnerItem extends Partner {
  description: string;
  headline: string;
  body: string;
  terms: string[];
  /** Foto banner halaman detail. */
  banner: string;
}

const buildTerms = (partner: string) => [
  `This offer is valid for all ${partner} card holders.`,
  "The discount is applicable to the total booking cost, excluding taxes and service charges.",
  "This offer cannot be combined with other promotions or discounts.",
  "The offer is valid until [End Date].",
  "Management reserves the right to change or withdraw this offer at any time without notice.",
];

export const PARTNERS_PAGE_SIZE = 9;
const PAGE_COUNT = 3;

/** Daftar partner: 3 partner dari landing diulang sampai memenuhi 3 halaman. Tiga yang pertama memakai id aslinya. */
export const PARTNER_ITEMS: PartnerItem[] = Array.from({ length: PARTNERS_PAGE_SIZE * PAGE_COUNT }, (_, i) => {
  const base = PARTNERS[i % PARTNERS.length];
  return {
    ...base,
    id: i < PARTNERS.length ? base.id : `${base.id}-${i + 1}`,
    headline: base.title,
    body: `Plan your next meeting with us and enjoy exclusive benefits when you partner with ${base.partner}. Our modern and fully equipped meeting rooms provide the perfect setting for your business gatherings, presentations, and workshops.`,
    terms: buildTerms(base.partner),
    banner: base.image ?? "/images/landing/partner-3.jpg",
  };
});

export const getPartnerById = (id: string) => PARTNER_ITEMS.find((item) => item.id === id);
