"use client";

import * as React from "react";
import { Grid, Card, CardActionArea, CardContent, Typography, Box } from "@mui/material";
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
    <Grid container spacing={1.5}>
      {options.map((o) => {
        const selected = isSelected(o.value);

        return (
          <Grid item xs={12} sm={6} key={o.value}>
            <Card
              variant="outlined"
              sx={{
                borderRadius: 16,
                borderWidth: 2,
                borderColor: selected ? "primary.main" : "rgba(0,0,0,0.10)",
                backgroundColor: selected ? "rgba(6,214,160,0.06)" : "#fff",
                boxShadow: selected ? "0 14px 36px rgba(0,0,0,0.10)" : "0 10px 26px rgba(0,0,0,0.06)",
                transition:
                  "border-color 140ms ease, background-color 140ms ease, box-shadow 140ms ease, transform 120ms ease",
                "&:hover": {
                  borderColor: selected ? "primary.main" : "rgba(0,0,0,0.16)",
                  backgroundColor: selected ? "rgba(6,214,160,0.07)" : "rgba(0,0,0,0.01)",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.10)",
                },
              }}
            >
              <CardActionArea
                onClick={() => onSelect(o.value)}
                sx={{
                  borderRadius: 16,
                  "&:active": { transform: "scale(0.995)" },
                  "&:focus-visible": {
                    outline: "3px solid rgba(6,214,160,0.35)",
                    outlineOffset: "2px",
                  },
                }}
              >
                <CardContent sx={{ p: 2.25 }}>
                  <Box sx={{ display: "flex", gap: 1.25, alignItems: "flex-start" }}>
                    {o.icon ? (
                      <Box
                        aria-hidden
                        sx={{
                          mt: "2px",
                          width: 30,
                          height: 30,
                          borderRadius: 999,
                          bgcolor: "rgba(0,0,0,0.04)",
                          display: "grid",
                          placeItems: "center",
                          flex: "0 0 auto",
                          fontSize: 16,
                        }}
                      >
                        {o.icon}
                      </Box>
                    ) : null}

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
                        {o.label}
                      </Typography>

                      {o.helperText ? (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.35 }}>
                          {o.helperText}
                        </Typography>
                      ) : null}

                      {multi ? (
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.75, display: "block" }}>
                          {selected ? "Selected" : "Tap to select"}
                        </Typography>
                      ) : null}
                    </Box>

                    {/* subtle selection indicator */}
                    <Box
                      sx={{
                        mt: "6px",
                        width: 10,
                        height: 10,
                        borderRadius: 999,
                        border: "2px solid",
                        borderColor: selected ? "primary.main" : "rgba(0,0,0,0.18)",
                        backgroundColor: selected ? "primary.main" : "transparent",
                        flex: "0 0 auto",
                      }}
                    />
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