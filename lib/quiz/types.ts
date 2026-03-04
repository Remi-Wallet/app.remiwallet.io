// lib/quiz/types.ts

export type Tier = "A" | "B" | "C";

/** Stored answers by questionKey */
export type Answers = Record<string, string | string[]>;

/** Canonical option shape used by OptionList / OptionGrid */
export type QuizOption = {
  label: string;
  value: string;
  helperText?: string;

  // ✅ allow emoji/icon in screens
  icon?: string;

  meta?: Record<string, unknown>;
};

/** If you already have this, keep it. This is a good shape. */
export type QuizState = {
  sessionId: string;
  answers: Answers;
  tier?: Tier;
  startedAt?: number;
  updatedAt?: number;
};