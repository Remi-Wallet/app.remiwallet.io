// components/quiz/OptionList.tsx

"use client";

import * as React from "react";
import { Stack, Card, CardActionArea, Typography, Box } from "@mui/material";
import type { QuizOption } from "@/lib/quiz/types";

type OptionListSingleProps = {
  options: QuizOption[];
  mode?: "single";
  selected?: string | null;
  onSelect: (value: string) => void;
};

type OptionListMultiProps = {
  options: QuizOption[];
  mode: "multi";
  selectedValues: string[];
  onToggle: (value: string) => void;
  maxSelect?: number;
};

type OptionListProps = OptionListSingleProps | OptionListMultiProps;

export function OptionList(props: OptionListProps) {
  const isMulti = props.mode === "multi";

  const isSelected = (value: string) => {
    if (isMulti) return props.selectedValues.includes(value);
    return props.selected === value;
  };

  const handleClick = (value: string) => {
    if (!isMulti) {
      props.onSelect(value);
      return;
    }

    const already = props.selectedValues.includes(value);
    const nextCount = already ? props.selectedValues.length - 1 : props.selectedValues.length + 1;

    if (!already && typeof props.maxSelect === "number" && nextCount > props.maxSelect) return;

    // subtle haptic when user reaches the max selection count
    if (!already && typeof props.maxSelect === "number" && nextCount === props.maxSelect) {
      try {
        navigator.vibrate?.([8, 20, 8]);
      } catch {
        // ignore
      }
    }

    props.onToggle(value);
  };

  return (
    <Stack spacing={1.6}>
      {props.options.map((o) => {
        const active = isSelected(o.value);

        return (
          <Card
            key={o.value}
            variant="outlined"
            sx={{
              borderRadius: 999,
              borderWidth: 2,
              borderColor: active ? "primary.main" : "divider",
              backgroundColor: active ? "rgba(6, 214, 160, 0.07)" : "#fff",
              transition: "transform 120ms ease, box-shadow 120ms ease, border-color 160ms ease",
              boxShadow: active ? "0 12px 24px rgba(0,0,0,0.10)" : "0 8px 18px rgba(0,0,0,0.06)",
              overflow: "hidden",
            }}
          >
            <CardActionArea
              onClick={() => handleClick(o.value)}
              sx={{
                px: 2.5,
                py: 1.8,
                "&:hover": { transform: "translateY(-1px)" },
                "&:active": { transform: "translateY(0px) scale(0.995)" },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                {/* Selection indicator first */}
                <Box
                  sx={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    border: "2px solid",
                    borderColor: active ? "primary.main" : "rgba(0,0,0,0.28)",
                    backgroundColor: active ? "primary.main" : "transparent",
                    flex: "0 0 auto",
                  }}
                />

                {/* Icon becomes part of the content, next to the label */}
                {o.icon ? (
                  <Box
                    aria-hidden
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: "999px",
                      display: "grid",
                      placeItems: "center",
                      flex: "0 0 auto",
                      bgcolor: "rgba(6,214,160,0.10)",
                      border: "1px solid rgba(6,214,160,0.18)",
                    }}
                  >
                    <Typography sx={{ fontSize: 16, lineHeight: 1 }}>{o.icon}</Typography>
                  </Box>
                ) : null}

                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontWeight: 800,
                      color: "text.primary",
                      fontSize: { xs: 16, sm: 17 },
                    }}
                  >
                    {o.label}
                  </Typography>

                  {o.helperText ? (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                      {o.helperText}
                    </Typography>
                  ) : null}
                </Box>
              </Box>
            </CardActionArea>
          </Card>
        );
      })}
    </Stack>
  );
}