"use client";

import * as React from "react";
import { Grid, Card, CardActionArea, CardContent, Typography } from "@mui/material";
import type { QuizOption } from "@/lib/quiz/types";

export function OptionGrid(props: {
  options: QuizOption[];
  selected?: string | string[] | null;
  onSelect: (value: string) => void;
  multi?: boolean;
}) {
  const { options, selected, onSelect, multi } = props;

  const isSelected = (v: string) => {
    if (!selected) return false;
    if (Array.isArray(selected)) return selected.includes(v);
    return selected === v;
  };

  return (
    <Grid container spacing={2}>
      {options.map((o) => {
        const active = isSelected(o.value);

        return (
          <Grid item xs={12} sm={6} key={o.value}>
            <Card
              variant="outlined"
              sx={{
                borderRadius: 3,
                borderWidth: 2,
                borderColor: active ? "primary.main" : "divider",
                backgroundColor: active ? "rgba(6, 214, 160, 0.06)" : "#fff",
                transition: "transform 120ms ease, box-shadow 140ms ease, border-color 160ms ease",
                boxShadow: active ? "0 12px 26px rgba(0,0,0,0.10)" : "0 10px 22px rgba(0,0,0,0.06)",
                overflow: "hidden",
              }}
            >
              <CardActionArea
                onClick={() => onSelect(o.value)}
                sx={{
                  "&:hover": { transform: "translateY(-1px)" },
                  "&:active": { transform: "translateY(0px) scale(0.995)" },
                }}
              >
                <CardContent sx={{ py: 2.25 }}>
                  <Typography sx={{ fontWeight: 800, fontSize: 16 }}>
                    {o.label}
                  </Typography>

                  {o.helperText ? (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {o.helperText}
                    </Typography>
                  ) : null}

                  {multi ? (
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                      {active ? "Selected" : "Tap to select"}
                    </Typography>
                  ) : null}
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}