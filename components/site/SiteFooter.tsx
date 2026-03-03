"use client";

import * as React from "react";
import { Box, Container, Link, Typography } from "@mui/material";

export function SiteFooter(props: {
  year?: number;
  company?: string;
  privacyHref?: string;
  termsHref?: string;
}) {
  const year = props.year ?? new Date().getFullYear();
  const company = props.company ?? "Remi Wallet Inc.";
  const privacyHref = props.privacyHref ?? "/privacy-policy";
  const termsHref = props.termsHref ?? "/terms-of-use";

  return (
    <Box
      component="footer"
      sx={{
        height: 52,
        display: "flex",
        alignItems: "center",
        borderTop: "1px solid rgba(0,0,0,0.06)",
        bgcolor: "transparent",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: { xs: 2, sm: 3 },
        }}
      >
        <Typography variant="caption" color="text.secondary">
          © {year} {company}. All rights reserved.
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Link
            href={privacyHref}
            underline="hover"
            sx={{ color: "text.secondary", fontSize: 12 }}
          >
            Privacy Policy
          </Link>
          <Link
            href={termsHref}
            underline="hover"
            sx={{ color: "text.secondary", fontSize: 12 }}
          >
            Terms of Use
          </Link>
        </Box>
      </Container>
    </Box>
  );
}