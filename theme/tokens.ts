// theme/tokens.ts

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
          safeAreaPx: 4,
        },
      },
    },
  },

  // ---- Colors ----
  color: {
    // Raw 
    palette: {
      navy900: "#0B2B46",
      navy800: "#0F355A",
      navy700: "#14466F",

      slate900: "#0B1220",
      slate700: "#334155",
      slate500: "#64748B",
      slate300: "#CBD5E1",
      slate200: "#E2E8F0",
      slate100: "#F1F5F9",
      white: "#FFFFFF",

      // Jamesernet --> Cleanup and rename to generic names/labels?
      remiPage: "#ECEAEB",
      remiNavy: "#003D73",     // delete?
      remiTaupe: "#9A8F97",    // delete?

      mint600: "#06D6A0",
      mint500: "#10B981",
      mint100: "#D1FAE5",

      amber600: "#F59E0B",
      red600: "#EF4444",
    },

    // Semantic Tokens
    semantic: {
      bg: {
        page: "#ECEAEB",
        surface: "#FFFFFF",
        surfaceMuted: "#F8FAFC",
        footer: "#0B2B46",
        header: "#FFFFFF",
      },
      text: {
        primary: "#003D73",
        secondary: "#9A8F97",
        muted: "#64748B",
        inverse: "#FFFFFF",
        link: "#FFFFFF",
      },
      border: {
        default: "#E2E8F0",
        strong: "#CBD5E1",
      },
      brand: {
        primary: "#06D6A0",
        primaryHover: "#10B981",
        onPrimary: "#FFFFFF",
      },
      state: {
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#14466F",
      },
      focus: {
        ring: "rgba(6, 214, 160, 0.35)",
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
    md: 16, // ✅ default borderRadius
    lg: 20, // ✅ cards
    xl: 28,
    pill: 999,
  },

  // ---- Shadow ----
  shadow: {
    sm: "0 1px 2px rgba(15, 23, 42, 0.08)",
    md: "0 6px 18px rgba(15, 23, 42, 0.12)",
    lg: "0 12px 30px rgba(15, 23, 42, 0.16)",
  },

  // ---- Button ----
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
  },

  // ---- Z-index ----
  zIndex: {
    header: 1100,
    modal: 1300,
    toast: 1400,
  },
} as const ;

export type Tokens = typeof tokens;