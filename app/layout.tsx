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
        <div
          aria-hidden="true"
          style={{ display: "contents" }}
          dangerouslySetInnerHTML={{
            __html: `<!--
REMI // If you’re reading this, you’re probably our kind of curious.
We’re building a smarter tap-to-pay wallet that’s better for users, better for issuers, and harder than it looks.
Interested in helping build it? Reach out to the team and include: "I want to build the world's smartest mobile wallet."
-->`,
          }}
        />
        <Providers>
          <AnalyticsProvider />
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}