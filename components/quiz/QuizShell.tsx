"use client";

import * as React from "react";
import { Box, Button, Card, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { ProgressBar } from "@/components/quiz/ProgressBar";

export function QuizShell(props: {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  progress?: { current: number; total: number };
  children: React.ReactNode;
  showBack?: boolean;
}) {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        py: { xs: 2, sm: 4 },
      }}
    >
      <Container maxWidth="sm" sx={{ maxWidth: 520 }}>
        <Card
          variant="outlined"
          sx={{
            borderColor: "rgba(0,0,0,0.06)",
            p: { xs: 2.5, sm: 4 },
            borderRadius: 5, // ~20px
          }}
        >
          {/* Top row */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.25 }}>
            {props.showBack ? (
              <Button
                variant="text"
                onClick={() => router.back()}
                sx={{ minHeight: 40, px: 1 }}
              >
                Back
              </Button>
            ) : (
              <span />
            )}

            {props.progress ? (
              <Typography variant="body2" color="text.secondary">
                Step {props.progress.current} of {props.progress.total}
              </Typography>
            ) : (
              <span />
            )}
          </Box>

          {/* Progress bar */}
          {props.progress ? (
            <Box sx={{ mb: 2.5 }}>
              <ProgressBar value={props.progress.current} max={props.progress.total} />
            </Box>
          ) : null}

          {/* Title + subtitle */}
          {props.title ? (
            <Typography
              variant="h4"
              sx={{ mb: 1, fontWeight: 800, letterSpacing: "-0.02em" }}
            >
              {props.title}
            </Typography>
          ) : null}

          {props.subtitle ? (
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {props.subtitle}
            </Typography>
          ) : null}

          {props.children}
        </Card>
      </Container>
    </Box>
  );
}