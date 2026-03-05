import * as React from "react";
import Providers from "./providers";
import { AppShell } from "@/components/layouts/AppShell";

export const metadata = {
  title: "REMI",
  description: "The smartest, simpliest way to get more from what you spend.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}