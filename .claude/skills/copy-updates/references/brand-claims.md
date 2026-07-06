# Brand claims registry

Canonical facts about the Fil One product as stated across the site TODAY. Use these
exactly; never invent or "round" them. If a task changes one of these values, it is a
**sweep**: update every location listed under "Where claims live", then re-verify.

## The claims

| Claim | Canonical wording | Notes |
|---|---|---|
| Storage price (USD) | `$4.99/TB/month`, "flat" | Appears in ~52 files |
| Storage price (EUR) | `€4.99/TB` | Barcelona EN/ES pages + adsCities only |
| Egress | `$0 egress` / "no egress fees" | Core differentiator |
| API requests | `$0 per request` / "no per-request fees" | |
| Durability | `11 nines` = `99.999999999%` | ~14 files; Spanish: "11 nueves" |
| Integrity verification | "verified approximately every 24 hours" via CID / cryptographic proofs (Filecoin PoSt) | The "~24h" qualifier is deliberate — keep the approximation marker |
| Free trial | "Free 30-day trial, 1 TB included, no credit card required" | |
| S3 compatibility | "S3-compatible" / "drop-in replacement" — boto3, AWS CLI, rclone, LangChain, LlamaIndex, PyTorch/HuggingFace checkpointing all work by changing the endpoint URL | |
| Reassurance line | `No credit card required · No retrieval fees · Connects in minutes` | Middle-dot separators, exactly this |
| RAG Pipeline add-on (aka Bucket Intelligence) | `+$15/TB/month add-on` | Early access |
| AI Agent Toolkit | "Free with your storage plan" | Early access |
| Business plan | "custom pricing; 1, 3, or 5-year terms" | |
| Competitor reference prices | AWS S3: ~$0.023/GB/mo storage, ~$0.09/GB egress ("$23+/TB", "$90+/TB egress"); Wasabi: $6.99/TB; Cloudflare R2: $15/TB storage, $0 egress; Backblaze B2 egress $0.007/GB per one LP | If a comparison table computes a scenario, the arithmetic is documented in a comment above the data array — keep comment and numbers consistent |
| Product status badges | "Early access" (grey) — NOT "Coming soon" (deliberately renamed in commits `ffd1256`/`5858be7`) | Bucket Intelligence & AI Agent Toolkit |
| Contact | sales@fil.one; app at `https://app.fil.one` (signup: `/login?screen_hint=signup`) | |

## Where claims live (sweep checklist for a value change)

Run for the old value, e.g.: `grep -rln '4\.99' src scripts public`

1. `src/pages/*.tsx` — hero subheads, pricing sections, comparison tables, FAQ answers
   (~40 landing pages; comparison tables also encode DERIVED math like "$25/mo for 5 TB" —
   recompute those, don't just find/replace)
2. `src/pages/solutions/*.tsx`
3. `src/components/` — `PricingSection.tsx`, `ComparisonSection.tsx`, `SavingsSection.tsx`,
   `FaqSection.tsx`, `StorageCalculatorSection.tsx` (calculator math!), `UseCasesSection.tsx`
4. `scripts/prerender.mjs` — `ROUTE_META` descriptions AND `jsonLd` FAQ answer texts AND
   the homepage `Product` schema's `offers.price` field (`"4.99"`)
5. `public/llms.txt` and `public/llms-full.txt`
6. `src/data/adsCities.ts` — FR and ES city pages (EUR prices, competitor prices)
7. Spanish pages: `BarcelonaLandingPageES.tsx`, `ContactSalesBcnES.tsx`, `SupportBcnES.tsx`
8. `index.html` — the fallback meta description contains claims
9. Legal pages if pricing terms are quoted (`Sla.tsx` quotes uptime/credit tiers)

After a sweep: `grep -rn '<OLD VALUE>' src scripts public index.html` must return zero
hits (excluding genuinely historical references), then run the standard verification from
SKILL.md.

## Known inconsistencies (do not "fix" silently — flag to the user)

- USD pages say `$4.99/TB`; Barcelona/EU pages say `€4.99/TB`. This is intentional
  campaign pricing, not a bug.
- Older ROUTE_META titles use `"X — Fil One"`, newer use `"Fil One — X"`. Both shipped;
  harmonizing is a product decision, not yours to make unprompted.
