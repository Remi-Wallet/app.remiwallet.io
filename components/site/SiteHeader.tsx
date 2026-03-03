"use client";

import * as React from "react";
import { Box, Container, Typography } from "@mui/material";

export function SiteHeader(props: { brand?: string; tagline?: string }) {
  const brand = props.brand ?? "REMI";
  const tagline = props.tagline;

  return (
    <Box
      component="header"
      sx={{
        height: 56,
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        bgcolor: "transparent",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: { xs: 2, sm: 3 },
        }}
      >
        <Box sx={{ textAlign: "right", lineHeight: 1 }}>
          <Typography
            sx={{
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "text.primary",
            }}
          >
            {brand}
          </Typography>

          {tagline ? (
            <Typography
              variant="caption"
              sx={{
                display: "block",
                color: "text.secondary",
                mt: 0.25,
              }}
            >
              {tagline}
            </Typography>
          ) : null}
        </Box>
      </Container>
    </Box>
  );
}