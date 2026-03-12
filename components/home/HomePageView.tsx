// components/home/HomePageView.tsx

"use client";

import * as React from "react";
import { alpha, Box, Button, Stack, Typography } from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import { useRouter } from "next/navigation";
import {
  getOrCreateSessionId,
  clearResultsSnapshot,
  clearQuizAnswersKeepSession,
} from "@/lib/quiz/storage";
import { ensureQuizSessionStarted } from "@/lib/data/quizPersistence";
import { track, clearEventBuffer } from "@/lib/analytics/events";
import { createTrackOnce } from "@/lib/analytics/trackOnce";

const trackOnce = createTrackOnce(track);

function ConfidenceItem(props: {
  icon: React.ReactNode;
  title: string;
  body: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 1.75,
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
            mb: 0.35,
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

function ReassuranceText(props: { children: React.ReactNode }) {
  return (
    <Typography
      sx={(theme) => ({
        mt: 0.9,
        textAlign: "center",
        fontSize: "0.8rem",
        color: theme.palette.text.secondary,
        lineHeight: 1.4,
        maxWidth: 420,
        mx: "auto",
      })}
    >
      {props.children}
    </Typography>
  );
}

export default function HomePageView() {
  const router = useRouter();

  const onStart = async () => {
    getOrCreateSessionId();
    trackOnce("quiz_start", { source: "landing" }, "quiz_start");

    clearEventBuffer();
    clearResultsSnapshot();
    clearQuizAnswersKeepSession(false);

    try {
      await ensureQuizSessionStarted();
    } catch (error) {
      console.error("Failed to start backend quiz session", error);
    }

    router.push("/quiz/1");
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        px: { xs: 2, sm: 3 },
        py: { xs: 3.5, sm: 5.5, md: 6.5 },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 740,
          mx: "auto",
          position: "relative",
          isolation: "isolate",
        }}
      >
        <Box
          aria-hidden
          sx={(theme) => ({
            position: "absolute",
            top: -32,
            left: { xs: -24, sm: -40, md: -72 },
            width: { xs: 320, sm: 420, md: 520 },
            height: { xs: 220, sm: 280, md: 340 },
            borderRadius: "50%",
            zIndex: -1,
            pointerEvents: "none",
            background: `radial-gradient(
              circle,
              ${alpha(theme.palette.secondary.main, 0.16)} 0%,
              ${alpha(theme.palette.primary.main, 0.08)} 35%,
              rgba(255,255,255,0) 72%
            )`,
            filter: "blur(22px)",
            opacity: 0.95,
          })}
        />

        <Box
          sx={{
            width: "100%",
            maxWidth: 620,
            mx: "auto",
            position: "relative",
          }}
        >
          <Typography
            sx={(theme) => ({
              fontWeight: 800,
              letterSpacing: theme.typography.h4?.letterSpacing ?? "-0.025em",
              color: theme.palette.text.primary,
              fontSize: { xs: 38, sm: 52, md: 62 },
              lineHeight: { xs: 1.04, sm: 1.03, md: 1.02 },
              maxWidth: 600,
              transform: "translateY(-6px)",
              mb: 1.5,
              textAlign: "left",
            })}
          >
            You could be losing{" "}
            <Box
              component="span"
              sx={(theme) => ({
                color: theme.palette.secondary.main,
                fontStyle: "italic",
              })}
            >
              thousands
            </Box>{" "}
            every year in
            <Box component="br" sx={{ display: { xs: "none", sm: "block" } }} />
            unclaimed rewards and offers.
          </Typography>

          <Typography
            sx={(theme) => ({
              color: theme.palette.text.secondary,
              fontSize: { xs: 15.5, sm: 18, md: 20 },
              lineHeight: 1.6,
              maxWidth: 560,
              mb: 2.75,
              textAlign: "left",
            })}
          >
            Take 60 seconds to see if you’re leaving value on the table.
          </Typography>

          <Box
            sx={{
              width: "100%",
            }}
          >
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              onClick={onStart}
              sx={{
                fontSize: "1rem",
                fontWeight: 600,
                "&:hover": { filter: "brightness(0.98)" },
                "&:active": { transform: "translateY(1px)" },
              }}
            >
              See My Results
            </Button>

            <ReassuranceText>
              See your results before sharing any contact info.
            </ReassuranceText>
          </Box>

          <Stack
            spacing={2.25}
            sx={{
              mt: 3.1,
              width: "100%",
            }}
          >
            <ConfidenceItem
              icon={<AccessTimeOutlinedIcon />}
              title="Fast and free"
              body={
                <>
                  It only takes a few quick taps to get your{" "}
                  <strong>personalized result</strong>.
                </>
              }
            />

            <ConfidenceItem
              icon={<InsightsOutlinedIcon />}
              title="Find hidden rewards"
              body={
                <>
                  See where you may be missing{" "}
                  <strong>points, offers, or bonuses</strong>.
                </>
              }
            />

            <ConfidenceItem
              icon={<VisibilityOffOutlinedIcon />}
              title="Private by default"
              body={
                <>
                  Your answers <strong>stay anonymous</strong> while we analyze your card
                  setup.
                </>
              }
            />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}