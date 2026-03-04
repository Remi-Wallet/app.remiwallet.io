"use client";

import * as React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { QuizShell } from "@/components/quiz/QuizShell";
import { getOrCreateSessionId, clearQuizState } from "@/lib/quiz/storage";

function Booster({ title, detail }: { title: string; detail?: string }) {
  return (
    <Box sx={{ display: "flex", gap: 1.25, alignItems: "flex-start" }}>
      <Box
        sx={{
          mt: "6px",
          width: 18,
          height: 18,
          borderRadius: "999px",
          bgcolor: "rgba(6,214,160,0.18)",
          display: "grid",
          placeItems: "center",
          flex: "0 0 auto",
        }}
      >
        <Box sx={{ width: 8, height: 8, borderRadius: "999px", bgcolor: "#06D6A0" }} />
      </Box>

      <Box>
        <Typography variant="body2" sx={{ fontWeight: 800, lineHeight: 1.25 }}>
          {title}
        </Typography>
        {detail ? (
          <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.3 }}>
            {detail}
          </Typography>
        ) : null}
      </Box>
    </Box>
  );
}

export default function HomePage() {
  const router = useRouter();

  const onStart = () => {
    // v1: clear prior answers on restart so it feels “fresh”
    clearQuizState(true); // keep sessionId
    getOrCreateSessionId();
    router.push("/quiz/2");
  };

  return (
    <QuizShell
      showBack={false}
      title={
        <>
          The average American loses{" "}
          <Box component="span" sx={{ fontStyle: "italic", color: "primary.main" }}>
            thousands
          </Box>{" "}
          every year in unclaimed rewards and offers.
        </>
      }
      subtitle="Take 60 seconds to see if you’re leaving value on the table."
    >
      <Stack spacing={2.25}>
        <Button variant="contained" size="large" onClick={onStart}>
          Start
        </Button>

        {/* Confidence boosters under CTA */}
        <Stack spacing={1.25} sx={{ pt: 0.5 }}>
          <Booster title="Bank-level security" detail="Best practices to protect your data." />
          <Booster title="We don’t share your data" detail="No selling personal info." />
          <Booster title="Mostly anonymous" detail="For most of this quiz, we won’t even know who you are." />
        </Stack>
      </Stack>
    </QuizShell>
  );
}