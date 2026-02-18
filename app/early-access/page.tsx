"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { Box, Button, Stack, TextField, Typography, FormControlLabel, Checkbox } from "@mui/material";
import { useRouter } from "next/navigation";
import { QuizShell } from "@/components/quiz/QuizShell";
import { track } from "@/lib/analytics/events";

export default function EarlyAccessPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [optInProduct, setOptInProduct] = useState(true);
  const [optInBeta, setOptInBeta] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = email.trim().length > 3 && email.includes("@");

  // Track view for funnel + dropoff analysis
  useEffect(() => {
    const tier = localStorage.getItem("remi_tier") || undefined;
    track("step_view", {
      step: "early_access",
      screenType: "lead_capture",
      tier,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = () => {
    const tier = localStorage.getItem("remi_tier") || undefined;

    track("lead_submit", {
      hasPhone: !!phone.trim(),
      optInProduct,
      optInBeta,
      tier,
    });

    const payload = {
      email: email.trim(),
      phone: phone.trim() || null,
      optInProduct,
      optInBeta,
      tier,
      createdAt: new Date().toISOString(),
    };

    // placeholder: persist locally
    localStorage.setItem("remi_waitlist_lead", JSON.stringify(payload));

    track("lead_submitted", {
      hasPhone: !!phone.trim(),
      tier,
    });

    // optional: redundant if you keep track() logs
    console.log("WAITLIST_LEAD_SUBMIT", payload);

    setSubmitted(true);
  };

  return (
    <QuizShell
      title={submitted ? "You’re on the list." : "Join early access"}
      subtitle={
        submitted
          ? "We’ll email you when Remi is ready."
          : "No card numbers. No credit check. Just early access when we launch."
      }
      showBack
    >
      {submitted ? (
        <Stack spacing={2}>
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              track("step_view", { step: "early_access_thank_you", screenType: "confirmation" });
              router.push("/");
            }}
          >
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
              control={<Checkbox checked={optInProduct} onChange={(e) => setOptInProduct(e.target.checked)} />}
              label={<Typography variant="body2">Send me product updates</Typography>}
            />
            <FormControlLabel
              control={<Checkbox checked={optInBeta} onChange={(e) => setOptInBeta(e.target.checked)} />}
              label={<Typography variant="body2">I’m open to beta / concierge onboarding</Typography>}
            />
          </Box>

          <Button variant="contained" size="large" disabled={!canSubmit} onClick={onSubmit}>
            Join waitlist
          </Button>

          <Button
            variant="text"
            onClick={() => {
              track("lead_submit", { action: "restart_click" });
              router.push("/");
            }}
          >
            Restart
          </Button>
        </Stack>
      )}
    </QuizShell>
  );
}