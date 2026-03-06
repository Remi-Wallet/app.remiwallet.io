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
   * Footer colors
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
    "Remi provides informational and educational content through this waitlist and beta experience only. Remi does not provide financial, tax, legal, or investment advice. Any rewards estimates, optimization insights, or product descriptions are illustrative and may change.";

  // Defaults match the current stage styling
  const bgTop = props.bgTop ?? "#0F355A";
  const bgBottom = props.bgBottom ?? "#0A2642";

  return (
    <Box component="footer" sx={{ width: "100%", mt: "auto" }}>
      {/* Main footer row */}
      <Box
        sx={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          backgroundColor: bgTop,
          color: "rgba(255,255,255,0.92)",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              px: 2,
              py: 2,
              // Desktop: 3-column grid (left spacer | centered copyright | right-aligned links)
              // Mobile: stacked (copyright then links)
              display: { xs: "flex", sm: "grid" },
              flexDirection: { xs: "column" },
              alignItems: "center",
              justifyContent: "center",
              gridTemplateColumns: { sm: "1fr auto 1fr" },
              columnGap: 2,
              rowGap: { xs: 1, sm: 0 },
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            {/* Spacer column so the copyright can truly sit centered while links are right-aligned */}
            <Box sx={{ display: { xs: "none", sm: "block" } }} />

            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                letterSpacing: 0.1,
                opacity: 0.9,
                justifySelf: { sm: "center" },
              }}
            >
              © {year} {company}. All rights reserved.
            </Typography>

            {/* Link group */}
            <Box
              sx={{
                display: "flex",
                gap: 3,
                flexWrap: "wrap",
                justifyContent: { xs: "center", sm: "flex-end" },
                width: { xs: "100%", sm: "auto" },
                justifySelf: { sm: "end" },
              }}
            >
              <Link
                href={privacyHref}
                underline="hover"
                color="inherit"
                sx={{ fontWeight: 600, whiteSpace: "nowrap" }}
              >
                Privacy Policy
              </Link>
              <Link
                href={termsHref}
                underline="hover"
                color="inherit"
                sx={{ fontWeight: 600, whiteSpace: "nowrap" }}
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
          backgroundColor: bgBottom,
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
              px: 2,
            }}
          >
            {disclaimer}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

// Also export default so AppShell can do: import SiteFooter from "@/components/site/SiteFooter";
export default SiteFooter;