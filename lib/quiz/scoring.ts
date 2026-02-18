// lib/quiz/scoring.ts

export type Tier = "A" | "B" | "C";
export type Answers = Record<string, any>;

/**
 * Expected answer values (recommended):
 * q_cards: "1" | "2-3" | "4-6" | "7+"
 * q_spend: "under_1k" | "1_3k" | "3_7k" | "7k_plus"
 * q_feel: "handled" | "try_best" | "confusing" | "leaving_value" | "dont_think"
 */
export function computeTierScore(answers: Answers): number {
  const cards = String(answers.q_cards ?? "");
  const spend = String(answers.q_spend ?? "");
  const feel = String(answers.q_feel ?? "");

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
    handled: 3,        // 😎 I’ve got it handled
    try_best: 2,       // 🤓 I try my best
    confusing: 1,      // 😕 It’s a bit confusing
    leaving_value: 2,  // 😩 I know I’m leaving value (high motivation)
    dont_think: 0,     // 🤷 I don’t really think about it
  };

  const score =
    (cardPoints[cards] ?? 0) +
    (spendPoints[spend] ?? 0) +
    (feelPoints[feel] ?? 0);

  return score; // 0–13
}

export function computeTierFromAnswers(answers: Answers): Tier {
  const score = computeTierScore(answers);

  if (score >= 9) return "A";
  if (score >= 6) return "B";
  return "C";
}