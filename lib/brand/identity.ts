// lib/brand/identity.ts

import { tokens } from "@/theme/tokens";

export const brandIdentity = {
  name: tokens.brand.name,
  legalName: tokens.brand.legalName,
  logo: tokens.brand.assets.logo,
} as const;