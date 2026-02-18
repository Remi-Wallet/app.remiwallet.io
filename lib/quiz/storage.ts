// lib/quiz/storage.ts
export type Tier = "A" | "B" | "C";
export type Answers = Record<string, any>;
export type QuizState = { answers: Answers; tier?: Tier };

export const QUIZ_STATE_KEY = "remi_quiz_state";
export const SESSION_ID_KEY = "remi_session_id";
export const TIER_KEY = "remi_tier";

export function getOrCreateSessionId() {
  try {
    const existing = localStorage.getItem(SESSION_ID_KEY);
    if (existing) return existing;
    const id = crypto.randomUUID();
    localStorage.setItem(SESSION_ID_KEY, id);
    return id;
  } catch {
    // fallback (very rare)
    const id = `sess_${Date.now()}`;
    try { localStorage.setItem(SESSION_ID_KEY, id); } catch {}
    return id;
  }
}

export function loadQuizState(): QuizState {
  try {
    const raw = localStorage.getItem(QUIZ_STATE_KEY);
    if (!raw) return { answers: {} };
    const parsed = JSON.parse(raw);
    return { answers: parsed?.answers ?? {}, tier: parsed?.tier };
  } catch {
    return { answers: {} };
  }
}

export function saveQuizState(state: QuizState) {
  try {
    localStorage.setItem(QUIZ_STATE_KEY, JSON.stringify(state));
  } catch {}
}

export function saveAnswer(questionKey: string, value: any) {
  const state = loadQuizState();
  const next = { ...state, answers: { ...state.answers, [questionKey]: value } };
  saveQuizState(next);
  return next;
}

export function persistTier(tier: Tier) {
  try {
    localStorage.setItem(TIER_KEY, tier);
  } catch {}
  const state = loadQuizState();
  const next = { ...state, tier };
  saveQuizState(next);
  return next;
}