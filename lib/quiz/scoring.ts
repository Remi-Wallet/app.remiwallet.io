// lib/quiz/scoring.ts
import type { Answers, Tier } from "./types";

export function computeTierScore(answers: Answers): number {
  const cards = String(answers.q_cards ?? "");
  const spend = String(answers.q_spend ?? "");
  const feel = String(answers.q_feel ?? "");

  const cardPoints: Record<string, number> = { "1": 0, "2-3": 2, "4-6": 4, "7+": 5 };
  const spendPoints: Record<string, number> = { under_1k: 0, "1_3k": 2, "3_7k": 4, "7k_plus": 5 };
  const feelPoints: Record<string, number> = { handled: 3, try_best: 2, confusing: 1, leaving_value: 2, dont_think: 0 };

  return (cardPoints[cards] ?? 0) + (spendPoints[spend] ?? 0) + (feelPoints[feel] ?? 0);
}

export function computeTierFromAnswers(answers: Answers): Tier {
  const score = computeTierScore(answers);
  if (score >= 9) return "A";
  if (score >= 6) return "B";
  return "C";
}