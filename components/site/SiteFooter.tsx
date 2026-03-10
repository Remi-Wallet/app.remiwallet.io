// components/site/SiteFooter.tsx

import * as React from "react";
import { Box, Container, Link, Typography } from "@mui/material";
import { tokens } from "@/theme/tokens";

type SiteFooterProps = {
  year?: number;
  company?: string;
  privacyHref?: string;
  termsHref?: string;
  disclaimer?: string;

  /**
   * Optional overrides
   */
  bgTop?: string;
  bgBottom?: string;
};

export function SiteFooter(props: SiteFooterProps) {
  const year = props.year ?? new Date().getFullYear();
  const company = props.company ?? tokens.brand.legalName;
  const privacyHref = props.privacyHref ?? "/privacy-policy";
  const termsHref = props.termsHref ?? "/terms-of-use";

  const disclaimer =
    props.disclaimer ??
    "Remi provides informational and educational content through this waitlist and beta experience only. Remi does not provide financial, tax, legal, or investment advice. Any rewards estimates, optimization insights, or product descriptions are illustrative and may change.";

  const bgTop = props.bgTop ?? tokens.color.semantic.chrome.footer.bg;
  const bgBottom = props.bgBottom ?? tokens.color.semantic.chrome.footer.subBg;

  return (
    <Box component="footer" sx={{ width: "100%", mt: "auto" }}>
      <Box
        sx={{
          borderTop: `1px solid ${tokens.color.semantic.chrome.footer.border}`,
          backgroundColor: bgTop,
          color: tokens.color.semantic.chrome.footer.text,
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            maxWidth: tokens.layout.footerMax,
            px: { xs: 2, sm: 3 },
          }}
        >
          <Box
            sx={{
              py: 2,
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
            <Box sx={{ display: { xs: "none", sm: "block" } }} />

            <Typography
              variant="body2"
              sx={{
                fontWeight: tokens.typography.weight.medium,
                letterSpacing: tokens.typography.letterSpacing.normal,
                color: tokens.color.semantic.chrome.footer.text,
                opacity: 0.92,
                justifySelf: { sm: "center" },
              }}
            >
              © {year} {company}. All rights reserved.
            </Typography>

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
                sx={{
                  fontWeight: tokens.typography.weight.semibold,
                  whiteSpace: "nowrap",
                  color: tokens.color.semantic.chrome.footer.link,
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
                  fontWeight: tokens.typography.weight.semibold,
                  whiteSpace: "nowrap",
                  color: tokens.color.semantic.chrome.footer.link,
                  textUnderlineOffset: "2px",
                }}
              >
                Terms of Use
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box
        sx={{
          backgroundColor: bgBottom,
          color: tokens.color.semantic.chrome.footer.subText,
          borderTop: `1px solid ${tokens.color.semantic.chrome.footer.subBorder}`,
          py: 1.75,
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            maxWidth: tokens.layout.footerMax,
            px: { xs: 2, sm: 3 },
          }}
        >
          <Typography
            variant="caption"
            sx={{
              display: "block",
              textAlign: "center",
              lineHeight: 1.7,
              fontSize: "0.78rem",
              px: 2,
              color: tokens.color.semantic.chrome.footer.subText,
            }}
          >
            {disclaimer}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default SiteFooter;