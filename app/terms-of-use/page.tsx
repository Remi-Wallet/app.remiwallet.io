// app/terms-of-use/page.tsx

"use client";

import { FullTextPageLayout } from "@/components/layouts/FullTextPageLayout";

export default function TermsOfUsePage() {
  return (
    <FullTextPageLayout title="Terms of Use" lastUpdated="March 5, 2026">
      <p>
        These Terms of Use (“Terms”) govern your access to and use of the Remi Wallet, Inc.
        website, waitlist, quiz, beta signup flows, and related early-access services
        (collectively, the “Service”).
      </p>

      <p>
        By accessing or using the Service, you agree to these Terms. If you do not agree,
        please do not use the Service.
      </p>

      <h2>1. Eligibility</h2>
      <p>
        You must be at least 18 years old to use the Service. By using the Service, you
        represent that you meet this requirement and that your use of the Service is lawful
        where you access it.
      </p>

      <h2>2. Beta / Early Access Nature of the Service</h2>
      <p>
        Remi is in an early stage of development. The Service may currently include a waitlist,
        informational content, questionnaires, surveys, product previews, limited login
        functionality, and related communications.
      </p>
      <p>
        Submission of your information does not guarantee access to any future product,
        feature, beta program, or commercial offering.
      </p>
      <p>
        We may change, delay, suspend, or discontinue any aspect of the Service at any time.
      </p>

      <h2>3. No Financial, Tax, Legal, or Investment Advice</h2>
      <p>
        The Service is provided for general informational and educational purposes only.
        Remi Wallet, Inc. does not provide financial, tax, legal, investment, credit repair,
        or other professional advice through this waitlist or beta experience.
      </p>
      <p>
        Any estimates, optimization suggestions, projected rewards, educational content, or
        product descriptions are illustrative only and may be incomplete, inaccurate, or
        subject to change.
      </p>
      <p>
        You are responsible for independently reviewing your own payment cards, rewards
        programs, issuer terms, fees, eligibility rules, and financial circumstances before
        making decisions.
      </p>

      <h2>4. Future Financial Features</h2>
      <p>
        The current Service is not the full Remi financial product. If Remi later offers
        wallet, payments, card, rewards, consultation, or related financial features, those
        features may be governed by additional terms, disclosures, partner terms, and
        eligibility requirements.
      </p>

      <h2>5. Acceptable Use</h2>
      <p>
        You agree to use the Service only for lawful purposes and in a manner that does not
        interfere with the operation of the Service or the rights of others.
      </p>
      <p>You may not:</p>
      <ul>
        <li>Use the Service for unlawful, fraudulent, deceptive, or abusive purposes</li>
        <li>Attempt to gain unauthorized access to systems, accounts, or data</li>
        <li>Interfere with, disrupt, scrape, probe, reverse engineer, or misuse the Service</li>
        <li>Introduce malicious code, bots, or other harmful material</li>
        <li>Misrepresent your identity or submit false information through the Service</li>
      </ul>

      <h2>6. Communications</h2>
      <p>
        If you provide your email address or other contact information, you agree that we may
        contact you regarding your waitlist status, beta access, service updates, surveys,
        support matters, and related communications, subject to applicable law and your
        communication preferences.
      </p>

      <h2>7. Intellectual Property</h2>
      <p>
        The Service, including its software, design, branding, content, text, graphics,
        interfaces, and materials, is owned by Remi Wallet, Inc. or its licensors and is
        protected by applicable intellectual property laws.
      </p>
      <p>
        Except as expressly permitted by us in writing, you may not reproduce, distribute,
        modify, create derivative works from, publicly display, or otherwise use the Service
        or its content.
      </p>

      <h2>8. Third-Party Services</h2>
      <p>
        The Service may reference or integrate third-party services, websites, providers,
        card issuers, payment partners, or other external platforms. We are not responsible
        for third-party products, content, terms, availability, or privacy practices.
      </p>

      <h2>9. Disclaimer of Warranties</h2>
      <p>
        To the fullest extent permitted by law, the Service is provided on an “as is” and
        “as available” basis.
      </p>
      <p>
        Remi Wallet, Inc. disclaims all warranties, whether express, implied, or statutory,
        including implied warranties of merchantability, fitness for a particular purpose,
        title, non-infringement, accuracy, availability, and uninterrupted operation.
      </p>

      <h2>10. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, Remi Wallet, Inc. and its affiliates,
        officers, employees, contractors, licensors, and service providers will not be liable
        for any indirect, incidental, special, consequential, exemplary, or punitive damages,
        or for any loss of profits, revenues, goodwill, data, or opportunities, arising out of
        or related to your use of the Service.
      </p>
      <p>
        To the extent liability cannot be excluded, our total aggregate liability arising out
        of or related to the Service will not exceed one hundred U.S. dollars (US $100).
      </p>

      <h2>11. Changes to the Service</h2>
      <p>
        We may modify, suspend, or discontinue any part of the Service at any time, with or
        without notice.
      </p>

      <h2>12. Termination</h2>
      <p>
        We may suspend, restrict, or terminate your access to the Service at any time, with
        or without notice, if we believe you have violated these Terms, created risk for us
        or others, or if we decide to change or discontinue the Service.
      </p>

      <h2>13. Governing Law</h2>
      <p>
        These Terms are governed by the laws specified in the final published version of these
        Terms, without regard to conflict-of-law principles.
      </p>

      <h2>14. Changes to These Terms</h2>
      <p>
        We may update these Terms from time to time. The updated version will be effective
        when posted with a revised “Last updated” date. Your continued use of the Service
        after an update becomes effective constitutes acceptance of the revised Terms.
      </p>

      <h2>15. Contact</h2>
      <p>
        If you have questions about these Terms, please contact Remi Wallet, Inc. through
        the contact information made available on our website.
      </p>
    </FullTextPageLayout>
  );
}