// lib/data/quizPersistence.ts

"use client";

import { getDataClient } from "@/lib/data/client";
import {
  getOrCreateSessionId,
  loadQuizState,
  loadResultsSnapshot,
} from "@/lib/quiz/storage";
import type { Answers, Tier } from "@/lib/quiz/types";

const BACKEND_SESSION_ID_KEY = "remi_backend_session_id";
const RESULTS_PERSISTED_PREFIX = "remi_results_persisted";

function nowIso() {
  return new Date().toISOString();
}

function safeGetBackendSessionId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(BACKEND_SESSION_ID_KEY);
  } catch {
    return null;
  }
}

function safeSetBackendSessionId(id: string) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(BACKEND_SESSION_ID_KEY, id);
  } catch {
    // ignore
  }
}

function resultsPersistedKey(sessionId: string) {
  return `${RESULTS_PERSISTED_PREFIX}::${sessionId}`;
}

function hasPersistedResults(sessionId: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(resultsPersistedKey(sessionId)) === "1";
  } catch {
    return false;
  }
}

function markPersistedResults(sessionId: string) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(resultsPersistedKey(sessionId), "1");
  } catch {
    // ignore
  }
}

function inferAnswerType(
  value: string | string[]
): "single" | "multi" | "text" | "number" {
  if (Array.isArray(value)) return "multi";
  return "single";
}

function questionToScreenId(questionKey: string): string {
  const map: Record<string, string> = {
    q_card_count: "1",
    q_monthly_spend: "2",
    q_rewards_confidence: "3",
    q_spend_categories: "4",
    q_travel_cards: "5",
    q_everyday_cards: "6",
  };

  return map[questionKey] ?? "unknown";
}

export async function ensureQuizSessionStarted(): Promise<{ backendSessionId: string }> {
  const dataClient = getDataClient();

  const existing = safeGetBackendSessionId();
  if (existing) return { backendSessionId: existing };

  const clientSessionId = getOrCreateSessionId();
  const state = loadQuizState();

  const { data, errors } = await dataClient.models.QuizSession.create({
    clientSessionId,
    status: "ACTIVE",
    startedAt: state.startedAt
      ? new Date(state.startedAt).toISOString()
      : nowIso(),
    currentScreenId: "1",
    referrer:
      typeof document !== "undefined" ? document.referrer || undefined : undefined,
    userAgent:
      typeof navigator !== "undefined" ? navigator.userAgent : undefined,
    locale:
      typeof navigator !== "undefined" ? navigator.language : undefined,
    timezone:
      typeof Intl !== "undefined"
        ? Intl.DateTimeFormat().resolvedOptions().timeZone
        : undefined,
  });

  if (errors?.length || !data?.id) {
    throw new Error(errors?.[0]?.message || "Failed to create QuizSession");
  }

  safeSetBackendSessionId(data.id);
  return { backendSessionId: data.id };
}

export async function persistQuizCompletionOnce(): Promise<{
  backendSessionId: string;
  persisted: boolean;
}> {
  const dataClient = getDataClient();

  const { backendSessionId } = await ensureQuizSessionStarted();

  if (hasPersistedResults(backendSessionId)) {
    return { backendSessionId, persisted: false };
  }

  const quizState = loadQuizState();
  const snapshot = loadResultsSnapshot();

  const tier: Tier | undefined = snapshot?.tier ?? quizState.tier;
  const score: number | undefined = snapshot?.score;

  const updateResult = await dataClient.models.QuizSession.update({
    id: backendSessionId,
    status: "COMPLETED",
    tier,
    score,
    currentScreenId: "results",
    completedAt: nowIso(),
  });

  if (updateResult.errors?.length) {
    throw new Error(
      updateResult.errors[0]?.message || "Failed to update QuizSession"
    );
  }

  const answers = quizState.answers as Answers;
  const entries = Object.entries(answers);

  for (const [questionKey, value] of entries) {
    const result = await dataClient.models.QuizResponse.create({
      sessionId: backendSessionId,
      screenId: questionToScreenId(questionKey),
      questionKey,
      answerType: inferAnswerType(value),
      answer: JSON.stringify(value),
      answeredAt: nowIso(),
    });

    if (result.errors?.length) {
      throw new Error(
        result.errors[0]?.message ||
          `Failed to save response for ${questionKey}`
      );
    }
  }

  const eventResult = await dataClient.models.EventLog.create({
    sessionId: backendSessionId,
    eventName: "QUIZ_COMPLETED",
    screenId: "results",
    properties: JSON.stringify({
      tier,
      score,
      answerCount: entries.length,
    }),
    createdAt: nowIso(),
  });

  if (eventResult.errors?.length) {
    throw new Error(
      eventResult.errors[0]?.message || "Failed to save completion event"
    );
  }

  markPersistedResults(backendSessionId);
  return { backendSessionId, persisted: true };
}

export async function submitWaitlistLead(input: {
  fullName: string;
  email: string;
  source?: string;
}) {
  const dataClient = getDataClient();

  const { backendSessionId } = await ensureQuizSessionStarted();

  const quizState = loadQuizState();
  const snapshot = loadResultsSnapshot();

  const tier: Tier | undefined = snapshot?.tier ?? quizState.tier;
  const score: number | undefined = snapshot?.score;

  const leadResult = await dataClient.models.WaitlistLead.create({
    sessionId: backendSessionId,
    fullName: input.fullName.trim(),
    email: input.email.trim(),
    sourceTier: tier,
    score,
    source: input.source ?? "early_access",
    createdAt: nowIso(),
  });

  if (leadResult.errors?.length || !leadResult.data?.id) {
    throw new Error(
      leadResult.errors?.[0]?.message || "Failed to create WaitlistLead"
    );
  }

  const eventResult = await dataClient.models.EventLog.create({
    sessionId: backendSessionId,
    eventName: "LEAD_SUBMITTED",
    screenId: "early_access",
    properties: JSON.stringify({
      tier,
      score,
      source: input.source ?? "early_access",
      emailDomain: input.email.includes("@")
        ? input.email.split("@")[1]
        : undefined,
    }),
    createdAt: nowIso(),
  });

  if (eventResult.errors?.length) {
    throw new Error(
      eventResult.errors[0]?.message || "Failed to save lead event"
    );
  }

  return {
    backendSessionId,
    leadId: leadResult.data.id,
    tier,
    score,
  };
}