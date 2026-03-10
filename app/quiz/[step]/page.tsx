// app/quiz/[step]/page.tsx

"use client";

import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Box, Button, Stack, Typography } from "@mui/material";

import { QuizShell } from "@/components/quiz/QuizShell";
import { OptionList } from "@/components/quiz/OptionList";
import { OptionGrid } from "@/components/quiz/OptionGrid";

import { screenByStep } from "@/lib/quiz/screens";
import { loadQuizState, saveAnswer, persistTier } from "@/lib/quiz/storage";
import type { Answers } from "@/lib/quiz/types";
import { computeTierFromAnswers as computeTier } from "@/lib/quiz/scoring";

import { track } from "@/lib/analytics/events";
import { createTrackOnce } from "@/lib/analytics/trackOnce";
import { debugLog } from "@/lib/debug/log";

const trackOnce = createTrackOnce(track);

function vibrate(pattern: number | number[]) {
  try {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(pattern as any);
    }
  } catch {}
}

/**
 * Option B flow (renumbered steps 1–6):
 * - step 3 is tier gate (after Q3)
 *   - Tier C => /quiz/results
 *   - Tier A/B => /quiz/4
 * - step 6 ends => /quiz/results
 */
function nextRouteForStep(step: number, answers: Answers) {
  if (step === 3) {
    const tier = computeTier(answers);
    persistTier(tier);

    track("tier_assigned", { tier, step: 3 });
    debugLog("quiz", "TIER_ASSIGNED", { tier, step: 3 });

    return tier === "C" ? "/quiz/results" : "/quiz/4";
  }
  if (step === 6) return "/quiz/results";
  return `/quiz/${step + 1}`;
}

function toProgress(screen: any): { current: number; total: number } | undefined {
  if (!screen) return undefined;

  if (
    screen.progress &&
    typeof screen.progress.current === "number" &&
    typeof screen.progress.total === "number"
  ) {
    return screen.progress;
  }

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

  const screen = useMemo(
    () => (Number.isFinite(stepNum) ? screenByStep(stepNum) : undefined),
    [stepNum]
  );

  const [state, setState] = useState(() => loadQuizState());

  useEffect(() => {
    setState(loadQuizState());
  }, [stepNum]);

  useEffect(() => {
    if (!screen) router.replace("/");
  }, [screen, router]);

  if (!screen) return null;

  // Safety: summary screens should not exist in /quiz/[step] anymore
  if ((screen as any).type === "summary") {
    router.replace("/quiz/results");
    return null;
  }

  const questionKey =
    ((screen as any).questionKey ?? (screen as any).key) as string | undefined;

  // Debug + analytics: step view (track once to avoid StrictMode double fire)
  useEffect(() => {
    debugLog("quiz", "SCREEN_VIEW", {
      stepNum,
      type: (screen as any)?.type,
      title: (screen as any)?.title,
      questionKey,
    });

    trackOnce(
      "step_view",
      {
        step: stepNum,
        type: (screen as any)?.type,
        questionKey,
      },
      `step_${stepNum}`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepNum, questionKey]);

  const currentValue = questionKey ? (state.answers as any)?.[questionKey] : undefined;

  // Allow empty selection on travel + everyday card steps (now 5 & 6)
  const allowEmpty = stepNum === 5 || stepNum === 6;
  const selectedCount = Array.isArray(currentValue) ? currentValue.length : 0;

  const progress = toProgress(screen);

  const onSingleSelect = (value: string) => {
    if ((screen as any).type !== "single" || !questionKey) return;

    vibrate(10);

    debugLog("quiz", "ANSWER_SELECTED_SINGLE", { step: stepNum, questionKey, value });
    track("answer_selected", { step: stepNum, questionKey, value });

    const next = saveAnswer(questionKey, value);
    setState(next);

    if ((screen as any).autoAdvance) {
      const nextAnswers = next.answers as Answers;
      window.setTimeout(() => {
        router.push(nextRouteForStep(stepNum, nextAnswers));
      }, 280);
    }
  };

  const onMultiToggle = (value: string) => {
    if ((screen as any).type !== "multi" || !questionKey) return;

    const prev: string[] = Array.isArray(currentValue) ? currentValue : [];
    const has = prev.includes(value);
    const nextVals = has ? prev.filter((v) => v !== value) : [...prev, value];

    const maxSelect = (screen as any).maxSelect as number | undefined;
    if (maxSelect && nextVals.length > maxSelect) return;

    vibrate(has ? 8 : 12);

    debugLog("quiz", "ANSWER_SELECTED_MULTI", {
      step: stepNum,
      questionKey,
      value,
      selectedCount: nextVals.length,
    });

    track("answer_selected", {
      step: stepNum,
      questionKey,
      value,
      mode: "multi",
      selectedCount: nextVals.length,
    });

    const next = saveAnswer(questionKey, nextVals);
    setState(next);
  };

  const onContinueMulti = () => {
    const latest = loadQuizState();
    debugLog("quiz", "MULTI_CONTINUE", { step: stepNum, questionKey, selectedCount });
    track("multi_continue", { step: stepNum, questionKey, selectedCount });

    router.push(nextRouteForStep(stepNum, latest.answers as Answers));
  };

  return (
    <QuizShell
      variant="quiz"
      title={(screen as any).title}
      subtitle={(screen as any).subtitle}
      progress={progress}
    >
      <Box className="remi-screen">
        {(screen as any).type === "single" ? (
          <OptionList
            options={(screen as any).options}
            selected={typeof currentValue === "string" ? currentValue : null}
            onSelect={onSingleSelect}
          />
        ) : null}

        {(screen as any).type === "multi" ? (
          <Stack spacing={2}>
            {(screen as any).layout === "list" ? (
              <OptionList
                mode="multi"
                options={(screen as any).options}
                selectedValues={Array.isArray(currentValue) ? currentValue : []}
                maxSelect={(screen as any).maxSelect}
                onToggle={onMultiToggle}
              />
            ) : (
              <OptionGrid
                options={(screen as any).options}
                selected={Array.isArray(currentValue) ? currentValue : []}
                maxSelect={(screen as any).maxSelect}
                onSelect={onMultiToggle}
              />
            )}

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