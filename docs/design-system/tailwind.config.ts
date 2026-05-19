import type { Config } from "tailwindcss";

/**
 * Tailwind config canónico · Compresores del Valle S.A.S.
 * Sistema de diseño v1.0 final (mayo 2026)
 *
 * Compatible con Tailwind CSS v3 y shadcn/ui.
 * Mapea los tokens CSS de design-system/tokens.css a clases utility.
 *
 * NO modificar sin actualizar el sistema canónico.
 */

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx,js,jsx,mdx}",
    "./pages/**/*.{ts,tsx,js,jsx,mdx}",
    "./components/**/*.{ts,tsx,js,jsx,mdx}",
    "./src/**/*.{ts,tsx,js,jsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        /* ─── NEUTROS ─── */
        n: {
          0:   "var(--n-0)",
          25:  "var(--n-25)",
          50:  "var(--n-50)",
          75:  "var(--n-75)",
          100: "var(--n-100)",
          150: "var(--n-150)",
          200: "var(--n-200)",
          300: "var(--n-300)",
          500: "var(--n-500)",
          700: "var(--n-700)",
          800: "var(--n-800)",
          900: "var(--n-900)",
          950: "var(--n-950)",
          975: "var(--n-975)",
        },

        /* ─── PRIMARY ROYAL ─── */
        p: {
          50:  "var(--p-50)",
          100: "var(--p-100)",
          200: "var(--p-200)",
          300: "var(--p-300)",
          400: "var(--p-400)",
          500: "var(--p-500)",
          600: "var(--p-600)", // ★ CTA canónico
          700: "var(--p-700)",
          800: "var(--p-800)",
          900: "var(--p-900)",
          950: "var(--p-950)",
        },

        /* ─── SEMÁNTICOS ─── */
        succ: {
          50:  "var(--succ-50)",
          100: "var(--succ-100)",
          500: "var(--succ-500)",
          600: "var(--succ-600)",
          700: "var(--succ-700)",
          900: "var(--succ-900)",
          border: "var(--succ-border)",
        },
        warn: {
          50:  "var(--warn-50)",
          100: "var(--warn-100)",
          500: "var(--warn-500)",
          600: "var(--warn-600)",
          700: "var(--warn-700)",
          900: "var(--warn-900)",
          border: "var(--warn-border)",
        },
        dang: {
          50:  "var(--dang-50)",
          100: "var(--dang-100)",
          500: "var(--dang-500)",
          600: "var(--dang-600)",
          700: "var(--dang-700)",
          900: "var(--dang-900)",
          border: "var(--dang-border)",
        },
        info: {
          50:  "var(--info-50)",
          100: "var(--info-100)",
          500: "var(--info-500)",
          600: "var(--info-600)",
          700: "var(--info-700)",
          900: "var(--info-900)",
          border: "var(--info-border)",
        },
        prog: {
          50:  "var(--prog-50)",
          100: "var(--prog-100)",
          500: "var(--prog-500)",
          600: "var(--prog-600)",
          700: "var(--prog-700)",
          900: "var(--prog-900)",
          border: "var(--prog-border)",
        },

        /* ─── CATEGORÍAS DE PRODUCTO ─── */
        cat: {
          cmp: {
            DEFAULT: "var(--cat-cmp)",
            bg:      "var(--cat-cmp-bg)",
            text:    "var(--cat-cmp-text)",
            border:  "var(--cat-cmp-border)",
          },
          rpt: {
            DEFAULT: "var(--cat-rpt)",
            bg:      "var(--cat-rpt-bg)",
            text:    "var(--cat-rpt-text)",
            border:  "var(--cat-rpt-border)",
          },
          hrm: {
            DEFAULT: "var(--cat-hrm)",
            bg:      "var(--cat-hrm-bg)",
            text:    "var(--cat-hrm-text)",
            border:  "var(--cat-hrm-border)",
          },
          lbr: {
            DEFAULT: "var(--cat-lbr)",
            bg:      "var(--cat-lbr-bg)",
            text:    "var(--cat-lbr-text)",
            border:  "var(--cat-lbr-border)",
          },
          acc: {
            DEFAULT: "var(--cat-acc)",
            bg:      "var(--cat-acc-bg)",
            text:    "var(--cat-acc-text)",
            border:  "var(--cat-acc-border)",
          },
        },

        /* ─── SEDES ─── */
        sede: {
          wh01: "var(--sede-wh01)",
          wh02: "var(--sede-wh02)",
          wh03: "var(--sede-wh03)",
          wh04: "var(--sede-wh04)",
        },

        /* ─── SHADCN/UI ALIASES ─── */
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
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
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },

      fontFamily: {
        sans: ["var(--sans)"],
        mono: ["var(--mono)"],
      },

      fontSize: {
        /* Escala canónica del Sistema CHV */
        "doc-h1":    ["34px",  { lineHeight: "1.1",  letterSpacing: "-0.025em", fontWeight: "600" }],
        "sec-title": ["22px",  { lineHeight: "1.2",  letterSpacing: "-0.018em", fontWeight: "600" }],
        "card-h":    ["14px",  { fontWeight: "500" }],
        "body":      ["13.5px", { lineHeight: "1.55" }],
        "label":     ["11px",  { letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: "500" }],
        "mono-sm":   ["11px",  { letterSpacing: "0.04em" }],
        "mono-md":   ["13px",  { fontWeight: "500" }],
      },

      spacing: {
        /* Spacing scale formal del Sistema CHV */
        "space-1":  "var(--space-1)",
        "space-2":  "var(--space-2)",
        "space-3":  "var(--space-3)",
        "space-4":  "var(--space-4)",
        "space-5":  "var(--space-5)",
        "space-6":  "var(--space-6)",
        "space-8":  "var(--space-8)",
        "space-10": "var(--space-10)",
        "space-12": "var(--space-12)",
      },

      borderRadius: {
        /* Radios canónicos */
        "r-card": "var(--r-card)",
        "r-md":   "var(--r-md)",
        "r-sm":   "var(--r-sm)",
        /* shadcn aliases */
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      boxShadow: {
        card:      "var(--shadow-card)",
        elevation: "var(--shadow-elevation)",
        overlay:   "var(--shadow-overlay)",
      },

      keyframes: {
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.4" },
        },
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
      },

      animation: {
        "pulse-dot":      "pulse-dot 1.8s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
