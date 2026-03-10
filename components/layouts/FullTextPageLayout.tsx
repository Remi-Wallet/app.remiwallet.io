// components/layouts/FullTextPageLayout.tsx

"use client";

import * as React from "react";
import { Box, Typography } from "@mui/material";
import { tokens } from "@/theme/tokens";
import PageContainer from "@/components/layouts/PageContainer";

type FullTextPageLayoutProps = {
  title: string;
  lastUpdated?: string;
  children: React.ReactNode;
};

export function FullTextPageLayout({
  title,
  lastUpdated,
  children,
}: FullTextPageLayoutProps) {
  return (
    <PageContainer maxWidth={tokens.layout.contentMax} py={{ xs: 4, sm: 6, md: 7 }}>
      <Box sx={{ maxWidth: 760, mx: "auto" }}>
        <Typography
          sx={{
            fontSize: { xs: 32, sm: 42, md: 48 },
            lineHeight: 1.05,
            fontWeight: tokens.typography.weight.extrabold,
            color: tokens.color.semantic.text.primary,
            mb: 1,
          }}
        >
          {title}
        </Typography>

        {lastUpdated ? (
          <Typography
            sx={{
              fontSize: 14,
              color: tokens.color.semantic.text.secondary,
              mb: 4,
            }}
          >
            Last updated: {lastUpdated}
          </Typography>
        ) : null}

        <Box
          sx={{
            color: tokens.color.semantic.text.primary,
            "& p": {
              fontSize: 16,
              lineHeight: 1.75,
              color: tokens.color.semantic.text.secondary,
              mb: 2.25,
            },
            "& h2": {
              fontSize: { xs: 22, sm: 26 },
              lineHeight: 1.2,
              fontWeight: tokens.typography.weight.bold,
              color: tokens.color.semantic.text.primary,
              mt: 4,
              mb: 1.25,
            },
            "& ul": {
              pl: 3,
              mb: 2.25,
            },
            "& li": {
              color: tokens.color.semantic.text.secondary,
              lineHeight: 1.75,
              mb: 0.75,
            },
            "& a": {
              color: tokens.color.semantic.text.primary,
              textDecoration: "underline",
              textUnderlineOffset: "2px",
            },
          }}
        >
          {children}
        </Box>
      </Box>
    </PageContainer>
  );
}