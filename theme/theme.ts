import { createTheme } from "@mui/material/styles";
import { tokens as t } from "./tokens";

declare module "@mui/material/styles" {
  interface Theme {
    custom: {
      chrome: {
        header: {
          bg: string;
          border: string;
          height: number;
          blurPx: number;
        };
        footer: {
          bg: string;
          subBg: string;
          text: string;
          subText: string;
          link: string;
          border: string;
          subBorder: string;
          maxWidth: number;
        };
      };
      motion: {
        fast: number;
        normal: number;
        slow: number;
        easingStandard: string;
        easingEmphasized: string;
      };
      brand: {
        text: {
          header: {
            fontSize: {
              xs: string;
              sm: string;
              md: string;
            };
            fontWeight: number;
            letterSpacing: string;
            lineHeight: number;
            textTransform: "uppercase";
          };
        };
      };
    };
  }

  interface ThemeOptions {
    custom?: {
      chrome?: {
        header?: {
          bg?: string;
          border?: string;
          height?: number;
          blurPx?: number;
        };
        footer?: {
          bg?: string;
          subBg?: string;
          text?: string;
          subText?: string;
          link?: string;
          border?: string;
          subBorder?: string;
          maxWidth?: number;
        };
      };
      motion?: {
        fast?: number;
        normal?: number;
        slow?: number;
        easingStandard?: string;
        easingEmphasized?: string;
      };
      brand?: {
        text?: {
          header?: {
            fontSize?: {
              xs?: string;
              sm?: string;
              md?: string;
            };
            fontWeight?: number;
            letterSpacing?: string;
            lineHeight?: number;
            textTransform?: "uppercase";
          };
        };
      };
    };
  }
}

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: t.color.semantic.brand.primary,
      contrastText: t.color.semantic.brand.onPrimary,
    },
    secondary: {
      main: t.color.semantic.brand.accent,
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
    success: { main: t.color.semantic.state.success },
    warning: { main: t.color.semantic.state.warning },
    error: { main: t.color.semantic.state.error },
    info: { main: t.color.semantic.state.info },
  },

  shape: {
    borderRadius: t.radius.md,
  },

  typography: {
    fontFamily: t.typography.fontFamily.sans,

    h4: {
      fontWeight: t.typography.weight.extrabold,
      letterSpacing: t.typography.letterSpacing.tight,
    },

    body1: {
      fontSize: "1.05rem",
      lineHeight: 1.5,
    },

    button: {
      textTransform: "none",
      fontWeight: t.typography.weight.bold,
    },
  },

  custom: {
    chrome: {
      header: {
        bg: t.color.semantic.chrome.header.bg,
        border: t.color.semantic.chrome.header.border,
        height: t.layout.headerHeight,
        blurPx: t.layout.headerBlurPx,
      },
      footer: {
        bg: t.color.semantic.chrome.footer.bg,
        subBg: t.color.semantic.chrome.footer.subBg,
        text: t.color.semantic.chrome.footer.text,
        subText: t.color.semantic.chrome.footer.subText,
        link: t.color.semantic.chrome.footer.link,
        border: t.color.semantic.chrome.footer.border,
        subBorder: t.color.semantic.chrome.footer.subBorder,
        maxWidth: t.layout.footerMax,
      },
    },
    motion: {
      fast: t.motion.duration.fast,
      normal: t.motion.duration.normal,
      slow: t.motion.duration.slow,
      easingStandard: t.motion.easing.standard,
      easingEmphasized: t.motion.easing.emphasized,
    },
    brand: {
      text: {
        header: {
          fontSize: t.typography.brandText.header.fontSize,
          fontWeight: t.typography.brandText.header.fontWeight,
          letterSpacing: t.typography.brandText.header.letterSpacing,
          lineHeight: t.typography.brandText.header.lineHeight,
          textTransform: t.typography.brandText.header.textTransform,
        },
      },
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
          fontWeight: t.typography.weight.bold,
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

    MuiLink: {
      styleOverrides: {
        root: {
          fontWeight: t.typography.weight.semibold,
        },
      },
    },
  },
});