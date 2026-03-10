// lib/quiz/storage.ts

import type { Answers, QuizState, Tier } from "./types";

export const SESSION_ID_KEY = "remi_session_id";
export const QUIZ_STATE_KEY = "remi_quiz_state";
export const RESULTS_SNAPSHOT_KEY = "remi_results_snapshot";

const STORAGE_VERSION = 1;
type EnvelopeV1 = { v: 1; data: QuizState };

export type ResultsSnapshot = {
  tier: Tier;
  score: number;
  computedAt: number;
};

function now() {
  return Date.now();
}

function createId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `sess_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  }
}

/**
 * Session ID (stable across runs unless resetQuizState is used)
 */
export function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "server";

  const existing = localStorage.getItem(SESSION_ID_KEY);
  if (existing) return existing;

  const id = createId();
  localStorage.setItem(SESSION_ID_KEY, id);
  return id;
}

function normalizeQuizState(input: Partial<QuizState> | null | undefined): QuizState {
  const sessionId = input?.sessionId || getOrCreateSessionId();
  const t = now();

  return {
    sessionId,
    answers: (input?.answers ?? {}) as Answers,
    tier: input?.tier as Tier | undefined,
    startedAt: typeof input?.startedAt === "number" ? input.startedAt : t,
    updatedAt: typeof input?.updatedAt === "number" ? input.updatedAt : t,
  };
}

function parseRaw(raw: string): QuizState {
  const parsed = JSON.parse(raw);

  // Envelope format
  if (parsed && typeof parsed === "object" && "v" in parsed && "data" in parsed) {
    const v = (parsed as any).v;
    const data = (parsed as any).data;
    if (v === 1) return normalizeQuizState(data);
    // future migrations:
    return normalizeQuizState(data);
  }

  // Legacy bare state
  return normalizeQuizState(parsed as QuizState);
}

/**
 * Load full quiz state from localStorage.
 */
export function loadQuizState(): QuizState {
  const sessionId = getOrCreateSessionId();
  const t = now();

  if (typeof window === "undefined") return { sessionId, answers: {}, startedAt: t, updatedAt: t };

  try {
    const raw = localStorage.getItem(QUIZ_STATE_KEY);
    if (!raw) return { sessionId, answers: {}, startedAt: t, updatedAt: t };
    return parseRaw(raw);
  } catch {
    return { sessionId, answers: {}, startedAt: t, updatedAt: t };
  }
}

/**
 * Save full quiz state (enveloped).
 */
export function saveQuizState(state: QuizState): QuizState {
  const t = now();
  const sessionId = state.sessionId || getOrCreateSessionId();

  const next = normalizeQuizState({
    ...state,
    sessionId,
    startedAt: state.startedAt ?? t,
    updatedAt: t,
  });

  if (typeof window === "undefined") return next;

  try {
    const payload: EnvelopeV1 = { v: STORAGE_VERSION, data: next };
    localStorage.setItem(QUIZ_STATE_KEY, JSON.stringify(payload));
  } catch {
    // ignore
  }

  return next;
}

/**
 * Update a single answer and persist.
 */
export function saveAnswer(questionKey: string, value: string | string[]): QuizState {
  const state = loadQuizState();
  return saveQuizState({
    ...state,
    answers: { ...state.answers, [questionKey]: value },
  });
}

/**
 * Persist tier in QuizState.
 */
export function persistTier(tier: Tier): QuizState {
  const state = loadQuizState();
  return saveQuizState({ ...state, tier });
}

/**
 * Clear answers but keep sessionId. Optionally clear tier too.
 * Use this when starting a new run (recommended).
 */
export function clearQuizAnswersKeepSession(keepTier = false): QuizState {
  const state = loadQuizState();
  const t = now();
  
  return saveQuizState({
    ...state,
    answers: {},
    tier: keepTier ? state.tier : undefined,
    startedAt: t, //reset start time
    updatedAt: t,
  });
}

/**
 * Reset quiz state AND generate a new sessionId.
 * Use only if you explicitly want a fresh analytics identity per run.
 */
export function resetQuizState(): QuizState {
  if (typeof window !== "undefined") {
    try {
      clearResultsSnapshot();
      localStorage.removeItem(QUIZ_STATE_KEY);
      localStorage.setItem(SESSION_ID_KEY, createId());
    } catch {
      // ignore
    }
  }
  return loadQuizState();
}

/* ---------------------------
 * Results snapshot (sessionStorage)
 * --------------------------- */

export function saveResultsSnapshot(snapshot: ResultsSnapshot) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(RESULTS_SNAPSHOT_KEY, JSON.stringify(snapshot));
  } catch {}
}

export function loadResultsSnapshot(): ResultsSnapshot | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(RESULTS_SNAPSHOT_KEY);
    return raw ? (JSON.parse(raw) as ResultsSnapshot) : null;
  } catch {
    return null;
  }
}

export function clearResultsSnapshot() {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(RESULTS_SNAPSHOT_KEY);
  } catch {}
}

/**
 * Optional: attach helpers for dev/stage debugging.
 */
export function attachQuizDebugHelpers() {
  if (typeof window === "undefined") return;
  if (process.env.NODE_ENV === "production") return;

  (window as any).__remiQuiz = {
    loadQuizState,
    saveQuizState,
    saveAnswer,
    persistTier,
    clearQuizAnswersKeepSession,
    resetQuizState,
    saveResultsSnapshot,
    loadResultsSnapshot,
    clearResultsSnapshot,
    keys: { SESSION_ID_KEY, QUIZ_STATE_KEY, RESULTS_SNAPSHOT_KEY },
    version: STORAGE_VERSION,
  };
}