// theme/brand.ts

import { tokens } from "./tokens";

export type LogoType = keyof typeof tokens.brand.assets.logo.guidance.minWidthPx; // "fullLockup" | "wordmark" | "icon"
export type LogoMode = "light" | "dark";
export type BrandSurface = keyof typeof tokens.brand.assets.logo.preferred; // "header" | "footer" | "appIcon"

type BrandLogoMap = {
  [K in LogoType]: Record<LogoMode, string>;
};

function getLogoMap(): BrandLogoMap {
  const logo = tokens.brand.assets.logo;

  return {
    fullLockup: {
      light: logo.fullLockup.light,
      dark: logo.fullLockup.dark,
    },
    wordmark: {
      light: logo.wordmark.light,
      dark: logo.wordmark.dark,
    },
    icon: {
      light: logo.icon.light,
      dark: logo.icon.dark,
    },
  };
}

function normalizeHex(hex: string): string | null {
  const cleaned = hex.replace("#", "").trim();

  if (cleaned.length === 3) {
    return cleaned
      .split("")
      .map((c) => c + c)
      .join("");
  }

  if (cleaned.length === 6) return cleaned;
  return null;
}

export function inferModeFromBg(bg?: string): LogoMode {
  if (!bg) return "dark";

  const normalized = bg.trim();

  if (normalized.startsWith("#")) {
    const hex = normalizeHex(normalized);
    if (!hex) return "dark";

    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    return luminance < 0.55 ? "light" : "dark";
  }

  // If passed rgba()/rgb()/named colors/etc, default safely
  return "dark";
}

export function getPreferredLogoType(surface: BrandSurface): LogoType {
  return tokens.brand.assets.logo.preferred[surface];
}

function resolveLogoType(args?: {
  surface?: BrandSurface;
  type?: LogoType;
}): LogoType {
  return args?.type ?? (args?.surface ? getPreferredLogoType(args.surface) : "wordmark");
}

export function getBrandLogo(args?: {
  surface?: BrandSurface;
  type?: LogoType;
  mode?: LogoMode;
  bg?: string;
  fallbackType?: LogoType;
}): string {
  const map = getLogoMap();

  const resolvedType = resolveLogoType(args);
  const fallbackType = args?.fallbackType ?? "fullLockup";
  const mode = args?.mode ?? inferModeFromBg(args?.bg);

  const chosen = map[resolvedType]?.[mode];
  if (chosen) return chosen;

  const fallback = map[fallbackType]?.[mode];
  if (fallback) return fallback;

  return (
    map[resolvedType]?.light ||
    map[resolvedType]?.dark ||
    map[fallbackType]?.light ||
    map[fallbackType]?.dark ||
    ""
  );
}

export function getBrandLogoMinWidth(args?: {
  surface?: BrandSurface;
  type?: LogoType;
}): number {
  const resolvedType = resolveLogoType(args);
  return tokens.brand.assets.logo.guidance.minWidthPx[resolvedType];
}

export function getBrandLogoIdealHeight(args?: {
  surface?: BrandSurface;
  type?: LogoType;
}): number {
  const resolvedType = resolveLogoType(args);
  return tokens.brand.assets.logo.guidance.idealHeightPx[resolvedType];
}

export function getBrandLogoDimensions(args?: {
  surface?: BrandSurface;
  type?: LogoType;
}) {
  const resolvedType = resolveLogoType(args);

  return {
    type: resolvedType,
    minWidth: tokens.brand.assets.logo.guidance.minWidthPx[resolvedType],
    idealHeight: tokens.brand.assets.logo.guidance.idealHeightPx[resolvedType],
    safeArea: tokens.brand.assets.logo.guidance.safeAreaPx,
  };
}

export function getBrandSafeAreaPx(): number {
  return tokens.brand.assets.logo.guidance.safeAreaPx;
}

export function getBrandName(): string {
  return tokens.brand.name;
}

export function getBrandLegalName(): string {
  return tokens.brand.legalName;
}