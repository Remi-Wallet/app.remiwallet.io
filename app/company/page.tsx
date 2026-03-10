// app/company/page.tsx

import type { Metadata } from "next";
import { Box, Stack, Typography } from "@mui/material";
import StaticPageLayout from "@/components/layouts/StaticPageLayout";
import { buildMetadata } from "@/lib/site/metadata";
import { tokens } from "@/theme/tokens";

export const metadata: Metadata = buildMetadata({
  title: "Company",
  description: "Learn more about Remi Wallet, Inc. and the company behind the product.",
  path: "/company",
});

export default function CompanyPage() {
  return (
    <StaticPageLayout
      eyebrow="Company"
      title="We’re building a smarter way to understand rewards."
      subtitle="Remi Wallet is designed to help people see missed value more clearly, make better decisions, and feel more confident about how they use cards, offers, and rewards over time."
    >
      <Stack spacing={3.5}>
        <Box
          sx={{
            p: { xs: 2.5, sm: 3 },
            borderRadius: tokens.radius.lg,
            backgroundColor: tokens.color.semantic.bg.surface,
            border: `1px solid ${tokens.color.semantic.border.default}`,
            boxShadow: tokens.shadow.md,
          }}
        >
          <Typography
            sx={{
              fontSize: 22,
              fontWeight: tokens.typography.weight.bold,
              color: tokens.color.semantic.text.primary,
              mb: 1,
            }}
          >
            Our Mainfesto
          </Typography>
          <Typography
            sx={{
              fontSize: 16,
              lineHeight: 1.7,
              color: tokens.color.semantic.text.secondary,
            }}
          >
            Most people know there is value hidden in their card setup, but they do not have a
            simple way to understand where they are losing it. We want to make that picture clearer,
            faster, and more actionable.
          </Typography>
        </Box>

        <Box
          sx={{
            p: { xs: 2.5, sm: 3 },
            borderRadius: tokens.radius.lg,
            backgroundColor: tokens.color.semantic.bg.surface,
            border: `1px solid ${tokens.color.semantic.border.default}`,
            boxShadow: tokens.shadow.md,
          }}
        >
          <Typography
            sx={{
              fontSize: 22,
              fontWeight: tokens.typography.weight.bold,
              color: tokens.color.semantic.text.primary,
              mb: 1,
            }}
          >
            What this page is for
          </Typography>
          <Typography
            sx={{
              fontSize: 16,
              lineHeight: 1.7,
              color: tokens.color.semantic.text.secondary,
            }}
          >
            This is the beginning of a more traditional company page. Later, this route can expand
            to include team information, mission, trust signals, FAQs, press, and product context
            while still sharing the same brand system as the quiz experience.
          </Typography>
        </Box>
      </Stack>
    </StaticPageLayout>
  );
}