// lib/quiz/storage.ts

import type { Answers, QuizState, Tier } from "./types";

export const SESSION_ID_KEY = "remi_session_id";
export const QUIZ_STATE_KEY = "remi_quiz_state";
export const TIER_KEY = "remi_tier";
export const RESULTS_SNAPSHOT_KEY = "remi_results_snapshot";

// legacy compat key (only used if machine.ts still references it)
const LS_STORED_QUIZ = "remi_quiz_stored_v1";

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
 * Session ID
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
    startedAt: typeof input?.startedAt === "number" ? input!.startedAt : t,
    updatedAt: typeof input?.updatedAt === "number" ? input!.updatedAt : t,
  };
}

function parseRaw(raw: string): QuizState {
  const parsed = JSON.parse(raw);

  // New envelope format
  if (parsed && typeof parsed === "object" && "v" in parsed && "data" in parsed) {
    const v = (parsed as any).v;
    const data = (parsed as any).data;

    if (v === 1) return normalizeQuizState(data);

    // future: migrations
    return normalizeQuizState(data);
  }

  // Legacy bare QuizState
  return normalizeQuizState(parsed as QuizState);
}

/**
 * Load full quiz state from localStorage.
 * Always returns a valid QuizState (sessionId required).
 */
export function loadQuizState(): QuizState {
  const sessionId = getOrCreateSessionId();
  const t = now();

  if (typeof window === "undefined") {
    return { sessionId, answers: {}, startedAt: t, updatedAt: t };
  }

  try {
    const raw = localStorage.getItem(QUIZ_STATE_KEY);
    if (!raw) return { sessionId, answers: {}, startedAt: t, updatedAt: t };

    return parseRaw(raw);
  } catch {
    return { sessionId, answers: {}, startedAt: t, updatedAt: t };
  }
}

/**
 * Save full quiz state. Always stamps updatedAt and fills startedAt if missing.
 * Writes as an envelope for future-proofing.
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
    if (next.tier) localStorage.setItem(TIER_KEY, next.tier);
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
  const next: QuizState = {
    ...state,
    answers: { ...state.answers, [questionKey]: value },
  };
  return saveQuizState(next);
}

/**
 * Persist tier to both QuizState and a dedicated key for easy access.
 */
export function persistTier(tier: Tier): QuizState {
  const state = loadQuizState();
  const next: QuizState = { ...state, tier };
  return saveQuizState(next);
}

/**
 * Convenience: get just the answers.
 */
export function loadAnswers(): Answers {
  return loadQuizState().answers;
}

/**
 * Convenience: overwrite answers (rare, but handy for restores).
 */
export function saveAnswers(answers: Answers): QuizState {
  const state = loadQuizState();
  return saveQuizState({ ...state, answers });
}

/**
 * Reset quiz to a fresh session + empty answers/tier.
 * (Useful for testers, and for "finish -> clear" behavior.)
 */
export function resetQuizState(): QuizState {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(QUIZ_STATE_KEY);
      localStorage.removeItem(TIER_KEY);
      localStorage.removeItem(LS_STORED_QUIZ);
      localStorage.setItem(SESSION_ID_KEY, createId());
    } catch {
      // ignore
    }
  }
  return loadQuizState();
}

/**
 * Clear quiz answers + tier (keeps session id by default).
 */
export function clearQuizState(keepSession = true) {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(QUIZ_STATE_KEY);
    localStorage.removeItem(TIER_KEY);
    localStorage.removeItem(LS_STORED_QUIZ);
    if (!keepSession) localStorage.removeItem(SESSION_ID_KEY);
  } catch {
    // ignore
  }
}
export function saveResultsSnapshot(snapshot: ResultsSnapshot) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(RESULTS_SNAPSHOT_KEY, JSON.stringify(snapshot));
  } catch {
    // ignore
  }
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
  } catch {
    // ignore
  }
}

/**
 * Clear answers but keep sessionId so analytics correlation remains intact.
 * This is the “finish -> clear answers” behavior.
 */
export function clearQuizAnswersKeepSession(keepTier = true): QuizState {
  const state = loadQuizState();
  const next: QuizState = {
    ...state,
    answers: {},
    tier: keepTier ? state.tier : undefined,
    updatedAt: now(),
  };
  return saveQuizState(next);
}

/**
 * Optional: attach helpers for debugging in dev/stage.
 * Use in a top-level client component once:
 *   useEffect(() => attachQuizDebugHelpers(), [])
 */
export function attachQuizDebugHelpers() {
  if (typeof window === "undefined") return;
  if (process.env.NODE_ENV === "production") return;

  (window as any).__remiQuiz = {
    loadQuizState,
    saveQuizState,
    saveAnswer,
    persistTier,
    loadAnswers,
    saveAnswers,
    clearQuizState,
    resetQuizState,
    keys: { SESSION_ID_KEY, QUIZ_STATE_KEY, TIER_KEY },
    version: STORAGE_VERSION,
  };
}

/* ------------------------------------------------------------------
 * Compatibility layer for older machine.ts imports
 * ------------------------------------------------------------------ */

export type StoredQuiz = {
  sessionId: string;
  answers: Answers;
  tier?: Tier;
  startedAt?: number;
  updatedAt?: number;
};

export function getStoredQuiz(): StoredQuiz | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LS_STORED_QUIZ);
    return raw ? (JSON.parse(raw) as StoredQuiz) : null;
  } catch {
    return null;
  }
}

export function setStoredQuiz(next: StoredQuiz): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LS_STORED_QUIZ, JSON.stringify({ ...next, updatedAt: now() }));
  } catch {
    // ignore
  }
}