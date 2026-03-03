import type { Tier } from "./types";
import { getOrCreateSessionId, getStoredQuiz, setStoredQuiz } from "./storage";

import type { QuizState } from "./types";

export function loadQuizState(): QuizState {
  const stored = getStoredQuiz();
  const sessionId = stored?.sessionId ?? getOrCreateSessionId();
  const answers = stored?.answers ?? {};
  const tier = stored?.tier;
  return { sessionId, answers, tier };
}

export function saveAnswer(questionKey: string, value: any) {
  const stored = getStoredQuiz();
  const sessionId = stored?.sessionId ?? getOrCreateSessionId();
  const next = {
    sessionId,
    startedAt: stored?.startedAt ?? Date.now(),
    answers: { ...(stored?.answers ?? {}), [questionKey]: value },
    tier: stored?.tier,
  };
  setStoredQuiz(next);
}

export function computeTierFromAnswers(answers: Record<string, any>): Tier {
  // v1 scoring: simple/transparent and easy to tune
  // Score buckets: more cards + higher spend + more "confident" => higher tier
  let score = 0;

  const card = answers.cardCountBand as string | undefined;
  if (card === "7_plus") score += 3;
  else if (card === "4_6") score += 2;
  else if (card === "2_3") score += 1;

  const spend = answers.monthlySpendBand as string | undefined;
  if (spend === "7k_plus") score += 3;
  else if (spend === "3k_7k") score += 2;
  else if (spend === "1k_3k") score += 1;

  const conf = answers.rewardsConfidence as string | undefined;
  if (conf === "handled") score += 2;
  else if (conf === "try_best") score += 1;
  else if (conf === "leaving_value") score += 1; // motivated

  // thresholds (tune later)
  if (score >= 6) return "A";
  if (score >= 3) return "B";
  return "C";
}

export function persistTier(tier: Tier) {
  const stored = getStoredQuiz();
  const sessionId = stored?.sessionId ?? getOrCreateSessionId();
  const next = {
    sessionId,
    startedAt: stored?.startedAt ?? Date.now(),
    answers: stored?.answers ?? {},
    tier,
  };
  setStoredQuiz(next);
}

// lib/quiz/machine.ts
export function getNextRouteAfterSummary(tier: "A" | "B" | "C") {
  if (tier === "C") return "/early-access";
  return "/quiz/6"; // Tier A/B continue into deeper questions
}