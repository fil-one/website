# Voice & copy rules

Sources: commit `2a27f72` ("copy: de-slop landing-page prose per AI-writing-tropes
review"), `landing-page-framework.md` (repo root — the marketing team's landing-page
spec), and patterns in shipped copy.

## AI-trope blacklist (things a previous review explicitly removed)

| Trope | Example (bad) | Fix |
|---|---|---|
| Repeated negation-reframe | "It isn't a backup — it's a guarantee. It isn't storage — it's proof." | Keep at most ONE per page; state the positive directly |
| Em-dash pivot chains | "Flat pricing — and that's the point." | Use a period and a plain sentence |
| "by design" tic | "Durable by design. Verifiable by design." | Was specifically deleted; say how instead |
| Triadic flourish overuse | "Fast. Simple. Verifiable." everywhere | Rare, deliberate use only |
| Empty intensifiers | "truly", "seamlessly", "effortlessly", "supercharge" | Delete or replace with a number |
| Vague benefit nouns | "peace of mind", "unlock value" | Name the concrete outcome ("a bill that doesn't move with usage") |

Also: don't over-correct into flat, sanitized prose. One strong construction is style;
three are slop.

## Positive style

- Plain, declarative, slightly dry. Copy reads like an engineer explaining a bill.
- Numbers do the persuading: `$4.99/TB`, `$0 egress`, `11 nines`, `~24 hours`.
- Headlines: sentence case, may end with a period, often split with a blue accent
  `<span style={{ color: "#0090FF" }}>` on the key phrase.
- Address the reader's situation ("The grant has an end date. The retention requirement
  does not.") before the product.
- CTAs are short verbs: "Start for free", "Talk to an expert".
- American spelling in site copy (note: some existing files contain British spellings;
  match American for new copy, don't mass-convert old).

## Landing-page structure (what each page must answer — from landing-page-framework.md)

1. Is this the problem I care about? → problem-based hero naming the audience
2. Does this solution address it? → solution statement + features tied to that audience
3. Do I trust it? → comparison table with checkable math, durability/integrity claims
4. What's next? → one primary CTA repeated (signup), secondary path (contact sales)

The full framework doc at repo root `landing-page-framework.md` includes CTA strategy,
outbound vs paid-ad page differences, and a criterion scoring rubric. Read it when
writing a page from scratch; skim it when editing.

## Spanish copy register (Barcelona suite)

- Existing ES copy uses "tú" forms sparingly and neutral marketing Spanish
  ("Intégralo en tu stack actual en minutos").
- Keep tech terms untranslated where existing copy does: "egress", "stack", "buckets",
  "S3-compatible" → "compatible con S3".
- "11 nines" → "11 nueves"; prices keep the euro sign: `€4.99/TB`.
- When in doubt, mirror phrasing from `BarcelonaLandingPageES.tsx` rather than
  translating fresh.
