// lib/quiz/scoring.ts

import { CREDIT_CARDS, type CreditCard } from "@/lib/cards/creditCards";
import type { Answers, Tier } from "./types";

export type OpportunityBand = "low" | "moderate" | "high" | "very_high";

export type RemiScoreBreakdown = {
  tierRoutingScore: number;
  walletEfficiencyScore: number;
  opportunityScore: number;
  complexityScore: number;
  frictionScore: number;
  ecosystemAlignmentScore: number;
  annualFeeBurden: number;
  remiScore: number;
  estimatedValueNow: number;
  estimatedValueOptimized: number;
  estimatedValueFullyOptimized: number;
  estimatedGapOptimized: number;
  estimatedGapFullyOptimized: number;
};

export type ResultsProjection = {
  currentValue: number;
  optimizedValue: number;
  fullyOptimizedValue: number;
  gapLow: number;
  gapHigh: number;
  walletEfficiencyScore: number;
  annualFeeBurden: number;
  bars: Array<{
    label: string;
    value: number;
    emphasis?: boolean;
    amount: number;
  }>;
};

function asString(value: unknown): string {
  return String(value ?? "");
}

function asArray(value: unknown): string[] {
  return Array.isArray(value) ? value.map(String) : [];
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function round(value: number): number {
  return Math.round(value);
}

function annualFeeAmount(card: CreditCard): number {
  if (card.annualFee.type === "known") return card.annualFee.amount;
  if (card.annualFee.type === "none") return 0;
  return 0;
}

function effectiveAnnualFeeBurden(card: CreditCard): number {
  const fee = annualFeeAmount(card);
  if (!fee) return 0;

  // v1 assumption:
  // premium/flexible cards often have some perks/credits offsetting fee burden,
  // but store/cobrand users usually realize less offset.
  const isPremium = !!card.rewards?.isPremium;
  const isTransferable = !!card.rewards?.isTransferableCurrency;

  if (isPremium && isTransferable) return fee * 0.55;
  if (isPremium) return fee * 0.65;
  return fee * 0.8;
}

const CATEGORY_WEIGHTS: Record<string, number> = {
  dining: 0.23,
  groceries: 0.22,
  travel: 0.2,
  shopping: 0.14,
  transit: 0.13,
  other: 0.08,
};

const CATEGORY_ALIASES: Record<string, string[]> = {
  dining: ["dining", "restaurants"],
  groceries: ["groceries", "grocery", "supermarket", "supermarkets"],
  travel: ["travel", "airfare", "flights", "hotels"],
  shopping: ["shopping", "retail"],
  transit: ["gas", "transit", "gas / transit", "transportation"],
  other: ["other", "misc"],
};

function normalizeCategory(category: string): string {
  return category.trim().toLowerCase();
}

function cardHasExplicitCoverage(card: CreditCard, category: string): boolean {
  const normalized = normalizeCategory(category);
  const aliases = CATEGORY_ALIASES[normalized] ?? [normalized];

  const bonusMatches =
    card.rewards?.bonusCategories?.some((entry) =>
      aliases.includes(normalizeCategory(entry.category))
    ) ?? false;

  const tagMatches =
    card.rewards?.tags?.some((tag) => aliases.includes(normalizeCategory(tag))) ?? false;

  return bonusMatches || tagMatches;
}

function cardCoverageStrength(card: CreditCard, category: string): number {
  const normalized = normalizeCategory(category);

  if (cardHasExplicitCoverage(card, normalized)) return 1;

  const role = card.rewards?.optimizationRole;
  const cardCategory = card.category;

  if (role === "catch_all") return 0.72;
  if (role === "category") return 0.7;
  if (role === "travel" && normalized === "travel") return 0.85;
  if (role === "specialty" && ["dining", "travel"].includes(normalized)) return 0.68;
  if (role === "store" && normalized === "shopping") return 0.45;

  if (cardCategory === "Everyday") return 0.55;
  if (cardCategory === "Cashback") return 0.5;
  if (cardCategory === "Travel" && normalized === "travel") return 0.68;

  return 0.28;
}

function bestCoverageForCategory(cards: CreditCard[], category: string): number {
  if (!cards.length) return 0;
  return cards.reduce((best, card) => {
    return Math.max(best, cardCoverageStrength(card, category));
  }, 0);
}

function getSelectedCards(answers: Answers): CreditCard[] {
  const selectedIds = new Set([
    ...asArray(answers.q_travel_cards),
    ...asArray(answers.q_everyday_cards),
  ]);

  return CREDIT_CARDS.filter((card) => selectedIds.has(card.id));
}

function getWeightedCategoryCoverage(
  selectedCards: CreditCard[],
  spendCategories: string[]
): { efficiency: number; mismatch: number } {
  const categories = spendCategories.length ? spendCategories : ["other"];

  const totalWeight = categories.reduce(
    (sum, category) => sum + (CATEGORY_WEIGHTS[normalizeCategory(category)] ?? 0.1),
    0
  );

  if (totalWeight <= 0) {
    return { efficiency: 0.35, mismatch: 0.65 };
  }

  const weightedCoverage = categories.reduce((sum, category) => {
    const weight = CATEGORY_WEIGHTS[normalizeCategory(category)] ?? 0.1;
    const best = bestCoverageForCategory(selectedCards, category);
    return sum + weight * best;
  }, 0);

  const efficiency = clamp(weightedCoverage / totalWeight, 0, 1);
  return {
    efficiency,
    mismatch: clamp(1 - efficiency, 0, 1),
  };
}

function getTransferableCards(cards: CreditCard[]): CreditCard[] {
  return cards.filter((card) => !!card.rewards?.isTransferableCurrency);
}

function getEcosystemAlignment(cards: CreditCard[]): number {
  const transferable = getTransferableCards(cards);
  if (!transferable.length) return 0.15;

  const counts = transferable.reduce<Record<string, number>>((acc, card) => {
    const key = card.rewards?.ecosystem ?? "unknown";
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  const maxCluster = Math.max(...Object.values(counts));
  return clamp(maxCluster / transferable.length, 0, 1);
}

/**
 * Lightweight routing score used after the first 3 quiz questions.
 * Keep this stable so routing behavior does not change unexpectedly.
 */
export function computeTierScore(answers: Answers): number {
  const cards = asString(answers.q_cards);
  const spend = asString(answers.q_spend);
  const feel = asString(answers.q_feel);

  const cardPoints: Record<string, number> = {
    "1": 0,
    "2-3": 2,
    "4-6": 4,
    "7+": 5,
  };

  const spendPoints: Record<string, number> = {
    under_1k: 0,
    "1_3k": 2,
    "3_7k": 4,
    "7k_plus": 5,
  };

  const feelPoints: Record<string, number> = {
    handled: 3,
    try_best: 2,
    confusing: 1,
    leaving_value: 2,
    dont_think: 0,
  };

  return (
    (cardPoints[cards] ?? 0) +
    (spendPoints[spend] ?? 0) +
    (feelPoints[feel] ?? 0)
  );
}

export function computeTierFromAnswers(answers: Answers): Tier {
  const score = computeTierScore(answers);
  if (score >= 9) return "A";
  if (score >= 6) return "B";
  return "C";
}

export function estimateMonthlySpend(answers: Answers): number {
  const spend = asString(answers.q_spend);

  const spendMidpoints: Record<string, number> = {
    under_1k: 750,
    "1_3k": 2000,
    "3_7k": 5000,
    "7k_plus": 9000,
  };

  return spendMidpoints[spend] ?? 2000;
}

function getPotentialAnnualValueRate(
  spendCategories: string[],
  selectedCards: CreditCard[]
): number {
  let base = 0.012; // baseline annualized rewards/benefits capture potential

  for (const raw of spendCategories) {
    const category = normalizeCategory(raw);
    if (category === "travel") base += 0.011;
    else if (category === "dining") base += 0.006;
    else if (category === "groceries") base += 0.006;
    else if (category === "shopping") base += 0.004;
    else if (category === "transit") base += 0.003;
    else base += 0.002;
  }

  const transferableCount = getTransferableCards(selectedCards).length;
  const premiumCount = selectedCards.filter((card) => card.rewards?.isPremium).length;

  base += Math.min(transferableCount * 0.002, 0.006);
  base += Math.min(premiumCount * 0.0015, 0.004);

  return clamp(base, 0.012, 0.045);
}

export function calculateRemiScore(answers: Answers): RemiScoreBreakdown {
  const cards = asString(answers.q_cards);
  const feel = asString(answers.q_feel);

  const spendCategories = asArray(answers.q_spend_categories);
  const selectedCards = getSelectedCards(answers);
  const monthlySpend = estimateMonthlySpend(answers);
  const annualSpend = monthlySpend * 12;
  const tierRoutingScore = computeTierScore(answers);

  const { efficiency, mismatch } = getWeightedCategoryCoverage(
    selectedCards,
    spendCategories
  );

  const walletEfficiencyScore = round(efficiency * 100);

  const transferableCards = getTransferableCards(selectedCards);
  const transferableCount = transferableCards.length;
  const premiumCount = selectedCards.filter((card) => card.rewards?.isPremium).length;
  const cobrandCount = selectedCards.filter((card) => card.rewards?.isCobrand).length;
  const ecosystemAlignment = getEcosystemAlignment(selectedCards);
  const ecosystemAlignmentScore = round(ecosystemAlignment * 100);

  const catchAllCount = selectedCards.filter(
    (card) => card.rewards?.optimizationRole === "catch_all"
  ).length;

  const cardsComplexityPoints: Record<string, number> = {
    "1": 4,
    "2-3": 10,
    "4-6": 18,
    "7+": 24,
  };

  const opportunityScore = clamp(
    round(
      mismatch * 24 +
        Math.min(spendCategories.length * 2, 8) +
        Math.min(transferableCount * 2, 4) +
        Math.min(premiumCount * 2, 4)
    ),
    0,
    40
  );

  const complexityScore = clamp(
    round(
      (cardsComplexityPoints[cards] ?? 8) +
        Math.min(transferableCount * 2, 4) +
        Math.min(premiumCount * 1.5, 3) +
        Math.min(cobrandCount, 3) +
        ecosystemAlignment * 4
    ),
    0,
    30
  );

  const feelFriction: Record<string, number> = {
    handled: 5,
    try_best: 13,
    confusing: 24,
    leaving_value: 21,
    dont_think: 18,
  };

  const frictionScore = clamp(
    round(
      (feelFriction[feel] ?? 12) +
        ((cards === "4-6" || cards === "7+") &&
        (feel === "confusing" || feel === "leaving_value")
          ? 4
          : 0) +
        (cobrandCount >= 2 && transferableCount === 0 ? 3 : 0)
    ),
    0,
    30
  );

  const remiScore = clamp(
    round(opportunityScore + complexityScore + frictionScore),
    0,
    100
  );

  const annualFeeBurden = round(
    selectedCards.reduce((sum, card) => sum + effectiveAnnualFeeBurden(card), 0)
  );

  const potentialAnnualValueRate = getPotentialAnnualValueRate(
    spendCategories,
    selectedCards
  );

  const confidenceAdjustment: Record<string, number> = {
    handled: 0.92,
    try_best: 0.82,
    confusing: 0.66,
    leaving_value: 0.72,
    dont_think: 0.6,
  };

  const currentEfficiency = clamp(
    efficiency * (confidenceAdjustment[feel] ?? 0.75) +
      Math.min(catchAllCount * 0.03, 0.08),
    0.18,
    0.78
  );

  const optimizedEfficiency = clamp(
    efficiency +
      mismatch * 0.48 +
      0.08 +
      Math.min(catchAllCount * 0.03, 0.06),
    0.45,
    0.88
  );

  const fullyOptimizedEfficiency = clamp(
    optimizedEfficiency +
      Math.min(transferableCount * 0.05, 0.15) +
      ecosystemAlignment * 0.08 +
      Math.min(premiumCount * 0.03, 0.06),
    0.6,
    0.95
  );

  const grossCurrent = annualSpend * potentialAnnualValueRate * currentEfficiency;
  const grossOptimized =
    annualSpend * potentialAnnualValueRate * optimizedEfficiency;
  const grossFullyOptimized =
    annualSpend * potentialAnnualValueRate * fullyOptimizedEfficiency;

  const estimatedValueNow = round(Math.max(0, grossCurrent - annualFeeBurden));
  const estimatedValueOptimized = round(
    Math.max(0, grossOptimized - annualFeeBurden)
  );
  const estimatedValueFullyOptimized = round(
    Math.max(0, grossFullyOptimized - annualFeeBurden)
  );

  const estimatedGapOptimized = Math.max(
    0,
    estimatedValueOptimized - estimatedValueNow
  );
  const estimatedGapFullyOptimized = Math.max(
    0,
    estimatedValueFullyOptimized - estimatedValueNow
  );

  return {
    tierRoutingScore,
    walletEfficiencyScore,
    opportunityScore,
    complexityScore,
    frictionScore,
    ecosystemAlignmentScore,
    annualFeeBurden,
    remiScore,
    estimatedValueNow,
    estimatedValueOptimized,
    estimatedValueFullyOptimized,
    estimatedGapOptimized,
    estimatedGapFullyOptimized,
  };
}

export function getOpportunityBand(remiScore: number): OpportunityBand {
  if (remiScore >= 75) return "very_high";
  if (remiScore >= 55) return "high";
  if (remiScore >= 35) return "moderate";
  return "low";
}

export function formatDollar(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getProjectionRangeLabel(gapLow: number, gapHigh: number): string {
  const low = Math.min(gapLow, gapHigh);
  const high = Math.max(gapLow, gapHigh);
  return `${formatDollar(low)}–${formatDollar(high)}`;
}

export function getRemiScoreSummary(answers: Answers) {
  const breakdown = calculateRemiScore(answers);

  return {
    ...breakdown,
    opportunityBand: getOpportunityBand(breakdown.remiScore),
    estimatedRangeLabel: getProjectionRangeLabel(
      breakdown.estimatedGapOptimized,
      breakdown.estimatedGapFullyOptimized
    ),
  };
}

export function getResultsProjection(answers: Answers): ResultsProjection {
  const breakdown = calculateRemiScore(answers);

  const currentValue = breakdown.estimatedValueNow;
  const optimizedValue = breakdown.estimatedValueOptimized;
  const fullyOptimizedValue = breakdown.estimatedValueFullyOptimized;

  const maxValue = Math.max(fullyOptimizedValue, 1);

  return {
    currentValue,
    optimizedValue,
    fullyOptimizedValue,
    gapLow: breakdown.estimatedGapOptimized,
    gapHigh: breakdown.estimatedGapFullyOptimized,
    walletEfficiencyScore: breakdown.walletEfficiencyScore,
    annualFeeBurden: breakdown.annualFeeBurden,
    bars: [
      {
        label: "Current",
        value: currentValue / maxValue,
        amount: currentValue,
      },
      {
        label: "Optimized",
        value: optimizedValue / maxValue,
        amount: optimizedValue,
        emphasis: true,
      },
      {
        label: "Fully optimized",
        value: fullyOptimizedValue / maxValue,
        amount: fullyOptimizedValue,
      },
    ],
  };
}