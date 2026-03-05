// lib/cards/creditCards.ts

export type CardCategory = "Travel" | "Cashback" | "Everyday" | "Store" | "Other";

export type Issuer =
  | "Chase"
  | "American Express"
  | "Capital One"
  | "Citi"
  | "Discover"
  | "Target"
  | "Costco"
  | "Bilt"
  | "United"
  | "Other";

export type CardNetwork = "Visa" | "Mastercard" | "Amex" | "Discover" | "Other";

export type AnnualFee =
  | { type: "none"; amount: 0 }
  | { type: "known"; amount: number }
  | { type: "unknown" };

export type CardImages = {
  /**
   * Prefer WebP for performance. Optional PNG fallback.
   * Recommended to store in /public/cards/... and reference via /cards/...
   */
  cardImage?: {
    webp?: string;
    png?: string;
    alt?: string;
  };
  issuerLogo?: {
    svg?: string;
    png?: string;
    alt?: string;
  };
};

export type CardLinks = {
  /** URL to the issuer’s card landing page */
  website?: string;
  /** Optional: affiliate/deeplink later */
  applyUrl?: string;
  /** Optional: “rates and fees” page */
  ratesAndFeesUrl?: string;
};

export type CardRewardsMeta = {
  /** e.g., "points", "miles", "cashback" */
  rewardsCurrency?: string;
  /** Helpful short blurb you can show in UI */
  positioning?: string;

  /**
   * Optional tags for later (filtering, rules engines, education pages).
   * Examples: ["dining", "travel", "grocery", "rotating-categories"]
   */
  tags?: string[];

  /**
   * Optional: bonus categories, etc.
   * Keep generic so you can evolve without schema churn.
   */
  bonusCategories?: Array<{
    category: string; // e.g., "Dining", "Groceries", "Travel"
    notes?: string;
  }>;
};

export type InternalCardMeta = {
  /**
   * Internal / future-proofing fields (not necessarily shown in UI).
   * Keep optional so you can fill over time.
   */
  sortPriority?: number; // lower = earlier
  isFeatured?: boolean;
  isDeprecated?: boolean;

  /** For reconciliation / mapping later */
  externalIds?: Record<string, string>; // e.g., { "issuer": "123", "partner": "abc" }

  /** Data freshness */
  lastVerifiedAt?: string; // ISO date string
  sourceNotes?: string;
};

export type CardMeta = {
  /** Stable unique id for internal use */
  id: string;
  /** URL-safe slug for routes, analytics keys, etc. */
  slug: string;

  /** Display name */
  name: string;
  /** Optional short name for compact UI */
  shortName?: string;

  issuer: Issuer;
  network?: CardNetwork;

  category: CardCategory;
  annualFee: AnnualFee;

  images?: CardImages;
  links?: CardLinks;

  /** Short helper text for quiz tiles (keep short) */
  helperText?: string;

  /** Future-facing metadata bucket */
  rewards?: CardRewardsMeta;

  /** Internal / ops metadata bucket */
  internal?: InternalCardMeta;
};

/**
 * Alias you asked about:
 * Use CreditCard as the exported “public” type for the rest of the app.
 */
export type CreditCard = CardMeta;

/**
 * Official v0 catalog list (your founder-provided starting set).
 * Note: annualFee values can be filled later; set to unknown for now.
 */
export const CREDIT_CARDS: CreditCard[] = [
  {
    id: "csp",
    slug: "chase-sapphire-preferred",
    name: "Chase Sapphire Preferred®",
    shortName: "Sapphire Preferred",
    issuer: "Chase",
    network: "Visa",
    category: "Travel",
    annualFee: { type: "unknown" },
    helperText: "Travel + flexible points",
    links: { website: "" },
    images: { cardImage: { webp: "", png: "", alt: "Chase Sapphire Preferred card" } },
    rewards: { rewardsCurrency: "points", tags: ["travel", "dining"] },
  },
  {
    id: "cfu",
    slug: "chase-freedom-unlimited",
    name: "Chase Freedom Unlimited®",
    shortName: "Freedom Unlimited",
    issuer: "Chase",
    network: "Visa",
    category: "Everyday",
    annualFee: { type: "unknown" },
    helperText: "Everyday cash back",
    links: { website: "" },
    images: { cardImage: { webp: "", png: "", alt: "Chase Freedom Unlimited card" } },
    rewards: { rewardsCurrency: "cashback", tags: ["everyday"] },
  },
  {
    id: "cap1-quicksilver",
    slug: "capital-one-quicksilver-cash-rewards",
    name: "Capital One Quicksilver Cash Rewards",
    shortName: "Quicksilver",
    issuer: "Capital One",
    network: "Mastercard",
    category: "Cashback",
    annualFee: { type: "unknown" },
    helperText: "Simple cash back",
    links: { website: "" },
    images: { cardImage: { webp: "", png: "", alt: "Capital One Quicksilver card" } },
    rewards: { rewardsCurrency: "cashback", tags: ["cashback", "everyday"] },
  },
  {
    id: "citi-double-cash",
    slug: "citi-double-cash",
    name: "Citi Double Cash® Card",
    shortName: "Double Cash",
    issuer: "Citi",
    network: "Mastercard",
    category: "Cashback",
    annualFee: { type: "unknown" },
    helperText: "Simple cash back",
    links: { website: "" },
    images: { cardImage: { webp: "", png: "", alt: "Citi Double Cash card" } },
    rewards: { rewardsCurrency: "cashback", tags: ["cashback"] },
  },
  {
    id: "discover-cashback",
    slug: "discover-it-cash-back",
    name: "Discover it® Cash Back",
    shortName: "Discover it",
    issuer: "Discover",
    network: "Discover",
    category: "Cashback",
    annualFee: { type: "unknown" },
    helperText: "Rotating categories",
    links: { website: "" },
    images: { cardImage: { webp: "", png: "", alt: "Discover it Cash Back card" } },
    rewards: { rewardsCurrency: "cashback", tags: ["cashback", "rotating-categories"] },
  },
  {
    id: "amex-gold",
    slug: "amex-gold",
    name: "American Express® Gold Card",
    shortName: "Amex Gold",
    issuer: "American Express",
    network: "Amex",
    category: "Travel",
    annualFee: { type: "unknown" },
    helperText: "Dining + grocery",
    links: { website: "" },
    images: { cardImage: { webp: "", png: "", alt: "American Express Gold Card" } },
    rewards: { rewardsCurrency: "points", tags: ["dining", "grocery", "travel"] },
  },
  {
    id: "amex-platinum",
    slug: "amex-platinum",
    name: "The Platinum Card® from American Express",
    shortName: "Amex Platinum",
    issuer: "American Express",
    network: "Amex",
    category: "Travel",
    annualFee: { type: "unknown" },
    helperText: "Premium travel",
    links: { website: "" },
    images: { cardImage: { webp: "", png: "", alt: "American Express Platinum Card" } },
    rewards: { rewardsCurrency: "points", tags: ["travel", "premium"] },
  },
  {
    id: "amex-delta-gold",
    slug: "amex-delta-gold",
    name: "Delta SkyMiles® Gold American Express Card",
    shortName: "Delta Gold",
    issuer: "American Express",
    network: "Amex",
    category: "Travel",
    annualFee: { type: "unknown" },
    helperText: "Delta miles",
    links: { website: "" },
    images: { cardImage: { webp: "", png: "", alt: "Amex Delta Gold card" } },
    rewards: { rewardsCurrency: "miles", tags: ["airline", "delta", "travel"] },
  },
  {
    id: "united-quest-explorer",
    slug: "united-quest-or-explorer",
    name: "United Quest℠ / Explorer",
    shortName: "United Quest/Explorer",
    issuer: "United",
    network: "Visa",
    category: "Travel",
    annualFee: { type: "unknown" },
    helperText: "United miles",
    links: { website: "" },
    images: { cardImage: { webp: "", png: "", alt: "United Quest or Explorer card" } },
    rewards: { rewardsCurrency: "miles", tags: ["airline", "united", "travel"] },
  },
  {
    id: "citi-aadvantage",
    slug: "citi-aadvantage",
    name: "Citi® / AAdvantage®",
    shortName: "Citi AAdvantage",
    issuer: "Citi",
    network: "Mastercard",
    category: "Travel",
    annualFee: { type: "unknown" },
    helperText: "American Airlines miles",
    links: { website: "" },
    images: { cardImage: { webp: "", png: "", alt: "Citi AAdvantage card" } },
    rewards: { rewardsCurrency: "miles", tags: ["airline", "american-airlines", "travel"] },
  },
  {
    id: "target-circle-card",
    slug: "target-circle-card",
    name: "Target Circle™ Card",
    shortName: "Target Circle Card",
    issuer: "Target",
    network: "Other",
    category: "Store",
    annualFee: { type: "unknown" },
    helperText: "Target rewards",
    links: { website: "" },
    images: { cardImage: { webp: "", png: "", alt: "Target Circle Card" } },
    rewards: { rewardsCurrency: "store-rewards", tags: ["store", "target"] },
  },
  {
    id: "costco-anywhere-citi",
    slug: "costco-anywhere-visa-citi",
    name: "Costco Anywhere Visa® Card by Citi",
    shortName: "Costco Anywhere",
    issuer: "Costco",
    network: "Visa",
    category: "Cashback",
    annualFee: { type: "unknown" },
    helperText: "Costco cash back",
    links: { website: "" },
    images: { cardImage: { webp: "", png: "", alt: "Costco Anywhere Visa by Citi" } },
    rewards: { rewardsCurrency: "cashback", tags: ["costco", "gas", "travel"] },
  },
  {
    id: "bilt",
    slug: "bilt-mastercard",
    name: "Bilt Mastercard®",
    shortName: "Bilt",
    issuer: "Bilt",
    network: "Mastercard",
    category: "Everyday",
    annualFee: { type: "unknown" },
    helperText: "Rent + points",
    links: { website: "" },
    images: { cardImage: { webp: "", png: "", alt: "Bilt Mastercard" } },
    rewards: { rewardsCurrency: "points", tags: ["rent", "travel", "dining"] },
  },
];
//JAMESERNET - NOTES
/* Quick note on image best-practice (mobile-first)
	•	WebP: best default (smaller files, great quality)
	•	PNG: keep as fallback if you need transparency or some cards look weird in WebP
	•	Store locally in /public/cards/... so you can use fast, cacheable relative paths like:
	•	"/cards/chase-sapphire-preferred.webp"

If you want “wow” while staying lightweight, aim for:
	•	~600–800px wide WebP per card (not huge),
	•	compress to ~20–60kb if possible.
*/