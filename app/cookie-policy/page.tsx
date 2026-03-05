// app/cookie-policy/page.tsx
"use client";

import { FullTextPageLayout } from "@/components/layouts/FullTextPageLayout";

export default function CookiePolicyPage() {
  return (
    <FullTextPageLayout title="Cookie Policy" lastUpdated="March 5, 2026">
      <p>
        This Cookie Policy explains how Remi Wallet, Inc. (“Remi,” “we,” “us,” or “our”)
        uses cookies, local storage, and similar technologies in connection with our website,
        waitlist, quiz, and related services (collectively, the “Service”).
      </p>

      <h2>1. What Cookies Are</h2>
      <p>
        Cookies are small text files placed on your device when you visit a website. Similar
        technologies, including local storage, pixels, and analytics tags, can also help
        websites remember preferences, understand usage, and improve performance.
      </p>

      <h2>2. How We Use Cookies and Similar Technologies</h2>
      <p>We may use cookies and similar technologies to:</p>
      <ul>
        <li>Keep the Service functioning properly</li>
        <li>Remember your preferences or session state</li>
        <li>Understand how users interact with the Service</li>
        <li>Improve performance, usability, and product design</li>
        <li>Support analytics, testing, and security</li>
      </ul>

      <h2>3. Types of Cookies We May Use</h2>
      <p>
        Depending on the Service and product stage, we may use the following categories:
      </p>
      <ul>
        <li>
          <strong>Essential cookies:</strong> Needed for core website and app functionality
        </li>
        <li>
          <strong>Preference cookies:</strong> Help remember settings or user choices
        </li>
        <li>
          <strong>Analytics / performance cookies:</strong> Help us understand usage and
          improve the Service
        </li>
        <li>
          <strong>Security-related technologies:</strong> Help protect against abuse, fraud,
          or unauthorized access
        </li>
      </ul>

      <h2>4. Local Storage</h2>
      <p>
        We may use browser local storage or similar client-side technologies to preserve quiz
        progress, remember lightweight preferences, or support product functionality.
      </p>

      <h2>5. Your Choices</h2>
      <p>
        Most browsers allow you to manage cookies through browser settings. You may be able
        to block, delete, or limit cookies and local storage. However, disabling some
        technologies may affect how the Service works.
      </p>

      <h2>6. Third-Party Tools</h2>
      <p>
        We may use third-party analytics, hosting, or infrastructure providers that also use
        cookies or similar technologies in connection with the Service. Those providers may
        have their own privacy and cookie disclosures.
      </p>

      <h2>7. Changes to This Cookie Policy</h2>
      <p>
        We may update this Cookie Policy from time to time. The updated version will be
        effective when posted with a revised “Last updated” date.
      </p>

      <h2>8. Contact</h2>
      <p>
        If you have questions about this Cookie Policy, please contact Remi Wallet, Inc.
        through the contact information made available on our website.
      </p>
    </FullTextPageLayout>
  );
}