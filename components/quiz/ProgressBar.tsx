"use client";

import * as React from "react";
import { Box } from "@mui/material";

export function ProgressBar(props: { current: number; total: number }) {
  const pct = Math.max(0, Math.min(1, props.current / props.total));

  return (
    <Box
      sx={{
        width: "100%",
        height: 6,
        borderRadius: 999,
        backgroundColor: "rgba(0,0,0,0.08)",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: `${pct * 100}%`,
          borderRadius: 999,

          // Use your Remi green; keep it subtle & consistent
          backgroundColor: "#06D6A0",

          transition: "width 220ms ease",
        }}
      />
    </Box>
  );
}