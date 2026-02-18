import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#ECEAEB", // platinum
      paper: "#FFFFFF",
    },
    primary: {
      main: "#06D6A0", // emerald CTA
      contrastText: "#FFFFFF",
    },
    text: {
      primary: "#003D73",   // navy
      secondary: "#9A8F97", // taupe gray
    },
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, "SF Pro Display", "SF Pro Text", Inter, Arial, sans-serif',
    h3: { fontWeight: 800, letterSpacing: "-0.02em" },
    h4: { fontWeight: 800, letterSpacing: "-0.02em" },
    body1: { fontSize: "1.05rem", lineHeight: 1.5 },
    button: { textTransform: "none", fontWeight: 700 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          minHeight: 58, // large tap target
          paddingLeft: 18,
          paddingRight: 18,
        },
        containedPrimary: {
          boxShadow: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: "0 6px 22px rgba(0,0,0,0.06)",
        },
      },
    },
  },
});