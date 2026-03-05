// app/site/SiteFooter.tsx
"use client";

import * as React from "react";
import { Box, Container, Link, Typography } from "@mui/material";

type SiteFooterProps = {
  year?: number;
  company?: string;
  privacyHref?: string;
  termsHref?: string;
  disclaimer?: string;

  /**
   * Footer colors: use darker emerald/teal to feel “anchored”
   * while staying compatible with the Remi green CTA.
   */
  bgTop?: string; // main footer
  bgBottom?: string; // disclaimer band
};

export function SiteFooter(props: SiteFooterProps) {
  const year = props.year ?? new Date().getFullYear();
  const company = props.company ?? "Remi Wallet, Inc.";
  const privacyHref = props.privacyHref ?? "/privacy-policy";
  const termsHref = props.termsHref ?? "/terms-of-use";

  const disclaimer =
    props.disclaimer ??
    "Remi provides informational and educational content only and does not provide financial, tax, legal, or investment advice. Optimization insights may improve as we learn more about your card setup, rewards behavior, and preferences.";

  const bgTop = props.bgTop ?? "#243447";
  const bgBottom = props.bgBottom ?? "#1B2838";

  return (
    <Box component="footer" sx={{ width: "100%", mt: "auto" }}>
      {/* Main footer row */}
      <Box
        sx={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          backgroundColor: "#0F355A",
          color: "rgba(255,255,255,0.92)",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              position: "relative",
              minHeight: 72,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                fontWeight: 500,
                letterSpacing: 0.1,
              }}
            >
              © 2026 Remi Wallet, Inc. All rights reserved.
            </Typography>

            <Box
              sx={{
                position: "absolute",
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
                display: "flex",
                gap: 3,
              }}
            >
              <Link
                href="/privacy-policy"
                style={{ textDecoration: "none", color: "inherit", fontWeight: 600 }}
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-use"
                style={{ textDecoration: "none", color: "inherit", fontWeight: 600 }}
              >
                Terms of Use
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Sub-footer disclaimer */}
      <Box
        sx={{
          backgroundColor: "#0A2642",
          color: "rgba(255,255,255,0.78)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          py: 1.75,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="caption"
            sx={{
              display: "block",
              textAlign: "center",
              lineHeight: 1.7,
              fontSize: "0.78rem",
            }}
          >
            Remi provides informational and educational content only and does not provide financial, tax, legal, or investment advice. Optimization insights may improve as we learn more about your card setup, rewards behavior, and preferences.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

// Also export default so AppShell can do: import SiteFooter from "@/components/site/SiteFooter";
export default SiteFooter;