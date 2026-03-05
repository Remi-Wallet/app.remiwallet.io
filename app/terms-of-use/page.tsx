"use client";

import { Box, Container, Typography } from "@mui/material";
import LegalPageLayout from "@/components/layouts/TextPageLayout";

export default function TermsOfUsePage() {
  return (
    <LegalPageLayout title="Terms of Use" lastUpdated="March 4, 2026">
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fff", py: { xs: 6, md: 8 } }}>
      <Container maxWidth="md">
        <Typography variant="body1" paragraph>
          These Terms of Use (“Terms”) govern your access to and use of the Remi Wallet, Inc.
          website, waitlist, quiz, and related services (collectively, the “Service”). By
          accessing or using the Service, you agree to these Terms. If you do not agree, please
          do not use the Service.
        </Typography>

        <Typography variant="h5" sx={{ mt: 4, mb: 1.5, fontWeight: 700 }}>
          1. Eligibility
        </Typography>
        <Typography variant="body1" paragraph>
          You must be at least 18 years old to use the Service. By using the Service, you
          represent that you meet this requirement.
        </Typography>

        <Typography variant="h5" sx={{ mt: 4, mb: 1.5, fontWeight: 700 }}>
          2. Early Access / Waitlist
        </Typography>
        <Typography variant="body1" paragraph>
          Remi is in an early stage of development. The Service may currently include a waitlist,
          informational content, questionnaires, product previews, and related communications.
        </Typography>
        <Typography variant="body1" paragraph>
          Submission of your information does not guarantee access to any future product, feature,
          or beta program.
        </Typography>

        <Typography variant="h5" sx={{ mt: 4, mb: 1.5, fontWeight: 700 }}>
          3. No Financial, Tax, or Legal Advice
        </Typography>
        <Typography variant="body1" paragraph>
          The Service is provided for general informational purposes only. Remi Wallet, Inc. does
          not provide financial, investment, tax, legal, or credit advice through the Service.
        </Typography>
        <Typography variant="body1" paragraph>
          Any estimates, optimization suggestions, projected rewards, or educational content are
          illustrative only and may be incomplete, inaccurate, or subject to change.
        </Typography>

        <Typography variant="h5" sx={{ mt: 4, mb: 1.5, fontWeight: 700 }}>
          4. Use of the Service
        </Typography>
        <Typography variant="body1" paragraph>
          You agree to use the Service only for lawful purposes and in a manner that does not
          interfere with the operation of the Service or the rights of others.
        </Typography>
        <Box component="ul" sx={{ pl: 3, mb: 2 }}>
          <li><Typography variant="body1">Use the Service for unlawful, fraudulent, or abusive purposes</Typography></li>
          <li><Typography variant="body1">Attempt to gain unauthorized access to systems, accounts, or data</Typography></li>
          <li><Typography variant="body1">Reverse engineer, copy, scrape, or misuse the Service</Typography></li>
          <li><Typography variant="body1">Interfere with or disrupt the functionality of the Service</Typography></li>
        </Box>

        <Typography variant="h5" sx={{ mt: 4, mb: 1.5, fontWeight: 700 }}>
          5. Communications
        </Typography>
        <Typography variant="body1" paragraph>
          By submitting your email address or other contact information, you agree that we may
          contact you regarding your waitlist status, product updates, beta access, and related
          service communications, subject to applicable law and your communication preferences.
        </Typography>

        <Typography variant="h5" sx={{ mt: 4, mb: 1.5, fontWeight: 700 }}>
          6. Intellectual Property
        </Typography>
        <Typography variant="body1" paragraph>
          The Service, including its software, design, branding, content, and materials, is owned
          by Remi Wallet, Inc. or its licensors and is protected by applicable intellectual
          property laws. You may not reproduce, distribute, modify, or create derivative works
          without prior written permission.
        </Typography>

        <Typography variant="h5" sx={{ mt: 4, mb: 1.5, fontWeight: 700 }}>
          7. Third-Party Services
        </Typography>
        <Typography variant="body1" paragraph>
          The Service may reference or integrate third-party products, services, card issuers,
          payment providers, or websites. We are not responsible for third-party content, terms,
          or privacy practices.
        </Typography>

        <Typography variant="h5" sx={{ mt: 4, mb: 1.5, fontWeight: 700 }}>
          8. Disclaimer of Warranties
        </Typography>
        <Typography variant="body1" paragraph>
          The Service is provided on an “as is” and “as available” basis. To the maximum extent
          permitted by law, Remi Wallet, Inc. disclaims all warranties, express or implied,
          including warranties of merchantability, fitness for a particular purpose, accuracy,
          availability, and non-infringement.
        </Typography>

        <Typography variant="h5" sx={{ mt: 4, mb: 1.5, fontWeight: 700 }}>
          9. Limitation of Liability
        </Typography>
        <Typography variant="body1" paragraph>
          To the maximum extent permitted by law, Remi Wallet, Inc. and its affiliates, officers,
          employees, and contractors will not be liable for any indirect, incidental, special,
          consequential, or punitive damages, or for any loss of data, profits, or opportunities
          arising out of or related to your use of the Service.
        </Typography>
        <Typography variant="body1" paragraph>
          If liability is found, our total liability to you will not exceed one hundred U.S.
          dollars (US $100).
        </Typography>

        <Typography variant="h5" sx={{ mt: 4, mb: 1.5, fontWeight: 700 }}>
          10. Changes to the Service
        </Typography>
        <Typography variant="body1" paragraph>
          We may modify, suspend, or discontinue any part of the Service at any time, with or
          without notice.
        </Typography>

        <Typography variant="h5" sx={{ mt: 4, mb: 1.5, fontWeight: 700 }}>
          11. Termination
        </Typography>
        <Typography variant="body1" paragraph>
          We may suspend or terminate your access to the Service at any time if we believe you
          have violated these Terms or if we decide to change or discontinue the Service.
        </Typography>

        <Typography variant="h5" sx={{ mt: 4, mb: 1.5, fontWeight: 700 }}>
          12. Governing Law
        </Typography>
        <Typography variant="body1" paragraph>
          These Terms are governed by the laws of the State of California, without regard to
          conflict-of-law principles.
        </Typography>

        <Typography variant="h5" sx={{ mt: 4, mb: 1.5, fontWeight: 700 }}>
          13. Changes to These Terms
        </Typography>
        <Typography variant="body1" paragraph>
          We may update these Terms from time to time. The updated version will be effective when
          posted with a revised “Last updated” date. Your continued use of the Service after any
          update constitutes acceptance of the revised Terms.
        </Typography>

        <Typography variant="h5" sx={{ mt: 4, mb: 1.5, fontWeight: 700 }}>
          14. Contact
        </Typography>
        <Typography variant="body1" paragraph>
          If you have questions about these Terms, please contact Remi Wallet, Inc. through the
          contact information made available on our website.
        </Typography>
      </Container>
    </Box>
    </LegalPageLayout>
  );
}