"use client";

import * as React from "react";
import { Box, Container, Typography } from "@mui/material";
import { ProgressBar } from "@/components/quiz/ProgressBar";

export type QuizShellVariant = "hero" | "quiz";

export type QuizShellProps = {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;

  /**
   * hero = landing/marketing headline styling
   * quiz = question-screen styling (Decision A: no-card, “on page” feel)
   */
  variant?: QuizShellVariant;

  /**
   * Optional progress display for quiz screens
   */
  progress?: { current: number; total: number };

  /**
   * Back is optional; you said you may remove it for now.
   * Keep this here for compatibility if you re-enable later.
   */
  showBack?: boolean;
  onBack?: () => void;
  backLabel?: string;
};

export function QuizShell({
  title,
  subtitle,
  children,
  variant = "quiz",
  progress,
  showBack,
  onBack,
  backLabel = "Back",
}: QuizShellProps) {
  const isHero = variant === "hero";

  const titleSx = isHero
    ? {
        fontWeight: 800,
        letterSpacing: "-0.02em",
        lineHeight: 1.04,
        fontSize: { xs: 34, sm: 50, md: 64 },
      }
    : {
        fontWeight: 800,
        letterSpacing: "-0.02em",
        lineHeight: 1.06,
        // quiz steps: slightly smaller than landing
        fontSize: { xs: 30, sm: 40, md: 46 },
      };

  return (
    <Box sx={{ width: "100%" }}>
      <Container
        maxWidth={false}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          px: { xs: 2, sm: 3 },
          py: { xs: 3, sm: 5 },
        }}
      >
        {/* Decision A: no outer “card” — keep content in a consistent column */}
        <Box
          sx={{
            width: "100%",
            maxWidth: isHero ? 980 : 760,
          }}
        >
          {/* Optional back (safe to keep, can disable by not passing showBack) */}
          {showBack ? (
            <Box
              onClick={onBack}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onBack?.();
              }}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",
                color: "primary.main",
                fontWeight: 600,
                mb: 1.5,
                opacity: 0.9,
                "&:hover": { opacity: 1, textDecoration: "underline" },
              }}
            >
              {backLabel}
            </Box>
          ) : null}

          {/* Progress (quiz only) */}
          {variant === "quiz" && progress ? (
            <Box sx={{ mb: 2 }}>
              <ProgressBar current={progress.current} total={progress.total} />
            </Box>
          ) : null}

          {title ? (
            <Typography sx={titleSx} color="text.primary">
              {title}
            </Typography>
          ) : null}

          {subtitle ? (
            <Typography
              sx={{
                mt: 1.25,
                maxWidth: isHero ? 820 : 720,
                color: "text.secondary",
                fontSize: { xs: 14.5, sm: 16 },
                lineHeight: 1.6,
              }}
            >
              {subtitle}
            </Typography>
          ) : null}

          <Box sx={{ mt: title || subtitle ? 3 : 0 }}>{children}</Box>
        </Box>
      </Container>
    </Box>
  );
}