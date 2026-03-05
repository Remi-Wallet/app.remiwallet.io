// app/site/SiteHeader.tsx

"use client";

import Link from "next/link";
import { Box, Container, Typography } from "@mui/material";

export default function SiteHeader() {
  return (
    <Box
      component="header"
      sx={{
        width: "100%",
        bgcolor: "rgba(255,255,255,0.55)",          // less stark than white
        backdropFilter: "blur(10px)",               // makes it feel more “native”
        borderBottom: "1px solid rgba(0,0,0,0.06)", // subtle definition
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            minHeight: 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: { xs: 1, sm: 0 },
          }}
        >
          <Typography
            component={Link}
            href="/"
            sx={{
              textDecoration: "none",
              color: "#003D73",
              fontSize: { xs: "1.08rem", sm: "1.12rem", md: "1.2rem" },
              fontWeight: 800,
              letterSpacing: "0.12em",
              lineHeight: 1,
              textTransform: "uppercase",
              transition: "opacity 160ms ease",
              "&:hover": {
                opacity: 0.82,
              },
            }}
          >
            Remi
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}