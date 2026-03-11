// app/quiz/results/page.tsx

import type { Metadata } from "next";
import { buildMetadata } from "@/lib/site/metadata";
import QuizResultsPageView from "@/components/quiz/QuizResultsPageView";

export const metadata: Metadata = buildMetadata({
  title: "Your Results",
  description:
    "See how optimized your current rewards setup may be and whether you may qualify for early access.",
  path: "/quiz/results",
});

export default function QuizResultsPage() {
  return <QuizResultsPageView />;
}