// theme/brand.ts
import { tokens } from "./tokens";

export type LogoType = "fullLockup" | "wordmark" | "icon";
export type LogoMode = "light" | "dark";

type BrandLogoMap = Record<LogoType, Record<LogoMode, string>>;

function getLogoMap(): BrandLogoMap {
  // If you later add assets into tokens.brand.assets.logo, this will use them.
  // For now, we default to empty strings to avoid runtime errors.
  const logo = (tokens as any).brand?.assets?.logo;

  return {
    fullLockup: {
      light: logo?.fullLockup?.light ?? "",
      dark: logo?.fullLockup?.dark ?? "",
    },
    wordmark: {
      light: logo?.wordmark?.light ?? "",
      dark: logo?.wordmark?.dark ?? "",
    },
    icon: {
      light: logo?.icon?.light ?? "",
      dark: logo?.icon?.dark ?? "",
    },
  };
}

function inferModeFromBg(bg?: string): LogoMode {
  // Very simple heuristic:
  // If bg is dark-ish, use "light" logo; otherwise use "dark" logo.
  if (!bg) return "dark";
  const hex = bg.replace("#", "").trim();
  if (hex.length !== 6) return "dark";

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  // perceived luminance
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return luminance < 0.55 ? "light" : "dark";
}

export function getBrandLogo(args?: {
  type?: LogoType;
  mode?: LogoMode;
  bg?: string; // optional: if you pass a background color, we infer light/dark
  fallbackType?: LogoType;
}): string {
  const type = args?.type ?? "wordmark";
  const fallbackType = args?.fallbackType ?? "fullLockup";

  const mode = args?.mode ?? inferModeFromBg(args?.bg);

  const map = getLogoMap();
  const chosen = map[type]?.[mode];
  if (chosen) return chosen;

  const fallback = map[fallbackType]?.[mode];
  if (fallback) return fallback;

  // last resort: try any mode/type that exists
  return (
    map[type]?.light ||
    map[type]?.dark ||
    map[fallbackType]?.light ||
    map[fallbackType]?.dark ||
    ""
  );
}