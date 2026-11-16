import type { RoomType } from "@/components/atoms/Chip/Chip";
import type { ServiceFeature } from "./services";

const img = (name: string) => `/images/landing/${name}.jpg`;

export interface SpaceCategoryPage {
  slug: string;
  /** Judul hero. */
  title: string;
  tagline: string;
  /** Sementara memakai foto landing; ganti dengan foto Figma tiap kategori. */
  heroImage: string;
  /** Tipe ruang yang ditampilkan; `undefined` = semua (halaman "All Spaces"). */
  roomTypes?: RoomType[];
  /** Judul dan subjudul daftar ruang. */
  listTitle: string;
  listSubtitle: string;
  /** Intro + 4 keunggulan. Halaman "All Spaces" tidak punya intro. */
  intro?: { title: string; description: string; features: ServiceFeature[] };
}

const LIST_SUBTITLE = "Explore top-rated meeting rooms and workspaces.";

export const SPACE_CATEGORY_PAGES: SpaceCategoryPage[] = [
  {
    slug: "private-offices",
    title: "Private Offices",
    tagline: "Best Place to work together with your teams!",
    heroImage: img("hero"),
    roomTypes: ["office"],
    listTitle: "Our Office",
    listSubtitle: LIST_SUBTITLE,
    intro: {
      title: "Boost Productivity in a Private Office",
      description:
        "Discover our range of private offices designed to provide a professional and focused workspace. Whether you need a single desk or an entire floor, our private offices offer privacy and flexibility, complete with high-speed internet, modern furnishings, and access to all our premium amenities. Perfect for teams of all sizes looking for a dedicated, secure environment to boost productivity.",
      features: [
        { id: "privacy", icon: "room-office", title: "Privacy and Focus", description: "Enjoy a quiet, dedicated workspace free from distractions." },
        { id: "customizable", icon: "add-ons", title: "Customizable", description: "Tailor the office to fit your business needs and branding." },
        { id: "all-inclusive", icon: "checklist", title: "All-Inclusive", description: "Access high-speed internet, modern furnishings, and premium amenities." },
        { id: "flexible-terms", icon: "wallet", title: "Flexible Terms", description: "Choose from short-term or long-term leases to match your business requirements." },
      ],
    },
  },
  {
    slug: "co-working",
    title: "Co-Working Spaces",
    tagline: "Enjoy Flexibility and Convenience",
    heroImage: img("room-4"),
    roomTypes: ["coworking", "coworking-shared"],
    listTitle: "Our Co-Working Spaces",
    listSubtitle: LIST_SUBTITLE,
    intro: {
      title: "Collaborate and Connect in Our Co-Working Spaces",
      description:
        "Experience the energy and creativity of our co-working spaces. Ideal for freelancers, startups, and remote workers, our co-working areas provide a collaborative environment with flexible membership options. Enjoy the benefits of a dynamic community, hot-desking options, and access to shared resources like meeting rooms and common areas.",
      features: [
        { id: "collaborative", icon: "customers", title: "Collaborative Environment", description: "Connect with like-minded professionals and expand your network." },
        { id: "flexibility", icon: "clock", title: "Flexibility", description: "Enjoy hot-desking options and flexible membership plans." },
        { id: "cost-effective", icon: "wallet", title: "Cost-Effective", description: "Access a professional workspace without the overhead of a dedicated office." },
        { id: "shared-resources", icon: "room-coworking", title: "Shared Resources", description: "Benefit from meeting rooms, common areas, and on-site support services." },
      ],
    },
  },
  {
    slug: "meeting-rooms",
    title: "Meeting Rooms",
    tagline: "Enhance Your Meeting Productivity",
    heroImage: img("package-1"),
    roomTypes: ["meeting", "board"],
    listTitle: "Our Meeting Rooms",
    listSubtitle: LIST_SUBTITLE,
    intro: {
      title: "Enjoy a Seamless Meeting Experience",
      description:
        "Host your meetings in style with our state-of-the-art meeting rooms. Equipped with the latest technology and comfortable seating, our meeting rooms cater to small discussions or large presentations. Book by the hour or day and benefit from additional services such as catering and technical support to ensure your meetings are a success.",
      features: [
        { id: "professional-setup", icon: "briefcase", title: "Professional Setup", description: "Utilize advanced technology and comfortable seating for productive meetings." },
        { id: "convenience", icon: "clock", title: "Convenience", description: "Book by the hour or day with no long-term commitments." },
        { id: "support", icon: "chat", title: "Support Services", description: "Access additional services like catering and technical assistance." },
        { id: "flexibility", icon: "calendar", title: "Flexibility", description: "Choose from various room sizes to accommodate small discussions or large presentations." },
      ],
    },
  },
  {
    slug: "event-spaces",
    title: "Event Spaces",
    tagline: "Book Your Event Venue Today",
    heroImage: img("other-seminar"),
    roomTypes: ["class", "seminar", "theatre", "combined"],
    listTitle: "Our Event Spaces",
    listSubtitle: LIST_SUBTITLE,
    intro: {
      title: "Create Memorable Events with Our Venues",
      description:
        "Make your events memorable with our versatile event spaces. From corporate seminars and workshops to networking events and product launches, our venues are designed to accommodate a variety of functions. With professional support and customizable options, we provide everything you need to create a seamless and impactful event.",
      features: [
        { id: "versatility", icon: "checklist", title: "Versatility", description: "Host a wide range of events from corporate seminars to product launches." },
        { id: "customizable", icon: "add-ons", title: "Customizable", description: "Personalize the space to suit the theme and requirements of your event." },
        { id: "professional-support", icon: "customers", title: "Professional Support", description: "Receive assistance with event planning, setup, and execution." },
        { id: "impactful", icon: "megaphone", title: "Impactful Venues", description: "Create a memorable experience with our well-appointed and adaptable event spaces." },
      ],
    },
  },
  {
    slug: "all",
    title: "All Spaces",
    tagline: "Best Place to work together with your teams!",
    heroImage: img("hero"),
    listTitle: "All Spaces",
    listSubtitle: LIST_SUBTITLE,
  },
];

export const getCategoryPage = (slug: string) => SPACE_CATEGORY_PAGES.find((page) => page.slug === slug);

export const categoryHref = (slug: string) => `/category/${slug}`;

/** Halaman kategori untuk tipe ruang (dipakai kartu "Other Spaces"); Board Room ikut Meeting Rooms. */
export function categoryHrefForRoomType(roomType: RoomType): string {
  const page = SPACE_CATEGORY_PAGES.find((candidate) => candidate.roomTypes?.includes(roomType));
  return categoryHref(page?.slug ?? "all");
}
