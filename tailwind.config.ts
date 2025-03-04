import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";

const SPACING = {
  DEFAULT: "1.5rem", // redundant?
  0.5: "0.125rem", // XTiny
  1: "0.25rem", // Tiny
  2: "0.5rem", // XXSmall
  3: "0.75rem", // XSmall
  4: "1rem", // Small
  6: "1.5rem", // Regular
  8: "2rem", // Medium
  12: "3rem", // Large
  16: "4rem", // XLarge
  20: "5rem", // XXLarge
  24: "6rem", // Huge
  32: "8rem", // XHuge
  48: "12rem", // XXHuge
};

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    fontSize: {
      xs: ["0.75rem", "1rem"],
      sm: ["0.875rem", "1rem"],
      rg: ["1.25rem", "1.75rem"],
      md: ["1.25rem", "1.75rem"],
      lg: ["1.5rem", "2rem"],
      xl: ["1.75rem", "2.15rem"],
      xxl: ["2.0rem", "2.30rem"],
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      width: SPACING,
      minWidth: SPACING,
      maxWidth: SPACING,
      height: SPACING,
      minHeight: SPACING,
      maxHeight: SPACING,
      spacing: {
        ...SPACING,
      },
      fontFamily: {
        darker: ["Darker Grotesque", ...fontFamily.sans],
      },
      colors: {
        border: colors.neutral["700"],
        // input: colors.violet["600"],
        text: colors.neutral["100"],
        input: colors.neutral["800"],
        ring: colors.violet["600"],
        background: colors.neutral["900"],
        backgroundInput: colors.neutral["800"],
        foreground: colors.neutral["700"],

        primary: {
          DEFAULT: colors.violet["600"],
          foreground: colors.violet["100"],
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: colors.neutral["700"],
          foreground: colors.neutral["100"],
        },
        popover: {
          // DEFAULT: "hsl(var(--secondary))",
          DEFAULT: colors.neutral["800"],
          foreground: colors.neutral["100"],
        },
        card: {
          DEFAULT: colors.neutral["900"],
          foreground: colors.neutral["100"],
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  screens: {
    sm: "576",
    // => @media (min-width: 640px) { ... }

    md: "960",
    // => @media (min-width: 768px) { ... }

    lg: "1080",
    // => @media (min-width: 1024px) { ... }

    xl: "1260",
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
