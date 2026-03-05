// app/peivacy-policy/page.tsx

"use client";

import { FullTextPageLayout } from "@/components/layouts/FullTextPageLayout";

export default function PrivacyPolicyPage() {
  return (
    <FullTextPageLayout title="Privacy Policy" lastUpdated="March 5, 2026">
      <p>
        This Privacy Policy explains how Remi Wallet, Inc. (“Remi,” “we,” “us,” or “our”)
        collects, uses, and protects information when you use our website, waitlist,
        quiz, and related services (collectively, the “Service”).
      </p>

      <p>
        By using the Service, you acknowledge the practices described in this Privacy Policy.
      </p>

      <h2>1. Information We Collect</h2>
      <p>We may collect the following categories of information:</p>
      <ul>
        <li>Contact information, such as your email address and optionally your phone number</li>
        <li>Information you provide through questionnaires, waitlist forms, or onboarding flows</li>
        <li>Usage information, such as interactions with pages, buttons, and quiz steps</li>
        <li>
          Device and technical information, such as browser type, approximate location,
          IP address, and referring pages, as available
        </li>
      </ul>

      <h2>2. How We Use Information</h2>
      <p>We may use collected information to:</p>
      <ul>
        <li>Operate and improve the Service</li>
        <li>Manage the waitlist and early access process</li>
        <li>Communicate with you about product updates, beta access, and related service notices</li>
        <li>Understand usage patterns and improve product design, messaging, and onboarding</li>
        <li>Protect the security and integrity of the Service</li>
        <li>Comply with legal obligations</li>
      </ul>

      <h2>3. How We Share Information</h2>
      <p>We do not sell your personal information. We may share information:</p>
      <ul>
        <li>With service providers who help us operate the Service</li>
        <li>If required by law, regulation, legal process, or governmental request</li>
        <li>To protect the rights, safety, or security of Remi, our users, or others</li>
        <li>In connection with a merger, financing, acquisition, or sale of assets</li>
      </ul>

      <h2>4. Cookies and Analytics</h2>
      <p>
        We may use cookies, local storage, analytics tools, and similar technologies to remember
        preferences, understand usage, and improve the Service. For more details, see our{" "}
        <a href="/cookie-policy">Cookie Policy</a>.
      </p>

      <h2>5. Data Retention</h2>
      <p>
        We retain information for as long as reasonably necessary to operate the Service,
        maintain records, comply with legal obligations, resolve disputes, and enforce our agreements.
      </p>

      <h2>6. Data Security</h2>
      <p>
        We use reasonable administrative, technical, and organizational measures to protect
        personal information. However, no method of transmission or storage is completely secure,
        and we cannot guarantee absolute security.
      </p>

      <h2>7. Children’s Privacy</h2>
      <p>
        The Service is not intended for children under 18, and we do not knowingly collect
        personal information from children under 18.
      </p>

      <h2>8. Your Choices</h2>
      <p>
        You may opt out of promotional emails by using the unsubscribe link in those messages,
        where available. You may also contact us to request updates or deletion of certain
        information, subject to applicable law and our operational requirements.
      </p>

      <h2>9. Third-Party Links and Services</h2>
      <p>
        The Service may contain links to third-party websites or services. We are not
        responsible for the privacy practices or content of those third parties.
      </p>

      <h2>10. California and Other U.S. Privacy Rights</h2>
      <p>
        Depending on your jurisdiction, you may have certain privacy rights regarding access,
        correction, deletion, or portability of your personal information. We may take
        reasonable steps to verify your identity before responding to such requests.
      </p>

      <h2>11. Changes to This Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. The updated version will be
        effective when posted with a revised “Last updated” date.
      </p>

      <h2>12. Contact</h2>
      <p>
        If you have questions about this Privacy Policy or our data practices, please contact
        Remi Wallet, Inc. through the contact information made available on our website.
      </p>
    </FullTextPageLayout>
  );
}