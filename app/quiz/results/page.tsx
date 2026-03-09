// app/quiz/results/page.tsx

"use client";

import * as React from "react";
import Link from "next/link";
import { Box, Button, Stack, Typography } from "@mui/material";
import { QuizShell } from "@/components/quiz/QuizShell";
import { SummaryBars } from "@/components/quiz/SummaryBars";

import { loadQuizState, persistTier } from "@/lib/quiz/storage";
import type { Tier } from "@/lib/quiz/types";
import { computeTierFromAnswers, computeTierScore } from "@/lib/quiz/scoring";

function vibrate(pattern: number | number[]) {
  try {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate(pattern);
  } catch {}
}

function getSummaryCopy(tier: Tier) {
  if (tier === "A") {
    return {
      title: "You’re a strong candidate for serious rewards optimization.",
      subtitle: "You likely have meaningful upside with better timing + card strategy.",
      body: "Join early access and we’ll notify you when Remi is ready for your profile.",
      calloutTitle: "You may be missing high-value redemptions.",
      calloutBody: "Optimized users stack the right card, category, and redemption window.",
      bars: [
        { label: "Average users", value: 0.35 },
        { label: "Optimized", value: 0.72, emphasis: true },
        { label: "Fully optimized", value: 0.94 },
      ],
    };
  }

  if (tier === "B") {
    return {
      title: "You’re close — a few changes could improve your rewards quickly.",
      subtitle: "You don’t need a full overhaul to capture more value.",
      body: "Join early access and we’ll notify you when Remi is ready for your profile.",
      calloutTitle: "You likely have easy wins.",
      calloutBody: "Small shifts in which card you use for big categories can add up fast.",
      bars: [
        { label: "Average users", value: 0.35 },
        { label: "Optimized", value: 0.62, emphasis: true },
        { label: "Fully optimized", value: 0.9 },
      ],
    };
  }

  return {
    title: "You can still earn more — without changing how you spend.",
    subtitle: "Start simple. Build confidence. Improve over time.",
    body: "Join early access and we’ll notify you when Remi is ready for your profile.",
    calloutTitle: "Good news: most people start here.",
    calloutBody: "Remi helps you learn a simple system so you capture more rewards with less effort.",
    bars: [
      { label: "Average users", value: 0.35, emphasis: true },
      { label: "Optimized", value: 0.65 },
      { label: "Fully optimized", value: 0.92 },
    ],
  };
}

export default function QuizResultsPage() {
  const [state, setState] = React.useState(() => loadQuizState());

  React.useEffect(() => {
    const latest = loadQuizState();
    setState(latest);

    const tier: Tier = latest.tier ?? computeTierFromAnswers(latest.answers);
    if (!latest.tier) {
      setState(persistTier(tier));
    }

    vibrate([20, 30, 20]);
  }, []);

  const tier: Tier = state.tier ?? computeTierFromAnswers(state.answers);
  const score = computeTierScore(state.answers);
  const copy = getSummaryCopy(tier);

  return (
    <QuizShell variant="quiz" title={copy.title} subtitle={copy.subtitle}>
      <Box className="remi-summary">
        <Stack spacing={2}>
          <SummaryBars rows={copy.bars} caption="Most people have an opportunity gap — Remi helps close it." />

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

          <Button variant="contained" size="large" component={Link} href="/early-access">
            Join early access
          </Button>

          <Typography variant="caption" color="text.secondary" sx={{ opacity: 0.6, textAlign: "center" }}>
            Score: {score} • Tier {tier}
          </Typography>
        </Stack>
      </Box>
    </QuizShell>
  );
}