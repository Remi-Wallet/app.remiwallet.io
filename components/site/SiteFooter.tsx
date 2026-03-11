// components/site/SiteFooter.tsx

import * as React from "react";
import { Box, Link, Stack, Typography } from "@mui/material";
import { tokens } from "@/theme/tokens";

type SiteFooterProps = {
  year?: number;
  company?: string;
  privacyHref?: string;
  termsHref?: string;
  disclaimer?: string;
};

export function SiteFooter(props: SiteFooterProps) {
  const year = props.year ?? new Date().getFullYear();
  const company = props.company ?? tokens.brand.legalName;
  const privacyHref = props.privacyHref ?? "/privacy-policy";
  const termsHref = props.termsHref ?? "/terms-of-use";

  const disclaimer =
    props.disclaimer ??
    "Remi provides informational and insights to help you better understand your options, but does not provide financial, tax, legal, or investment advice. Any rewards estimates, optimization insights, or product details are illustrative and may vary based on your individual circumstances and may change over time.";

  return (
    <Box component="footer" sx={{ width: "100%", mt: "auto" }}>
      <Box
        sx={{
          borderTop: `1px solid ${tokens.color.semantic.border.default}`,
          backgroundColor: "#EEF5F1",
        }}
      >
        <Box
          sx={{
            maxWidth: tokens.layout.footerMax,
            mx: "auto",
            px: { xs: 2, sm: 3 },
            py: 1,
          }}
        >
          <Stack
            spacing={0.35}
            alignItems="center"
            justifyContent="center"
            sx={{ textAlign: "center" }}
          >
            <Typography
              sx={{
                fontSize: "0.76rem",
                color: tokens.color.semantic.text.secondary,
                fontWeight: tokens.typography.weight.medium,
                lineHeight: 1.35,
              }}
            >
              © {year} {company}. All rights reserved.
            </Typography>

            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <Link
                href={privacyHref}
                underline="hover"
                color="inherit"
                sx={{
                  fontSize: "0.74rem",
                  color: tokens.color.semantic.brand.primary,
                  fontWeight: tokens.typography.weight.medium,
                  textUnderlineOffset: "2px",
                }}
              >
                Privacy Policy
              </Link>

              <Link
                href={termsHref}
                underline="hover"
                color="inherit"
                sx={{
                  fontSize: "0.74rem",
                  color: tokens.color.semantic.brand.primary,
                  fontWeight: tokens.typography.weight.medium,
                  textUnderlineOffset: "2px",
                }}
              >
                Terms of Use
              </Link>
            </Stack>
          </Stack>
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: "#E4EEE8",
          borderTop: "1px solid rgba(0,0,0,0.04)",
        }}
      >
        <Box
          sx={{
            maxWidth: tokens.layout.footerMax,
            mx: "auto",
            px: { xs: 2, sm: 3 },
            py: 0.85,
          }}
        >
          <Typography
            sx={{
              display: "block",
              textAlign: "center",
              fontSize: "0.66rem",
              fontStyle: "italic",
              lineHeight: 1.45,
              color: tokens.color.semantic.text.secondary,
              opacity: 0.78,
              maxWidth: 920,
              mx: "auto",
            }}
          >
            {disclaimer}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default SiteFooter;