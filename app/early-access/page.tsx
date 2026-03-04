"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { QuizShell } from "@/components/quiz/QuizShell";

export default function EarlyAccessPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [optInProduct, setOptInProduct] = useState(true);
  const [optInBeta, setOptInBeta] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = email.trim().length > 3 && email.includes("@");

  useEffect(() => {
    console.log({
      ts: new Date().toISOString(),
      event: "early_access_view",
      path: "/early-access",
    });
  }, []);

  const onSubmit = () => {
    const payload = {
      email: email.trim(),
      phone: phone.trim() || null,
      optInProduct,
      optInBeta,
      createdAt: new Date().toISOString(),
    };

    // placeholder: persist locally
    localStorage.setItem("remi_waitlist_lead", JSON.stringify(payload));

    console.log({
      ts: new Date().toISOString(),
      event: "lead_submitted",
      path: "/early-access",
      hasPhone: !!phone.trim(),
      optInProduct,
      optInBeta,
    });

    setSubmitted(true);
  };

  return (
    <QuizShell
      variant="quiz"
      title={submitted ? "You’re on the list." : "Join early access"}
      subtitle={
        submitted
          ? "We’ll email you when Remi is ready."
          : "No card numbers. No credit check. Just early access when we launch."
      }
    >
      {submitted ? (
        <Stack spacing={2}>
          <Button variant="contained" size="large" onClick={() => router.push("/")}>
            Back to start
          </Button>
        </Stack>
      ) : (
        <Stack spacing={2.25}>
          <TextField
            label="Email"
            placeholder="you@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
          />

          <TextField
            label="Phone (optional)"
            placeholder="(555) 123-4567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
          />

          <Box sx={{ mt: 0.5 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={optInProduct}
                  onChange={(e) => setOptInProduct(e.target.checked)}
                />
              }
              label={<Typography variant="body2">Send me product updates</Typography>}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={optInBeta}
                  onChange={(e) => setOptInBeta(e.target.checked)}
                />
              }
              label={<Typography variant="body2">I’m open to beta / concierge onboarding</Typography>}
            />
          </Box>

          <Button variant="contained" size="large" disabled={!canSubmit} onClick={onSubmit}>
            Join waitlist
          </Button>

          <Button variant="text" onClick={() => router.push("/")}>
            Restart
          </Button>
        </Stack>
      )}
    </QuizShell>
  );
}