// theme/theme.ts
import { createTheme } from "@mui/material/styles";
import { tokens as t } from "./tokens";

export const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: t.color.semantic.brand.primary,
            contrastText: t.color.semantic.brand.onPrimary,
        },
        background: {
            default: t.color.semantic.bg.page,
            paper: t.color.semantic.bg.surface,
        },
        text: {
            primary: t.color.semantic.text.primary,
            secondary: t.color.semantic.text.secondary,
        },
        divider: t.color.semantic.border.default,
        error: { main: t.color.semantic.state.error },
        warning: { main: t.color.semantic.state.warning },
        success: { main: t.color.semantic.state.success },
        info: { main: t.color.semantic.state.info },
    },

    shape: {
        borderRadius: t.radius.md, // ✅ 16 (matches old)
    },

    typography: {
        fontFamily: t.typography.fontFamily.sans,

        // Keep your “shell” feel
        h4: {
            fontWeight: 800, // ✅ match old
            letterSpacing: t.typography.letterSpacing.tight,
        },

        body1: {
            fontSize: "1.05rem", // ✅ match old
            lineHeight: 1.5,
        },

        button: {
            textTransform: "none", // ✅ match old
            fontWeight: 700,
        },
    },

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: t.component.button.radius,
                    minHeight: t.component.button.minHeight,
                    paddingLeft: t.component.button.px,
                    paddingRight: t.component.button.px,
                    textTransform: "none",
                    fontWeight: 700,
                },
                containedPrimary: {
                    boxShadow: t.component.button.containedShadow,
                },
            },
        },

        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: t.component.card.radius,
                    boxShadow: t.component.card.shadow,
                },
            },
        },

        // Optional nice-to-have: make Links consistent with your “legal links” weight
        MuiLink: {
            styleOverrides: {
                root: {
                    fontWeight: t.typography.weight.semibold, // ✅ 600 feels right
                },
            },
        },
    },
});