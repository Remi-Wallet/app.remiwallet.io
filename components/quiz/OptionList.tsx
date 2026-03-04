"use client";

import * as React from "react";
import { Stack, ButtonBase, Typography, Box } from "@mui/material";
import type { QuizOption } from "@/lib/quiz/types";

export function OptionList(props: {
  options: QuizOption[];
  selected?: string | null;
  onSelect: (value: string) => void;
}) {
  return (
    <Stack spacing={1.25}>
      {props.options.map((o) => {
        const selected = props.selected === o.value;

        // Optional “icon” support without forcing it into your type yet.
        // If you later add `emoji` or `icon` to QuizOption, this will just work.
        const anyOpt = o as any;
        const leading = anyOpt.icon ?? anyOpt.emoji ?? null;

        return (
          <ButtonBase
            key={o.value}
            onClick={() => props.onSelect(o.value)}
            focusRipple
            aria-pressed={selected}
            sx={{
              width: "100%",
              textAlign: "left",
              borderRadius: 16,
              border: "2px solid",
              borderColor: selected ? "primary.main" : "rgba(0,0,0,0.10)",
              backgroundColor: selected ? "rgba(6,214,160,0.06)" : "#fff",
              px: 2,
              py: 1.75,
              minHeight: 62,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1.5,
              transition:
                "border-color 140ms ease, background-color 140ms ease, transform 120ms ease, box-shadow 140ms ease",
              "&:hover": {
                borderColor: selected ? "primary.main" : "rgba(0,0,0,0.16)",
                backgroundColor: selected ? "rgba(6,214,160,0.07)" : "rgba(0,0,0,0.01)",
                boxShadow: selected ? "none" : "0 1px 0 rgba(0,0,0,0.03)",
              },
              "&:active": { transform: "scale(0.995)" },
            }}
          >
            {/* Left side */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, minWidth: 0 }}>
              {/* Optional icon/emoji */}
              {leading ? (
                <Box
                  aria-hidden
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: 999,
                    display: "grid",
                    placeItems: "center",
                    flex: "0 0 auto",
                    color: "text.secondary",
                    backgroundColor: selected ? "rgba(6,214,160,0.10)" : "rgba(0,0,0,0.04)",
                  }}
                >
                  <Typography sx={{ fontSize: 16, lineHeight: 1 }}>{leading}</Typography>
                </Box>
              ) : null}

              <Box sx={{ minWidth: 0 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 750,
                    lineHeight: 1.15,
                    letterSpacing: "-0.01em",
                    color: "text.primary",
                  }}
                >
                  {o.label}
                </Typography>

                {o.helperText ? (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.35, lineHeight: 1.25 }}
                  >
                    {o.helperText}
                  </Typography>
                ) : null}
              </Box>
            </Box>

            {/* Right side: subtle selection indicator */}
            <Box
              aria-hidden
              sx={{
                width: 10,
                height: 10,
                borderRadius: 999,
                border: "2px solid",
                borderColor: selected ? "primary.main" : "rgba(0,0,0,0.18)",
                backgroundColor: selected ? "primary.main" : "transparent",
                flex: "0 0 auto",
              }}
            />
          </ButtonBase>
        );
      })}
    </Stack>
  );
}