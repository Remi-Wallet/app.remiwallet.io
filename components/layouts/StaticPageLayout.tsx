// components/layouts/StaticPageLayout.tsx

"use client";

import * as React from "react";
import { Box, Container, Typography } from "@mui/material";
import { tokens } from "@/theme/tokens";

type StaticPageLayoutProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function StaticPageLayout({
  eyebrow,
  title,
  subtitle,
  children,
}: StaticPageLayoutProps) {
  return (
    <Box
      sx={{
        width: "100%",
        py: { xs: 5, sm: 7, md: 9 },
      }}
    >
      <Container maxWidth={false} sx={{ maxWidth: tokens.layout.contentMax, px: { xs: 2, sm: 3 } }}>
        <Box sx={{ maxWidth: 760, mx: "auto" }}>
          {eyebrow ? (
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: tokens.typography.weight.bold,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: tokens.color.semantic.text.secondary,
                mb: 1.25,
              }}
            >
              {eyebrow}
            </Typography>
          ) : null}

          <Typography
            sx={{
              fontSize: { xs: 34, sm: 46, md: 56 },
              lineHeight: { xs: 1.08, sm: 1.04, md: 1.02 },
              fontWeight: tokens.typography.weight.extrabold,
              letterSpacing: tokens.typography.letterSpacing.tight,
              color: tokens.color.semantic.text.primary,
              mb: subtitle ? 1.5 : 3,
            }}
          >
            {title}
          </Typography>

          {subtitle ? (
            <Typography
              sx={{
                fontSize: { xs: 18, sm: 20 },
                lineHeight: 1.55,
                color: tokens.color.semantic.text.secondary,
                maxWidth: 680,
                mb: 4,
              }}
            >
              {subtitle}
            </Typography>
          ) : null}

          <Box>{children}</Box>
        </Box>
      </Container>
    </Box>
  );
}