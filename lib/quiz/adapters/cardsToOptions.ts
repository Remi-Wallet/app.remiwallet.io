// lib/quiz/adapters/cardsToOptions.ts

import { CREDIT_CARDS } from "@/lib/cards/creditCards";
import type { CardCategory, CreditCard } from "@/lib/cards/creditCards";
import type { QuizOption } from "@/lib/quiz/types";

export type CardsToOptionsParams = {
  categories: CardCategory[];
  limit?: number;

  /**
   * If false (default), cards with no helperText will be filtered out.
   * If true, we include them anyway.
   */
  includeWithoutHelper?: boolean;
};

/**
 * Build QuizOption[] from the global CREDIT_CARDS catalog.
 * - Preserves catalog order (no sorting).
 * - Filters by category.
 * - Optionally limits the number returned.
 */
export function cardsToOptions(params: CardsToOptionsParams): QuizOption[] {
  const { categories, limit, includeWithoutHelper = false } = params;

  const categorySet = new Set<CardCategory>(categories);

  let cards: CreditCard[] = CREDIT_CARDS.filter((c) => categorySet.has(c.category));

  if (!includeWithoutHelper) {
    cards = cards.filter((c) => Boolean(c.helperText));
  }

  if (typeof limit === "number") {
    cards = cards.slice(0, limit);
  }

  return cards.map((c) => ({
    label: c.shortName ?? c.name,
    value: c.id,
    helperText: c.helperText,
    meta: {
      issuer: c.issuer,
      category: c.category,
      annualFee: c.annualFee,
      links: c.links,
      images: c.images,
      rewards: c.rewards,
      internal: c.internal,
      slug: c.slug,
      name: c.name,
      shortName: c.shortName,
    },
  }));
}