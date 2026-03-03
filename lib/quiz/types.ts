// lib/quiz/types.ts

export type Tier = "A" | "B" | "C";

export type Answers = Record<string, string | string[]>;

export type QuizOption = {
  label: string;
  value: string;
  helperText?: string;
  icon?: string;
};

export type QuizState = {
  sessionId: string;
  answers: Answers;
  tier?: Tier;
  startedAt?: number;
  updatedAt?: number;
};