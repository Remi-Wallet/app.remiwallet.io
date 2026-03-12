// components/site/SiteHeader.tsx

import { Box, Container } from "@mui/material";
import BrandMark from "@/components/brand/BrandMark";
import { tokens as t } from "@/theme/tokens";

export default function SiteHeader() {
  return (
    <Box
      component="header"
      sx={{
        width: "100%",
        height: t.layout.headerHeight,

        bgcolor: t.color.semantic.chrome.header.bg,
        borderBottom: `1px solid ${t.color.semantic.chrome.header.border}`,
        backdropFilter: `blur(${t.color.semantic.chrome.header.blurPx}px)`,

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        zIndex: t.zIndex.header,

        // subtle premium highlight line
        boxShadow: "0 1px 0 rgba(0,0,0,0.02)",
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: t.layout.footerMax,
          px: { xs: 2, sm: 3 },
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            // optical center correction
            transform: "translateY(-1px)",
          }}
        >
          <BrandMark surface="header" mode="light" />
        </Box>
      </Container>
    </Box>
  );
}