"use client";

import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Box, Button, Stack, Typography } from "@mui/material";

import { QuizShell } from "@/components/quiz/QuizShell";
import { OptionList } from "@/components/quiz/OptionList";
import { OptionGrid } from "@/components/quiz/OptionGrid";
import { SummaryBars } from "@/components/quiz/SummaryBars";

import { screenByStep } from "@/lib/quiz/screens";
import { loadQuizState, saveAnswer, persistTier } from "@/lib/quiz/storage";
import type { Answers, Tier } from "@/lib/quiz/types";
import { nextAfterSummary } from "@/lib/quiz/routing";
import { computeTierScore as computeScore, computeTierFromAnswers as computeTier } from "@/lib/quiz/scoring";



function vibrate(pattern: number | number[]) {
  try {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      // @ts-ignore
      navigator.vibrate(pattern);
    }
  } catch { }
}

function nextRouteForStep(step: number) {
  if (step === 4) return "/quiz/5";
  if (step === 8) return "/early-access";
  return `/quiz/${step + 1}`;
}

function toProgress(screen: any): { current: number; total: number } | undefined {
  if (!screen) return undefined;

  // Older style: progress object already present
  if (
    screen.progress &&
    typeof screen.progress.current === "number" &&
    typeof screen.progress.total === "number"
  ) {
    return screen.progress;
  }

  // Newer style: showProgress + progressCurrent/Total
  if (
    screen.showProgress &&
    typeof screen.progressCurrent === "number" &&
    typeof screen.progressTotal === "number"
  ) {
    return { current: screen.progressCurrent, total: screen.progressTotal };
  }

  return undefined;
}

export default function QuizStepPage() {
  const router = useRouter();
  const params = useParams<{ step?: string }>();
  const stepNum = Number(params.step || "0");

  useEffect(() => {
    if (!Number.isFinite(stepNum) || stepNum <= 0) router.replace("/");
  }, [stepNum, router]);

  const screen = useMemo(() => (Number.isFinite(stepNum) ? screenByStep(stepNum) : undefined), [stepNum]);
  const [state, setState] = useState(() => loadQuizState());

  useEffect(() => {
    setState(loadQuizState());
  }, [stepNum]);

  useEffect(() => {
    if (!screen) router.replace("/");
  }, [screen, router]);

  if (!screen) return null;

  const questionKey = ((screen as any).questionKey ?? (screen as any).key) as string | undefined;
  
  //JAMESENET -- Add small debug step here but should abstract this later
  if (process.env.NODE_ENV !== "production") {
    console.log("DEBUG_STEP", stepNum, "screenKey", questionKey, "type", (screen as any).type);
  }
  
  const currentValue = questionKey ? (state.answers as any)?.[questionKey] : undefined;
  //Allow the user to select nothing on Steps 7 and 
  const allowEmpty = stepNum === 7 || stepNum === 8;
  const selectedCount = Array.isArray(currentValue) ? currentValue.length : 0;

  // SUMMARY
  if (screen.type === "summary") {
    const answers = state.answers as Answers;
    const score = computeScore(answers);
    const tier: Tier = state.tier ?? computeTier(answers);

    useEffect(() => {
      if (!state.tier) {
        const next = persistTier(tier);
        setState(next);
      }
      vibrate([20, 30, 20]);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

            <Button
              variant="contained"
              size="large"
              onClick={() => {
                router.push(nextAfterSummary(tier));
              }}
            >
              {tier === "C" ? "Join early access" : "Optimize further"}
            </Button>

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
                >
                  Skip for now — join beta
                </Typography>
              </Box>
            ) : null}

            <Button variant="text" onClick={() => router.push("/")}>
              Restart
            </Button>

            <Typography variant="caption" color="text.secondary" sx={{ opacity: 0.6, textAlign: "center" }}>
              Score: {score} • Tier {tier}
            </Typography>
          </Stack>
        </Box>
      </QuizShell>
    );
  }

  // QUESTIONS
  const progress = toProgress(screen);

  const onSingleSelect = (value: string) => {
    if (screen.type !== "single" || !questionKey) return;

    vibrate(10);
    const next = saveAnswer(questionKey, value);
    setState(next);

    if ((screen as any).autoAdvance) {
      window.setTimeout(() => {
        router.push(nextRouteForStep(stepNum));
      }, 280);
    }
  };

  const onMultiToggle = (value: string) => {
    if (screen.type !== "multi" || !questionKey) return;

    const prev: string[] = Array.isArray(currentValue) ? currentValue : [];
    const has = prev.includes(value);
    const nextVals = has ? prev.filter((v) => v !== value) : [...prev, value];

    const maxSelect = (screen as any).maxSelect as number | undefined;
    if (maxSelect && nextVals.length > maxSelect) return;

    vibrate(has ? 8 : 12);
    const next = saveAnswer(questionKey, nextVals);
    setState(next);
  };

  const onContinueMulti = () => {
    router.push(nextRouteForStep(stepNum));
  };

  return (
    <QuizShell variant="quiz" title={screen.title} subtitle={screen.subtitle} progress={progress}>
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
              maxSelect={(screen as any).maxSelect}
              onSelect={onMultiToggle}
            />

            <Button
              variant="contained"
              size="large"
              disabled={!allowEmpty && selectedCount === 0}
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