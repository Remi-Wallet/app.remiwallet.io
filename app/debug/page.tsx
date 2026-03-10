// app/debug/page.tsx

"use client";

import * as React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import {
  loadQuizState,
  loadResultsSnapshot,
  clearResultsSnapshot,
  clearQuizAnswersKeepSession,
  resetQuizState,
} from "@/lib/quiz/storage";
import { getEventBuffer, clearEventBuffer } from "@/lib/analytics/events";

export default function DebugPage() {
  const [quiz, setQuiz] = React.useState<any>(null);
  const [snap, setSnap] = React.useState<any>(null);
  const [events, setEvents] = React.useState<any[]>([]);

  const refresh = () => {
    setQuiz(loadQuizState());
    setSnap(loadResultsSnapshot());

    // newest first is usually more useful
    const buf = getEventBuffer();
    setEvents(buf.slice().reverse());
  };

  React.useEffect(() => {
    refresh();
  }, []);

  const env = process.env.NEXT_PUBLIC_APP_ENV || "local";
  const isProd = env === "prod";

  if (isProd) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">Debug disabled in prod</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 900, mx: "auto" }}>
      <Stack spacing={2.5}>
        <Typography variant="h4" sx={{ fontWeight: 900 }}>
          Debug
        </Typography>

        <Typography color="text.secondary">Env: {env}</Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Button variant="outlined" onClick={refresh}>
            Refresh
          </Button>

          <Button
            variant="outlined"
            onClick={() => {
              clearResultsSnapshot();
              refresh();
            }}
          >
            Clear Results Snapshot
          </Button>

          <Button
            variant="outlined"
            onClick={() => {
              clearQuizAnswersKeepSession(false);
              refresh();
            }}
          >
            Clear Answers (keep session)
          </Button>

          <Button
            variant="outlined"
            onClick={() => {
              resetQuizState();
              refresh();
            }}
          >
            Reset Session (new sessionId)
          </Button>

          <Button
            variant="outlined"
            onClick={() => {
              clearEventBuffer();
              refresh();
            }}
          >
            Clear Event Buffer
          </Button>
        </Stack>

        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
            Quiz State (localStorage)
          </Typography>
          <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {JSON.stringify(quiz, null, 2)}
          </pre>
        </Box>

        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
            Results Snapshot (sessionStorage)
          </Typography>
          <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {JSON.stringify(snap, null, 2)}
          </pre>
        </Box>

        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5 }}>
            Event Buffer (localStorage)
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1 }}>
            Showing last {events.length} events (max 200). Newest first.
          </Typography>

          <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {JSON.stringify(events, null, 2)}
          </pre>
        </Box>
      </Stack>
    </Box>
  );
}