// components/site/SiteFooter.tsx

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
    "Remi provides information and insights, not financial, tax, legal, or investment advice. Rewards estimates, optimization insights, and product details are illustrative, may vary by user, and may change over time.";

  return (
    <Box component="footer" sx={{ width: "100%", mt: "auto" }}>
      <Box
        sx={(theme) => ({
          borderTop: `1px solid ${theme.custom.chrome.footer.border}`,
          backgroundColor: theme.custom.chrome.footer.bg,
        })}
      >
        <Box
          sx={(theme) => ({
            maxWidth: theme.custom.chrome.footer.maxWidth,
            mx: "auto",
            px: { xs: 2, sm: 3 },
            py: { xs: 0.9, sm: 1.0 },
          })}
        >
          <Stack
            spacing={0.25}
            alignItems="center"
            justifyContent="center"
            sx={{ textAlign: "center" }}
          >
            <Typography
              sx={(theme) => ({
                fontSize: "0.75rem",
                color: theme.custom.chrome.footer.text,
                fontWeight: 500,
                lineHeight: 1.3,
              })}
            >
              © {year} {company}. All rights reserved.
            </Typography>

            <Stack
              direction="row"
              spacing={1.75}
              alignItems="center"
              justifyContent="center"
              flexWrap="wrap"
              useFlexGap
            >
              <Link
                href={privacyHref}
                underline="none"
                color="inherit"
                sx={(theme) => ({
                  fontSize: "0.73rem",
                  color: theme.custom.chrome.footer.link,
                  fontWeight: 500,
                  textUnderlineOffset: "2px",
                  transition: `opacity ${theme.custom.motion.fast}ms ${theme.custom.motion.easingStandard}`,
                  "&:hover": {
                    opacity: 0.8,
                    textDecoration: "underline",
                  },
                })}
              >
                Privacy Policy
              </Link>

              <Link
                href={termsHref}
                underline="none"
                color="inherit"
                sx={(theme) => ({
                  fontSize: "0.73rem",
                  color: theme.custom.chrome.footer.link,
                  fontWeight: 500,
                  textUnderlineOffset: "2px",
                  transition: `opacity ${theme.custom.motion.fast}ms ${theme.custom.motion.easingStandard}`,
                  "&:hover": {
                    opacity: 0.8,
                    textDecoration: "underline",
                  },
                })}
              >
                Terms of Use
              </Link>
            </Stack>
          </Stack>
        </Box>
      </Box>

      <Box
        sx={(theme) => ({
          backgroundColor: theme.custom.chrome.footer.subBg,
          borderTop: `1px solid ${theme.custom.chrome.footer.subBorder}`,
        })}
      >
        <Box
          sx={(theme) => ({
            maxWidth: theme.custom.chrome.footer.maxWidth,
            mx: "auto",
            px: { xs: 2, sm: 3 },
            py: { xs: 0.55, sm: 0.7 },
          })}
        >
          <Typography
            sx={(theme) => ({
              display: "block",
              textAlign: "center",
              fontSize: "0.64rem",
              lineHeight: 1.38,
              letterSpacing: "0.002em",
              color: theme.custom.chrome.footer.subText,
              opacity: 0.9,
              maxWidth: { xs: 300, sm: 500, md: 680 },
              mx: "auto",
            })}
          >
            {disclaimer}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
export default SiteFooter;