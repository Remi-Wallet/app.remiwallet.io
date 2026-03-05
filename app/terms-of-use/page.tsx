// app/terms-of-use/page.tsx
"use client";

import { FullTextPageLayout } from "@/components/layouts/FullTextPageLayout";

export default function TermsOfUsePage() {
  return (
    <FullTextPageLayout title="Terms of Use" lastUpdated="March 5, 2026">
      <p>
        These Terms of Use (“Terms”) govern your access to and use of the Remi Wallet, Inc.
        website, waitlist, quiz, and related services (collectively, the “Service”). By
        accessing or using the Service, you agree to these Terms. If you do not agree,
        please do not use the Service.
      </p>

      <h2>1. Eligibility</h2>
      <p>
        You must be at least 18 years old to use the Service. By using the Service, you
        represent that you meet this requirement.
      </p>

      <h2>2. Early Access / Waitlist</h2>
      <p>
        Remi is in an early stage of development. The Service may currently include a waitlist,
        informational content, questionnaires, product previews, and related communications.
      </p>
      <p>
        Submission of your information does not guarantee access to any future product,
        feature, or beta program.
      </p>

      <h2>3. No Financial, Tax, or Legal Advice</h2>
      <p>
        The Service is provided for general informational purposes only. Remi Wallet, Inc.
        does not provide financial, investment, tax, legal, or credit advice through the Service.
      </p>
      <p>
        Any estimates, optimization suggestions, projected rewards, or educational content are
        illustrative only and may be incomplete, inaccurate, or subject to change.
      </p>

      <h2>4. Use of the Service</h2>
      <p>
        You agree to use the Service only for lawful purposes and in a manner that does not
        interfere with the operation of the Service or the rights of others.
      </p>
      <ul>
        <li>Use the Service for unlawful, fraudulent, or abusive purposes</li>
        <li>Attempt to gain unauthorized access to systems, accounts, or data</li>
        <li>Reverse engineer, copy, scrape, or misuse the Service</li>
        <li>Interfere with or disrupt the functionality of the Service</li>
      </ul>

      <h2>5. Communications</h2>
      <p>
        By submitting your email address or other contact information, you agree that we may
        contact you regarding your waitlist status, product updates, beta access, and related
        service communications, subject to applicable law and your communication preferences.
      </p>

      <h2>6. Intellectual Property</h2>
      <p>
        The Service, including its software, design, branding, content, and materials, is
        owned by Remi Wallet, Inc. or its licensors and is protected by applicable intellectual
        property laws. You may not reproduce, distribute, modify, or create derivative works
        without prior written permission.
      </p>

      <h2>7. Third-Party Services</h2>
      <p>
        The Service may reference or integrate third-party products, services, card issuers,
        payment providers, or websites. We are not responsible for third-party content, terms,
        or privacy practices.
      </p>

      <h2>8. Disclaimer of Warranties</h2>
      <p>
        The Service is provided on an “as is” and “as available” basis. To the maximum extent
        permitted by law, Remi Wallet, Inc. disclaims all warranties, express or implied,
        including warranties of merchantability, fitness for a particular purpose, accuracy,
        availability, and non-infringement.
      </p>

      <h2>9. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, Remi Wallet, Inc. and its affiliates, officers,
        employees, and contractors will not be liable for any indirect, incidental, special,
        consequential, or punitive damages, or for any loss of data, profits, or opportunities
        arising out of or related to your use of the Service.
      </p>
      <p>
        If liability is found, our total liability to you will not exceed one hundred U.S.
        dollars (US $100).
      </p>

      <h2>10. Changes to the Service</h2>
      <p>
        We may modify, suspend, or discontinue any part of the Service at any time, with or
        without notice.
      </p>

      <h2>11. Termination</h2>
      <p>
        We may suspend or terminate your access to the Service at any time if we believe you
        have violated these Terms or if we decide to change or discontinue the Service.
      </p>

      <h2>12. Governing Law</h2>
      <p>
        These Terms are governed by the laws of the State of California, without regard to
        conflict-of-law principles.
      </p>

      <h2>13. Changes to These Terms</h2>
      <p>
        We may update these Terms from time to time. The updated version will be effective
        when posted with a revised “Last updated” date. Your continued use of the Service
        after any update constitutes acceptance of the revised Terms.
      </p>

      <h2>14. Contact</h2>
      <p>
        If you have questions about these Terms, please contact Remi Wallet, Inc. through
        the contact information made available on our website.
      </p>
    </FullTextPageLayout>
  );
}