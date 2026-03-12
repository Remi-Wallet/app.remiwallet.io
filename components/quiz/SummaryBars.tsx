// components/quiz/SummaryBars.tsx

"use client";

import * as React from "react";
import { Box, Stack, Typography } from "@mui/material";

type BarRow = {
  label: string;
  value: number;
  amount?: number;
  emphasis?: boolean;
};

function CountUp({ value }: { value: number }) {
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    const duration = 900;
    const start = performance.now();

    const step = (t: number) => {
      const progress = Math.min((t - start) / duration, 1);
      setDisplay(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [value]);

  return <>${display.toLocaleString()}</>;
}

export function SummaryBars(props: {
  rows?: BarRow[];
  caption?: string;
  animateOnMount?: boolean;
}) {
  const rows = props.rows ?? [];

  const [animate, setAnimate] = React.useState(!props.animateOnMount);

  React.useEffect(() => {
    if (!props.animateOnMount) return;
    const id = setTimeout(() => setAnimate(true), 80);
    return () => clearTimeout(id);
  }, [props.animateOnMount]);

  return (
    <Box
      sx={{
        border: "1px solid rgba(0,0,0,0.06)",
        borderRadius: 16,
        p: 2,
        backgroundColor: "rgba(255,255,255,0.75)",
      }}
    >
      <Stack spacing={1.5}>
        {rows.map((r, i) => {
          const width = Math.max(0, Math.min(1, r.value)) * 100;
          const delay = i * 120;

          return (
            <Stack key={r.label} spacing={0.6}>
              <Stack direction="row" justifyContent="space-between">
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: r.emphasis ? 800 : 650,
                  }}
                >
                  {r.label}
                </Typography>

                {r.amount !== undefined && (
                  <Typography sx={{ fontWeight: 700 }}>
                    <CountUp value={r.amount} />
                  </Typography>
                )}
              </Stack>

              <Box
                sx={{
                  height: 10,
                  borderRadius: 999,
                  background: "rgba(0,0,0,0.08)",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    width: animate ? `${width}%` : "0%",
                    borderRadius: 999,
                    backgroundColor: r.emphasis
                      ? "primary.main"
                      : "text.primary",
                    opacity: r.emphasis ? 1 : 0.28,
                    transition: `width 700ms cubic-bezier(.22,.61,.36,1) ${delay}ms`,
                  }}
                />
              </Box>
            </Stack>
          );
        })}

        {props.caption && (
          <Typography variant="caption" color="text.secondary">
            {props.caption}
          </Typography>
        )}
      </Stack>
    </Box>
  );
}