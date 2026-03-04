"use client";

import * as React from "react";
import { Stack, Card, CardActionArea, Typography, Box } from "@mui/material";
import type { QuizOption } from "@/lib/quiz/types";

export function OptionList(props: {
  options: QuizOption[];
  selected?: string | null;
  onSelect: (value: string) => void;
}) {
  const { options, selected, onSelect } = props;

  return (
    <Stack spacing={1.6}>
      {options.map((o) => {
        const isSelected = selected === o.value;

        return (
          <Card
            key={o.value}
            variant="outlined"
            sx={{
              borderRadius: 999,
              borderWidth: 2,
              borderColor: isSelected ? "primary.main" : "divider",
              backgroundColor: isSelected ? "rgba(6, 214, 160, 0.06)" : "#fff",
              transition: "transform 120ms ease, box-shadow 120ms ease, border-color 160ms ease",
              boxShadow: isSelected ? "0 10px 22px rgba(0,0,0,0.08)" : "0 8px 18px rgba(0,0,0,0.06)",
              overflow: "hidden",
            }}
          >
            <CardActionArea
              onClick={() => onSelect(o.value)}
              sx={{
                px: 2.5,
                py: 1.8,
                // subtle “premium” interactions
                "&:hover": {
                  transform: "translateY(-1px)",
                },
                "&:active": {
                  transform: "translateY(0px) scale(0.995)",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box
                  sx={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    border: "2px solid",
                    borderColor: isSelected ? "primary.main" : "rgba(0,0,0,0.28)",
                    backgroundColor: isSelected ? "primary.main" : "transparent",
                    flex: "0 0 auto",
                  }}
                />

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