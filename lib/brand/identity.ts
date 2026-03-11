// lib/brand/identity.ts

import { tokens } from "@/theme/tokens";

export const brandIdentity = {
  name: tokens.brand.name,
  legalName: tokens.brand.legalName,
  logo: tokens.brand.assets.logo,

  tagline: "The smart wallet that earns you more on every tap.",

  /* elevator need to be updated with actual copy */
  elevator:
    "Placeholder: Remi helps people understand missed rewards opportunities and optimize how they use their cards day to day.",

  /*  mission need to be updated with actual copy */
  mission:
    "Placeholder: Help everyday cardholders capture more value from the cards they already carry through smarter guidance, better timing, and clearer decisions.",
} as const;