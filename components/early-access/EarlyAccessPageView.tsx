// components/early-access/EarlyAccessPageView.tsx

"use client";

import * as React from "react";
import {
  alpha,
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
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
        gap: 1.25,
        p: 1.5,
        height: "100%",
        borderRadius: 3,
        backgroundColor: "rgba(255,255,255,0.7)",
        border: `1px solid ${tokens.color.semantic.border.default}`,
        boxShadow: "0 4px 14px rgba(0,0,0,0.04)",
        backdropFilter: "blur(6px)",
      }}
    >
      <Box
        sx={(theme) => ({
          width: 26,
          height: 26,
          minWidth: 26,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "999px",
          backgroundColor: alpha(theme.palette.primary.main, 0.14),
          color: theme.palette.primary.main,
          mt: "2px",
          boxShadow: `inset 0 0 0 1px ${alpha(theme.palette.primary.main, 0.18)}`,
          "& .MuiSvgIcon-root": {
            fontSize: 16,
          },
        })}
      >
        {props.icon}
      </Box>

      <Box>
        <Typography
          sx={(theme) => ({
            fontSize: { xs: "0.98rem", sm: "1rem" },
            fontWeight: 700,
            color: theme.palette.text.primary,
            lineHeight: 1.32,
            mb: 0.2,
          })}
        >
          {props.title}
        </Typography>

        <Typography
          sx={(theme) => ({
            fontSize: { xs: "0.93rem", sm: "0.96rem" },
            color: theme.palette.text.secondary,
            lineHeight: 1.52,
          })}
        >
          {props.body}
        </Typography>
      </Box>
    </Box>
  );
}

function ReassuranceText(props: { children: React.ReactNode }) {
  return (
    <Typography
      sx={(theme) => ({
        mt: 0.75,
        textAlign: "center",
        fontSize: "0.76rem",
        color: theme.palette.text.secondary,
        lineHeight: 1.35,
        maxWidth: 420,
        mx: "auto",
        opacity: 0.88,
      })}
    >
      {props.children}
    </Typography>
  );
}

function ProgressIndicator() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mb: 2.25,
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{
          alignItems: "center",
          color: "text.secondary",
        }}
      >
        <Typography sx={{ fontSize: 13, fontWeight: 500 }}>Quiz</Typography>
        <Typography sx={{ fontSize: 13 }}>✓</Typography>

        <Typography sx={{ fontSize: 13, opacity: 0.45 }}>→</Typography>

        <Typography sx={{ fontSize: 13, fontWeight: 500 }}>Results</Typography>
        <Typography sx={{ fontSize: 13 }}>✓</Typography>

        <Typography sx={{ fontSize: 13, opacity: 0.45 }}>→</Typography>

        <Typography
          sx={(theme) => ({
            fontSize: 13,
            fontWeight: 700,
            color: theme.palette.text.primary,
          })}
        >
          Early Access
        </Typography>
      </Stack>
    </Box>
  );
}

function getTierContent(tier?: Tier) {
  if (tier === "A") {
    return {
      title: "Request early access",
      subtitle:
        "You appear to be a strong fit for early testing. Complete your request below.",
      calloutTitle: "Strong candidate for early beta",
      calloutBody:
        "Users with multi-card setups like yours often unlock significantly more value through better category coverage, card pairing, and redemption timing.",
      ctaLabel: "Request Early Access",
      benefits: [
        {
          icon: <AccessTimeOutlinedIcon />,
          title: "Priority updates",
          body: "We’ll notify you as higher-priority onboarding spots become available.",
        },
        {
          icon: <AutoAwesomeOutlinedIcon />,
          title: "Early product access",
          body: "Selected users may get earlier invitations as Remi rolls out in waves.",
        },
        {
          icon: <LockOutlinedIcon />,
          title: "Simple signup",
          body: "No credit card or payment info is required for early access.",
        },
      ],
    };
  }

  if (tier === "B") {
    return {
      title: "See if you qualify",
      subtitle:
        "You may be a strong fit for early access. Complete your request below.",
      calloutTitle: "Good fit for early access",
      calloutBody:
        "Users with setups like yours can often capture more value with a few targeted changes and better category alignment.",
      ctaLabel: "See If You Qualify",
      benefits: [
        {
          icon: <AccessTimeOutlinedIcon />,
          title: "Early access updates",
          body: "We’ll keep you posted as onboarding expands and access opens more broadly.",
        },
        {
          icon: <AutoAwesomeOutlinedIcon />,
          title: "Potential beta invite",
          body: "Some users may be invited into early product testing as Remi evolves.",
        },
        {
          icon: <LockOutlinedIcon />,
          title: "No payment info required",
          body: "This signup is only for access updates, invitations, and product news.",
        },
      ],
    };
  }

  return {
    title: "Join the waitlist",
    subtitle:
      "Join the waitlist and we’ll keep you updated as early access expands.",
    calloutTitle: "Stay in the loop",
    calloutBody:
      "You’ll be first to hear about future access, product updates, and onboarding waves.",
    ctaLabel: "Join Waitlist",
    benefits: [
      {
        icon: <AccessTimeOutlinedIcon />,
        title: "Product updates",
        body: "We’ll share progress and availability as early access opens over time.",
      },
      {
        icon: <AutoAwesomeOutlinedIcon />,
        title: "Future invitations",
        body: "Waitlist users will hear first as new access waves become available.",
      },
      {
        icon: <LockOutlinedIcon />,
        title: "Quick, lightweight signup",
        body: "No credit card or payment info is required to join the waitlist.",
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

  const content = getTierContent(tier);
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
            ? "We’ll follow up as early access expands and onboarding spots become available."
            : "We’ll keep you updated as new access waves and invitations become available."
        }
      >
        <Box sx={{ maxWidth: 620 }}>
          <Stack spacing={2.5}>
            <Box
              sx={{
                p: 2.25,
                borderRadius: 3,
                border: `1px solid ${tokens.color.semantic.border.default}`,
                backgroundColor: "rgba(255,255,255,0.72)",
                boxShadow: "0 6px 18px rgba(0,0,0,0.04)",
                backdropFilter: "blur(6px)",
              }}
            >
              <Typography
                sx={{
                  fontSize: 16,
                  lineHeight: 1.65,
                  color: tokens.color.semantic.text.secondary,
                }}
              >
                Thanks for signing up. We’ll use your email to share product updates,
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
    <QuizShell variant="quiz" title={content.title} subtitle={content.subtitle} beforeTitle={<ProgressIndicator />}>

      <Box sx={{ width: "100%", maxWidth: 980 }}>
        <Stack spacing={3.25}>
          {isQualified ? (
            <Box
              sx={(theme) => ({
                display: "flex",
                alignItems: "flex-start",
                gap: 1.5,
                p: 1.75,
                borderRadius: 3,
                backgroundColor: alpha(theme.palette.secondary.main, 0.06),
                border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
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
                <Typography
                  sx={{
                    fontSize: 12,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    color: "text.secondary",
                    mb: -0.5,
                  }}
                >
                  Complete your request
                </Typography>

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

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  type="submit"
                  disabled={!canSubmit}
                  sx={{
                    mt: 0.25,
                    minHeight: tokens.component.button.minHeight,
                    fontWeight: 600,
                  }}
                >
                  {submitting ? "Submitting..." : content.ctaLabel}
                </Button>

                <ReassuranceText>
                  No credit card required for early access.
                </ReassuranceText>
              </Box>
            </Grid>

            <Grid item xs={12} md={5}>
              <Grid container spacing={1.5}>
                {content.benefits.map((item) => (
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