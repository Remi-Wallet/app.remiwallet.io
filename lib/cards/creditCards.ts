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

  /**
   * Whether this card earns a transferable / flexible currency.
   * Useful for scoring "advanced optimization potential."
   */
  isTransferableCurrency?: boolean;

  /**
   * Broad ecosystem family for transferable points / major programs.
   * Examples: "Chase UR", "Amex MR", "Capital One Miles", "Bilt", "Citi ThankYou"
   */
  ecosystem?: string;

  /**
   * Whether this card is premium / benefit-heavy / fee-heavy.
   */
  isPremium?: boolean;

  /**
   * Whether this is a co-branded airline / hotel / store card.
   */
  isCobrand?: boolean;

  /**
   * Internal v1 role for scoring / recommendation logic.
   */
  optimizationRole?: "core" | "category" | "travel" | "catch_all" | "store" | "specialty";

  /**
   * Rough general-use earn estimate for lightweight v1 scoring.
   * This is intentionally approximate, not card-marketing-accurate.
   */
  baselineEarnRateEstimate?: number;
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
 * Alias
 * Use CreditCard as the exported “public” type for the rest of the app.
 */
export type CreditCard = CardMeta;

/**
 * Official Remi Credit Card "DB" for v1 
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
    rewards: {
      rewardsCurrency: "points",
      positioning: "Flexible travel rewards",
      tags: ["travel", "dining", "transferable-points"],
      bonusCategories: [
        { category: "Travel" },
        { category: "Dining" },
      ],
      isTransferableCurrency: true,
      ecosystem: "Chase UR",
      isPremium: false,
      isCobrand: false,
      optimizationRole: "travel",
      baselineEarnRateEstimate: 1.25,
    },
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
    rewards: {
      rewardsCurrency: "cashback",
      positioning: "Strong everyday catch-all",
      tags: ["everyday", "cashback", "catch-all"],
      isTransferableCurrency: false,
      ecosystem: "Chase Cashback",
      isPremium: false,
      isCobrand: false,
      optimizationRole: "catch_all",
      baselineEarnRateEstimate: 1.5,
    },
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
    rewards: {
      rewardsCurrency: "cashback",
      positioning: "Simple flat-rate cashback",
      tags: ["cashback", "everyday", "catch-all"],
      isTransferableCurrency: false,
      ecosystem: "Capital One Cashback",
      isPremium: false,
      isCobrand: false,
      optimizationRole: "catch_all",
      baselineEarnRateEstimate: 1.5,
    },
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
    rewards: {
      rewardsCurrency: "cashback",
      positioning: "Simple flat-rate cashback",
      tags: ["cashback", "catch-all"],
      isTransferableCurrency: false,
      ecosystem: "Citi Cashback",
      isPremium: false,
      isCobrand: false,
      optimizationRole: "catch_all",
      baselineEarnRateEstimate: 2,
    },
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
    rewards: {
      rewardsCurrency: "cashback",
      positioning: "Rotating category cashback",
      tags: ["cashback", "rotating-categories", "category"],
      isTransferableCurrency: false,
      ecosystem: "Discover Cashback",
      isPremium: false,
      isCobrand: false,
      optimizationRole: "category",
      baselineEarnRateEstimate: 1,
    },
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
    rewards: {
      rewardsCurrency: "points",
      positioning: "Dining and grocery points",
      tags: ["dining", "grocery", "travel", "transferable-points"],
      bonusCategories: [
        { category: "Dining" },
        { category: "Groceries" },
      ],
      isTransferableCurrency: true,
      ecosystem: "Amex MR",
      isPremium: true,
      isCobrand: false,
      optimizationRole: "category",
      baselineEarnRateEstimate: 1,
    },
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
    rewards: {
      rewardsCurrency: "points",
      positioning: "Premium travel benefits + points",
      tags: ["travel", "premium", "transferable-points"],
      bonusCategories: [{ category: "Travel" }],
      isTransferableCurrency: true,
      ecosystem: "Amex MR",
      isPremium: true,
      isCobrand: false,
      optimizationRole: "travel",
      baselineEarnRateEstimate: 1,
    },
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
    rewards: {
      rewardsCurrency: "miles",
      positioning: "Co-branded airline miles",
      tags: ["airline", "delta", "travel", "cobrand"],
      isTransferableCurrency: false,
      ecosystem: "Delta SkyMiles",
      isPremium: false,
      isCobrand: true,
      optimizationRole: "travel",
      baselineEarnRateEstimate: 1,
    },
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
    rewards: {
      rewardsCurrency: "miles",
      positioning: "Co-branded airline miles",
      tags: ["airline", "united", "travel", "cobrand"],
      isTransferableCurrency: false,
      ecosystem: "United MileagePlus",
      isPremium: false,
      isCobrand: true,
      optimizationRole: "travel",
      baselineEarnRateEstimate: 1,
    },
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
    rewards: {
      rewardsCurrency: "miles",
      positioning: "Co-branded airline miles",
      tags: ["airline", "american-airlines", "travel", "cobrand"],
      isTransferableCurrency: false,
      ecosystem: "AAdvantage",
      isPremium: false,
      isCobrand: true,
      optimizationRole: "travel",
      baselineEarnRateEstimate: 1,
    },
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
    rewards: {
      rewardsCurrency: "store-rewards",
      positioning: "Store-specific savings",
      tags: ["store", "target", "cobrand"],
      isTransferableCurrency: false,
      ecosystem: "Target",
      isPremium: false,
      isCobrand: true,
      optimizationRole: "store",
      baselineEarnRateEstimate: 1,
    },
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
    rewards: {
      rewardsCurrency: "cashback",
      positioning: "Gas + Costco-oriented cashback",
      tags: ["costco", "gas", "travel", "category"],
      bonusCategories: [
        { category: "Gas / Transit" },
        { category: "Travel" },
      ],
      isTransferableCurrency: false,
      ecosystem: "Costco Cashback",
      isPremium: false,
      isCobrand: true,
      optimizationRole: "category",
      baselineEarnRateEstimate: 1,
    },
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
    rewards: {
      rewardsCurrency: "points",
      positioning: "Rent + transferable points",
      tags: ["rent", "travel", "dining", "transferable-points"],
      bonusCategories: [
        { category: "Dining" },
        { category: "Travel" },
      ],
      isTransferableCurrency: true,
      ecosystem: "Bilt",
      isPremium: false,
      isCobrand: false,
      optimizationRole: "specialty",
      baselineEarnRateEstimate: 1,
    },
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