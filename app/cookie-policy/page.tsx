"use client";

import { Box, Container, Typography } from "@mui/material";
import LegalPageLayout from "@/components/layouts/TextPageLayout";


export default function CookiePolicyPage() {
  return (
    <LegalPageLayout title="Cookie Policy" lastUpdated="March 4, 2026">
      <Typography component="h2">1. Overview</Typography>
      <Typography component="p">
        This Cookie Policy explains how Remi Wallet, Inc. (“Remi,” “we,” “us,”
        or “our”) uses cookies, local storage, and similar technologies in
        connection with our website, waitlist, quiz, and related services
        (collectively, the “Service”).
      </Typography>

      <Typography component="h2">2. What Cookies Are</Typography>
      <Typography component="p">
        Cookies are small text files placed on your device when you visit a
        website. Similar technologies, including local storage, pixels, and
        analytics tags, can also help websites remember preferences, understand
        usage, and improve performance.
      </Typography>

      <Typography component="h2">3. How We Use Cookies and Similar Technologies</Typography>
      <Typography component="p">
        We may use cookies and similar technologies to:
      </Typography>
      <ul>
        <li>Keep the Service functioning properly</li>
        <li>Remember your preferences or session state</li>
        <li>Understand how users interact with the Service</li>
        <li>Improve performance, usability, and product design</li>
        <li>Support analytics, testing, and security</li>
      </ul>

      <Typography component="h2">4. Types of Cookies We May Use</Typography>
      <Typography component="p">
        Depending on the Service and product stage, we may use the following
        categories:
      </Typography>
      <ul>
        <li>
          <strong>Essential cookies:</strong> Needed for core website and app
          functionality
        </li>
        <li>
          <strong>Preference cookies:</strong> Help remember settings or user
          choices
        </li>
        <li>
          <strong>Analytics / performance cookies:</strong> Help us understand
          usage and improve the Service
        </li>
        <li>
          <strong>Security-related technologies:</strong> Help protect against
          abuse, fraud, or unauthorized access
        </li>
      </ul>

      <Typography component="h2">5. Local Storage</Typography>
      <Typography component="p">
        We may use browser local storage or similar client-side technologies to
        preserve quiz progress, remember lightweight preferences, or support
        product functionality.
      </Typography>

      <Typography component="h2">6. Your Choices</Typography>
      <Typography component="p">
        Most browsers allow you to manage cookies through browser settings. You
        may be able to block, delete, or limit cookies and local storage.
        However, disabling some technologies may affect how the Service works.
      </Typography>

      <Typography component="h2">7. Third-Party Tools</Typography>
      <Typography component="p">
        We may use third-party analytics, hosting, or infrastructure providers
        that also use cookies or similar technologies in connection with the
        Service. Those providers may have their own privacy and cookie
        disclosures.
      </Typography>

      <Typography component="h2">8. Changes to This Cookie Policy</Typography>
      <Typography component="p">
        We may update this Cookie Policy from time to time. The updated version
        will be effective when posted with a revised “Last updated” date.
      </Typography>

      <Typography component="h2">9. Contact</Typography>
      <Typography component="p">
        If you have questions about this Cookie Policy, please contact Remi
        Wallet, Inc. through the contact information made available on our
        website.
      </Typography>
    </LegalPageLayout>
  );
}