// app/providers.tsx

"use client";

import * as React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import { theme } from "@/theme/theme";

Amplify.configure(outputs);

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}