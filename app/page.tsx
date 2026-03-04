"use client";

import * as React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { getOrCreateSessionId } from "@/lib/quiz/storage";

function BoosterRow(props: { title: string; subtitle: string }) {
  return (
    <Stack direction="row" spacing={1.5} alignItems="flex-start">
      <Box
        sx={{
          mt: "6px",
          width: 10,
          height: 10,
          borderRadius: 999,
          bgcolor: "rgba(6, 214, 160, 0.35)",
          boxShadow: "inset 0 0 0 2px rgba(6, 214, 160, 0.35)",
          flex: "0 0 auto",
        }}
      />
      <Box>
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 700,
            color: "text.primary",
            lineHeight: 1.2,
          }}
        >
          {props.title}
        </Typography>
        <Typography
          sx={{
            fontSize: 12.5,
            color: "text.secondary",
            mt: 0.35,
            lineHeight: 1.35,
          }}
        >
          {props.subtitle}
        </Typography>
      </Box>
    </Stack>
  );
}

export default function HomePage() {
  const router = useRouter();

  const onStart = () => {
    getOrCreateSessionId();
    router.push("/quiz/2");
  };

  return (
    <Box
      sx={{
        // AppShell should already provide full-height layout;
        // this just centers the landing content nicely.
        width: "100%",
        display: "flex",
        justifyContent: "center",
        px: { xs: 2, sm: 3 },
        py: { xs: 4, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 920, // makes desktop feel more “landing page”, not a tiny box
        }}
      >
        <Typography
          sx={{
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "#003D73",
            fontSize: { xs: 40, sm: 52, md: 62 },
            lineHeight: { xs: 1.05, sm: 1.05, md: 1.02 },
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
            lineHeight: 1.55,
            maxWidth: 720,
            mb: 3,
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
              textTransform: "none",
              bgcolor: "#06D6A0",
              boxShadow: "0 10px 24px rgba(0,0,0,0.10)",
              "&:hover": { bgcolor: "#06D6A0", filter: "brightness(0.98)" },
              "&:active": { transform: "translateY(1px)" },
            }}
          >
            Start
          </Button>

          <Stack spacing={1.5} sx={{ mt: 2.25 }}>
            <BoosterRow title="Bank-level security" subtitle="Best practices to protect your data." />
            <BoosterRow title="We don’t share your data" subtitle="No selling personal info." />
            <BoosterRow title="Mostly anonymous" subtitle="For most of this quiz, we won’t even know who you are." />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}