// app/privacy-policy/page.tsx

import type { Metadata } from "next";
import { FullTextPageLayout } from "@/components/layouts/FullTextPageLayout";
import { buildMetadata } from "@/lib/site/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Read the Privacy Policy for Remi Wallet, Inc.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <FullTextPageLayout title="Privacy Policy" lastUpdated="March 5, 2026">
      <p>
        This Privacy Policy explains how Remi Wallet, Inc. (“Remi,” “we,” “us,” or “our”)
        collects, uses, discloses, and protects information in connection with our website,
        waitlist, quiz, beta signup flows, and related early-access services (collectively,
        the “Service”).
      </p>
      <p>
        This Privacy Policy applies to Remi’s current waitlist and beta experience. If we
        introduce additional wallet, card, payment, rewards, consultation, or other financial
        features in the future, those features may be subject to additional terms, disclosures,
        or privacy notices.
      </p>
      <p>
        By using the Service, you acknowledge the practices described in this Privacy Policy.
      </p>

      <h2>1. Information We Collect</h2>
      <p>We may collect the following categories of information:</p>
      <ul>
        <li>
          Contact information, such as your name, email address, and optionally your phone number
        </li>
        <li>
          Information you provide through quizzes, questionnaires, waitlist forms, onboarding flows,
          surveys, or support communications
        </li>
        <li>
          Usage information, such as interactions with pages, buttons, form fields, and quiz steps
        </li>
        <li>
          Device and technical information, such as browser type, operating system, IP address,
          approximate location derived from IP, language settings, and referring pages, as available
        </li>
        <li>
          Information stored locally on your device through cookies, local storage, or similar
          technologies, including information used to preserve progress or session state
        </li>
      </ul>

      <p>
        At this stage, our public waitlist and quiz experience is designed to collect limited
        information. We do not ask users in this flow to provide full payment card numbers,
        bank login credentials, or other highly sensitive financial account access information.
      </p>

      <h2>2. How We Use Information</h2>
      <p>We may use collected information to:</p>
      <ul>
        <li>Operate, maintain, and improve the Service</li>
        <li>Save quiz progress and support the waitlist or early access process</li>
        <li>
          Communicate with you about product updates, beta access, early invitations, support,
          and related service notices
        </li>
        <li>
          Understand usage patterns and improve product design, messaging, onboarding, and
          overall user experience
        </li>
        <li>Protect the security, integrity, and reliability of the Service</li>
        <li>Detect, prevent, or investigate abuse, fraud, or misuse</li>
        <li>Comply with legal obligations and maintain internal records</li>
        <li>Create aggregated or de-identified insights that do not reasonably identify you</li>
      </ul>

      <h2>3. How We Share Information</h2>
      <p>We do not sell your personal information.</p>
      <p>We may share information:</p>
      <ul>
        <li>
          With vendors and service providers that help us operate the Service, such as hosting,
          infrastructure, analytics, communications, authentication, security, and support providers
        </li>
        <li>If required by law, regulation, legal process, or governmental request</li>
        <li>To protect the rights, safety, security, or property of Remi, our users, or others</li>
        <li>
          In connection with an actual or proposed merger, financing, acquisition, reorganization,
          or sale of assets
        </li>
        <li>With your direction or consent</li>
      </ul>

      <p>
        We may also use or disclose aggregated or de-identified information that does not
        reasonably identify an individual.
      </p>

      <h2>4. Cookies, Local Storage, and Analytics</h2>
      <p>
        We may use cookies, local storage, analytics tools, and similar technologies to keep
        the Service functioning, remember preferences, preserve quiz progress, understand usage,
        and improve the experience. For more details, see our{" "}
        <a href="/cookie-policy">Cookie Policy</a>.
      </p>

      <h2>5. Data Retention</h2>
      <p>
        We retain information for as long as reasonably necessary for the purposes described
        in this Privacy Policy, including to operate the Service, maintain internal records,
        improve the product, comply with legal obligations, resolve disputes, and enforce
        our agreements.
      </p>

      <h2>6. Data Security</h2>
      <p>
        We use reasonable administrative, technical, and organizational safeguards designed
        to protect personal information. These may include access controls, logging, and
        encryption in transit where appropriate.
      </p>
      <p>
        However, no method of transmission over the internet or method of electronic storage
        is completely secure, and we cannot guarantee absolute security.
      </p>

      <h2>7. Children’s Privacy</h2>
      <p>
        The Service is not intended for children under 18, and we do not knowingly collect
        personal information from children under 18 through this waitlist or beta experience.
      </p>

      <h2>8. Your Choices</h2>
      <p>
        You may opt out of promotional emails by using the unsubscribe link in those messages,
        where available.
      </p>
      <p>
        You may also contact us to request access, correction, deletion, or information about
        certain data we maintain about you, subject to applicable law, identity verification,
        technical limitations, and our legitimate business needs.
      </p>
      <p>
        You can also control certain cookies or local storage through your browser or device
        settings, though disabling some technologies may affect how the Service functions.
      </p>

      <h2>9. Third-Party Links and Services</h2>
      <p>
        The Service may contain links to third-party websites, products, or services. We are
        not responsible for the privacy practices, content, or policies of those third parties.
      </p>

      <h2>10. U.S. State Privacy Rights</h2>
      <p>
        Depending on your jurisdiction, you may have certain privacy rights under applicable
        U.S. state laws, which may include rights to access, correct, delete, or obtain a copy
        of certain personal information, or to appeal a decision regarding a privacy request.
      </p>
      <p>
        We may take reasonable steps to verify your identity before responding to such requests.
      </p>

      <h2>11. Changes to This Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. The updated version will be
        effective when posted with a revised “Last updated” date.
      </p>

      <h2>12. Contact</h2>
      <p>
        If you have questions about this Privacy Policy or our data practices, please contact
        Remi Wallet, Inc. at{" "}
        <a href="mailto:legal@remiwallet.io">legal@remiwallet.io</a>.
      </p>
    </FullTextPageLayout>
  );
}