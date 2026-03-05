"use client";

import { Box, Container, Typography } from "@mui/material";
import LegalPageLayout from "@/components/layouts/TextPageLayout";

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="March 4, 2026">
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fff", py: { xs: 6, md: 8 } }}>
      <Container maxWidth="md">

        <Typography variant="body1" paragraph>
          This Privacy Policy explains how Remi Wallet, Inc. (“Remi,” “we,” “us,” or “our”)
          collects, uses, and protects information when you use our website, waitlist, quiz, and
          related services (collectively, the “Service”).
        </Typography>

        <Typography variant="body1" paragraph>
          By using the Service, you acknowledge the practices described in this Privacy Policy.
        </Typography>

        <Typography variant="h5" sx={{ mt: 4, mb: 1.5, fontWeight: 700 }}>
          1. Information We Collect
        </Typography>
        <Typography variant="body1" paragraph>
          We may collect the following categories of information:
        </Typography>
        <Box component="ul" sx={{ pl: 3, mb: 2 }}>
          <li><Typography variant="body1">Contact information, such as your email address and optionally your phone number</Typography></li>
          <li><Typography variant="body1">Information you provide through questionnaires, waitlist forms, or onboarding flows</Typography></li>
          <li><Typography variant="body1">Usage information, such as interactions with pages, buttons, and quiz steps</Typography></li>
          <li><Typography variant="body1">Device and technical information, such as browser type, approximate location, IP address, and referring pages, as available</Typography></li>
        </Box>

        <Typography variant="h5" sx={{ mt: 4, mb: 1.5, fontWeight: 700 }}>
          2. How We Use Information
        </Typography>
        <Typography variant="body1" paragraph>
          We may use collected information to:
        </Typography>
        <Box component="ul" sx={{ pl: 3, mb: 2 }}>
          <li><Typography variant="body1">Operate and improve the Service</Typography></li>
          <li><Typography variant="body1">Manage the waitlist and early access process</Typography></li>
          <li><Typography variant="body1">Communicate with you about product updates, beta access, and related service notices</Typography></li>
          <li><Typography variant="body1">Understand usage patterns and improve product design, messaging, and onboarding</Typography></li>
          <li><Typography variant="body1">Protect the security and integrity of the Service</Typography></li>
          <li><Typography variant="body1">Comply with legal obligations</Typography></li>
        </Box>

        <Typography variant="h5" sx={{ mt: 4, mb: 1.5, fontWeight: 700 }}>
          3. How We Share Information
        </Typography>
        <Typography variant="body1" paragraph>
          We do not sell your personal information. We may share information:
        </Typography>
        <Box component="ul" sx={{ pl: 3, mb: 2 }}>
          <li><Typography variant="body1">With service providers who help us operate the Service</Typography></li>
          <li><Typography variant="body1">If required by law, regulation, legal process, or governmental request</Typography></li>
          <li><Typography variant="body1">To protect the rights, safety, or security of Remi, our users, or others</Typography></li>
          <li><Typography variant="body1">In connection with a merger, financing, acquisition, or sale of assets</Typography></li>
        </Box>

        <Typography variant="h5" sx={{ mt: 4, mb: 1.5, fontWeight: 700 }}>
          4. Cookies and Analytics
        </Typography>
        <Typography variant="body1" paragraph>
          We may use cookies, local storage, analytics tools, and similar technologies to remember
          preferences, understand usage, and improve the Service.
        </Typography>

        <Typography variant="h5" sx={{ mt: 4, mb: 1.5, fontWeight: 700 }}>
          5. Data Retention
        </Typography>
        <Typography variant="body1" paragraph>
          We retain information for as long as reasonably necessary to operate the Service,
          maintain records, comply with legal obligations, resolve disputes, and enforce our
          agreements.
        </Typography>

        <Typography variant="h5" sx={{ mt: 4, mb: 1.5, fontWeight: 700 }}>
          6. Data Security
        </Typography>
        <Typography variant="body1" paragraph>
          We use reasonable administrative, technical, and organizational measures to protect
          personal information. However, no method of transmission or storage is completely secure,
          and we cannot guarantee absolute security.
        </Typography>

        <Typography variant="h5" sx={{ mt: 4, mb: 1.5, fontWeight: 700 }}>
          7. Children’s Privacy
        </Typography>
        <Typography variant="body1" paragraph>
          The Service is not intended for children under 18, and we do not knowingly collect
          personal information from children under 18.
        </Typography>

        <Typography variant="h5" sx={{ mt: 4, mb: 1.5, fontWeight: 700 }}>
          8. Your Choices
        </Typography>
        <Typography variant="body1" paragraph>
          You may opt out of promotional emails by using the unsubscribe link in those messages,
          where available. You may also contact us to request updates or deletion of certain
          information, subject to applicable law and our operational requirements.
        </Typography>

        <Typography variant="h5" sx={{ mt: 4, mb: 1.5, fontWeight: 700 }}>
          9. Third-Party Links and Services
        </Typography>
        <Typography variant="body1" paragraph>
          The Service may contain links to third-party websites or services. We are not responsible
          for the privacy practices or content of those third parties.
        </Typography>

        <Typography variant="h5" sx={{ mt: 4, mb: 1.5, fontWeight: 700 }}>
          10. California and Other U.S. Privacy Rights
        </Typography>
        <Typography variant="body1" paragraph>
          Depending on your jurisdiction, you may have certain privacy rights regarding access,
          correction, deletion, or portability of your personal information. We may take
          reasonable steps to verify your identity before responding to such requests.
        </Typography>

        <Typography variant="h5" sx={{ mt: 4, mb: 1.5, fontWeight: 700 }}>
          11. Changes to This Privacy Policy
        </Typography>
        <Typography variant="body1" paragraph>
          We may update this Privacy Policy from time to time. The updated version will be
          effective when posted with a revised “Last updated” date.
        </Typography>

        <Typography variant="h5" sx={{ mt: 4, mb: 1.5, fontWeight: 700 }}>
          12. Contact
        </Typography>
        <Typography variant="body1" paragraph>
          If you have questions about this Privacy Policy or our data practices, please contact
          Remi Wallet, Inc. through the contact information made available on our website.
        </Typography>
      </Container>
    </Box>
    </LegalPageLayout>
  );
}
