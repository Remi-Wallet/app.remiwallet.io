// lib/quiz/screens.ts

import type { QuizOption } from "./types";
import { CREDIT_CARDS } from "@/lib/cards/creditCards";
import { cardsToOptions } from "@/lib/quiz/adapters/cardsToOptions";

// Travel Card List (For Step 7)
const travelOptions = cardsToOptions({
  categories: ["Travel"],
  limit: 6,
  includeWithoutHelper: true,
});

const everydayOptions = cardsToOptions({
  categories: ["Everyday", "Cashback"],
  limit: 8,
  includeWithoutHelper: true,
});
function takeByCategory(cards: readonly any[], category: string, limit: number) {
  return cards.filter((c) => c.category === category).slice(0, limit);
}

function takeByCategories(cards: readonly any[], categories: string[], limit: number) {
  const set = new Set(categories);
  return cards.filter((c) => set.has(c.category)).slice(0, limit);
}

export type QuizScreen =
  | {
    step: number;
    type: "single";
    title: string;
    subtitle?: string;
    questionKey: string;
    options: QuizOption[];
    autoAdvance?: boolean;
    progress?: { current: number; total: number };
  }
  | {
    step: number;
    type: "multi";
    title: string;
    subtitle?: string;
    questionKey: string;
    options: QuizOption[];
    maxSelect?: number;
    progress?: { current: number; total: number };
  }
  | {
    step: number;
    type: "summary";
    title: string;
    subtitle?: string;
  };

/**
 * IMPORTANT:
 * These questionKey + option.value values are aligned to your scoring rubric:
 *  - q_cards: "1" | "2-3" | "4-6" | "7+"
 *  - q_spend: "under_1k" | "1_3k" | "3_7k" | "7k_plus"
 *  - q_feel:  "handled" | "try_best" | "confusing" | "leaving_value" | "dont_think"
 */
const SCREENS: Record<number, QuizScreen> = {
  // ---- Segment 1 (scored) ----
  2: {
    step: 2,
    type: "single",
    title: "How many credit cards do you have?",
    subtitle: "Include cards you keep open, even if you don’t use them often.",
    questionKey: "q_cards",
    autoAdvance: true,
    progress: { current: 1, total: 3 },
    options: [
      { label: "1", value: "1" },
      { label: "2–3", value: "2-3" },
      { label: "4–6", value: "4-6" },
      { label: "7+", value: "7+" },
    ],
  },

  3: {
    step: 3,
    type: "single",
    title: "Roughly how much do you put on credit cards per month?",
    subtitle: "A quick estimate is perfect.",
    questionKey: "q_spend",
    autoAdvance: true,
    progress: { current: 2, total: 3 },
    options: [
      { label: "Under $1,000", value: "under_1k" },
      { label: "$1,000–3,000", value: "1_3k" },
      { label: "$3,000–7,000", value: "3_7k" },
      { label: "$7,000+", value: "7k_plus" },
    ],
  },

  4: {
    step: 4,
    type: "single",
    title: "How do you feel about how you’re using your rewards?",
    subtitle: "No right answer.",
    questionKey: "q_feel",
    autoAdvance: true,
    progress: { current: 3, total: 3 },
    options: [
      { label: "😎 I’ve got it handled", value: "handled" }, // 3
      { label: "🤓 I try my best", value: "try_best" }, // 2
      { label: "😕 It’s a bit confusing", value: "confusing" }, // 1
      { label: "😩 I know I’m leaving value", value: "leaving_value" }, // 2
      { label: "🤷 I don’t really think about it", value: "dont_think" }, // 0
    ],
  },

  5: {
    step: 5,
    type: "summary",
    title: "Summary",
    subtitle: "Your current rewards profile",
  },

  // ---- Segment 2 (Tier A/B continuation) ----
  6: {
    step: 6,
    type: "single",
    title: "Where does most of your spending go?",
    subtitle: "Pick the closest match.",
    questionKey: "q_top_category",
    autoAdvance: true,
    progress: { current: 1, total: 3 }, // optional (segment 2)
    options: [
      { label: "Dining", value: "dining", icon: "🍽️" },
      { label: "Groceries", value: "groceries", icon: "🛒" },
      { label: "Travel", value: "travel", icon: "✈️" },
      { label: "Shopping", value: "shopping", icon: "🛍️" },
      { label: "Subscriptions", value: "subscriptions", icon: "📺" },
      { label: "Everyday", value: "everyday", icon: "🏠" },
    ],
  },

  7: {
    step: 7,
    type: "multi",
    title: "Which travel cards do you have?",
    subtitle: "Select all that apply.",
    questionKey: "q_travel_cards",
    maxSelect: 6,
    progress: { current: 2, total: 3 },
    options: travelOptions,
  },

  8: {
    step: 8,
    type: "multi",
    title: "Which everyday cards do you use most?",
    subtitle: "Select up to 3.",
    questionKey: "q_everyday_cards",
    maxSelect: 3,
    progress: { current: 3, total: 3 },
    options: everydayOptions,
  },
};

export function screenByStep(step: number): QuizScreen | null {
  return SCREENS[step] ?? null;
}