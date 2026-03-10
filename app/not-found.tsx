// app/not-found.tsx

import Link from "next/link";
import { Box, Button, Stack, Typography } from "@mui/material";
import { tokens } from "@/theme/tokens";
import PageContainer from "@/components/layouts/PageContainer";

export default function NotFound() {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* soft brand background */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `
            radial-gradient(circle at 18% 22%, rgba(6,214,160,0.12), transparent 28%),
            radial-gradient(circle at 82% 18%, rgba(11,43,70,0.08), transparent 26%),
            radial-gradient(circle at 50% 78%, rgba(20,70,111,0.08), transparent 30%)
          `,
        }}
      />

      <PageContainer py={{ xs: 6, sm: 8, md: 10 }}>
        <Box
          sx={{
            position: "relative",
            maxWidth: 720,
            mx: "auto",
          }}
        >
          <Stack spacing={2.5}>
            <Typography
              sx={{
                fontSize: { xs: 72, sm: 108, md: 132 },
                lineHeight: 0.92,
                fontWeight: tokens.typography.weight.extrabold,
                letterSpacing: tokens.typography.letterSpacing.tight,
                color: tokens.color.semantic.text.primary,
              }}
            >
              404
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: 28, sm: 38 },
                lineHeight: 1.08,
                fontWeight: tokens.typography.weight.extrabold,
                color: tokens.color.semantic.text.primary,
                maxWidth: 560,
              }}
            >
              This page wandered off the rewards chart.
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: 17, sm: 19 },
                lineHeight: 1.6,
                color: tokens.color.semantic.text.secondary,
                maxWidth: 620,
              }}
            >
              The page you’re looking for doesn’t exist, moved, or never made it into this build.
              Let’s get you back to something useful.
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ pt: 1 }}>
              <Button component={Link} href="/" variant="contained" size="large">
                Back to home
              </Button>
            </Stack>
          </Stack>
        </Box>
      </PageContainer>
    </Box>
  );
}