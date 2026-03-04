"use client";

import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";

import { QuizShell } from "@/components/quiz/QuizShell";
import { OptionList } from "@/components/quiz/OptionList";
import { OptionGrid } from "@/components/quiz/OptionGrid";
import { SummaryBars } from "@/components/quiz/SummaryBars";

import { screenByStep } from "@/lib/quiz/screens";
import { track } from "@/lib/analytics/events";
import type { Answers, Tier } from "@/lib/quiz/types";
import { loadQuizState, saveAnswer, persistTier } from "@/lib/quiz/storage";

// ---- scoring (your rubric) ----
function computeScore(answers: Answers) {
  const cards = String(answers.q_cards ?? "");
  const spend = String(answers.q_spend ?? "");
  const feel = String(answers.q_feel ?? "");

  const cardPoints: Record<string, number> = { "1": 0, "2-3": 2, "4-6": 4, "7+": 5 };
  const spendPoints: Record<string, number> = { under_1k: 0, "1_3k": 2, "3_7k": 4, "7k_plus": 5 };
  const feelPoints: Record<string, number> = {
    handled: 3,
    try_best: 2,
    confusing: 1,
    leaving_value: 2,
    dont_think: 0,
  };

  return (cardPoints[cards] ?? 0) + (spendPoints[spend] ?? 0) + (feelPoints[feel] ?? 0);
}

function computeTier(answers: Answers): Tier {
  const score = computeScore(answers);
  if (score >= 9) return "A";
  if (score >= 6) return "B";
  return "C";
}

function nextAfterSummary(tier: Tier) {
  return tier === "C" ? "/early-access" : "/quiz/6";
}

export default function QuizStepPage() {
  const router = useRouter();
  const params = useParams<{ step?: string }>();
  const step = Number(params.step || "0");

  // guard bad route
  useEffect(() => {
    if (!Number.isFinite(step) || step <= 0) router.replace("/");
  }, [step, router]);

  const screen = useMemo(() => (Number.isFinite(step) ? screenByStep(step) : undefined), [step]);
  const [state, setState] = useState(() => loadQuizState());

  // Keep state in sync with localStorage (basic; fine for v1)
  useEffect(() => {
    setState(loadQuizState());
  }, [step]);

  // step view logging
  useEffect(() => {
    if (!screen) return;
    track("step_view", { step, screenType: screen.type, questionKey: (screen as any).questionKey });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, !!screen]);

  useEffect(() => {
    if (!screen) router.replace("/");
  }, [screen, router]);

  if (!screen) return null;

  const questionKey = (screen as any).questionKey as string | undefined;
  const currentValue = questionKey ? state.answers[questionKey] : undefined;

  const vibrate = (pattern: number | number[]) => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      // @ts-ignore
      navigator.vibrate(pattern);
    }
  };

  // --- summary ---
  if (screen.type === "summary") {
    const tier = state.tier ?? computeTier(state.answers);
    const score = computeScore(state.answers);

    useEffect(() => {
      if (!state.tier) {
        const next = persistTier(tier);
        setState(next);
        track("tier_assigned", { tier, score });
      }
      track("quiz_complete", { segment: "segment1", tier, score });
      vibrate([20, 30, 20]);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const copy = getSummaryCopy(tier);

    return (
      <QuizShell title={copy.title} subtitle={copy.subtitle} showBack>
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

            <Button
              variant="contained"
              size="large"
              onClick={() => {
                track("quiz_complete", { segment: "segment1", tier, score, action: tier === "C" ? "join_early_access" : "continue" });
                router.push(nextAfterSummary(tier));
              }}
            >
              {tier === "C" ? "Join early access" : "Optimize further"}
            </Button>

            {/* Tier A/B only: subtle skip link */}
            {tier !== "C" ? (
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  component={Link}
                  href="/early-access"
                  variant="caption"
                  sx={{
                    display: "inline-block",
                    mt: 0.25,
                    color: "text.secondary",
                    opacity: 0.55,
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline", opacity: 0.75 },
                  }}
                  onClick={() => track("summary_skip_to_beta", { tier, score })}
                >
                  Skip for now — join beta
                </Typography>
              </Box>
            ) : null}

            <Button variant="text" onClick={() => router.push("/")}>
              Restart
            </Button>
          </Stack>
        </Box>
      </QuizShell>
    );
  }

  // --- single select ---
  const onSingleSelect = (value: string) => {
    if (screen.type !== "single" || !questionKey) return;

    const next = saveAnswer(questionKey, value);
    setState(next);

    track("answer_selected", { step, questionKey, value, mode: "single" });
    vibrate(10);

    if ((screen as any).autoAdvance) {
      window.setTimeout(() => {
        if (step === 4) {
          const t = computeTier(next.answers);
          const s = computeScore(next.answers);
          const next2 = persistTier(t);
          setState(next2);
          track("tier_assigned", { tier: t, score: s });
          track("quiz_complete", { segment: "segment1", tier: t, score: s });
          router.push("/quiz/5");
          return;
        }
        router.push(`/quiz/${step + 1}`);
      }, 300);
    }
  };

  // --- multi select ---
  const onMultiToggle = (value: string) => {
    if (screen.type !== "multi" || !questionKey) return;

    const prev: string[] = Array.isArray(currentValue) ? currentValue : [];
    const has = prev.includes(value);
    const nextVals = has ? prev.filter((v) => v !== value) : [...prev, value];

    const maxSelect = (screen as any).maxSelect as number | undefined;
    if (maxSelect && nextVals.length > maxSelect) return;

    const next = saveAnswer(questionKey, nextVals);
    setState(next);

    track("answer_selected", { step, questionKey, value, selectedCount: nextVals.length, mode: "multi" });
    vibrate(8);
  };

  const onContinueMulti = () => {
    if (screen.type !== "multi") return;
    const selectedCount = Array.isArray(currentValue) ? currentValue.length : 0;
    track("multi_continue", { step, questionKey, selectedCount });

    if (step === 8) router.push("/early-access");
    else router.push(`/quiz/${step + 1}`);
  };

  return (
    <QuizShell title={screen.title} subtitle={screen.subtitle} progress={(screen as any).progress} showBack>
      <Box className="remi-screen">
        {screen.type === "single" ? (
          <OptionList
            options={(screen as any).options}
            selected={typeof currentValue === "string" ? currentValue : null}
            onSelect={onSingleSelect}
          />
        ) : null}

        {screen.type === "multi" ? (
          <Stack spacing={2}>
            <OptionGrid
              options={(screen as any).options}
              selected={Array.isArray(currentValue) ? currentValue : []}
              onSelect={onMultiToggle}
              multi
            />

            <Button
              variant="contained"
              size="large"
              disabled={!Array.isArray(currentValue) || currentValue.length === 0}
              onClick={onContinueMulti}
            >
              Continue
            </Button>

            {(screen as any).maxSelect ? (
              <Typography variant="caption" color="text.secondary">
                Select up to {(screen as any).maxSelect}.
              </Typography>
            ) : null}
          </Stack>
        ) : null}
      </Box>
    </QuizShell>
  );
}

function getSummaryCopy(tier: Tier) {
  if (tier === "A") {
    return {
      title: "You’re a strong candidate for serious rewards optimization.",
      subtitle: "You likely have meaningful upside with better timing + card strategy.",
      body: "Answer a few more questions so Remi can tailor recommendations to your spend profile.",
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
      body: "Answer a few more questions so Remi can focus on the highest-impact moves for you.",
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