// lib/site/config.ts
import { tokens } from "@/theme/tokens";

export const siteConfig = {
  name: tokens.brand.name,
  title: tokens.brand.name,
  legalName: tokens.brand.legalName,
  url: "https://app.remiwallet.io",
  description:
    "Remi helps users understand missed rewards opportunities and discover smarter ways to optimize card usage.",
  ogImage: "/og/default-og.png",
  locale: "en_US",

  social: {
    twitterHandle: "@remiwallet",
  },

  analytics: {
    gtmId: process.env.NEXT_PUBLIC_GTM_ID || "",
    gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "",
  },
} as const;