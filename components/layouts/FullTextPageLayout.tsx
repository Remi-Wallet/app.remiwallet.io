"use client";

import * as React from "react";
import { Box, Container, Typography } from "@mui/material";

type FullTextPageLayoutProps = {
  title: string;
  lastUpdated?: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg";
};

export function FullTextPageLayout({
  title,
  lastUpdated,
  children,
  maxWidth = "md",
}: FullTextPageLayoutProps) {
  return (
    <Box
      component="main"
      sx={{
        width: "100%",
        pt: { xs: 6, md: 8 },
        pb: { xs: 8, md: 10 },
      }}
    >
      <Container maxWidth={maxWidth}>
        <Box
          sx={{
            maxWidth: 860,
            mx: "auto",
          }}
        >
          <Box sx={{ mb: { xs: 4, md: 5 } }}>
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: "2.25rem", md: "3.25rem" },
                lineHeight: 1.05,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#003D73",
                mb: 1.25,
              }}
            >
              {title}
            </Typography>

            {lastUpdated ? (
              <Typography
                sx={{
                  fontSize: "0.95rem",
                  lineHeight: 1.5,
                  color: "#9A8F97",
                }}
              >
                Last updated: {lastUpdated}
              </Typography>
            ) : null}
          </Box>

          <Box
            sx={{
              "& h2": {
                fontSize: { xs: "1.35rem", md: "1.7rem" },
                lineHeight: 1.2,
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: "#003D73",
                mt: { xs: 4.5, md: 5 },
                mb: 1.25,
              },
              "& h3": {
                fontSize: { xs: "1.05rem", md: "1.15rem" },
                lineHeight: 1.3,
                fontWeight: 700,
                color: "#003D73",
                mt: 3,
                mb: 1,
              },
              "& p": {
                fontSize: { xs: "1rem", md: "1.05rem" },
                lineHeight: 1.8,
                color: "#24476f",
                mb: 1.5,
              },
              "& ul, & ol": {
                pl: 3,
                my: 1.25,
              },
              "& li": {
                color: "#24476f",
                fontSize: { xs: "1rem", md: "1.05rem" },
                lineHeight: 1.8,
                mb: 0.6,
              },
              "& li > p": {
                mb: 0,
              },
              "& strong": {
                color: "#003D73",
                fontWeight: 700,
              },
              "& a": {
                color: "#003D73",
                textDecorationColor: "rgba(0,61,115,0.35)",
                textUnderlineOffset: "2px",
                "&:hover": {
                  textDecorationColor: "#003D73",
                },
              },
            }}
          >
            {children}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}