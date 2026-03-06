// app/cookie-policy/page.tsx

"use client";

import { FullTextPageLayout } from "@/components/layouts/FullTextPageLayout";

export default function CookiePolicyPage() {
  return (
    <FullTextPageLayout title="Cookie Policy" lastUpdated="March 5, 2026">
      <p>
        This Cookie Policy explains how Remi Wallet, Inc. (“Remi,” “we,” “us,” or “our”)
        uses cookies, local storage, and similar technologies in connection with our website,
        waitlist, quiz, beta signup flows, and related services (collectively, the “Service”).
      </p>
      <h2>1. What Cookies and Similar Technologies Are</h2>
      <p>
        Cookies are small text files placed on your device when you visit a website. Similar
        technologies, including local storage, pixels, and analytics tags, can also be used
        to remember preferences, preserve session state, understand usage, improve performance,
        and support security.
      </p>
      <h2>2. How We Use Cookies and Similar Technologies</h2>
      <p>We may use cookies and similar technologies to:</p>
      <ul>
        <li>Keep the Service functioning properly</li>
        <li>Save quiz progress or preserve session state</li>
        <li>Remember preferences or lightweight onboarding state</li>
        <li>Understand how users interact with the Service</li>
        <li>Improve performance, usability, and product design</li>
        <li>Support analytics, testing, debugging, fraud prevention, and security</li>
      </ul>
      <h2>3. Types of Cookies and Technologies We May Use</h2>
      <p>
        Depending on the Service and product stage, we may use the following categories:
      </p>
      <ul>
        <li>
          <strong>Essential technologies:</strong> Needed for core website and app functionality,
          security, and reliability
        </li>
        <li>
          <strong>Preference technologies:</strong> Help remember settings, choices, or reduce
          friction in the experience
        </li>
        <li>
          <strong>Analytics / performance technologies:</strong> Help us understand usage and
          improve the Service
        </li>
        <li>
          <strong>Local storage:</strong> Helps preserve progress, lightweight state, or user
          experience settings
        </li>
      </ul>
      <h2>4. Local Storage</h2>
      <p>
        We may use browser local storage or similar client-side technologies to preserve quiz
        progress, remember preferences, support login or session continuity, or enable product
        functionality.
      </p>
      <h2>5. Third-Party Tools</h2>
      <p>
        We may use third-party service providers for hosting, analytics, communications,
        authentication, infrastructure, and security. Those providers may also use cookies
        or similar technologies in connection with the Service, subject to their own policies.
      </p>
      <h2>6. Your Choices</h2>
      <p>
        Most browsers allow you to control cookies through browser settings. You may also be
        able to clear or block local storage and similar technologies through browser or device
        controls.
      </p>
      <p>
        Please note that disabling certain technologies may affect functionality, including
        saved progress, login state, or overall site performance.
      </p>
      <h2>7. Changes to This Cookie Policy</h2>
      <p>
        We may update this Cookie Policy from time to time. The updated version will be
        effective when posted with a revised “Last updated” date.
      </p>
      <h2>8. Contact</h2>
      <p>
        If you have questions about this Cookie Policy, please contact Remi Wallet, Inc. at{" "}
        <a href="mailto:legal@remiwallet.io">legal@remiwallet.io</a>.
      </p>
    </FullTextPageLayout>
  );
}