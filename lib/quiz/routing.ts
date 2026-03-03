// lib/quiz/routing.ts
import type { Tier } from "./types";

export function nextAfterSummary(tier: Tier) {
  return tier === "C" ? "/early-access" : "/quiz/6";
}