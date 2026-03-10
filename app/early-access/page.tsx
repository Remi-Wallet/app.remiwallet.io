// app/early-access/page.tsx

import type { Metadata } from "next";
import { buildMetadata } from "@/lib/site/metadata";
import EarlyAccessPageView from "@/components/early-access/EarlyAccessPageView";

export const metadata: Metadata = buildMetadata({
  title: "Remi Wallet - Get Early Access",
  description:
    "Signup for early access list to the Remi smart wallet.",
  path: "/early-access",
});

export default function EarlyAccessPage() {
  return <EarlyAccessPageView />;
}