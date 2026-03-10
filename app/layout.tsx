// app/layout.tsx

import type { Metadata } from "next";
import { buildMetadata } from "@/lib/site/metadata";
import AnalyticsProvider from "@/components/providers/AnalyticsProvider";
import { AppShell } from "@/components/layouts/AppShell";
import Providers from "./providers";

export const metadata: Metadata = buildMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AnalyticsProvider />
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}