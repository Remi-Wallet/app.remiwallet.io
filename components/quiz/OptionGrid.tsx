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
      {options.map((o) => (
        <Grid item xs={12} sm={6} key={o.value}>
          <Card
            variant="outlined"
            sx={{
              borderWidth: 2,
              borderColor: isSelected(o.value) ? "primary.main" : "divider",
            }}
          >
            <CardActionArea onClick={() => onSelect(o.value)}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {o.label}
                </Typography>
                {o.helperText ? (
                  <Typography variant="body2" color="text.secondary">
                    {o.helperText}
                  </Typography>
                ) : null}
                {multi ? (
                  <Typography variant="caption" color="text.secondary">
                    {isSelected(o.value) ? "Selected" : "Tap to select"}
                  </Typography>
                ) : null}
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}