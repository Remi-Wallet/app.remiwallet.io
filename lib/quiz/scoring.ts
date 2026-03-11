// lib/quiz/scoring.ts

import { CREDIT_CARDS } from "@/lib/cards/creditCards";
import type { Answers, Tier } from "./types";

export type RemiScoreBreakdown = {
  tierRoutingScore: number;
  opportunityScore: number;
  complexityScore: number;
  frictionScore: number;
  remiScore: number;
  estimatedValueNow: number;
  estimatedValueOptimized: number;
  estimatedValueFullyOptimized: number;
  estimatedGapOptimized: number;
  estimatedGapFullyOptimized: number;
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

/**
 * Rough monthly spend midpoint for value estimation.
 */
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

export function calculateRemiScore(answers: Answers): RemiScoreBreakdown {
  const cards = asString(answers.q_cards);
  const feel = asString(answers.q_feel);
  const spend = asString(answers.q_spend);

  const spendCategories = asArray(answers.q_spend_categories);
  const travelCardIds = asArray(answers.q_travel_cards);
  const everydayCardIds = asArray(answers.q_everyday_cards);

  const selectedTravelCards = CREDIT_CARDS.filter((card) => travelCardIds.includes(card.id));
  const selectedEverydayCards = CREDIT_CARDS.filter((card) => everydayCardIds.includes(card.id));
  const selectedCards = [...selectedTravelCards, ...selectedEverydayCards];

  const monthlySpend = estimateMonthlySpend(answers);
  const tierRoutingScore = computeTierScore(answers);

  const transferableCount = selectedCards.filter(
    (card) => card.rewards?.isTransferableCurrency
  ).length;

  const premiumCount = selectedCards.filter(
    (card) => card.rewards?.isPremium
  ).length;

  const cobrandCount = selectedCards.filter(
    (card) => card.rewards?.isCobrand
  ).length;

  const catchAllCount = selectedCards.filter(
    (card) => card.rewards?.optimizationRole === "catch_all"
  ).length;

  const categoryRoleCount = selectedCards.filter(
    (card) => card.rewards?.optimizationRole === "category"
  ).length;

  const travelRoleCount = selectedCards.filter(
    (card) => card.rewards?.optimizationRole === "travel"
  ).length;

  const specialtyRoleCount = selectedCards.filter(
    (card) => card.rewards?.optimizationRole === "specialty"
  ).length;

  const hasTravelCategory = spendCategories.includes("travel");
  const hasDiningCategory = spendCategories.includes("dining");
  const hasGroceriesCategory = spendCategories.includes("groceries");
  const hasTransitCategory = spendCategories.includes("transit");
  const hasShoppingCategory = spendCategories.includes("shopping");

  // ---- Opportunity score (0–40) ----
  const spendOpportunity: Record<string, number> = {
    under_1k: 8,
    "1_3k": 16,
    "3_7k": 28,
    "7k_plus": 36,
  };

  let categoryOpportunity = 0;
  categoryOpportunity += Math.min(spendCategories.length * 2.5, 9);

  if (hasTravelCategory) categoryOpportunity += 3;
  if (hasDiningCategory) categoryOpportunity += 1.5;
  if (hasGroceriesCategory) categoryOpportunity += 1.5;
  if (hasTransitCategory) categoryOpportunity += 1;
  if (hasShoppingCategory) categoryOpportunity += 1;

  const cardCountOpportunity: Record<string, number> = {
    "1": 4,
    "2-3": 7,
    "4-6": 10,
    "7+": 12,
  };

  // More travel cards / transferable currencies imply more upside
  const travelOpportunity =
    Math.min(travelRoleCount * 2, 6) +
    Math.min(transferableCount * 2.5, 6);

  const opportunityScore = clamp(
    (spendOpportunity[spend] ?? 16) +
    categoryOpportunity +
    (cardCountOpportunity[cards] ?? 6) +
    travelOpportunity,
    0,
    40
  );

  // ---- Complexity score (0–30) ----
  const cardComplexity: Record<string, number> = {
    "1": 4,
    "2-3": 10,
    "4-6": 18,
    "7+": 24,
  };

  const roleComplexity =
    Math.min(catchAllCount * 2, 4) +
    Math.min(categoryRoleCount * 2, 6) +
    Math.min(travelRoleCount * 2, 6) +
    Math.min(specialtyRoleCount * 1.5, 3);

  const ecosystemComplexity = Math.min(transferableCount * 2.5, 6);
  const premiumComplexity = Math.min(premiumCount * 2, 4);

  const complexityScore = clamp(
    (cardComplexity[cards] ?? 8) +
    roleComplexity +
    ecosystemComplexity +
    premiumComplexity,
    0,
    30
  );

  // ---- Friction score (0–30) ----
  const feelFriction: Record<string, number> = {
    handled: 6,
    try_best: 14,
    confusing: 24,
    leaving_value: 20,
    dont_think: 18,
  };

  const walletConfusionBonus =
    (cards === "4-6" || cards === "7+") &&
      (feel === "confusing" || feel === "leaving_value")
      ? 4
      : 0;

  // A fragmented cobrand-heavy wallet can still indicate friction/opportunity
  const cobrandFrictionBonus =
    cobrandCount >= 2 && transferableCount === 0 ? 3 : 0;

  const frictionScore = clamp(
    (feelFriction[feel] ?? 12) +
    walletConfusionBonus +
    cobrandFrictionBonus,
    0,
    30
  );

  // ---- Final score (0–100) ----
  const remiScore = clamp(
    Math.round(opportunityScore + complexityScore + frictionScore),
    0,
    100
  );

  // ---- Value estimation ----
  // Current value = what they may already be capturing.
  const currentCaptureRate: Record<string, number> = {
    handled: 0.012,
    try_best: 0.01,
    confusing: 0.007,
    leaving_value: 0.008,
    dont_think: 0.006,
  };

  // Optimized = better card/category usage.
  let optimizedBonusRate =
    remiScore >= 75
      ? 0.018
      : remiScore >= 55
        ? 0.014
        : remiScore >= 35
          ? 0.01
          : 0.007;

  // Transferable + premium + travel setups tend to have more upside.
  optimizedBonusRate += Math.min(transferableCount * 0.002, 0.006);
  optimizedBonusRate += Math.min(premiumCount * 0.0015, 0.003);

  // Fully optimized = better redemptions / ecosystem strategy too.
  let fullyOptimizedBonusRate =
    remiScore >= 75
      ? 0.028
      : remiScore >= 55
        ? 0.022
        : remiScore >= 35
          ? 0.016
          : 0.011;

  fullyOptimizedBonusRate += Math.min(transferableCount * 0.003, 0.009);
  fullyOptimizedBonusRate += hasTravelCategory ? 0.003 : 0;
  fullyOptimizedBonusRate += travelRoleCount > 0 ? 0.002 : 0;

  const currentRate = currentCaptureRate[feel] ?? 0.008;

  const estimatedValueNow = Math.round(monthlySpend * 12 * currentRate);
  const estimatedValueOptimized = Math.round(
    monthlySpend * 12 * (currentRate + optimizedBonusRate)
  );
  const estimatedValueFullyOptimized = Math.round(
    monthlySpend * 12 * (currentRate + fullyOptimizedBonusRate)
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
    opportunityScore,
    complexityScore,
    frictionScore,
    remiScore,
    estimatedValueNow,
    estimatedValueOptimized,
    estimatedValueFullyOptimized,
    estimatedGapOptimized,
    estimatedGapFullyOptimized,
  };
}

export type OpportunityBand = "low" | "moderate" | "high" | "very_high";

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

export function getEstimatedRangeLabel(
  estimatedGapOptimized: number,
  estimatedGapFullyOptimized: number
): string {
  const low = Math.min(estimatedGapOptimized, estimatedGapFullyOptimized);
  const high = Math.max(estimatedGapOptimized, estimatedGapFullyOptimized);

  return `${formatDollar(low)}–${formatDollar(high)}/yr`;
}

export type ResultsProjection = {
  currentValue: number;
  optimizedValue: number;
  fullyOptimizedValue: number;
  gapLow: number;
  gapHigh: number;
  bars: Array<{
    label: string;
    value: number;
    emphasis?: boolean;
    amount: number;
  }>;
};

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
    estimatedRangeLabel: getEstimatedRangeLabel(
      breakdown.estimatedGapOptimized,
      breakdown.estimatedGapFullyOptimized
    ),
  };
}