//app/page.tsx

"use client";

import * as React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { getOrCreateSessionId } from "@/lib/quiz/storage";

function ConfidenceItem(props: {
  icon: string;
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
        sx={{
          width: 26,
          height: 26,
          minWidth: 26,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "999px",
          backgroundColor: "rgba(6,214,160,0.14)",
          color: "#06D6A0",
          fontSize: "0.95rem",
          fontWeight: 800,
          lineHeight: 1,
          mt: "2px",
          boxShadow: "inset 0 0 0 1px rgba(6,214,160,0.18)",
        }}
      >
        {props.icon}
      </Box>

      <Box>
        <Typography
          sx={{
            fontSize: { xs: "1rem", sm: "1.02rem" },
            fontWeight: 700,
            color: "#003D73",
            lineHeight: 1.35,
            mb: 0.35,
          }}
        >
          {props.title}
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: "0.95rem", sm: "0.98rem" },
            color: "#6F6A72",
            lineHeight: 1.62,
          }}
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
          sx={{
            fontWeight: 800,
            letterSpacing: "-0.025em",
            color: "#003D73",
            fontSize: { xs: 38, sm: 52, md: 62 },
            lineHeight: { xs: 1.06, sm: 1.05, md: 1.02 },
            maxWidth: 860,
            mb: 2,
          }}
        >
          The average American loses{" "}
          <Box component="span" sx={{ color: "#06D6A0", fontStyle: "italic" }}>
            thousands
          </Box>{" "}
          every year in unclaimed rewards and offers.
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            fontSize: { xs: 16, sm: 18 },
            lineHeight: 1.58,
            maxWidth: 720,
            mb: 3.25,
          }}
        >
          Take 60 seconds to see if you’re leaving value on the table.
        </Typography>

        <Box sx={{ maxWidth: 720 }}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={onStart}
            sx={{
              height: 60,
              borderRadius: 3,
              fontWeight: 700,
              fontSize: "1rem",
              textTransform: "none",
              bgcolor: "#06D6A0",
              boxShadow: "0 10px 24px rgba(0,0,0,0.10)",
              "&:hover": { bgcolor: "#06D6A0", filter: "brightness(0.98)" },
              "&:active": { transform: "translateY(1px)" },
            }}
          >
            Start
          </Button>

          <Stack
            spacing={2.25}
            sx={{
              mt: 3.25,
              maxWidth: 600,
            }}
          >
            <ConfidenceItem
              icon="🔒"
              title="Your info stays protected"
              body="We use modern security practices and collect only what we need for this early experience."
            />
            <ConfidenceItem
              icon="🕶️"
              title="Anonymous until you opt in"
              body="You can go through most of the quiz without telling us who you are. We only ask for contact details if you choose to join the waitlist."
            />
            <ConfidenceItem
              icon="⚡"
              title="Fast, simple, and risk-free"
              body="It takes about a minute to complete, and you can see where you may be leaving rewards on the table without any commitment."
            />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}