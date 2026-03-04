"use client";

import * as React from "react";
import { Box } from "@mui/material";

export function ProgressBar(props: { current: number; total: number }) {
  const { current, total } = props;

  const safeTotal = Math.max(1, total);
  const clamped = Math.min(Math.max(current, 0), safeTotal);
  const pct = (clamped / safeTotal) * 100;

  return (
    <Box
      sx={{
        width: "100%",
        height: 6,
        borderRadius: 999,
        backgroundColor: (theme) => theme.palette.divider,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: `${pct}%`,
          height: "100%",
          borderRadius: 999,
          backgroundColor: (theme) => theme.palette.primary.main,
          transition: "width 240ms ease",
        }}
      />
    </Box>
  );
}