// app/page.tsx

import type { Metadata } from "next";
import HomePageView from "@/components/home/HomePageView";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/site/metadata";
import { organizationSchema, websiteSchema } from "@/lib/site/schema";

export const metadata: Metadata = buildMetadata({
  title: "See What Rewards You’re Missing",
  description:
    "Take a quick quiz to see whether you could be missing valuable rewards, offers, and optimization opportunities.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={[organizationSchema(), websiteSchema()]} />
      <HomePageView />
    </>
  );
}