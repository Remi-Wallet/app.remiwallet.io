"use client";

import * as React from "react";
import { Box, Container, Typography } from "@mui/material";

export function SiteHeader() {
  return (
    <Box
      component="header"
      sx={{
        height: 56,
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        bgcolor: "rgba(236,234,235,0.8)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 2, sm: 3 },
        }}
      >
        <Typography
          sx={{
            fontWeight: 900,
            letterSpacing: "0.08em",
            color: "text.primary",
          }}
        >
          REMI
        </Typography>
      </Container>
    </Box>
  );
}