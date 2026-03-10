// components/layouts/PageContainer.tsx

"use client";

import * as React from "react";
import { Box } from "@mui/material";
import { tokens } from "@/theme/tokens";

type PageContainerProps = {
  children: React.ReactNode;
  maxWidth?: number | string;
  py?: { xs?: number; sm?: number; md?: number } | number;
};

export default function PageContainer({
  children,
  maxWidth = tokens.layout.contentMax,
  py = { xs: 4, sm: 6, md: 7 },
}: PageContainerProps) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        px: { xs: 2, sm: 3 },
        py,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}