// lib/site/metadata.ts

import type { Metadata } from "next";
import { siteConfig } from "./config";

type MetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
};

function absoluteUrl(path = "") {
  return `${siteConfig.url}${path}`;
}

export function buildMetadata({
  title,
  description,
  path = "",
  image,
  noIndex = false,
}: MetadataInput = {}): Metadata {
  const resolvedTitle = title
    ? `${title} | ${siteConfig.name}`
    : siteConfig.title;

  const resolvedDescription = description ?? siteConfig.description;
  const resolvedImage = image ?? siteConfig.ogImage;
  const url = absoluteUrl(path);

  return {
    metadataBase: new URL(siteConfig.url),
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: {
      canonical: path || "/",
    },
    robots: noIndex
      ? {
        index: false,
        follow: false,
      }
      : {
        index: true,
        follow: true,
      },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/icons/icon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      ],
      shortcut: ["/favicon.ico"],
      apple: [
        { url: "/icons/icon-180.png", sizes: "180x180", type: "image/png" },
      ],
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title: resolvedTitle,
      description: resolvedDescription,
      images: [
        {
          url: resolvedImage,
          width: 1200,
          height: 630,
          alt: resolvedTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [resolvedImage],
      creator: siteConfig.social.twitterHandle || undefined,
    },
  };
}