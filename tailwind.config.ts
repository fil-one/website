import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        // Body text — matches `body { font-family }` in index.css and ~780 inline uses
        sans: ["Funnel Sans", "sans-serif"],
        // Display / headings — the @font-face family loaded in index.css (~200 inline uses)
        display: ["Aspekta", "sans-serif"],
        // Monospace — labels / code, loaded via Google Fonts in index.html
        mono: ["DM Mono", "monospace"],
      },
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },

        /* ───────────────────────────────────────────────────────────────────
         * Design tokens — brand & semantic color scales
         *
         * Named scales (usable as bg-brand-500, text-brand, border-danger-600…)
         * that formalise the palette already used across the site's inline
         * styles. Steps marked ✓ are canonical values in active use; the rest
         * complete each ramp. Neutrals are intentionally NOT redefined here —
         * the site's greys map 1:1 to Tailwind's built-in `zinc` scale
         * (text #09090B = zinc-950, #71717A = zinc-500, #52525B = zinc-600,
         * bg #F4F4F5 = zinc-100, etc.), so use `zinc-*` for those.
         * ─────────────────────────────────────────────────────────────────── */

        // Primary brand blue
        brand: {
          50:  "#EFF8FF", // ✓ tint background
          100: "#D6EBFF",
          200: "#ADD7FF",
          300: "#7AC0FF",
          400: "#38A6FF",
          500: "#0090FF", // ✓ primary brand
          600: "#0070CC", // ✓ hover / links
          700: "#0055CC", // ✓ pressed / deep
          800: "#004199",
          900: "#002E6B",
          DEFAULT: "#0090FF",
        },

        // Cyan accent — the primary-button gradient stops
        aqua: {
          300: "#83EAFF", // ✓ gradient light
          400: "#1EBFFF", // ✓ gradient mid
          DEFAULT: "#1EBFFF",
        },

        // Deep navy — code blocks and dark sections
        navy: {
          700: "#123255",
          800: "#0D2847", // ✓
          900: "#041525", // ✓
          950: "#020D1A", // ✓
          DEFAULT: "#041525",
        },

        // Semantic — success
        success: {
          50:  "#F0FDF4", // ✓ tint background
          500: "#22C55E", // ✓
          600: "#16A34A", // ✓ default
          700: "#15803D",
          DEFAULT: "#16A34A",
        },

        // Semantic — warning
        warning: {
          50:  "#FFFBEB", // ✓ tint background
          500: "#ED962A", // ✓ accent orange
          600: "#B45309", // ✓
          700: "#92400E", // ✓ default text
          DEFAULT: "#B45309",
        },

        // Semantic — danger / error
        danger: {
          50:  "#FEF2F2", // ✓ tint background
          500: "#EF4444",
          600: "#DC2626", // ✓ default error
          700: "#B91C1C",
          DEFAULT: "#DC2626",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      /* ───────────────────────────────────────────────────────────────────
       * Design tokens — layout, elevation & background scaffolding
       *
       * Additive named tokens formalising values already repeated across the
       * site's inline styles. Nothing consumes these yet — components can be
       * migrated incrementally (e.g. max-w-[1120px] → max-w-container).
       * ─────────────────────────────────────────────────────────────────── */

      // Content width — the dominant `max-w-[1120px]` (~276 uses); wide = container
      // padding cap; narrow = form/input columns (e.g. the cost calculator inputs)
      maxWidth: {
        container: "1120px",
        "container-wide": "1400px",
        "container-narrow": "640px",
      },

      // Vertical rhythm for dark hero/CTA sections — the repeated `py-[104px]`
      spacing: {
        section: "104px",
      },

      // Card elevation — the two shadows behind nearly every card (~53 + ~33 uses).
      // Named "elevated" (not "card") to avoid colliding with the `card` color,
      // which would make Tailwind emit a shadow-COLOR utility of the same name.
      boxShadow: {
        elevated: "0px 1px 3px rgba(0,0,0,0.04), 0px 4px 16px rgba(0,0,0,0.04)",
        "elevated-sm": "0px 1px 3px rgba(0,0,0,0.04)",
        // Elevated + a brand-500 @ 6% focus ring — the highlighted pricing card
        "elevated-ring":
          "0 0 0 4px rgba(0,144,255,0.06), 0px 1px 3px rgba(0,0,0,0.04), 0px 4px 16px rgba(0,0,0,0.04)",
        // Soft brand-blue glow for a lifted, highlighted accent card
        "brand-glow": "0px 12px 32px -8px rgba(0,144,255,0.28), 0px 2px 6px rgba(0,0,0,0.05)",
      },

      // Repeated background gradients (usable as bg-hero-grid-mask, bg-dark-section…)
      backgroundImage: {
        // Dark navy CTA / section background (~45 uses)
        "dark-section": "linear-gradient(135deg, #020D1A 0%, #0D2847 55%, #041525 100%)",
        // Radial mask that fades the hero grid texture (~92 uses; apply via maskImage)
        "hero-grid-mask":
          "radial-gradient(ellipse 80% 65% at 50% 0%, black 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 65%, transparent 80%)",
        // Radial mask for centred section textures (~90 uses)
        "section-mask": "radial-gradient(ellipse 80% 90% at 50% 50%, black 0%, transparent 80%)",
        // Blue highlight halo behind hero copy (~44 uses)
        "blue-halo": "radial-gradient(ellipse 55% 40% at 50% 0%, rgba(0,144,255,0.13) 0%, transparent 70%)",
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
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.6s ease-out forwards",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
