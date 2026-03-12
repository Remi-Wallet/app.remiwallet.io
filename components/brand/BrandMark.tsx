// components/brand/BrandMark.tsx

"use client";

import Link from "next/link";
import { Box, Typography } from "@mui/material";
import { tokens as t } from "@/theme/tokens";
import { getBrandLogo, getBrandLogoDimensions } from "@/theme/brand";

type BrandSurface = keyof typeof t.brand.assets.logo.preferred;
type BrandMode = "light" | "dark";

type BrandMarkProps = {
  href?: string;
  surface?: BrandSurface;
  mode?: BrandMode;
  textFallback?: string;
  center?: boolean;
  forceTextFallback?: boolean;
};

export default function BrandMark({
  href = "/",
  surface = "header",
  mode = "dark",
  textFallback = t.brand.name,
  center = true,
  forceTextFallback = false,
}: BrandMarkProps) {
  const logoSrc = getBrandLogo({ surface, mode });
  const { minWidth, idealHeight } = getBrandLogoDimensions({ surface });

  const showImage = Boolean(logoSrc) && !forceTextFallback;
  const visualScale = surface === "appIcon" ? 1.02 : 1.04;

  return (
    <Box
      component={Link}
      href={href}
      aria-label={`Go to ${t.brand.name} homepage`}
      sx={(theme) => ({
        display: "inline-flex",
        alignItems: "center",
        justifyContent: center ? "center" : "flex-start",
        textDecoration: "none",
        color: theme.palette.text.primary,
        minHeight: idealHeight,
        lineHeight: 0,
        transition: `opacity ${t.motion.duration.normal}ms ${t.motion.easing.standard}`,
        "&:hover": {
          opacity: 0.82,
        },
      })}
    >
      {showImage ? (
        <Box
          component="img"
          src={logoSrc}
          alt={t.brand.name}
          sx={{
            display: "block",
            height: `${idealHeight}px`,
            width: "auto",
            minWidth: `${minWidth}px`,
            objectFit: "contain",
            transform: `scale(${visualScale})`,
            transformOrigin: "center",
          }}
        />
      ) : (
        <Typography
          sx={(theme) => ({
            ...t.typography.brandText.header,
            color: theme.palette.text.primary,
          })}
        >
          {textFallback}
        </Typography>
      )}
    </Box>
  );
}