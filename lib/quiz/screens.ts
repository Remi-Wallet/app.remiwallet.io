// lib/quiz/screens.ts
import type { QuizScreen } from "@/lib/quiz/types";
import { cardsToOptions } from "@/lib/quiz/adapters/cardsToOptions";

// If you already have these computed lists, keep them.
// Otherwise adjust to match your current catalog usage.
const travelCards = cardsToOptions({
  categories: ["Travel"],
  limit: 8,
  includeWithoutHelper: true,
});

const everydayCards = cardsToOptions({
  categories: ["Everyday", "Cashback"],
  limit: 8,
  includeWithoutHelper: true,
});

export const SCREENS: Record<number, QuizScreen> = {
  1: {
    step: 1,
    type: "single",
    title: "How many credit cards do you have?",
    subtitle: "Include cards you keep open, even if you don’t use them often.",
    questionKey: "q_cards",
    progress: { current: 1, total: 6 },
    autoAdvance: true,
    options: [
      { label: "1", value: "1" },
      { label: "2–3", value: "2-3" },
      { label: "4–6", value: "4-6" },
      { label: "7+", value: "7+" },
    ],
  },

  2: {
    step: 2,
    type: "single",
    title: "Roughly how much do you put on credit cards per month?",
    subtitle: "A quick estimate is perfect.",
    questionKey: "q_spend",
    progress: { current: 2, total: 6 },
    autoAdvance: true,
    options: [
      { label: "Under $1,000", value: "under_1k" },
      { label: "$1,000–3,000", value: "1_3k" },
      { label: "$3,000–7,000", value: "3_7k" },
      { label: "$7,000+", value: "7k_plus" },
    ],
  },

  3: {
    step: 3,
    type: "single",
    title: "How do you feel about how you’re using your rewards?",
    subtitle: "No right answer.",
    questionKey: "q_feel",
    progress: { current: 3, total: 6 },
    autoAdvance: true,
    options: [
      { label: "😎 I’ve got it handled", value: "handled" },
      { label: "🤓 I try my best", value: "try_best" },
      { label: "😕 It’s a bit confusing", value: "confusing" },
      { label: "😩 I know I’m leaving value", value: "leaving_value" },
      { label: "🤷 I don’t really think about it", value: "dont_think" },
    ],
  },

  4: {
    step: 4,
    type: "multi",
    layout: "list",
    title: "Where does most of your spending go?",
    subtitle: "Select up to 3.",
    questionKey: "q_spend_categories",
    progress: { current: 4, total: 6 }, // advanced segment progress
    maxSelect: 3,
    options: [
      { label: "🍽️ Dining", value: "dining", icon: "🍽️" },
      { label: "🛒 Groceries", value: "groceries", icon: "🛒" },
      { label: "✈️ Travel", value: "travel", icon: "✈️" },
      { label: "🛍️ Shopping", value: "shopping", icon: "🛍️" },
      { label: "⛽️ Gas / Transit", value: "transit", icon: "⛽️" },
      { label: "✨ Other", value: "other", icon: "✨" },
    ],
  },

  5: {
    step: 5,
    type: "multi",
    title: "Which travel cards do you have?",
    subtitle: "Select all that apply (or none).",
    questionKey: "q_travel_cards",
    maxSelect: 8,
    progress: { current: 5, total: 6 },
    options: travelCards,
  },

  6: {
    step: 6,
    type: "multi",
    title: "Which everyday cards do you use most?",
    subtitle: "Select all that apply (or none).",
    questionKey: "q_everyday_cards",
    maxSelect: 8,
    progress: { current: 6, total: 6 },
    options: everydayCards,
  },
};

export function screenByStep(step: number): QuizScreen | undefined {
  // IMPORTANT: index by key, not by searching .step (prevents duplicate-step bugs)
  return SCREENS[step];
}