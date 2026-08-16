/** @type {import('tailwindcss').Config} */

// Two colour groups live here.
//
// The shadcn group (primary, secondary, border, ...) reads HSL triplets from
// index.css and therefore supports opacity modifiers: `bg-primary/90` works.
//
// The `pf` group maps the design tokens in src/styles/tokens.css onto class
// names, so a colour can be written as `text-pf-ink` instead of being retyped
// as `text-[#0A0A0A]`. These hold hex values behind a CSS variable, which
// Tailwind cannot split into channels — so `bg-pf-ink/50` does NOT work. When
// a lighter shade is needed, step down the scale (pf-700, pf-500, ...) rather
// than reaching for opacity.
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
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
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        pf: {
          // neutral scale
          900: "var(--pf-primary-900)",
          850: "var(--pf-primary-850)",
          800: "var(--pf-primary-800)",
          700: "var(--pf-primary-700)",
          500: "var(--pf-primary-500)",
          300: "var(--pf-primary-300)",
          200: "var(--pf-primary-200)",
          100: "var(--pf-primary-100)",
          50: "var(--pf-primary-50)",

          // text roles
          ink: "var(--pf-text-primary)",
          body: "var(--pf-text-body)",
          muted: "var(--pf-text-muted)",
          subtle: "var(--pf-text-subtle)",
          faint: "var(--pf-text-faint)",
          "on-dark": "var(--pf-text-on-dark)",
          "on-dark-body": "var(--pf-text-on-dark-body)",
          "on-dark-muted": "var(--pf-text-on-dark-muted)",

          // surfaces and lines
          line: "var(--pf-border)",
          surface: "var(--pf-surface-page)",
          "surface-subtle": "var(--pf-surface-subtle)",
          "surface-dark": "var(--pf-surface-dark)",
          "surface-dark-card": "var(--pf-surface-dark-card)",

          // brand green — the portfolio's own accent outside case studies
          green: "var(--pf-brand-green)",

          accent: {
            900: "var(--pf-accent-900)",
            700: "var(--pf-accent-700)",
            500: "var(--pf-accent-500)",
            300: "var(--pf-accent-300)",
            100: "var(--pf-accent-100)",
            50: "var(--pf-accent-50)",
          },
          success: {
            700: "var(--pf-success-700)",
            500: "var(--pf-success-500)",
            300: "var(--pf-success-300)",
            100: "var(--pf-success-100)",
          },
          error: {
            700: "var(--pf-error-700)",
            500: "var(--pf-error-500)",
            300: "var(--pf-error-300)",
            100: "var(--pf-error-100)",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}
