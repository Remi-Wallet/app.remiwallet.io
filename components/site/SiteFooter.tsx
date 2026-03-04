"use client";

import * as React from "react";
import { Box, Container, Link, Typography } from "@mui/material";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <Box component="footer" sx={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
      {/* Main footer row */}
      <Box sx={{ py: 1.25, bgcolor: "rgba(236,234,235,0.8)", backdropFilter: "blur(10px)" }}>
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
            © {year} Remi Wallet Inc.
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Link href="/terms-of-use" underline="hover" sx={{ color: "text.secondary", fontSize: 12 }}>
              Terms
            </Link>
            <Link href="/privacy-policy" underline="hover" sx={{ color: "text.secondary", fontSize: 12 }}>
              Privacy
            </Link>
          </Box>
        </Container>
      </Box>

      {/* Sub footer disclaimer */}
      <Box sx={{ py: 1, bgcolor: "rgba(236,234,235,0.6)" }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
          <Typography variant="caption" sx={{ color: "rgba(0,0,0,0.45)" }}>
            Disclaimer: Remi does not provide financial advice. Reward optimization estimates improve as we learn more
            about your spending and preferences.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}