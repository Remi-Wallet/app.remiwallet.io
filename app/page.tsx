// app/page.tsx

"use client";
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
import { track } from "@/lib/analytics/events";
import { createTrackOnce } from "@/lib/analytics/trackOnce";

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

export default function HomePage() {
  const router = useRouter();

  const onStart = () => {
    getOrCreateSessionId();
    trackOnce("quiz_start", { source: "landing" }, "quiz_start");
    clearResultsSnapshot();
    clearQuizAnswersKeepSession(false); // clear answers + results but keep sessionID
    router.push("/quiz/1");
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        px: { xs: 2, sm: 3 },
        py: { xs: 4, sm: 6, md: 7 },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 920,
        }}
      >
        <Typography
          sx={(theme) => ({
            fontWeight: 800,
            letterSpacing: theme.typography.h4?.letterSpacing ?? "-0.025em",
            color: theme.palette.text.primary,
            fontSize: { xs: 38, sm: 52, md: 62 },
            lineHeight: { xs: 1.06, sm: 1.05, md: 1.02 },
            maxWidth: 860,
            mb: 2,
          })}
        >
          The average American loses{" "}
          <Box
            component="span"
            sx={(theme) => ({
              color: theme.palette.primary.main,
              fontStyle: "italic",
            })}
          >
            thousands
          </Box>{" "}
          every year in unclaimed rewards and offers.
        </Typography>

        <Typography
          sx={(theme) => ({
            color: theme.palette.text.secondary,
            fontSize: { xs: 16, sm: 18 },
            lineHeight: 1.58,
            maxWidth: 720,
            mb: 3.25,
          })}
        >
          Take 60 seconds to see if you’re leaving value on the table.
        </Typography>

        <Box sx={{ maxWidth: 720 }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            onClick={onStart}
            sx={{
              fontSize: "1rem",
              "&:hover": { filter: "brightness(0.98)" },
              "&:active": { transform: "translateY(1px)" },
            }}
          >
            See My Results
          </Button>

          <Stack
            spacing={2.25}
            sx={{
              mt: 3.25,
              maxWidth: 600,
            }}
          >
            <ConfidenceItem
              icon={<AccessTimeOutlinedIcon />}
              title="Fast and free"
              body="It only takes a few quick taps to get your personalized result."
            />
            <ConfidenceItem
              icon={<VisibilityOffOutlinedIcon />}
              title="No contact info required"
              body="You can see your results before sharing your name, email, or anything else that identifies you."
            />
            <ConfidenceItem
              icon={<InsightsOutlinedIcon />}
              title="Results tailored to you"
              body="We use your answers to tailor results to your spending habits and card setup."
            />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}