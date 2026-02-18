"use client";

import * as React from "react";
import { Box } from "@mui/material";

export function ProgressBar(props: { value: number; max: number }) {
  const pct = Math.max(0, Math.min(1, props.value / props.max));

  return (
    <Box
      sx={{
        width: "100%",
        height: 8,
        borderRadius: 999,
        backgroundColor: "rgba(0,0,0,0.08)",
        overflow: "hidden",
      }}
      aria-label="Progress"
    >
      <Box
        sx={{
          height: "100%",
          width: `${pct * 100}%`,
          borderRadius: 999,
          backgroundColor: "text.primary", // navy
          transition: "width 240ms ease",
        }}
      />
    </Box>
  );
}