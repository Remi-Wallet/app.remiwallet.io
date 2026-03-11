// components/quiz/QuizResultsPageView.tsx

"use client";

import * as React from "react";
import Link from "next/link";
import { Box, Button, Stack, Typography } from "@mui/material";
import { QuizShell } from "@/components/quiz/QuizShell";
import { SummaryBars } from "@/components/quiz/SummaryBars";

import {
  loadQuizState,
  persistTier,
  saveResultsSnapshot,
  loadResultsSnapshot,
  clearQuizAnswersKeepSession,
} from "@/lib/quiz/storage";
import { persistQuizCompletionOnce } from "@/lib/data/quizPersistence";
import { track } from "@/lib/analytics/events";
import { createTrackOnce } from "@/lib/analytics/trackOnce";
import type { Tier } from "@/lib/quiz/types";
import {
  computeTierFromAnswers,
  computeTierScore,
  calculateRemiScore,
  getRemiScoreSummary,
  getResultsProjection,
  getProjectionRangeLabel,
  formatDollar,
} from "@/lib/quiz/scoring";

const trackOnce = createTrackOnce(track);

function vibrate(pattern: number | number[]) {
  try {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(pattern);
    }
  } catch {}
}

function getSummaryCopy(tier: Tier, rangeLabel?: string) {
  if (tier === "A") {
    return {
      title: "You’re a strong candidate for serious rewards optimization.",
      subtitle: "You likely have meaningful upside with better timing + card strategy.",
      body: rangeLabel
        ? `You may be missing roughly ${rangeLabel} in potential yearly value depending on how optimized your setup becomes.`
        : "You may qualify for early beta access as we refine Remi with real users.",
      calloutTitle: "You may be leaving meaningful value on the table.",
      calloutBody:
        "Advanced users often unlock more value by pairing the right card with the right category and redemption path.",
      cta: "Request Early Access",
    };
  }

  if (tier === "B") {
    return {
      title: "You’re close — a few changes could improve your rewards quickly.",
      subtitle: "You don’t need a full overhaul to capture more value.",
      body: rangeLabel
        ? `You may be missing roughly ${rangeLabel} in potential yearly value with a more optimized setup.`
        : "You may qualify for early access as we expand onboarding and product testing.",
      calloutTitle: "You likely have some easy wins.",
      calloutBody:
        "Small shifts in which card you use for everyday categories can add up surprisingly fast over time.",
      cta: "Check early access",
    };
  }

  return {
    title: "You can still earn more — without changing how you spend.",
    subtitle: "Start simple. Build confidence. Improve over time.",
    body: rangeLabel
      ? `You may still have roughly ${rangeLabel} in yearly upside as your setup improves.`
      : "Join early access and we’ll keep you updated as Remi evolves.",
    calloutTitle: "Good news: most people start here.",
    calloutBody:
      "Remi helps you build a simple system so you can capture more value without needing to become a points expert overnight.",
    cta: "Join early access",
  };
}

export default function QuizResultsPageView() {
  const [tier, setTier] = React.useState<Tier>("C");
  const [score, setScore] = React.useState<number>(0);
  const [projection, setProjection] = React.useState<ReturnType<typeof getResultsProjection> | null>(null);

  React.useEffect(() => {
    const run = async () => {
      const latest = loadQuizState();
      const hasAnswers = latest.answers && Object.keys(latest.answers).length > 0;

      if (hasAnswers) {
        const computedTier = latest.tier ?? computeTierFromAnswers(latest.answers);
        const computedScore = computeTierScore(latest.answers);
        const remiBreakdown = calculateRemiScore(latest.answers);
        const remiSummary = getRemiScoreSummary(latest.answers);
        const nextProjection = getResultsProjection(latest.answers);

        setTier(computedTier);
        setScore(computedScore);
        setProjection(nextProjection);

        if (!latest.tier) {
          persistTier(computedTier);
        }

        saveResultsSnapshot({
          tier: computedTier,
          score: computedScore,
          remiScore: remiBreakdown.remiScore,
          opportunityBand: remiSummary.opportunityBand,
          estimatedValueNow: remiBreakdown.estimatedValueNow,
          estimatedValueOptimized: remiBreakdown.estimatedValueOptimized,
          estimatedValueFullyOptimized: remiBreakdown.estimatedValueFullyOptimized,
          estimatedGapOptimized: remiBreakdown.estimatedGapOptimized,
          estimatedGapFullyOptimized: remiBreakdown.estimatedGapFullyOptimized,
          spendCategories: Array.isArray(latest.answers.q_spend_categories)
            ? latest.answers.q_spend_categories
            : [],
          travelCards: Array.isArray(latest.answers.q_travel_cards)
            ? latest.answers.q_travel_cards
            : [],
          everydayCards: Array.isArray(latest.answers.q_everyday_cards)
            ? latest.answers.q_everyday_cards
            : [],
          computedAt: Date.now(),
        });

        trackOnce(
          "quiz_complete",
          {
            tier: computedTier,
            score: computedScore,
            remiScore: remiBreakdown.remiScore,
            source: "results",
          },
          "quiz_complete_results"
        );

        try {
          await persistQuizCompletionOnce();
        } catch (error) {
          console.error("Failed to persist quiz completion", error);
        }

        clearQuizAnswersKeepSession(true);
      } else {
        const snap = loadResultsSnapshot();
        if (snap) {
          setTier(snap.tier);
          setScore(snap.score);

          if (
            snap.estimatedValueNow != null &&
            snap.estimatedValueOptimized != null &&
            snap.estimatedValueFullyOptimized != null &&
            snap.estimatedGapOptimized != null &&
            snap.estimatedGapFullyOptimized != null
          ) {
            const maxValue = Math.max(snap.estimatedValueFullyOptimized, 1);
            setProjection({
              currentValue: snap.estimatedValueNow,
              optimizedValue: snap.estimatedValueOptimized,
              fullyOptimizedValue: snap.estimatedValueFullyOptimized,
              gapLow: snap.estimatedGapOptimized,
              gapHigh: snap.estimatedGapFullyOptimized,
              bars: [
                {
                  label: "Current",
                  value: snap.estimatedValueNow / maxValue,
                  amount: snap.estimatedValueNow,
                },
                {
                  label: "Optimized",
                  value: snap.estimatedValueOptimized / maxValue,
                  amount: snap.estimatedValueOptimized,
                  emphasis: true,
                },
                {
                  label: "Fully optimized",
                  value: snap.estimatedValueFullyOptimized / maxValue,
                  amount: snap.estimatedValueFullyOptimized,
                },
              ],
            });
          }

          trackOnce(
            "step_view",
            {
              step: "results",
              tier: snap.tier,
              score: snap.score,
              remiScore: snap.remiScore,
              source: "results_snapshot",
            },
            "results_view_snapshot"
          );
        }
      }

      vibrate([20, 30, 20]);
    };

    run();
  }, []);

  React.useEffect(() => {
    trackOnce(
      "step_view",
      {
        step: "results",
        tier,
        score,
        source: "results",
      },
      "results_view"
    );
  }, [tier, score]);

  const rangeLabel = projection
    ? getProjectionRangeLabel(projection.gapLow, projection.gapHigh)
    : undefined;

  const copy = getSummaryCopy(tier, rangeLabel);

  const bars =
    projection?.bars ?? [
      { label: "Current", value: 0.35, amount: 0 },
      { label: "Optimized", value: 0.65, amount: 0, emphasis: true },
      { label: "Fully optimized", value: 0.92, amount: 0 },
    ];

  return (
    <QuizShell variant="quiz" title={copy.title} subtitle={copy.subtitle}>
      <Box className="remi-summary">
        <Stack spacing={2}>
          <SummaryBars
            rows={bars.map((row) => ({
              label:
                row.amount > 0
                  ? `${row.label} · ${formatDollar(row.amount)}/yr`
                  : row.label,
              value: row.value,
              emphasis: row.emphasis,
            }))}
            caption="These estimates are directional and based on your current setup and spending profile."
          />

          <Box
            sx={{
              border: "1px solid rgba(6,214,160,0.35)",
              backgroundColor: "rgba(6,214,160,0.06)",
              borderRadius: 16,
              p: 2,
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 0.5 }}>
              {copy.calloutTitle}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {copy.calloutBody}
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary">
            {copy.body}
          </Typography>

          <Button
            variant="contained"
            size="large"
            component={Link}
            href="/early-access"
            onClick={() => {
              track("summary_cta", {
                tier,
                score,
                destination: "early_access",
              });
            }}
          >
            {copy.cta}
          </Button>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ opacity: 0.6, textAlign: "center" }}
          >
            Score: {score} • Tier {tier}
          </Typography>
        </Stack>
      </Box>
    </QuizShell>
  );
}