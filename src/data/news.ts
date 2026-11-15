const img = (name: string) => `/images/landing/${name}.jpg`;

export type NewsCategoryId =
  | "all"
  | "industry-insights"
  | "working-space"
  | "living"
  | "development"
  | "interior-room"
  | "community";

export interface NewsCategoryTab {
  id: NewsCategoryId;
  label: string;
}

/** Urutan tab persis seperti Figma halaman News. */
export const NEWS_CATEGORY_TABS: NewsCategoryTab[] = [
  { id: "all", label: "All Articles" },
  { id: "industry-insights", label: "Industry Insights" },
  { id: "working-space", label: "Working Space" },
  { id: "living", label: "Living" },
  { id: "development", label: "Development" },
  { id: "interior-room", label: "Interior Room" },
  { id: "community", label: "Community" },
];

export const parseNewsCategory = (value: string | null): NewsCategoryId =>
  NEWS_CATEGORY_TABS.find((tab) => tab.id === value)?.id ?? "all";

export const getNewsCategoryLabel = (id: NewsCategoryId) =>
  NEWS_CATEGORY_TABS.find((tab) => tab.id === id)?.label ?? "";

/** Satu blok isi artikel: paragraf, subjudul, atau daftar (bernomor / berpoin). */
export type NewsBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; ordered?: boolean; items: string[] };

export interface NewsPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  /** Format ISO `YYYY-MM-DD`. */
  date: string;
  category: Exclude<NewsCategoryId, "all">;
  readTime: string;
  body: NewsBlock[];
}

const EXCERPT =
  "This article was written by Jake Willhoite from Healthlisted.com Strength in basketball isn't all about a massive body mass or ripped muscles.";

const BODY: NewsBlock[] = [
  {
    type: "paragraph",
    text: "It goes without saying that the environment in which people work has a direct effect on their productivity and creativity. Workspace design is no longer just about desks and chairs: natural light, acoustics, flexibility and a sense of community all shape how well a team performs from day to day.",
  },
  {
    type: "paragraph",
    text: "Today's teams are more distributed than ever, and many of them split their week between home, a co-working space and a private office. Choosing the right place to work has become a strategic decision rather than a matter of convenience.",
  },
  { type: "heading", text: "Why Should You Invest in Your Workspace?" },
  {
    type: "paragraph",
    text: "Companies that invest in thoughtful workspaces consistently report higher engagement and lower turnover. A comfortable, well-lit and well-equipped space helps people focus, and it signals that the organisation cares about the way its people work.",
  },
  { type: "heading", text: "Key Elements of a Minimalist Office Design" },
  {
    type: "list",
    ordered: true,
    items: [
      "Natural light: position desks near windows and keep the glass clear so daylight reaches the whole floor.",
      "Clean surfaces: fewer objects on a desk means fewer distractions and a calmer head.",
      "Neutral colours: soft greys, whites and warm woods make a room feel larger and more relaxed.",
      "Flexible furniture: movable tables and modular seating let a room switch between focus time and collaboration.",
      "Greenery: a few well-placed plants improve air quality and lift the mood of the room.",
    ],
  },
  { type: "heading", text: "Tips to Improve a Workspace Without Moving" },
  {
    type: "list",
    items: [
      "Declutter first: remove everything you have not used in the last month.",
      "Add task lighting: a good desk lamp reduces eye strain in the afternoon.",
      "Define zones: keep one corner for calls and another for deep work.",
      "Personalise lightly: one or two meaningful objects are enough.",
    ],
  },
  {
    type: "paragraph",
    text: "Whichever way you choose to work, the goal is the same: a place where you feel comfortable enough to do your best work. Start small, measure how you feel after a couple of weeks, and keep adjusting.",
  },
];

const make = (
  id: string,
  title: string,
  image: string,
  category: NewsPost["category"],
  date: string,
  author = "Jake Will.",
): NewsPost => ({
  id,
  title,
  excerpt: EXCERPT,
  image,
  author,
  date,
  category,
  readTime: "5 min read",
  body: BODY,
});

// Diekspor dari Figma (frame News) di 2x: tim di depan laptop, kantor biru, pria membaca koran.
const A = "/images/news/team.jpg";
const B = "/images/news/office.jpg";
const C = "/images/news/reading.jpg";

export const NEWS_POSTS: NewsPost[] = [
  make("does-productivity-increase-when-working-remotely", "Does productivity increase when working remotely ?", C, "industry-insights", "2023-06-04"),
  make("morning-routine-to-boost-your-mood", "Morning routine to boost your mood", B, "living", "2023-06-04"),
  make("5-tips-to-find-comfortable-co-working-space", "5+ tips to find comfortable co-working space", A, "working-space", "2023-06-04"),
  make("minimal-workspace-for-inspirations", "Minimal Workspace for Inspirations", img("news-featured-hd"), "interior-room", "2023-06-03"),
  make("how-hybrid-teams-stay-connected", "How hybrid teams stay connected", B, "community", "2023-06-02"),
  make("designing-a-quiet-corner-at-home", "Designing a quiet corner at home", C, "interior-room", "2023-06-01"),
  make("why-flexible-offices-are-growing", "Why flexible offices are growing", A, "industry-insights", "2023-05-30"),
  make("building-a-career-in-a-shared-space", "Building a career in a shared space", C, "development", "2023-05-28"),
  make("the-benefits-of-meeting-in-person", "The benefits of meeting in person", B, "community", "2023-05-25"),
  make("small-habits-for-a-better-work-life-balance", "Small habits for a better work-life balance", A, "living", "2023-05-22"),
];

export const NEWS_IDS = NEWS_POSTS.map((post) => post.id);

export const getNewsPost = (id: string) => NEWS_POSTS.find((post) => post.id === id);

/** Filter berdasarkan kategori tab dan kata kunci judul (tanpa membedakan huruf besar/kecil). */
export function filterNews(category: NewsCategoryId, query = ""): NewsPost[] {
  const q = query.trim().toLowerCase();
  return NEWS_POSTS.filter(
    (post) =>
      (category === "all" || post.category === category) && (!q || post.title.toLowerCase().includes(q)),
  );
}

/** Artikel lain untuk "More Related Articles": satu kategori lebih dulu, sisanya dari yang terbaru. */
export function getRelatedNews(post: NewsPost, count = 3): NewsPost[] {
  const others = NEWS_POSTS.filter((p) => p.id !== post.id);
  const same = others.filter((p) => p.category === post.category);
  const rest = others.filter((p) => p.category !== post.category);
  return [...same, ...rest].slice(0, count);
}

/** "04 June 2023" (UTC supaya sama di server dan browser). */
export function formatNewsDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}
