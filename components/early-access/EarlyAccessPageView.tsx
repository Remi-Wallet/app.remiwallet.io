// components/early-access/EarlyAccessPageView.tsx

"use client";

import * as React from "react";
import { alpha, Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import StarsOutlinedIcon from "@mui/icons-material/StarsOutlined";
import { useRouter } from "next/navigation";

import { QuizShell } from "@/components/quiz/QuizShell";
import { track } from "@/lib/analytics/events";
import { createTrackOnce } from "@/lib/analytics/trackOnce";
import { submitWaitlistLead } from "@/lib/data/quizPersistence";
import { loadResultsSnapshot, loadQuizState } from "@/lib/quiz/storage";
import type { Tier } from "@/lib/quiz/types";
import { tokens } from "@/theme/tokens";

const trackOnce = createTrackOnce(track);

function ConfidenceItem(props: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 1.5,
        p: 2,
        height: "100%",
        borderRadius: tokens.radius.md,
        backgroundColor: tokens.color.semantic.bg.surface,
        border: `1px solid ${tokens.color.semantic.border.default}`,
        boxShadow: tokens.shadow.sm,
      }}
    >
      <Box
        sx={(theme) => ({
          width: 28,
          height: 28,
          minWidth: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "999px",
          backgroundColor: alpha(theme.palette.primary.main, 0.14),
          color: theme.palette.primary.main,
          mt: "2px",
          boxShadow: `inset 0 0 0 1px ${alpha(theme.palette.primary.main, 0.18)}`,
          "& .MuiSvgIcon-root": {
            fontSize: 17,
          },
        })}
      >
        {props.icon}
      </Box>

      <Box>
        <Typography
          sx={(theme) => ({
            fontSize: { xs: "1rem", sm: "1.02rem" },
            fontWeight: 700,
            color: theme.palette.text.primary,
            lineHeight: 1.35,
            mb: 0.25,
          })}
        >
          {props.title}
        </Typography>

        <Typography
          sx={(theme) => ({
            fontSize: { xs: "0.95rem", sm: "0.98rem" },
            color: theme.palette.text.secondary,
            lineHeight: 1.62,
          })}
        >
          {props.body}
        </Typography>
      </Box>
    </Box>
  );
}

function getTierContent(tier?: Tier, score?: number) {
  if (tier === "A") {
    return {
      title: "You may qualify for early beta access",
      subtitle:
        "Based on your results, you appear to be a strong fit for early testing and higher-touch onboarding.",
      calloutTitle: "Strong candidate for early beta",
      calloutBody:
        "Your results suggest you may be a strong fit for our early beta group as we refine Remi with real users.",
      confidenceItems: [
        {
          icon: <AccessTimeOutlinedIcon />,
          title: "Priority early access",
          body: "Strong-fit users may receive invitations earlier as we expand onboarding.",
        },
        {
          icon: <LockOutlinedIcon />,
          title: "No credit card required",
          body: "This signup is only for early access, product updates, and future invites.",
        },
        {
          icon: <AutoAwesomeOutlinedIcon />,
          title: "Higher-touch support",
          body: "Some early adopters may receive more hands-on onboarding as we build the platform.",
        },
      ],
    };
  }

  if (tier === "B") {
    return {
      title: "You may qualify for early access",
      subtitle:
        "Based on your results, you may be a strong fit for early product access as we open onboarding more broadly.",
      calloutTitle: "Good fit for early access",
      calloutBody:
        "Your results suggest you may be a strong fit for early access as we expand product testing and onboarding.",
      confidenceItems: [
        {
          icon: <AccessTimeOutlinedIcon />,
          title: "Early access updates",
          body: "Join the list now and get product updates as early access opens.",
        },
        {
          icon: <LockOutlinedIcon />,
          title: "No credit card required",
          body: "This signup is just for early access and product updates.",
        },
        {
          icon: <AutoAwesomeOutlinedIcon />,
          title: "Potential beta invites",
          body: "Some users may be invited into more guided onboarding as Remi evolves.",
        },
      ],
    };
  }

  return {
    title: "Get early access",
    subtitle: "Get early access when Remi launches. No credit check. No card numbers required.",
    calloutTitle: "Join the waitlist",
    calloutBody:
      "Join the list now to get updates, invitations, and product access as Remi continues to evolve.",
    confidenceItems: [
      {
        icon: <AccessTimeOutlinedIcon />,
        title: "Free early access",
        body: "Join the list now and get product updates as early access opens.",
      },
      {
        icon: <LockOutlinedIcon />,
        title: "No credit card required",
        body: "This signup is just for early access and product updates.",
      },
      {
        icon: <AutoAwesomeOutlinedIcon />,
        title: "Product invites",
        body: "We’ll share early access invitations and updates as the platform evolves.",
      },
    ],
  };
}

export default function EarlyAccessPageView() {
  const router = useRouter();

  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const snapshot = React.useMemo(() => loadResultsSnapshot(), []);
  const quizState = React.useMemo(() => loadQuizState(), []);
  const tier = snapshot?.tier ?? quizState.tier;
  const score = snapshot?.score ?? 0;

  const content = getTierContent(tier, score);
  const isQualified = tier === "A" || tier === "B";

  React.useEffect(() => {
    trackOnce(
      "step_view",
      {
        step: "early_access",
        source: "waitlist",
        tier,
        score,
      },
      "early_access_view"
    );
  }, [tier, score]);

  const emailIsValid = /\S+@\S+\.\S+/.test(email.trim());
  const canSubmit = fullName.trim().length >= 2 && emailIsValid && !submitting;

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);

    try {
      track("lead_submit", {
        source: "early_access",
        method: "email",
        hasName: !!fullName.trim(),
        tier,
        score,
      });

      await submitWaitlistLead({
        fullName,
        email,
        source: "early_access",
      });

      track("lead_submitted", {
        source: "early_access",
        method: "email",
        tier,
        score,
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Failed to submit waitlist lead", error);
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
  };

  if (submitted) {
    return (
      <QuizShell
        variant="quiz"
        title="You’re on the list."
        subtitle={
          isQualified
            ? "We’ll reach out when early access opens and when we have higher-touch onboarding spots available."
            : "We’ll reach out when early access opens and as product invitations become available."
        }
      >
        <Box sx={{ maxWidth: 620 }}>
          <Stack spacing={2.5}>
            <Box
              sx={{
                p: 2.25,
                borderRadius: tokens.radius.md,
                border: `1px solid ${tokens.color.semantic.border.default}`,
                backgroundColor: tokens.color.semantic.bg.surface,
                boxShadow: tokens.shadow.sm,
              }}
            >
              <Typography
                sx={{
                  fontSize: 16,
                  lineHeight: 1.65,
                  color: tokens.color.semantic.text.secondary,
                }}
              >
                Thanks for joining early access. We’ll use your email to share product updates,
                invitations, and next steps as Remi evolves.
              </Typography>
            </Box>

            <Button variant="contained" size="large" onClick={() => router.push("/")}>
              Back to home
            </Button>
          </Stack>
        </Box>
      </QuizShell>
    );
  }

  return (
    <QuizShell variant="quiz" title={content.title} subtitle={content.subtitle}>
      <Box sx={{ width: "100%", maxWidth: 980 }}>
        <Stack spacing={3}>
          {isQualified ? (
            <Box
              sx={(theme) => ({
                display: "flex",
                alignItems: "flex-start",
                gap: 1.5,
                p: 2,
                borderRadius: tokens.radius.md,
                backgroundColor: alpha(theme.palette.secondary.main, 0.08),
                border: `1px solid ${alpha(theme.palette.secondary.main, 0.24)}`,
              })}
            >
              <Box
                sx={(theme) => ({
                  width: 32,
                  height: 32,
                  minWidth: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "999px",
                  backgroundColor: alpha(theme.palette.secondary.main, 0.14),
                  color: theme.palette.secondary.main,
                  mt: "2px",
                })}
              >
                <StarsOutlinedIcon sx={{ fontSize: 18 }} />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: tokens.typography.weight.bold,
                    color: tokens.color.semantic.text.primary,
                    mb: 0.4,
                  }}
                >
                  {content.calloutTitle}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: tokens.color.semantic.text.secondary,
                  }}
                >
                  {content.calloutBody}
                </Typography>
              </Box>
            </Box>
          ) : null}

          <Grid container spacing={{ xs: 3, md: 4 }} alignItems="start">
            <Grid item xs={12} md={7}>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  maxWidth: { xs: "100%", md: 520 },
                }}
              >
                <TextField
                  fullWidth
                  label="Full name"
                  placeholder="Jane Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoComplete="name"
                  InputLabelProps={{ shrink: true }}
                />

                <TextField
                  fullWidth
                  label="Email address"
                  placeholder="you@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  InputLabelProps={{ shrink: true }}
                />

                <Typography
                  variant="caption"
                  sx={{
                    color: "text.secondary",
                    lineHeight: 1.6,
                    mt: -0.5,
                  }}
                >
                  We’ll only use your email to send early access updates and product invitations.
                </Typography>

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  type="submit"
                  disabled={!canSubmit}
                  sx={{
                    mt: 0.5,
                    minHeight: tokens.component.button.minHeight,
                  }}
                >
                  {submitting ? "Submitting..." : "Request early access"}
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} md={5}>
              <Grid container spacing={2}>
                {content.confidenceItems.map((item) => (
                  <Grid item xs={12} sm={6} md={12} key={item.title}>
                    <ConfidenceItem
                      icon={item.icon}
                      title={item.title}
                      body={item.body}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </QuizShell>
  );
}