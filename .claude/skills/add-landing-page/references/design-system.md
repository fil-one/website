# Fil One design system (as implemented, not aspirational)

Styling on this site is a mix of Tailwind utility classes (layout, responsive breakpoints)
and inline `style={{}}` objects (typography, colors). This looks unusual but it IS the
repo convention — match it; do not refactor pages to styled-components, CSS modules, or
pure Tailwind.

## Fonts

| Font | Loaded from | Used for |
|---|---|---|
| `'Aspekta', sans-serif` | `public/fonts/*.ttf` via `src/index.css` @font-face | Headings (h1/h2), weight 500 |
| `'Funnel Sans', sans-serif` | Google Fonts link in `index.html` | Body copy, buttons, weights 400–600 |
| `'DM Mono', monospace` | Google Fonts link in `index.html` | Section labels, table headers, badges — uppercase, letter-spacing 0.08em |

## Colors (never invent new ones)

| Hex | Role |
|---|---|
| `#09090B` | Primary text / headings |
| `#71717A` | Secondary text (subheads, body on light) |
| `#52525B` | Badge text |
| `#0090FF` | Brand blue — heading accent spans, icons |
| `#0070CC` | Darker blue — badge-pill text, highlighted table values |
| `#EFF8FF` | Light blue fill — badge pills, icon chips, highlighted table rows |
| `rgba(0,144,255,0.13–0.2)` | Blue glows and borders |
| `#FFFFFF` / `#F9FAFB` | Alternating section backgrounds |
| `#F4F4F5` | Badge fill |
| `#E4E4E7` | Section borders (grey sections on product pages get 1px top/bottom borders in this color — see commit "Add #E4E4E7 top/bottom borders") |
| `rgba(0,0,0,0.07)` | Card borders |
| `linear-gradient(135deg, #020D1A 0%, #0D2847 55%, #041525 100%)` | Dark CTA background |

## Reusable CSS classes (defined in `src/index.css` — use, never redefine)

| Class | Effect |
|---|---|
| `btn-primary` + inner `<span class="btn-primary-inner">` | Primary CTA button (animated glow). Variants: `btn-primary-dark` (on dark bg), `btn-primary-lg`, `btn-primary-sm`, `btn-primary-zinc` |
| `btn-secondary` | Secondary CTA. Variant: `btn-secondary-dark` |
| `hero-fade-1` … `hero-fade-4` | Staggered fade-up on page load (hero elements, in order) |
| `reveal` → add `in-view` | Scroll-triggered fade-in; pair with the `useInView` hook: `className={`reveal${inView ? " in-view" : ""}`}` |
| `reveal-group` | Parent class that staggers direct `reveal` children by 80ms each |

Reduced-motion media queries already disable these — don't add your own.

## Shared components

| Component | Import | Use |
|---|---|---|
| `PlatformNavbar` | `@/components/PlatformNavbar` | Top nav for ALL new pages. Takes `lang?: "en" \| "es"` |
| `Footer` | `@/components/Footer` | Bottom of ALL new pages. Takes `lang?: "en" \| "es"` |
| `SectionLabel`, `SectionHeading`, `SectionSub`, `GRID_SVG` | `@/components/LandingPrimitives` | Section headers and the hero grid texture |
| `LandingNavbar` / `LandingFooter` | — | ONLY used by the Barcelona ES contact/support sub-pages. Do not use for new pages |
| `Navbar` | — | Legacy. Do not use |
| shadcn primitives | `@/components/ui/*` | Available (Accordion for FAQs, etc.) but LP pages mostly use plain markup |

## Layout constants

- Content max width: `max-w-[1120px] mx-auto`
- Section horizontal padding: `px-5 md:px-8`
- Section vertical padding: `py-16 md:py-24` (short) or `py-24 md:py-32` (tall)
- Card radius: `rounded-2xl` (16px); dark CTA block: `borderRadius: 20`
- Mobile CTAs stay side by side: `flex flex-col sm:flex-row items-center gap-3`
  (see commits "Side-by-side mobile hero CTAs") — do not stack primary/secondary
  full-width on mobile.

## Icons

`@phosphor-icons/react`, size 18, color `#0090FF`, inside a 40×40 `rounded-xl` chip with
background `#EFF8FF`. Browse names at phosphoricons.com; commonly used here:
`CurrencyDollar`, `Wallet`, `ShieldCheck`, `Database`, `Lightning`, `Globe`, `Lock`,
`ArrowsClockwise`, `HardDrives`, `Cloud`.

## Responsive checklist (mobile bugs are the #1 post-ship fix in git history)

- Test at ~375px width. Headline must not overflow; use responsive text classes
  (`text-[30px] sm:text-[38px] md:text-[54px]`).
- Any table/wide element needs an `overflow-x-auto` wrapper.
- Badge pills need `maxWidth: "90vw"`.
- The page root needs `overflow-x-hidden`.
