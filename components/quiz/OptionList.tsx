"use client";

import * as React from "react";
import { Stack, ButtonBase, Typography, Box } from "@mui/material";
import type { QuizOption } from "@/lib/quiz/screens";

export function OptionList(props: {
  options: QuizOption[];
  selected?: string | null;
  onSelect: (value: string) => void;
}) {
  return (
    <Stack spacing={1.25}>
      {props.options.map((o) => {
        const selected = props.selected === o.value;

        return (
          <ButtonBase
            key={o.value}
            onClick={() => props.onSelect(o.value)}
            focusRipple
            sx={{
              width: "100%",
              textAlign: "left",
              borderRadius: 16,
              border: "2px solid",
              borderColor: selected ? "primary.main" : "rgba(0,0,0,0.10)",
              backgroundColor: selected ? "rgba(6,214,160,0.06)" : "#fff",
              padding: "16px 16px",
              minHeight: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transition: "border-color 140ms ease, background-color 140ms ease, transform 120ms ease",
              "&:hover": {
                borderColor: selected ? "primary.main" : "rgba(0,0,0,0.16)",
                backgroundColor: selected ? "rgba(6,214,160,0.07)" : "rgba(0,0,0,0.01)",
              },
              "&:active": { transform: "scale(0.995)" },
            }}
          >
            <Box sx={{ pr: 1.5 }}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 750, lineHeight: 1.2 }}
              >
                {o.label}
              </Typography>

              {o.helperText ? (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                  {o.helperText}
                </Typography>
              ) : null}
            </Box>

            {/* subtle selection indicator without being flashy */}
            <Box
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
