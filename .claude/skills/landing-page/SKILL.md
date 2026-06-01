---
name: landing-page
description: "Generate new Fil One landing pages using the shared component library. Use this skill whenever the user wants to create a landing page, build an LP, make a new /lp/* page, spin up a page for a go-to-market campaign, create a page for a specific audience or vertical, or says anything like 'landing page for X'. Also use when the user says /landing-page. This skill accepts raw notes, meeting minutes, briefs, bullet points, or even a single sentence — and turns them into a complete, brand-consistent, route-registered landing page. The user does NOT need to be technical or provide structured input."
---

# Landing Page Generator — Fil One

You are building a new landing page for [Fil One](https://fil.one), an S3-compatible object storage product built on Filecoin. Your job is to take whatever the user gives you — raw notes, a sentence, a brief, meeting minutes, a Slack dump — and turn it into a polished, brand-consistent landing page that looks like it belongs next to the existing pages.

## What the user gives you

The user will provide content in whatever form they have it. Expect any of:

- **Raw meeting notes** with names, side comments, parentheticals, and internal jargon (e.g. "CT says we only have 1.5 regions — ACK but two way door")
- **A single sentence** like "landing page for healthcare teams worried about GDPR"
- **Bullet points** from a brainstorm or strategy doc
- **A brief or document** with messaging they want adapted
- **A Slack thread** or email chain pasted in
- **A mix of ideas and instructions** like "hammer the EU angle, mention Canadian market, use the 'your data is yours' slogan"

**Your job is to interpret, not transcribe.** The user is telling you *what matters* and *who this is for*. You decide how to structure, write, and present it as a landing page. Specifically:

1. **Strip internal context.** Remove names, attributions, side conversations, internal debate markers ("ACK", "CT says", "whoever responded"), and meeting logistics. These are signals to you about priority and context — they should never appear in output.
2. **Extract the signal.** Identify: who is the audience? What's the core problem? What's the Fil One angle? What proof points exist? What tone should this hit?
3. **Fill gaps with research.** If the notes mention a topic but don't give you enough copy (e.g. "hammer GDPR angle"), research it yourself. Search the web for competitor messaging, regulatory specifics, industry pain points, and quantified proof. The user shouldn't have to do that work.
4. **Make decisions.** Don't ask the user which components to use, what the section order should be, or whether to include a pricing table. Read the notes, read the brand, and make the call. Present the finished page. They'll tell you if something's wrong.

## Step 1: Research

Before writing anything, read these files:

1. **Brand voice:** `public/llms.txt` — product positioning, differentiators, pricing
2. **Conversion methodology:** `landing-page-framework.md` — page structure, CTA strategy, outbound vs. paid ad guidance, four questions every LP must answer
3. **Reference pages** (read at least one, ideally both):
   - `src/pages/BarcelonaLandingPage.tsx` — geo-targeted LP: problem cards, pricing table, workload comparisons, integrations
   - `src/pages/AgentsLandingPage.tsx` — vertical LP: cost callout, code examples, value props, use cases
4. **Component library:** `src/components/landing/index.ts` — all available components and types
5. **Route patterns:** `src/App.tsx` and `scripts/prerender.mjs` — where to register the new page

Then, if the user's notes reference a topic, industry, or competitive angle that needs depth you don't already have, **search the web** for:
- Competitor messaging in that space (how do similar companies talk about this?)
- Regulatory specifics (what laws apply? what are the deadlines and penalties?)
- Industry pain points (what do practitioners actually complain about?)
- Quantified proof (fines, breach costs, market size, adoption stats)

This research step is critical. The user gave you raw notes — they expect you to bring the expertise needed to turn those notes into authoritative copy.

## Step 2: Plan (internally — don't present the plan to the user)

Decide these things silently based on the user's input and your research:

### Page type
- **Paid ad LP:** Value proposition headline. Direct, conversion-focused.
- **Cold outbound LP:** Problem statement headline. Continue the exact thought from the email.
- **Vertical/audience LP:** Audience identification. Show you understand their world.
- **Product feature LP:** Capability-first. Code examples or technical proof.

If the notes don't specify, default to a hybrid that works for both paid and outbound — lead with the problem, follow quickly with the value proposition.

### Section selection
Pick from the available components. Not every page needs every section. A typical page has 5–8 sections:

```
Hero (always)
Problem section (recommended — name the pain)
How it works / proof (recommended — show why Fil One is different)
Features (recommended — capabilities grid)
Use cases or workloads (if audience-specific)
Value props (optional — simpler "why us" layout)
Integrations (if relevant)
Regulatory / trust content (if the page is compliance-focused)
Final CTA (always)
```

### Slug
Derive a URL slug from the topic. Use lowercase, hyphens, short: `/lp/data-sovereignty`, `/lp/healthcare`, `/lp/media-production`. If the user specifies a slug, use it.

## Step 3: Write the page

The site has a shared component library in `src/components/landing/`. Create `src/pages/<PageName>.tsx` using this structure:

```tsx
import { useSeo } from "@/hooks/useSeo";
import { IconA, IconB } from "@phosphor-icons/react";
import {
  LandingPage, LandingHero, LandingSection,
  // ... only what you need
} from "@/components/landing";
import type { HeroCta, FeatureCard } from "@/components/landing";

// ─── Data ─────────────────────────────────────────────────────────────────────
const HERO_CTAS: HeroCta[] = [ /* ... */ ];
const FEATURES: FeatureCard[] = [ /* ... */ ];
// ... all content as typed arrays above the component

// ─── Page ─────────────────────────────────────────────────────────────────────
const PageName = () => {
  useSeo({ title: "...", description: "...", canonical: "https://fil.one/lp/slug" });
  return (
    <LandingPage>
      <LandingHero ... />
      <LandingSection bg="gray" noReveal>...</LandingSection>
      <LandingSection>...</LandingSection>
      <DarkCtaBanner ... />
    </LandingPage>
  );
};
export default PageName;
```

### Brand rules (non-negotiable)

**Copy tone:** Conversational but precise. No marketing fluff. Name specific numbers, tools, and pain points. Write like you're explaining to a smart colleague who's evaluating you against competitors. Avoid: "unlock the power of", "revolutionize", "seamless experience", "cutting-edge". Use instead: specific numbers, concrete comparisons, named regulations, real tools.

**Headlines:** Short, punchy. One blue accent per heading: `<span style={{ color: "#0090FF" }}>key phrase</span>`. Problem-first or value-first depending on page type.

**Proof:** Quantify everything. "23× cheaper" not "much cheaper". "Under 15 ms" not "low latency". "€790/month in egress" not "high egress fees". If you can't quantify a claim, either research a number or cut the claim.

**CTAs:** Primary = signup/trial ("Try 30 days for free", "Start for free"). Secondary = human contact ("Talk to an expert", "Get in touch"). Signup URL is always `https://app.fil.one/login?screen_hint=signup`. Contact URL is `/contact-sales`.

**Trust line:** Middle-dot separated: "No credit card required · No egress fees · Connects in minutes"

**Section backgrounds:** Alternate `bg="white"` and `bg="gray"`. Hero is always white. First content section is typically gray.

**Icons:** Always from `@phosphor-icons/react`. Never `lucide-react` on landing pages. All icons render at `size={18} color="#0090FF"`.

**Blue accent in headlines:** One `<span style={{ color: "#0090FF" }}>` per heading maximum.

**Data above, JSX below.** All content lives in typed constant arrays above the component function. The JSX body should be short — just composing components with data props.

**`noReveal` on above-the-fold content.** Hero has its own animations. First section after hero often uses `noReveal`.

**Page-specific custom sections are fine.** If the content needs something the shared components don't cover (a regulation timeline, a code block, a custom chart), build it inline in the page file using the same typography primitives (`SectionLabel`, `SectionHeading`, `SectionSub`) and card styling patterns from the reference pages.

## Step 4: Register the route

After creating the page file:

1. **`src/App.tsx`** — add import at top, add `<Route path="/lp/slug" element={<PageName />} />` above the `{/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}` comment
2. **`scripts/prerender.mjs`** — add `"/lp/slug"` to the `ROUTES` array

## Step 5: Verify and deliver

1. Run `npx tsc --noEmit` — must compile clean
2. Start the dev server and tell the user the URL to check: `http://localhost:8080/lp/slug`
3. Summarise what you built: sections included, key messaging decisions, and anything you researched beyond what the user provided

If something doesn't compile or render, fix it before presenting to the user. They should see a working page on first look.

---

## Component quick-reference

| Component | When to use | Key props |
|---|---|---|
| `LandingHero` | Always — top of page | `badge`, `headline`, `sub`, `ctas`, `trustLine`, `priceCallout?`, `headlineSize?`, `headlineMaxWidth?`, `subMaxWidth?`, `glow?`, `gridMask?` |
| `LandingSection` | Wrap every section | `bg="white"\|"gray"`, `noReveal?`, `id?` |
| `ProblemCards` | Name the pain | `label`, `heading`, `sub?`, `cards: ProblemCard[]` — each card has `label`, `catchLine`, `body`, `footer` |
| `FeatureCards` | Capabilities / use cases | `label`, `heading`, `sub?`, `cards: FeatureCard[]`, `cols?: 2\|3`, `centerHeader?` — each card has `icon`, `title`, `desc`, optional `badge`, optional `cta` |
| `WorkloadCards` | Quantified comparisons | `label`, `heading`, `sub?`, `cards: WorkloadCard[]` — each card has `tag`, `title`, `desc`, `stats[]` with progress bars, `speedBadge`, `savingsBadge` |
| `ComparisonTable` | Pricing vs. competitors | `label`, `heading`, `columns: ComparisonColumn[]`, `rows: ComparisonRow[]`, `footnote?` — rows with `isFilOne: true` get highlighted |
| `ValueProps` | Simple "why us" | `label`, `heading`, `items: ValueProp[]` — each has `icon`, `title`, `body`. No card borders. |
| `IntegrationPills` | Ecosystem proof | `label`, `heading`, `integrations: string[]`, `docsHref?`, `docsLabel?` |
| `DarkCtaBanner` | Always — bottom of page | `heading`, `sub`, `ctas: HeroCta[]`, `trustLine?` |
| `SectionLabel` / `SectionHeading` / `SectionSub` | Inside custom sections | Typography primitives for consistent styling |
| `LandingGrid` | Custom hero backgrounds | `glow?`, `gridMask?` |

## Colour palette

| Token | Hex | Usage |
|---|---|---|
| Primary blue | `#0090FF` | Icons, links, highlights |
| Blue text | `#0070CC` | Headline accents, Fil One emphasis |
| Light blue bg | `#EFF8FF` | Card backgrounds, badges |
| Dark text | `#09090B` | Headlines, primary body |
| Medium text | `#52525B` | Secondary copy |
| Light text | `#71717A` | Tertiary, subtext, labels |
| Section gray | `#F9FAFB` | Alternating section background |
| Zero cost | `#16a34a` | Green for $0 pricing cells |
| High cost | `#dc2626` | Red for expensive pricing cells |

## Font stack

| Use | Family | Weight |
|---|---|---|
| Headlines | Aspekta | 500 |
| Body, buttons | Funnel Sans | 400–600 |
| Labels, pills, mono | DM Mono | 500 |
