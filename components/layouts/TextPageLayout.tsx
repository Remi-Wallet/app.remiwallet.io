"use client";

import { Box, Container, Typography } from "@mui/material";

type LegalPageLayoutProps = {
  title: string;
  lastUpdated?: string;
  children: React.ReactNode;
};

export default function LegalPageLayout({
  title,
  lastUpdated,
  children,
}: LegalPageLayoutProps) {
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fff", py: { xs: 6, md: 8 } }}>
      <Container maxWidth="md">
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 800 }}
        >
          {title}
        </Typography>

        {lastUpdated ? (
          <Typography variant="body2" color="text.secondary" paragraph>
            Last updated: {lastUpdated}
          </Typography>
        ) : null}

        <Box
          sx={{
            mt: 3,
            "& h2": {
              fontSize: { xs: "1.35rem", md: "1.6rem" },
              fontWeight: 700,
              mt: 4,
              mb: 1.5,
              color: "text.primary",
            },
            "& p": {
              fontSize: "1rem",
              lineHeight: 1.7,
              color: "text.primary",
              mb: 2,
            },
            "& ul": {
              pl: 3,
              mb: 2,
            },
            "& li": {
              mb: 1,
              lineHeight: 1.7,
            },
          }}
        >
          {children}
        </Box>
      </Container>
    </Box>
  );
}