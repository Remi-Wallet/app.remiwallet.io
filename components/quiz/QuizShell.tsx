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

  /** Optional: make landing feel more like a hero */
  variant?: "hero" | "quiz";
}) {
  const router = useRouter();
  const variant = props.variant ?? (props.progress ? "quiz" : "hero");

  return (
    <Box
      sx={{
        width: "100%", // ✅ prevents right shift in flex parent
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        maxWidth={variant === "hero" ? "md" : "sm"}
        sx={{
          // push a bit wider on desktop so it doesn’t feel “boxed”
          maxWidth: variant === "hero" ? { xs: 560, md: 900 } : { xs: 560, md: 640 },
          px: 0,
        }}
      >
        <Card
          elevation={0}
          sx={{
            width: "100%",
            bgcolor: "#fff",
            borderRadius: variant === "hero" ? 4 : 6,
            border: "1px solid rgba(0,0,0,0.07)",
            boxShadow: "0 18px 60px rgba(0,0,0,0.10)",
            px: { xs: 3, sm: 4 },
            py: { xs: 3, sm: 4 },
          }}
        >
          {/* ✅ Reserve header space so pages don’t jump */}
          <Box sx={{ mb: 2 }}>
            <Box sx={{ height: 40, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Box sx={{ minWidth: 64 }}>
                {props.showBack ? (
                  <Button
                    variant="text"
                    onClick={() => router.back()}
                    sx={{ px: 0, minWidth: 0, fontWeight: 700, textTransform: "none" }}
                  >
                    Back
                  </Button>
                ) : null}
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ minWidth: 88, textAlign: "right" }}>
                {props.progress ? `Step ${props.progress.current} of ${props.progress.total}` : ""}
              </Typography>
            </Box>

            <Box sx={{ height: 10, mt: 1 }}>
              {props.progress ? <ProgressBar value={props.progress.current} max={props.progress.total} /> : null}
            </Box>
          </Box>

          {/* Headline */}
          {props.title ? (
            <Typography
              sx={{
                fontWeight: 900,
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                mb: 1.25,
                fontSize:
                  variant === "hero"
                    ? { xs: 34, sm: 44, md: 56 }
                    : { xs: 34, sm: 40, md: 48 },
              }}
            >
              {props.title}
            </Typography>
          ) : null}

          {/* Subhead */}
          {props.subtitle ? (
            <Typography
              sx={{
                color: "text.secondary",
                mb: 2.75,
                lineHeight: 1.4,
                fontSize: { xs: 15, sm: 16, md: 18 },
              }}
            >
              {props.subtitle}
            </Typography>
          ) : null}

          {props.children}
        </Card>
      </Container>
    </Box>
  );
}