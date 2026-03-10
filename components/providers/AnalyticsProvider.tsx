// components/providers/AnalyticsProvider.tsx

"use client";

import * as React from "react";
import { GoogleTagManager } from "@next/third-parties/google";
import { siteConfig } from "@/lib/site/config";

export default function AnalyticsProvider() {
  const { gtmId } = siteConfig.analytics;

  if (!gtmId) return null;

  return <GoogleTagManager gtmId={gtmId} />;
}