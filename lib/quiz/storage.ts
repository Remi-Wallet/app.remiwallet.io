// lib/quiz/storage.ts
import type { Answers, QuizState, Tier } from "./types";

export const SESSION_ID_KEY = "remi_session_id";
export const QUIZ_STATE_KEY = "remi_quiz_state";
export const TIER_KEY = "remi_tier";

// legacy compat key (only used if machine.ts still references it)
const LS_STORED_QUIZ = "remi_quiz_stored_v1";

/**
 * Session ID
 */
export function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "server";

  const existing = localStorage.getItem(SESSION_ID_KEY);
  if (existing) return existing;

  let id: string;
  try {
    id = crypto.randomUUID();
  } catch {
    id = `sess_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  }

  localStorage.setItem(SESSION_ID_KEY, id);
  return id;
}

/**
 * Load full quiz state from localStorage.
 * Always returns a valid QuizState (sessionId required).
 */
export function loadQuizState(): QuizState {
  const sessionId = getOrCreateSessionId();
  const now = Date.now();

  if (typeof window === "undefined") {
    return { sessionId, answers: {}, startedAt: now, updatedAt: now };
  }

  try {
    const raw = localStorage.getItem(QUIZ_STATE_KEY);
    if (!raw) {
      return { sessionId, answers: {}, startedAt: now, updatedAt: now };
    }

    const parsed = JSON.parse(raw);

    return {
      sessionId: parsed?.sessionId ?? sessionId,
      answers: (parsed?.answers ?? {}) as Answers,
      tier: parsed?.tier as Tier | undefined,
      startedAt: typeof parsed?.startedAt === "number" ? parsed.startedAt : now,
      updatedAt: typeof parsed?.updatedAt === "number" ? parsed.updatedAt : now,
    };
  } catch {
    return { sessionId, answers: {}, startedAt: now, updatedAt: now };
  }
}

/**
 * Save full quiz state. Always stamps updatedAt and fills startedAt if missing.
 */
export function saveQuizState(state: QuizState): QuizState {
  const now = Date.now();
  const sessionId = state.sessionId || getOrCreateSessionId();

  const next: QuizState = {
    ...state,
    sessionId,
    startedAt: state.startedAt ?? now,
    updatedAt: now,
  };

  if (typeof window === "undefined") return next;

  try {
    localStorage.setItem(QUIZ_STATE_KEY, JSON.stringify(next));
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
    localStorage.setItem(
      LS_STORED_QUIZ,
      JSON.stringify({ ...next, updatedAt: Date.now() })
    );
  } catch {
    // ignore
  }
}