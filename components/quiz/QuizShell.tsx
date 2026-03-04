"use client";

import * as React from "react";
import { Box, Card, Container, Typography } from "@mui/material";
import { ProgressBar } from "@/components/quiz/ProgressBar";

export type QuizShellVariant = "hero" | "quiz" | "summary";

export type QuizShellProgress =
  | {
      current: number;
      total: number;
    }
  | undefined;

export function QuizShell(props: {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  variant?: QuizShellVariant;
  progress?: QuizShellProgress;
}) {
  const { title, subtitle, children, variant = "quiz", progress } = props;

  const isHero = variant === "hero";
  const isQuiz = variant === "quiz";

  return (
    <Container
      maxWidth={false}
      sx={{
        // Keep content centered and stable across steps
        display: "flex",
        justifyContent: "center",
        py: { xs: 3, sm: 5 },
      }}
    >
      <Card
        elevation={0}
        sx={{
          width: "100%",
          // Keep the quiz shell from resizing wildly between steps
          maxWidth: isHero ? 980 : 720,
          borderRadius: { xs: 8, sm: 10 },
          boxShadow: "0 22px 55px rgba(0,0,0,0.10)",
          overflow: "hidden",
          backgroundColor: "#fff",

          // Stabilize height on larger screens so the “box” doesn’t jump.
          // On mobile, let it grow naturally.
          minHeight: isQuiz ? { xs: "auto", md: 640 } : "auto",

          // Subtle internal padding differences by variant
          px: { xs: 3, sm: 5 },
          pt: isQuiz ? { xs: 3, sm: 4 } : { xs: 4, sm: 6 },
          pb: { xs: 4, sm: 5 },

          // Ensure content stays left-aligned within the shell (feels “survey-like”)
          textAlign: "left",
        }}
      >
        {/* Progress only on quiz variant when provided */}
        {isQuiz && progress ? (
          <Box sx={{ mb: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              {/* If you later decide to remove Back entirely, just omit in your page.tsx */}
              <Typography variant="body2" color="text.secondary">
                {/* left slot intentionally empty for now */}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Step {progress.current} of {progress.total}
              </Typography>
            </Box>

            <ProgressBar current={progress.current} total={progress.total} />
          </Box>
        ) : null}

        {title ? (
          <Typography
            component="h1"
            sx={{
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              // Landing stays big; quiz steps slightly smaller (more “survey designed”)
              fontSize: isHero
                ? { xs: 42, sm: 54, md: 62 }
                : { xs: 34, sm: 40, md: 46 },
              color: "text.primary",
            }}
          >
            {title}
          </Typography>
        ) : null}

        {subtitle ? (
          <Typography
            sx={{
              mt: 1.5,
              mb: 3,
              fontSize: { xs: 15, sm: 16 },
              lineHeight: 1.5,
              color: "text.secondary",
              maxWidth: isHero ? 820 : 620,
            }}
          >
            {subtitle}
          </Typography>
        ) : null}

        {/* Content area */}
        <Box
          sx={{
            // Give quiz steps a stable “content frame” so short questions don’t collapse the card.
            flex: "1 1 auto",
            minHeight: isQuiz ? { xs: "auto", md: 420 } : "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          {children}
        </Box>
      </Card>
    </Container>
  );
}