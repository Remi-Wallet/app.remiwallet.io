"use client";

import * as React from "react";
import { Box, useMediaQuery } from "@mui/material";

export function ProgressBar(props: { value: number; max: number }) {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const pct = props.max > 0 ? Math.max(0, Math.min(1, props.value / props.max)) : 0;

  const valueNow = Math.round(pct * 100);

  return (
    <Box
      role="progressbar"
      aria-label="Progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={valueNow}
      sx={{
        width: "100%",
        height: { xs: 6, sm: 8 },
        borderRadius: 999,
        backgroundColor: "rgba(0,0,0,0.08)",
        overflow: "hidden",
        // tiny premium feel without being “glossy”
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.55)",
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: `${pct * 100}%`,
          borderRadius: 999,
          // primary is your navy in theme
          backgroundColor: "primary.main",
          transition: reducedMotion ? "none" : "width 240ms ease",
        }}
      />
    </Box>
  );
}