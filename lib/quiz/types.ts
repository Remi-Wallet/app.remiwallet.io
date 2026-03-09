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
  startedAt: number;
  updatedAt: number;
};
export type BaseScreen = {
  step: number;
  title: string;
  subtitle?: string;
  progress?: { current: number; total: number };
};

export type SingleScreen = BaseScreen & {
  type: "single";
  questionKey: string;
  options: QuizOption[];
  autoAdvance?: boolean;
};

export type MultiScreen = BaseScreen & {
  type: "multi";
  questionKey: string;
  options: QuizOption[];
  maxSelect?: number;

  /** Optional UI hint for how to render multi options */
  layout?: "list" | "grid";
};

export type QuizScreen = SingleScreen | MultiScreen;