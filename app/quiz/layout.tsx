// app/quiz/layout.tsx
import * as React from "react";
import { Box } from "@mui/material";

/**
 * Quiz-level layout wrapper for all /quiz/* routes.
 * Keep this minimal for v1; add shared quiz chrome here later (logo, footer, etc).
 */
export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        minHeight: "100dvh",
        backgroundColor: "background.default", // platinum from theme
      }}
    >
      {children}
    </Box>
  );
}