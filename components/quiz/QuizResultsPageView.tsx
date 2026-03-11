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
import { getSummaryCopy } from "@/lib/quiz/resultsCopy";

const trackOnce = createTrackOnce(track);

function vibrate(pattern: number | number[]) {
  try {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(pattern);
    }
  } catch {}
}

function ReassuranceText(props: { children: React.ReactNode }) {
  return (
    <Typography
      sx={(theme) => ({
        mt: 0.9,
        textAlign: "center",
        fontSize: "0.8rem",
        color: theme.palette.text.secondary,
        lineHeight: 1.4,
        maxWidth: 420,
        mx: "auto",
        opacity: 0.9,
      })}
    >
      {props.children}
    </Typography>
  );
}

export default function QuizResultsPageView() {
  const [tier, setTier] = React.useState<Tier>("C");
  const [score, setScore] = React.useState<number>(0);
  const [projection, setProjection] =
    React.useState<ReturnType<typeof getResultsProjection> | null>(null);

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

  const copy = getSummaryCopy(tier);

  const bars =
    projection?.bars ?? [
      { label: "Current", value: 0.35, amount: 0 },
      { label: "Optimized", value: 0.65, amount: 0, emphasis: true },
      { label: "Fully optimized", value: 0.92, amount: 0 },
    ];

  return (
    <QuizShell variant="quiz" title={copy.title} subtitle={copy.subtitle}>
      <Box className="remi-summary" sx={{ maxWidth: 720 }}>
        <Stack spacing={2.25}>
          {rangeLabel ? (
            <Typography
              sx={(theme) => ({
                fontSize: { xs: "1rem", sm: "1.08rem" },
                lineHeight: 1.45,
                color: theme.palette.text.primary,
                fontWeight: 700,
                letterSpacing: "-0.01em",
              })}
            >
              You may be missing roughly {rangeLabel} per year in rewards value.
            </Typography>
          ) : null}

          <Box
            sx={(theme) => ({
              border: `1px solid ${theme.palette.divider}`,
              backgroundColor: "rgba(255,255,255,0.72)",
              borderRadius: 5,
              px: { xs: 2, sm: 2.25 },
              py: { xs: 2, sm: 2.25 },
              boxShadow: "0 10px 30px rgba(15, 23, 42, 0.04)",
              backdropFilter: "blur(8px)",
            })}
          >
            <SummaryBars
              rows={bars.map((row) => ({
                label:
                  row.amount > 0
                    ? `${row.label} · ${formatDollar(row.amount)}`
                    : row.label,
                value: row.value,
                emphasis: row.emphasis,
              }))}
              caption="Estimated yearly value based on your current setup and spending profile."
            />
          </Box>

          <Box
            sx={{
              border: "1px solid rgba(6,214,160,0.24)",
              backgroundColor: "rgba(6,214,160,0.05)",
              borderRadius: 5,
              p: 2,
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 0.5 }}>
              {copy.calloutTitle}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
              {copy.calloutBody}
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mt: -0.25 }}>
            {copy.body}
          </Typography>

          <Box sx={{ pt: 0 }}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              component={Link}
              href="/early-access"
              sx={{ fontWeight: 600 }}
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

            <ReassuranceText>
              No credit card required for early access.
            </ReassuranceText>
          </Box>
        </Stack>
      </Box>
    </QuizShell>
  );
}