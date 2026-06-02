# Fil One — Landing Page Build Brief (Claude Code)

This document is a work queue. Each entry is a landing page to build by cloning an
existing page and swapping copy. Work top to bottom until every row in the **Status
Board** is `done` or `blocked`.

---

## How to run this (the loop)

Paste this to Claude Code:

> Read `LANDING_PAGE_BUILD_BRIEF.md`. Work through the Status Board top to bottom.
> For each page with status `todo`: build it per its spec and the Operating Rules,
> run `npx tsc --noEmit`, then update its Status Board cell to `done` (or `blocked`
> if you hit the placeholder protocol) and commit with message `lp: <slug>`. Repeat
> until no row is `todo`. Do not ask me between pages — only stop if tsc fails on a
> page you can't fix, or when everything is `done`/`blocked`. At the end, print a
> summary table of what shipped, what's blocked, and why.

The Status Board is the single source of truth for progress. Claude Code edits the
status cell in this file as it goes, so the loop is resumable if interrupted.

---

## Operating Rules (apply to EVERY page — non-negotiable)

### Never appears on a customer-facing page
`Filecoin`, `FIL`, `token`, `blockchain`, `decentralised/decentralized`, `Web3`,
`crypto`, **`cryptographic`** (banned by Fil One's own language guardrails — say
"integrity verification" or "verifiable" instead), `protocol`, `node`, `miner`,
`storage provider`, `PDP`, `on-chain`, `trustless`. The substrate is invisible to
the buyer. Describe infrastructure physically ("a global network of verified data
centres under SLA"), never by protocol mechanics.

### Voice
Confident, technically literate, plain — closer to Cloudflare than a startup. Short
declaratives. No exclamation marks. **Banned words:** unleash, empower, transform,
revolutionary, seamless, frictionless, journey, leverage, paradigm, cutting-edge,
"unlock the power of". Reader is a senior engineer / CTO / procurement lead.

### Truthfulness + proof discipline (this is where pages fail)
- Every claim must survive a due-diligence call. Pull real numbers from
  `public/llms.txt`. **Do not invent figures.**
- Every pricing/comparison number must reconcile with its own stated inputs.
  **Compute it; don't copy a number from another page.** (A prior page shipped a
  "~$97" comparison that didn't match its own rate table — do not repeat that.)
- Features that are not live must be labelled in-product (`Coming soon`,
  `In development`) and link to a waitlist, never present tense.
- No agent-autonomy claims. No "agent memory"/RAG as a shipped product.

### Placeholder protocol (keeps the loop moving instead of guessing)
If a page's **Required proof** is not present in `public/llms.txt` or a repo facts
file:
1. Build the page with the copy in place.
2. Insert the missing value as a literal token: `{{NEEDS PROOF: <what's needed>}}`.
3. Set that page's Status Board cell to **`blocked`** (not `done`).
4. Continue to the next page.
This surfaces real gaps to the team rather than shipping a fabricated number.

### Wedge discipline (failure modes to self-check before marking done)
- **One buyer.** A non-target reader self-deselects within 10 seconds.
- **One false tradeoff** collapsed. Not "better than AWS" generically.
- **No kitchen-sink.** Don't mix latency, compliance, and AI claims in one block.
- **Proof within one scroll.** A bold hero with no number/code/benchmark above the
  fold is not shippable.

---

## Repo mechanics (from the shared landing-page library)

**You are only changing copy and section composition. Do not modify shared
components in `src/components/landing/`.**

1. **Clone the closest reference page** named in each spec:
   - `src/pages/AgentsLandingPage.tsx` — vertical/feature/AI pages (cost callout,
     code block, value props, use cases).
   - `src/pages/BarcelonaLandingPage.tsx` — geo / comparison / pricing-table pages
     (problem cards, pricing table, workload comparisons).
2. **Create** `src/pages/<PageName>.tsx`. Keep the file's shape: typed content
   arrays above the component, short JSX body composing components.
3. **Register the route (both files):**
   - `src/App.tsx` — add the import and `<Route path="/lp/<slug>" element={<PageName />} />`
     above the `{/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}` line.
   - `scripts/prerender.mjs` — add `"/lp/<slug>"` to the `ROUTES` array.
4. **`useSeo`** at the top of the component: set `title`, `description`,
   `canonical: "https://fil.one/lp/<slug>"`.
5. **Verify:** `npx tsc --noEmit` must pass before marking the page `done`.

### Brand constants (don't re-derive)
- Signup CTA URL: `https://app.fil.one/login?screen_hint=signup` ("Start for free").
- Contact CTA URL: `/contact-sales` ("Talk to an expert").
- Trust line, middle-dot separated, e.g. `No credit card required · No egress fees · Connects in minutes`.
- One blue accent per headline max: `<span style={{ color: "#0090FF" }}>phrase</span>`.
- Icons from `@phosphor-icons/react` only, `size={18} color="#0090FF"`.
- Alternate section `bg="white"` / `bg="gray"`; hero white; first content section
  often `bg="gray"` + `noReveal`.
- Pricing weight: the `$4.99/TB/month` flat number appears in the same place/weight
  on every page.

### Default section skeleton (the 8-block wedge)
`Hero → Problem (ProblemCards) → The third option / how it's possible →
Proof (ComparisonTable or WorkloadCards or code) → Workloads/Use cases (FeatureCards)
→ Pricing → Start (code snippet or trial) → DarkCtaBanner`. Drop blocks that don't
serve the wedge; keep Hero and DarkCtaBanner always.

---

## Status Board (control surface — edit the status cell as you go)

Already-live archetypes are listed as `reference` — do not rebuild; use as clone
sources. Build every `todo`.

| # | Slug | Page name | Clone from | Status |
|---|------|-----------|------------|--------|
| — | /lp/barcelona | BarcelonaLandingPage | — | reference |
| — | /lp/agents | AgentsLandingPage | — | reference |
| 1 | /lp/egress | EgressLandingPage | Barcelona | done |
| 2 | /lp/backup-dr | BackupDrLandingPage | Barcelona | todo |
| 3 | /lp/log-retention | LogRetentionLandingPage | Agents | todo |
| 4 | /lp/startups | StartupsLandingPage | Agents | todo |
| 5 | /lp/ml-checkpoints | CheckpointsLandingPage | Agents | todo |
| 6 | /lp/rag-storage | RagStorageLandingPage | Agents | todo |
| 7 | /lp/web-scraping | WebScrapingLandingPage | Agents | todo |
| 8 | /lp/multi-cloud | MultiCloudLandingPage | Barcelona | todo |
| 9 | /lp/data-sovereignty | DataSovereigntyLandingPage | Barcelona | todo |
| 10 | /lp/migrate-from-s3 | MigrateFromS3LandingPage | Agents | todo |
| 11 | /lp/compliance | ComplianceLandingPage | Barcelona | todo |
| 12 | /lp/archival | ArchivalLandingPage | Barcelona | todo |
| 13 | /lp/versioning | VersioningLandingPage | Agents | todo |
| 14 | /lp/regional-cloud | RegionalCloudLandingPage | Barcelona | todo |
| 15 | /lp/media | MediaLandingPage | Barcelona | todo |
| 16 | /lp/gaming | GamingLandingPage | Barcelona | todo |
| 17 | /lp/genomics | GenomicsLandingPage | Barcelona | todo |

Optional metro batch (clone Barcelona, swap metro + latency/price). Each is
`blocked` until a real latency number to that metro exists — add rows only if you
have the numbers: `/lp/sao-paulo`, `/lp/mumbai`, `/lp/jakarta`, `/lp/stockholm`,
`/lp/dubai`, `/lp/lagos`.

---

## Page specs

Each spec: pick/refine one hero, keep the sub-line tight, follow the section order,
honour the proof note. Hero lines below already pass the voice rules.

---

### 1 · /lp/egress — Egress-dominated bill
- **Buyer:** analytics / feature-store / data team whose bill is driven by *reading*
  data, not storing it.
- **False tradeoff:** storage is cheap *vs* using your data is expensive.
- **Asset:** $0 egress, no retrieval fees.
- **Hero:** `Your storage is cheap. Using it isn't.` — alt: `Read your own data without the bill.`
- **Sub-line:** S3-compatible object storage at $4.99/TB flat. No egress. No per-request fees.
- **Section order:** Hero → ProblemCards (the egress trap) → ComparisonTable (egress row is the star) → WorkloadCards → Pricing → DarkCtaBanner.
- **Required proof:** egress $/GB comparison vs AWS; a worked example (X TB read/month → $Y on AWS vs $0). Source: `public/llms.txt`. Compute the example; don't copy.
- **Deselect:** write-heavy/cold-only teams who never read at volume.

### 2 · /lp/backup-dr — Backup / disaster recovery
- **Buyer:** backup / DR owner.
- **False tradeoff:** cheap to store *vs* expensive and slow to actually restore.
- **Asset:** no egress + no retrieval charge + restore performance.
- **Hero:** `Restore without the retrieval bill.` — alt: `A backup you can afford to actually use.`
- **Sub-line:** Flat $4.99/TB. No egress, no retrieval fees, restore with standard S3 tools.
- **Section order:** Hero → ProblemCards → ComparisonTable (retrieval/egress) → WorkloadCards → Pricing → DarkCtaBanner.
- **Required proof:** restore latency / throughput numbers. ⚠ **Likely not in llms.txt — if absent, use placeholder + `blocked`.** Do not claim "fast restore" without a number.
- **Deselect:** teams who never need fast restore (pure archive → send to /lp/archival).

### 3 · /lp/log-retention — Observability / log retention
- **Buyer:** platform / observability engineer sampling or dropping logs to control cost.
- **False tradeoff:** keep everything *vs* afford to keep it.
- **Asset:** flat per-TB, no per-request charge.
- **Hero:** `Stop sampling your logs to save money.` — alt: `Keep every log. Pay one flat rate.`
- **Sub-line:** S3-compatible storage at $4.99/TB flat. No per-request fees, no egress.
- **Section order:** Hero → ProblemCards → code/Proof block → FeatureCards → Pricing → DarkCtaBanner.
- **Required proof:** per-request cost comparison (high-write log workload), computed from real rates. Source: llms.txt.
- **Deselect:** low-volume teams whose retention cost is already trivial.

### 4 · /lp/startups — Early-stage startups
- **Buyer:** founder / first infra hire watching runway.
- **False tradeoff:** cloud convenience *vs* predictable burn.
- **Asset:** flat, predictable pricing.
- **Hero:** `Your storage bill shouldn't outgrow your revenue.` — alt: `Predictable storage, while everything else isn't.`
- **Sub-line:** $4.99/TB flat. No egress, no per-request fees, no surprise invoice.
- **Section order:** Hero → ProblemCards → ComparisonTable → FeatureCards → Pricing → DarkCtaBanner.
- **Required proof:** flat vs tiered cost-at-scale example. Source: llms.txt.
- **Deselect:** enterprises needing procurement/compliance depth (→ /lp/compliance).

### 5 · /lp/ml-checkpoints — Checkpoint / eval-set retention
- **Buyer:** ML engineer deleting checkpoints, eval sets, and run artifacts to save money.
- **False tradeoff:** keep every checkpoint *vs* delete to control cost.
- **Asset:** flat storage at volume.
- **Hero:** `Stop deleting checkpoints you'll want back.` — alt: `Keep every run. Reproduce any of them.`
- **Sub-line:** S3-compatible storage at $4.99/TB flat. Keep checkpoints, evals, and artifacts without per-GB guilt.
- **Section order:** Hero → ProblemCards → code block (write/read checkpoints) → FeatureCards → Pricing → DarkCtaBanner.
- **Required proof:** storage-cost example for typical checkpoint volume; code snippet. Source: llms.txt.
- **Deselect:** training-iteration-speed buyers (→ existing Build-around-the-clock page).

### 6 · /lp/rag-storage — RAG corpus storage  ⚠ in-dev capability
- **Buyer:** developer building retrieval-augmented apps.
- **False tradeoff:** per-query vector-DB economics *vs* capping the corpus size.
- **Asset:** store the whole corpus flat (the **storage** is live; RAG tooling is in development).
- **Hero:** `Your corpus is a storage cost, not a per-query tax.` — alt: `Store the whole corpus. Query it flat.`
- **Sub-line:** S3-compatible storage at $4.99/TB flat. No per-request fees on reads.
- **Section order:** Hero → ProblemCards → Pricing/Proof → FeatureCards (lead with the **live storage** use case; RAG card labelled `In development` + waitlist) → DarkCtaBanner.
- **Required proof:** read-cost comparison on the storage layer. **RAG must be `In development` + waitlist, never present tense.** Build the page on the live storage claim.
- **Deselect:** teams wanting a managed vector DB today (we don't have one).

### 7 · /lp/web-scraping — Web scraping / data collection
- **Buyer:** team running large-scale scraping / collection pipelines.
- **False tradeoff:** collect at scale *vs* storage + egress eating the margin.
- **Asset:** flat writes, no per-request fees, no egress.
- **Hero:** `Scrape at scale. Keep all of it.` — alt: `Collection that doesn't bill per request.`
- **Sub-line:** $4.99/TB flat. No per-PUT charges, no egress, S3-compatible.
- **Section order:** Hero → ProblemCards → code block → ComparisonTable → Pricing → DarkCtaBanner.
- **Required proof:** per-PUT cost comparison at high write volume, computed. Source: llms.txt.
- **Deselect:** low-volume collectors.

### 8 · /lp/multi-cloud — Anti-lock-in / multi-cloud
- **Buyer:** infra lead designing for portability.
- **False tradeoff:** one-cloud convenience *vs* freedom to leave.
- **Asset:** S3-compatible portability, no egress to exit.
- **Hero:** `Design your exit before you need it.` — alt: `Portable by default, not by promise.`
- **Sub-line:** S3-compatible object storage. Move in and out with the same tools. No egress penalty.
- **Section order:** Hero → ProblemCards → ValueProps (portability) → ComparisonTable → Pricing → DarkCtaBanner.
- **Required proof:** no-egress exit cost vs hyperscaler exit cost; S3 parity statement. Source: llms.txt.
- **Deselect:** single-cloud-forever shops.

### 9 · /lp/data-sovereignty — EU data residency  ⚠ needs region control proof
- **Buyer:** EU team with residency / control requirements.
- **False tradeoff:** hyperscaler convenience *vs* control over where data sits.
- **Asset:** region / operator placement + portability.
- **Hero:** `Decide where your data lives. Keep your S3 tools.` — alt: `Residency without re-architecting.`
- **Sub-line:** S3-compatible storage with control over data location. No egress, flat pricing.
- **Section order:** Hero → ProblemCards → trust/region section → ComparisonTable → Pricing → DarkCtaBanner.
- **Required proof:** the actual region/operator-pinning capability you can demonstrate. ⚠ **If the specifics aren't in llms.txt, placeholder + `blocked`.** Do not overstate residency guarantees. Keep it a control-and-portability page, not a politics page.
- **Deselect:** US-only teams with no residency need.

### 10 · /lp/migrate-from-s3 — Migration off AWS
- **Buyer:** team stuck on AWS S3, assuming leaving is a rewrite.
- **False tradeoff:** staying is painful *vs* leaving is a rewrite.
- **Asset:** endpoint swap, full S3 parity.
- **Hero:** `Leaving S3 is a config change, not a rewrite.` — alt: `Same SDK. New endpoint. Lower bill.`
- **Sub-line:** Point your existing S3 tools at Fil One. $4.99/TB flat, no egress.
- **Section order:** Hero → code block (endpoint swap) → ComparisonTable → FeatureCards → Pricing → DarkCtaBanner.
- **Required proof:** working code snippet (endpoint change), S3 parity scope, price delta. Source: llms.txt. State parity honestly (what is/isn't supported).
- **Deselect:** greenfield teams not on S3.

### 11 · /lp/compliance — Regulated / audit-sensitive
- **Buyer:** fintech / health / regulated buyer, procurement-influenced.
- **False tradeoff:** trust the vendor's word *vs* build audit infrastructure yourself.
- **Asset:** integrity verification + version history.
- **Hero:** `Prove your data is intact. Don't take our word for it.` — alt: `Audit-ready storage, by default.`
- **Sub-line:** S3-compatible storage with recurring integrity verification and full version history.
- **Section order:** Hero → ProblemCards → trust/integrity section → FeatureCards → Pricing → DarkCtaBanner.
- **Required proof:** integrity-check cadence (e.g. daily), version-history behaviour. Source: llms.txt. **State cert status honestly** — SOC 2 / ISO are *pursued, not held*; do not imply otherwise. Say "cryptographic" nowhere.
- **Deselect:** teams with no audit/compliance pressure.

### 12 · /lp/archival — Long-term archival with verifiable integrity
- **Buyer:** owner of large long-retention archives.
- **False tradeoff:** assume the archive is fine *vs* prove it.
- **Asset:** recurring integrity verification.
- **Hero:** `Know your archive is intact before you need it.` — alt: `An archive that proves itself.`
- **Sub-line:** Flat $4.99/TB. Recurring integrity verification, no egress, no retrieval tax.
- **Section order:** Hero → ProblemCards → integrity/proof section → ComparisonTable → Pricing → DarkCtaBanner.
- **Required proof:** integrity cadence + retrieval cost. Source: llms.txt.
- **Deselect:** hot-only workloads.

### 13 · /lp/versioning — Point-in-time recovery
- **Buyer:** team needing to reconstruct exact prior data states (debugging, audit).
- **False tradeoff:** a backup *vs* the exact prior state.
- **Asset:** version history / restore to any point.
- **Hero:** `Recreate any dataset, from any point.` — alt: `Not a backup. The exact state.`
- **Sub-line:** S3-compatible storage with built-in version history. Restore any prior state.
- **Section order:** Hero → ProblemCards → FeatureCards (versioning) → code/Proof → Pricing → DarkCtaBanner.
- **Required proof:** versioning behaviour + restore mechanism. Source: llms.txt.
- **Deselect:** teams that never need point-in-time recovery.

### 14 · /lp/regional-cloud — Regional / sovereign cloud builder (partner)
- **Buyer:** team building a regional or sovereign cloud offering.
- **False tradeoff:** build storage capex *vs* stay narrow.
- **Asset:** embeddable / white-label operator network.
- **Hero:** `Offer global storage without building it.` — alt: `Your cloud. Our network underneath.`
- **Sub-line:** S3-compatible storage you can offer as your own. Global network, SLA-backed.
- **Section order:** Hero → ProblemCards (build vs buy) → network/SLA section → ValueProps → Pricing/commercial → DarkCtaBanner (contact-led).
- **Required proof:** network reach, SLA terms. Source: llms.txt. **Partner page: "Fil One" is not customer-visible in the partner's own product** — this page builds partner-side credibility. Contact CTA primary.
- **Deselect:** end customers (→ direct pages). Distinct from the existing Powered-by-FilOne partner page — this targets cloud *builders*; if overlap is heavy, mark `blocked` and flag for human review.

### 15 · /lp/media — Media / CTV / OTT libraries
- **Buyer:** owner of large media libraries with delivery-driven egress.
- **False tradeoff:** store cheap *vs* delivery egress killing margin.
- **Asset:** $0 egress.
- **Hero:** `Your media library shouldn't bleed money on delivery.` — alt: `Store the library. Skip the egress.`
- **Sub-line:** S3-compatible object storage, $4.99/TB flat, $0 egress.
- **Section order:** Hero → ProblemCards → ComparisonTable (egress) → WorkloadCards → Pricing → DarkCtaBanner.
- **Required proof:** egress example on a media-delivery workload, computed. Source: llms.txt.
- **Deselect:** teams with negligible delivery volume.

### 16 · /lp/gaming — Game studios
- **Buyer:** studio storing player data, UGC, and assets with spiky growth.
- **False tradeoff:** unpredictable growth *vs* cost spikes.
- **Asset:** flat, predictable pricing.
- **Hero:** `Player data that scales without bill shock.` — alt: `Flat storage for unpredictable growth.`
- **Sub-line:** $4.99/TB flat. No egress, no per-request fees, S3-compatible.
- **Section order:** Hero → ProblemCards → ComparisonTable → FeatureCards → Pricing → DarkCtaBanner.
- **Required proof:** flat vs tiered cost-at-scale example. Source: llms.txt.
- **Deselect:** tiny studios with trivial storage needs.

### 17 · /lp/genomics — Genomics / research data
- **Buyer:** research / genomics team with petabyte-scale, long-retention datasets.
- **False tradeoff:** petabyte retention *vs* the petabyte bill.
- **Asset:** flat per-TB + durability + integrity verification.
- **Hero:** `Petabyte retention without the petabyte bill.` — alt: `Keep the whole dataset. For years.`
- **Sub-line:** S3-compatible storage at $4.99/TB flat, with durability and recurring integrity verification.
- **Section order:** Hero → ProblemCards → ComparisonTable → integrity/durability section → Pricing → DarkCtaBanner.
- **Required proof:** durability figure (e.g. 11 nines), integrity cadence, PB-scale cost example. Source: llms.txt.
- **Deselect:** small-dataset teams.

---

## Definition of done

**Per page:** file created from the right clone source; route registered in both
`src/App.tsx` and `scripts/prerender.mjs`; `useSeo` set; hard rules + voice + proof
discipline satisfied; no banned vocabulary; `npx tsc --noEmit` clean; Status Board
cell set to `done`; committed as `lp: <slug>`.

**Blocked instead of done** if any Required-proof value was missing and a
`{{NEEDS PROOF: ...}}` token remains. Leave the token in, set `blocked`, continue.

**Global done:** no `todo` rows remain. Print the summary table (shipped / blocked +
reason).
