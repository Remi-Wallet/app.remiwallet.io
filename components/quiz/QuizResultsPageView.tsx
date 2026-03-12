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
} from "@/lib/quiz/scoring";
import { getSummaryCopy } from "@/lib/quiz/resultsCopy";

const trackOnce = createTrackOnce(track);

function vibrate(pattern: number | number[]) {
  try {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(pattern);
    }
  } catch { }
}

function ReassuranceText(props: { children: React.ReactNode }) {
  return (
    <Typography
      sx={(theme) => ({
        mt: 0.75,
        textAlign: "center",
        fontSize: "0.76rem",
        color: theme.palette.text.secondary,
        lineHeight: 1.35,
        maxWidth: 420,
        mx: "auto",
        opacity: 0.88,
      })}
    >
      {props.children}
    </Typography>
  );
}

function RevealSection(props: {
  show: boolean;
  children: React.ReactNode;
  delayMs?: number;
}) {
  const { show, children, delayMs = 0 } = props;

  return (
    <Box
      sx={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(8px)",
        transition: `opacity 420ms cubic-bezier(.22,.61,.36,1) ${delayMs}ms, transform 420ms cubic-bezier(.22,.61,.36,1) ${delayMs}ms`,
      }}
    >
      {children}
    </Box>
  );
}

export default function QuizResultsPageView() {
  const [tier, setTier] = React.useState<Tier>("C");
  const [score, setScore] = React.useState<number>(0);
  const [projection, setProjection] =
    React.useState<ReturnType<typeof getResultsProjection> | null>(null);
  const [remiInsight, setRemiInsight] = React.useState<{
    walletEfficiencyScore: number;
    annualFeeBurden: number;
  } | null>(null);

  const [revealGraph, setRevealGraph] = React.useState(false);
  const [revealInsight, setRevealInsight] = React.useState(false);
  const [revealCallout, setRevealCallout] = React.useState(false);

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
        setProjection({
          ...nextProjection,
          bars: nextProjection.bars.map((row) => {
            if (row.label === "Current") {
              return { ...row, label: "Current setup" };
            }
            if (row.label === "Optimized") {
              return { ...row, label: "Optimized wallet" };
            }
            if (row.label === "Fully optimized") {
              return { ...row, label: "Fully optimized strategy" };
            }
            return row;
          }),
        });
        setRemiInsight({
          walletEfficiencyScore: remiBreakdown.walletEfficiencyScore,
          annualFeeBurden: remiBreakdown.annualFeeBurden,
        });

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
              walletEfficiencyScore: 0,
              annualFeeBurden: 0,
              bars: [
                {
                  label: "Current setup",
                  value: snap.estimatedValueNow / maxValue,
                  amount: snap.estimatedValueNow,
                },
                {
                  label: "Optimized wallet",
                  value: snap.estimatedValueOptimized / maxValue,
                  amount: snap.estimatedValueOptimized,
                  emphasis: true,
                },
                {
                  label: "Fully optimized strategy",
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

      setRevealGraph(false);
      setRevealInsight(false);
      setRevealCallout(false);

      window.setTimeout(() => setRevealGraph(true), 220);
      window.setTimeout(() => setRevealInsight(true), 420);
      window.setTimeout(() => setRevealCallout(true), 620);
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
      { label: "Current setup", value: 0.35, amount: 0 },
      { label: "Optimized wallet", value: 0.65, amount: 0, emphasis: true },
      { label: "Fully optimized strategy", value: 0.92, amount: 0 },
    ];

  const ctaLabel =
    tier === "A"
      ? "Request Early Access"
      : tier === "B"
        ? "See If You Qualify"
        : "Join Early Access";

  const insightText =
    remiInsight && remiInsight.walletEfficiencyScore > 0
      ? remiInsight.walletEfficiencyScore >= 75
        ? tier === "A"
          ? "Your wallet already has strong category coverage, but Remi may still help you unlock more value through smarter card pairing, timing, and redemption strategy."
          : "Your wallet already has solid coverage, but Remi may still help you capture more value through smarter timing and better day-to-day card usage."
        : remiInsight.walletEfficiencyScore >= 50
          ? tier === "A" || tier === "B"
            ? "Your wallet has some strong pieces, but a few everyday spending categories still appear under-optimized."
            : "Your setup has some useful pieces already, but several categories may still be earning less than they could."
          : tier === "A"
            ? "Even with a multi-card setup, your wallet appears to have meaningful category coverage gaps that may be limiting the rewards value you capture today."
            : "Your wallet appears to have meaningful category coverage gaps, which may be limiting the rewards value you capture today."
      : "Your wallet appears to have some strong pieces, but a few everyday spending categories may still be under-optimized.";

  const calloutTitle =
    tier === "A"
      ? "Strong candidate for early beta"
      : copy.calloutTitle;

  const calloutBody =
    tier === "A"
      ? "Users with multi-card setups like yours often unlock significantly more value through smarter category coverage, card pairing, and redemption timing."
      : tier === "B"
        ? "Users with setups like yours can often capture more value with a few targeted changes and better category alignment."
        : copy.calloutBody;

  const bodyCopy =
    tier === "A"
      ? "Request early access and we’ll notify you as onboarding expands and beta spots become available."
      : tier === "B"
        ? "Join early access and we’ll keep you updated as access expands and new onboarding spots open."
        : copy.body;

  return (
    <QuizShell variant="quiz" title={copy.title} subtitle={copy.subtitle}>
      <Box className="remi-summary" sx={{ maxWidth: 720 }}>
        <Stack spacing={2.75}>
          {rangeLabel ? (
            <Box>
              <Typography
                sx={(theme) => ({
                  fontSize: { xs: "0.82rem", sm: "0.86rem" },
                  fontWeight: 700,
                  color: theme.palette.text.secondary,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  mb: 0.7,
                })}
              >
                Estimated missed rewards
              </Typography>

              <Typography
                sx={(theme) => ({
                  fontSize: { xs: "1.18rem", sm: "1.4rem" },
                  lineHeight: 1.2,
                  color: theme.palette.text.primary,
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                })}
              >
                {rangeLabel} per year
              </Typography>

              <Typography
                sx={(theme) => ({
                  mt: 0.65,
                  fontSize: "0.9rem",
                  color: theme.palette.text.secondary,
                  lineHeight: 1.5,
                  maxWidth: 560,
                })}
              >
                Based on your wallet structure and spending profile.
              </Typography>
            </Box>
          ) : null}

          <Box sx={{ pt: 0.25 }}>
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
                  placement: "top",
                });
              }}
            >
              {ctaLabel}
            </Button>

            <ReassuranceText>
              Early access is rolling out in limited waves as onboarding expands.
            </ReassuranceText>
          </Box>

          <RevealSection show={revealGraph}>
            <Box>
              <Typography
                sx={(theme) => ({
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: theme.palette.text.secondary,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  mb: 1,
                })}
              >
                Projected rewards value
              </Typography>

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
                    label: row.label,
                    amount: row.amount,
                    value: row.value,
                    emphasis: row.emphasis,
                  }))}
                  caption="Estimated yearly value for your current setup, an optimized wallet, and a fully optimized strategy."
                  animateOnMount
                />
              </Box>
            </Box>
          </RevealSection>

          <RevealSection show={revealInsight}>
            <Box
              sx={(theme) => ({
                border: `1px solid ${theme.palette.divider}`,
                backgroundColor: "rgba(255,255,255,0.56)",
                borderRadius: 5,
                p: 2,
              })}
            >
              <Typography
                sx={(theme) => ({
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: theme.palette.text.secondary,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  mb: 0.85,
                })}
              >
                Remi Insight
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ lineHeight: 1.65 }}
              >
                {insightText}
              </Typography>
            </Box>
          </RevealSection>

          <RevealSection show={revealCallout}>
            <Box
              sx={{
                border: "1px solid rgba(6,214,160,0.24)",
                backgroundColor: "rgba(6,214,160,0.05)",
                borderRadius: 5,
                p: 2,
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 0.5 }}>
                {calloutTitle}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ lineHeight: 1.6 }}
              >
                {calloutBody}
              </Typography>
            </Box>
          </RevealSection>

          <Typography variant="body2" color="text.secondary" sx={{ mt: -0.35 }}>
            {bodyCopy}
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
                  placement: "bottom",
                });
              }}
            >
              {ctaLabel}
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