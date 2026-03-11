export const tokens = {
  brand: {
    name: "Remi",
    legalName: "Remi Wallet, Inc",
    assets: {
      logo: {
        fullLockup: {
          light: "/brand/remi/logo-full-light.svg",
          dark: "/brand/remi/logo-full-dark.svg",
        },
        wordmark: {
          light: "/brand/remi/wordmark-light.svg",
          dark: "/brand/remi/wordmark-dark.svg",
        },
        icon: {
          light: "/brand/remi/icon-light.svg",
          dark: "/brand/remi/icon-dark.svg",
        },
        preferred: {
          header: "wordmark",
          footer: "fullLockup",
          appIcon: "icon",
        },
        guidance: {
          minWidthPx: { fullLockup: 140, wordmark: 120, icon: 28 },
          idealHeightPx: { fullLockup: 36, wordmark: 28, icon: 28 },
          safeAreaPx: 4,
        },
      },
    },
  },

  // ---- Colors ----
  color: {
    palette: {
      forest950: "#052517",
      forest900: "#0A2F22",
      forest800: "#0F4A36",

      slate900: "#0F1F19",
      slate700: "#415951",
      slate500: "#6B7F77",
      slate300: "#C9D8D1",
      slate200: "#DDE8E2",
      slate100: "#F4FBF7",
      white: "#FFFFFF",

      green700: "#09563F",
      green600: "#0C6B4F",
      green500: "#2DBA7D",
      mint400: "#5CEC89",
      mint100: "#E7FAEF",

      amber600: "#F59E0B",
      red600: "#EF4444",
    },

    semantic: {
      bg: {
        page: "#F4FBF7",
        surface: "#FFFFFF",
        surfaceMuted: "#F7FBF9",
        header: "#F4FBF7",
        footer: "#041711",
      },

      text: {
        primary: "#052517",
        secondary: "#5F746B",
        muted: "#6B7F77",
        inverse: "#FFFFFF",
        link: "#FFFFFF",
      },

      border: {
        default: "#DDE8E2",
        strong: "#C9D8D1",
      },

      brand: {
        primary: "#0C6B4F",
        primaryHover: "#09563F",
        onPrimary: "#FFFFFF",
        accent: "#5CEC89",
        accentSoft: "#E7FAEF",
      },

      state: {
        success: "#2DBA7D",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#0F4A36",
      },

      focus: {
        ring: "rgba(45, 186, 125, 0.28)",
      },

      chrome: {
        header: {
          bg: "rgba(244,251,247,0.78)",
          border: "#DDE8E2",
        },
        footer: {
          bg: "#08261B",
          subBg: "#041711",
          text: "#F4FBF7",
          subText: "rgba(244,251,247,0.74)",
          link: "#F4FBF7",
          border: "rgba(255,255,255,0.10)",
          subBorder: "rgba(255,255,255,0.05)",
        },
      },
    },
  },

  // ---- Typography ----
  typography: {
    fontFamily: {
      sans:
        'ui-sans-serif, system-ui, -apple-system, "SF Pro Display", "SF Pro Text", Inter, Arial, sans-serif',
      mono:
        'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    },

    weight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },

    size: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 22,
      "2xl": 28,
      "3xl": 36,
      "4xl": 44,
    },

    lineHeight: {
      tight: 1.1,
      snug: 1.25,
      normal: 1.5,
    },

    letterSpacing: {
      tight: "-0.02em",
      normal: "0em",
      wide: "0.02em",
    },

    brandText: {
      header: {
        fontSize: { xs: "1.08rem", sm: "1.12rem", md: "1.2rem" },
        fontWeight: 800,
        letterSpacing: "0.12em",
        lineHeight: 1,
        textTransform: "uppercase",
      },
    },
  },

  // ---- Spacing (8px grid) ----
  spacing: {
    grid: 8,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    "2xl": 48,
    "3xl": 64,
  },

  // ---- Radius ----
  radius: {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 28,
    pill: 999,
  },

  // ---- Shadow ----
  shadow: {
    sm: "0 1px 2px rgba(15, 23, 42, 0.08)",
    md: "0 6px 18px rgba(15, 23, 42, 0.12)",
    lg: "0 12px 30px rgba(15, 23, 42, 0.16)",
  },

  // ---- Component tokens ----
  component: {
    button: {
      minHeight: 58,
      px: 18,
      radius: 16,
      containedShadow: "none",
    },
    card: {
      radius: 20,
      shadow: "0 6px 22px rgba(0,0,0,0.06)",
    },
  },

  // ---- Motion ----
  motion: {
    duration: {
      fast: 120,
      normal: 180,
      slow: 260,
    },
    easing: {
      standard: "cubic-bezier(0.2, 0, 0, 1)",
      emphasized: "cubic-bezier(0.2, 0, 0, 1.2)",
    },
  },

  // ---- Layout ----
  layout: {
    containerMax: 960,
    contentMax: 840,
    footerMax: 1200,
    headerHeight: 64,
    footerMinHeight: 72,
    headerBlurPx: 10,
  },

  // ---- Z-index ----
  zIndex: {
    header: 1100,
    modal: 1300,
    toast: 1400,
  },
} as const;

export type Tokens = typeof tokens;