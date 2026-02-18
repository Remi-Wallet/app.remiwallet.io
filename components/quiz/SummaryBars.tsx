"use client";

import * as React from "react";
import { Box, Stack, Typography } from "@mui/material";

type BarRow = { label: string; value: number; emphasis?: boolean };

export function SummaryBars(props: {
  rows?: BarRow[];
  caption?: string;
}) {
  const rows: BarRow[] =
    props.rows ??
    [
      { label: "Average users", value: 0.35 },
      { label: "Optimized", value: 0.65, emphasis: true },
      { label: "Fully optimized", value: 0.92 },
    ];

  return (
    <Box
      sx={{
        border: "1px solid rgba(0,0,0,0.06)",
        borderRadius: 16,
        p: 2,
        backgroundColor: "rgba(255,255,255,0.75)",
      }}
    >
      <Stack spacing={1.25}>
        {rows.map((r) => (
          <Stack key={r.label} spacing={0.75}>
            <Stack direction="row" justifyContent="space-between" alignItems="baseline">
              <Typography
                variant="body2"
                sx={{ fontWeight: r.emphasis ? 800 : 650, color: "text.primary" }}
              >
                {r.label}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {Math.round(r.value * 100)}%
              </Typography>
            </Stack>

            <Box
              sx={{
                width: "100%",
                height: 10,
                borderRadius: 999,
                backgroundColor: "rgba(0,0,0,0.08)",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  width: `${Math.max(0, Math.min(1, r.value)) * 100}%`,
                  borderRadius: 999,
                  backgroundColor: r.emphasis ? "primary.main" : "text.primary",
                  opacity: r.emphasis ? 1 : 0.28,
                  transition: "width 280ms ease",
                }}
              />
            </Box>
          </Stack>
        ))}

        {props.caption ? (
          <Typography variant="caption" color="text.secondary">
            {props.caption}
          </Typography>
        ) : null}
      </Stack>
    </Box>
  );
}