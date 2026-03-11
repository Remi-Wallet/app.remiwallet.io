// components/quiz/OptionGrid.tsx

"use client";

import * as React from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import type { QuizOption } from "@/lib/quiz/types";

export function OptionGrid(props: {
  options: QuizOption[];
  selected?: string[] | null;
  maxSelect?: number;
  onSelect: (value: string) => void;
}) {
  const selected = props.selected ?? [];
  const isSelected = (v: string) => selected.includes(v);

  return (
    <Grid container spacing={2}>
      {props.options.map((o) => {
        const active = isSelected(o.value);

        return (
          <Grid key={o.value} item xs={12} sm={6}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 6,
                border: "1px solid",
                borderColor: active ? "#06D6A0" : "rgba(0,0,0,0.12)",
                backgroundColor: active ? "rgba(6,214,160,0.06)" : "#fff",
                boxShadow: active
                  ? "0 10px 28px rgba(0,0,0,0.10)"
                  : "0 10px 24px rgba(0,0,0,0.06)",
                transition:
                  "transform 120ms ease, box-shadow 180ms ease, border-color 180ms ease, background-color 180ms ease",
                transform: active ? "translateY(-1px)" : "translateY(0)",
              }}
            >
              <CardActionArea
                onClick={() => props.onSelect(o.value)}
                sx={{
                  borderRadius: 6,
                  px: 0,
                  "&:hover .remiGridTitle": { opacity: 0.95 },
                  "&:active": { transform: "scale(0.99)" },
                }}
              >
                <CardContent sx={{ py: 2.25 }}>
                  <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        className="remiGridTitle"
                        variant="subtitle1"
                        sx={{ fontWeight: 800 }}
                      >
                        {o.label}
                      </Typography>

                      {o.helperText ? (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mt: 0.5 }}
                        >
                          {o.helperText}
                        </Typography>
                      ) : null}

                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: "block", mt: 1 }}
                      >
                        {active ? "Selected" : "Tap to select"}
                      </Typography>
                    </Box>

                    {active ? (
                      <CheckCircleIcon sx={{ color: "#06D6A0", mt: 0.2 }} />
                    ) : null}
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}