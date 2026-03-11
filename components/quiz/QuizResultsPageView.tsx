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
import { computeTierFromAnswers, computeTierScore } from "@/lib/quiz/scoring";

const trackOnce = createTrackOnce(track);

function vibrate(pattern: number | number[]) {
  try {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(pattern);
    }
  } catch {}
}

function getSummaryCopy(tier: Tier) {
  if (tier === "A") {
    return {
      title: "You’re a strong candidate for serious rewards optimization.",
      subtitle: "You likely have meaningful upside with better timing + card strategy.",
      body: "You may qualify for early beta access as we refine Remi with real users.",
      calloutTitle: "You may be missing high-value redemptions.",
      calloutBody: "Optimized users stack the right card, category, and redemption window.",
      cta: "Request Early Access",
      bars: [
        { label: "You today", value: 0.35 },
        { label: "Optimized", value: 0.72, emphasis: true },
        { label: "Super optimized", value: 0.94 },
      ],
    };
  }

  if (tier === "B") {
    return {
      title: "You’re close — a few changes could improve your rewards quickly.",
      subtitle: "You don’t need a full overhaul to capture more value.",
      body: "You may qualify for early access as we expand onboarding and product testing.",
      calloutTitle: "You likely have easy wins.",
      calloutBody: "Small shifts in which card you use for big categories can add up fast.",
      cta: "Check early access",
      bars: [
        { label: "You today", value: 0.35 },
        { label: "Optimized", value: 0.62, emphasis: true },
        { label: "Super optimized", value: 0.9 },
      ],
    };
  }

  return {
    title: "You can still earn more — without changing how you spend.",
    subtitle: "Start simple. Build confidence. Improve over time.",
    body: "Join early access and we’ll keep you updated as Remi evolves.",
    calloutTitle: "Good news: most people start here.",
    calloutBody: "Remi helps you learn a simple system so you capture more rewards with less effort.",
    cta: "Join early access",
    bars: [
      { label: "You today", value: 0.35, emphasis: true },
      { label: "Optimized", value: 0.65 },
      { label: "Super optimized", value: 0.92 },
    ],
  };
}

export default function QuizResultsPageView() {
  const [tier, setTier] = React.useState<Tier>("C");
  const [score, setScore] = React.useState<number>(0);

  React.useEffect(() => {
    const run = async () => {
      const latest = loadQuizState();
      const hasAnswers = latest.answers && Object.keys(latest.answers).length > 0;

      if (hasAnswers) {
        const computedTier = latest.tier ?? computeTierFromAnswers(latest.answers);
        const computedScore = computeTierScore(latest.answers);

        setTier(computedTier);
        setScore(computedScore);

        if (!latest.tier) {
          persistTier(computedTier);
        }

        saveResultsSnapshot({
          tier: computedTier,
          score: computedScore,
          computedAt: Date.now(),
        });

        trackOnce(
          "quiz_complete",
          {
            tier: computedTier,
            score: computedScore,
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

          trackOnce(
            "step_view",
            {
              step: "results",
              tier: snap.tier,
              score: snap.score,
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

  const copy = getSummaryCopy(tier);

  return (
    <QuizShell variant="quiz" title={copy.title} subtitle={copy.subtitle}>
      <Box className="remi-summary">
        <Stack spacing={2}>
          <SummaryBars
            rows={copy.bars}
            caption="Most people have an opportunity gap — Remi helps close it."
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