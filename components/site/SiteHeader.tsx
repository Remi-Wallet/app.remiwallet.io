// components/site/SiteHeader.tsx

import { Box, Container } from "@mui/material";
import { tokens as t } from "@/theme/tokens";
import BrandMark from "@/components/brand/BrandMark";

export default function SiteHeader() {
  return (
    <Box
      component="header"
      sx={{
        width: "100%",
        bgcolor: t.color.semantic.chrome.header.bg,
        backdropFilter: `blur(${t.layout.headerBlurPx}px)`,
        borderBottom: `1px solid ${t.color.semantic.chrome.header.border}`,
        minHeight: t.layout.headerHeight,
        zIndex: t.zIndex.header,
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: t.layout.footerMax,
          px: { xs: 2, sm: 3 },
        }}
      >
        <Box
          sx={{
            minHeight: t.layout.headerHeight,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: { xs: 1, sm: 0 },
          }}
        >
          <BrandMark surface="header" mode="light" forceTextFallback />
        </Box>
      </Container>
    </Box>
  );
}