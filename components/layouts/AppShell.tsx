"use client";

import * as React from "react";
import { Box } from "@mui/material";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export function AppShell({ children }: { children: React.ReactNode }) {
  const env = process.env.NEXT_PUBLIC_APP_ENV || "local";
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
            bgcolor: "#ff6b00",
            color: "#ffffff",
            fontWeight: 900,
            textAlign: "center",
            py: 1,
            letterSpacing: 0.4,
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg> Sandbox Mode {env}
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