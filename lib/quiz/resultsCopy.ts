// lib/quiz/resultsCopy.ts

import type { Tier } from "./types";

export type ResultsCopy = {
  title: string;
  subtitle: string;
  body: string;
  calloutTitle: string;
  calloutBody: string;
  cta: string;
};

export function getSummaryCopy(tier: Tier): ResultsCopy {
  if (tier === "A") {
    return {
      title: "You may qualify for early beta access.",
      subtitle:
        "Remi could help someone like you capture significantly more value from the cards you already have.",
      body:
        "Request early access and we’ll follow up as onboarding expands and beta spots open.",
      calloutTitle: "Strong candidate for early beta",
      calloutBody:
        "Users with more complex card setups often unlock more value through better category coverage, timing, and redemption strategy.",
      cta: "Request Early Access",
    };
  }

  if (tier === "B") {
    return {
      title: "You’re close — a few changes could improve your rewards quickly.",
      subtitle:
        "Remi could help you capture more value without needing to overhaul your entire setup.",
      body:
        "Join early access and we’ll keep you updated as onboarding expands.",
      calloutTitle: "You likely have some easy wins",
      calloutBody:
        "Small shifts in which card you use for everyday spending categories can add up surprisingly fast.",
      cta: "Check Early Access",
    };
  }

  return {
    title: "You can still earn more — without changing how you spend.",
    subtitle:
      "Remi could help you build a simple system so you capture more rewards with less effort.",
    body:
      "Join early access and we’ll share tips, updates, and future invitations as the product evolves.",
    calloutTitle: "Good news: most people start here",
    calloutBody:
      "You don’t need to be a points expert to improve. A few smarter habits can make a meaningful difference over time.",
    cta: "Join Early Access",
  };
}