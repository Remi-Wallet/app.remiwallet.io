"use client";

import * as React from "react";
import { Box, Container, Typography } from "@mui/material";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";

function formatEnvLabel(env: string) {
  if (!env) return "Unknown";
  return env.charAt(0).toUpperCase() + env.slice(1).toLowerCase();
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const env = process.env.NEXT_PUBLIC_APP_ENV || "local";
  const isProd = env === "prod";
  const envLabel = formatEnvLabel(env);

  const debugItems = [
    { label: "Env", value: envLabel },
    // Uncomment later as needed:
    // { label: "Build", value: process.env.NEXT_PUBLIC_BUILD_ID },
    // { label: "Tier", value: "B" },
    // { label: "Score", value: "7" },
  ].filter((item) => item.value);

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        background:
          "linear-gradient(180deg, rgba(214,232,255,0.55) 0%, #ECEAEB 40%, #ECEAEB 100%)",
      }}
    >
      {!isProd ? (
        <Box
          sx={{
            bgcolor: "#ff6b00",
            color: "#ffffff",
            borderBottom: "1px solid rgba(0,0,0,0.08)",
            px: 2,
            py: 0.75,
          }}
        >
          <Box
            sx={{
              maxWidth: 1200,
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.25,
              textAlign: "center",
              minHeight: 44,
            }}
          >
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 0.75,
                lineHeight: 1,
              }}
            >
              <Box
                component="span"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 16,
                  height: 16,
                  flexShrink: 0,
                  "& svg": {
                    display: "block",
                    width: 16,
                    height: 16,
                  },
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10.29 3.86 1.82 18A2 2 0 0 0 3.53 21h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </Box>

              <Typography
                component="span"
                sx={{
                  fontSize: 14,
                  fontWeight: 900,
                  letterSpacing: 0.3,
                  lineHeight: 1.1,
                }}
              >
                Sandbox Mode
              </Typography>
            </Box>

            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 600,
                opacity: 0.9,
                lineHeight: 1.2,
              }}
            >
              {debugItems.map((item) => `${item.label}: ${item.value}`).join(" • ")}
            </Typography>
          </Box>
        </Box>
      ) : null}

      <SiteHeader />

      <Box component="main" sx={{ flex: 1 }}>
        {children}
      </Box>

      <SiteFooter />
    </Box>
  );
}