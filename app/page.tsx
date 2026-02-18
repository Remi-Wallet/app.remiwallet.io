"use client";

import * as React from "react";
import { Button, Stack, Box, Typography } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { useRouter } from "next/navigation";
import { QuizShell } from "@/components/quiz/QuizShell";
import { getOrCreateSessionId } from "@/lib/quiz/storage";
import { track } from "@/lib/analytics/events";

export default function HomePage() {
  const router = useRouter();

const onStart = () => {
  const sessionId = getOrCreateSessionId();
  track("quiz_start", { sessionId });
  router.push("/quiz/2");
};

  return (
    <QuizShell
      title={
        <>
          The average American loses{" "}
          <Box component="span" sx={{ fontStyle: "italic", fontWeight: 800, color: "primary.main" }}>
            thousands
          </Box>{" "}
          every year in unclaimed rewards and offers.
        </>
      }
      subtitle="Are you maximizing your rewards? Let's take 60 seconds and find out."
      showBack={false}
    >
      {/* Confidence bullets */}
      <Stack spacing={1} sx={{ mb: 3 }}>
        <Bullet>Bank-level security</Bullet>
        <Bullet>We don’t share your data</Bullet>
        <Bullet>For most of this quiz, we won’t even know who you are</Bullet>
      </Stack>

      <Stack spacing={2}>
        <Button variant="contained" size="large" onClick={onStart}>
          Start Quiz
        </Button>
      </Stack>
    </QuizShell>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <Stack direction="row" spacing={1.25} alignItems="center">
      <CheckCircleRoundedIcon sx={{ fontSize: 18, color: "text.secondary", opacity: 0.9 }} />
      <Typography variant="body2" color="primary.main" sx={{ lineHeight: 1.3 }}>
        {children}
      </Typography>
    </Stack>
  );
}