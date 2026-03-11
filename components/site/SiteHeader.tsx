// components/site/SiteHeader.tsx

import { Box, Container } from "@mui/material";
import BrandMark from "@/components/brand/BrandMark";

export default function SiteHeader() {
  return (
    <Box
      component="header"
      sx={(theme) => ({
        width: "100%",
        bgcolor: theme.custom.chrome.header.bg,
        backdropFilter: `blur(${theme.custom.chrome.header.blurPx}px)`,
        borderBottom: `1px solid ${theme.custom.chrome.header.border}`,
        minHeight: theme.custom.chrome.header.height,
        zIndex: 1100,
      })}
    >
      <Container
        maxWidth={false}
        sx={(theme) => ({
          maxWidth: theme.custom.chrome.footer.maxWidth,
          px: { xs: 2, sm: 3 },
        })}
      >
        <Box
          sx={(theme) => ({
            minHeight: theme.custom.chrome.header.height,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: { xs: 1, sm: 0 },
          })}
        >
          <BrandMark surface="header" mode="light" forceTextFallback />
        </Box>
      </Container>
    </Box>
  );
}