"use client";

import * as React from "react";
import { Box } from "@mui/material";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export function AppShell({ children }: { children: React.ReactNode }) {
  const env = process.env.NEXT_PUBLIC_APP_ENV || "prod";
  const isProd = env === "prod";

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        // subtle “wash” like NerdWallet
        background: "linear-gradient(180deg, rgba(214,232,255,0.55) 0%, #ECEAEB 40%, #ECEAEB 100%)",
      }}
    >
      {!isProd ? (
        <Box
          sx={{
            bgcolor: "#ff00ff",
            color: "#000",
            fontWeight: 900,
            textAlign: "center",
            py: 1,
            letterSpacing: 0.4,
          }}
        >
          {env.toUpperCase()} ENVIRONMENT
        </Box>
      ) : null}

      <SiteHeader />

      {/* ✅ main centers children and ensures full-width */}
      <Box
        component="main"
        sx={{
          flex: 1,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",
          px: { xs: 2, sm: 3 },
          py: { xs: 2, sm: 4 },
        }}
      >
        {children}
      </Box>

      <SiteFooter />
    </Box>
  );
}