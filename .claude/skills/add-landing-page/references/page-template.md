# Landing page skeleton (copy this whole file's code block)

This is the canonical `/lp/` page structure, extracted from the most recent shipped pages
(`GrantFundedLandingPage.tsx`, `DigitalPreservationLandingPage.tsx`). Copy the code block
into `src/pages/<Name>LandingPage.tsx`, then replace every `TODO` with page-specific copy.
Keep the structure and styling untouched — it is the approved design system.

Section order (from `landing-page-framework.md`, the marketing team's spec):

1. **Hero** — badge pill naming the audience, problem-restating headline, subheadline
   with the price, primary + secondary CTA, reassurance line
2. **Problem** — 3 cards explaining the pain (grey `#F9FAFB` background)
3. **Comparison table** — a concrete scenario priced across AWS / a mid-tier competitor /
   Fil One (Fil One row highlighted)
4. **Features** — 4 cards mapping Fil One capabilities to the audience
5. **Pricing** — the flat rate, restated
6. **Dark CTA** — final conversion block

## Approved claims (use ONLY these numbers — never invent)

| Claim | Exact wording to use |
|---|---|
| Price | `$4.99/TB/month` (flat; Barcelona/EU pages use `€4.99/TB`) |
| Egress | `$0 egress` / "no egress fees" |
| API requests | `$0 per request` / "no per-request fees" |
| Durability | `11 nines (99.999999999%)` |
| Integrity | "verified approximately every 24 hours" (CID / cryptographic proofs) |
| Trial | "Free 30-day trial, 1 TB included, no credit card required" |
| Compatibility | "S3-compatible" — works with boto3, AWS CLI, rclone, any S3 SDK |
| AWS S3 reference prices | storage ~$0.023/GB/mo, egress ~$0.09/GB (used in comparisons) |
| Reassurance line | `No credit card required · No retrieval fees · Connects in minutes` |

## The skeleton

```tsx
import { CurrencyDollar, ShieldCheck, Database, Wallet } from "@phosphor-icons/react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useInView } from "@/hooks/useInView";
import { useSeo } from "@/hooks/useSeo";
import { GRID_SVG, SectionLabel, SectionHeading, SectionSub } from "@/components/LandingPrimitives";

// TODO: comparison scenario. Document the arithmetic in a comment like this so
// reviewers can check it (see GrantFundedLandingPage.tsx for a worked example):
// <N> TB stored, <workload description>.
// AWS S3 Standard: N×1024 GB × $0.023/GB ≈ $X/mo; egress reads × $0.09/GB ≈ $Y/mo.
// Wasabi: $6.99/TB. Fil One: $4.99/TB, $0 egress.
const COMPARISON_ROWS = [
  { provider: "AWS S3 Standard", storage: "$TODO", egress: "~$TODO/mo", allIn: "$TODO", isFilOne: false },
  { provider: "Wasabi", storage: "$TODO", egress: "$0", allIn: "$TODO", isFilOne: false },
  { provider: "Fil One", storage: "$TODO", egress: "$0", allIn: "$TODO", isFilOne: true },
];

const FEATURES = [
  { icon: CurrencyDollar, title: "TODO benefit", desc: "TODO 1–2 sentences tying the claim to this audience." },
  { icon: Wallet, title: "TODO benefit", desc: "TODO" },
  { icon: ShieldCheck, title: "TODO benefit", desc: "TODO" },
  { icon: Database, title: "S3-compatible", desc: "Standard S3 API. The tools and scripts you already use connect without modification." },
];

const PROBLEM_CARDS = [
  { label: "TODO short label", catch: "TODO one-line hook.", body: "TODO 2–3 sentences of plain-language pain." },
  { label: "TODO", catch: "TODO", body: "TODO" },
  { label: "TODO", catch: "TODO", body: "TODO" },
];

const TodoNameLandingPage = () => {
  useSeo({
    title: "Fil One — TODO benefit statement",           // MUST equal ROUTE_META title
    description: "TODO 150–160 chars incl. $4.99/TB.",    // MUST equal ROUTE_META description
    canonical: "https://fil.one/lp/todo-slug",
  });

  const { ref: problemRef, inView: problemInView } = useInView({ threshold: 0.05 });
  const { ref: tableRef, inView: tableInView } = useInView({ threshold: 0.05 });
  const { ref: featuresRef, inView: featuresInView } = useInView({ threshold: 0.05 });
  const { ref: ctaRef, inView: ctaInView } = useInView({ threshold: 0.05 });

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#FFFFFF" }}>
      <PlatformNavbar />

      <main id="main-content">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative isolate pt-[58px] md:pt-[94px]" style={{ backgroundColor: "#FFFFFF" }}>
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none -z-10"
            style={{ background: "radial-gradient(ellipse 55% 40% at 50% 0%, rgba(0,144,255,0.13) 0%, transparent 70%)" }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none -z-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,${GRID_SVG}")`,
              backgroundSize: "60px 60px",
              backgroundPosition: "center top",
              maskImage: "radial-gradient(ellipse 80% 65% at 50% 0%, black 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 65%, transparent 80%)",
              WebkitMaskImage: "radial-gradient(ellipse 80% 65% at 50% 0%, black 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 65%, transparent 80%)",
            }}
          />

          <div className="flex flex-col items-center gap-6 px-5 md:px-8 w-full max-w-[1120px] mx-auto pt-20 md:pt-[120px] pb-20 md:pb-28">
            {/* Audience badge pill */}
            <div
              className="hero-fade-1 flex items-center gap-1.5 text-center"
              style={{ backgroundColor: "#EFF8FF", border: "1px solid rgba(0,144,255,0.2)", borderRadius: 14, padding: "10px 14px", maxWidth: "90vw" }}
            >
              <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 13.5, lineHeight: 1, color: "#0070CC" }}>
                For TODO-audience
              </span>
            </div>

            <h1
              className="text-[30px] sm:text-[38px] md:text-[54px] hero-fade-2"
              style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, lineHeight: "1.08", letterSpacing: "-0.025em", color: "#09090B", textAlign: "center", maxWidth: 820, margin: 0 }}
            >
              TODO headline first line<br />
              <span style={{ color: "#0090FF" }}>TODO accent phrase.</span>
            </h1>

            <p
              className="text-[15px] md:text-[17px] hero-fade-2"
              style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, lineHeight: "1.65", color: "#71717A", textAlign: "center", maxWidth: 580, margin: 0 }}
            >
              TODO subheadline. Flat $4.99/TB. TODO one more sentence.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2 hero-fade-3">
              <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary">
                <span className="btn-primary-inner">Start for free</span>
              </a>
              <a href="/contact-sales" className="btn-secondary">Talk to an expert</a>
            </div>

            <p className="hero-fade-4" style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13, color: "#71717A", textAlign: "center" }}>
              No credit card required · No retrieval fees · Connects in minutes
            </p>
          </div>
        </section>

        {/* ── Problem ──────────────────────────────────────────────────── */}
        <section className="px-5 md:px-8 py-16 md:py-24 w-full" style={{ backgroundColor: "#F9FAFB" }}>
          <div ref={problemRef} className={`flex flex-col gap-10 w-full max-w-[1120px] mx-auto reveal${problemInView ? " in-view" : ""}`}>
            <div className="flex flex-col gap-4 items-center text-center max-w-[620px] mx-auto">
              <SectionLabel>TODO section label</SectionLabel>
              <SectionHeading>TODO problem statement heading.</SectionHeading>
              <SectionSub>TODO 1–2 sentences framing the pain.</SectionSub>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {PROBLEM_CARDS.map(({ label, body, catch: catchLine }) => (
                <div key={label} className="flex flex-col rounded-2xl overflow-hidden"
                  style={{ border: "1px solid rgba(0,0,0,0.07)", backgroundColor: "#FFFFFF", boxShadow: "0px 1px 3px rgba(0,0,0,0.04), 0px 4px 16px rgba(0,0,0,0.04)" }}>
                  <div className="flex flex-col p-7" style={{ gap: 10, flex: 1 }}>
                    <span style={{ display: "inline-block", fontFamily: "'DM Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "#52525B", backgroundColor: "#F4F4F5", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 9999, padding: "3px 10px", marginBottom: 2, alignSelf: "flex-start" }}>
                      {label}
                    </span>
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 600, fontSize: 18, lineHeight: "1.3", letterSpacing: "-0.01em", color: "#09090B" }}>{catchLine}</p>
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: 1.65, color: "#71717A", marginTop: 4 }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Comparison table ─────────────────────────────────────────── */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div ref={tableRef} className={`flex flex-col gap-8 w-full max-w-[1120px] mx-auto reveal${tableInView ? " in-view" : ""}`}>
            <div className="flex flex-col gap-3">
              <SectionLabel>The comparison</SectionLabel>
              <SectionHeading>
                TODO scenario. <span style={{ color: "#0090FF" }}>TODO accent.</span>
              </SectionHeading>
              <SectionSub maxWidth={640}>TODO describe the scenario the numbers assume.</SectionSub>
            </div>

            {/* Mobile-safe table: horizontal scroll wrapper */}
            <div className="w-full overflow-x-auto">
              <table className="w-full" style={{ borderCollapse: "separate", borderSpacing: 0, minWidth: 560 }}>
                <thead>
                  <tr>
                    {["Provider", "Storage / mo", "Verification egress", "All-in / mo"].map((h, i) => (
                      <th key={h} style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#71717A", textAlign: i === 0 ? "left" : "right", padding: "12px 16px", borderBottom: "1px solid #E4E4E7" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row) => (
                    <tr key={row.provider} style={row.isFilOne ? { backgroundColor: "#EFF8FF" } : undefined}>
                      <td style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: row.isFilOne ? 600 : 400, fontSize: 15, color: "#09090B", padding: "14px 16px", borderBottom: "1px solid #F4F4F5" }}>{row.provider}</td>
                      <td style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 15, color: "#09090B", textAlign: "right", padding: "14px 16px", borderBottom: "1px solid #F4F4F5" }}>{row.storage}</td>
                      <td style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 15, color: "#09090B", textAlign: "right", padding: "14px 16px", borderBottom: "1px solid #F4F4F5" }}>{row.egress}</td>
                      <td style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: row.isFilOne ? 600 : 400, fontSize: 15, color: row.isFilOne ? "#0070CC" : "#09090B", textAlign: "right", padding: "14px 16px", borderBottom: "1px solid #F4F4F5" }}>{row.allIn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Features ─────────────────────────────────────────────────── */}
        <section className="px-5 md:px-8 py-16 md:py-24 w-full" style={{ backgroundColor: "#F9FAFB" }}>
          <div ref={featuresRef} className={`flex flex-col gap-10 w-full max-w-[1120px] mx-auto reveal${featuresInView ? " in-view" : ""}`}>
            <div className="flex flex-col gap-3 items-center text-center">
              <SectionLabel>How Fil One helps</SectionLabel>
              <SectionHeading>
                <span style={{ color: "#0090FF" }}>TODO accent phrase.</span> TODO rest of heading.
              </SectionHeading>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
              {FEATURES.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex flex-col gap-4 p-6 rounded-2xl border"
                  style={{ borderColor: "rgba(0,0,0,0.07)", backgroundColor: "#FFFFFF", boxShadow: "0px 1px 3px rgba(0,0,0,0.04)", textAlign: "left" }}>
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0" style={{ backgroundColor: "#EFF8FF" }}>
                    <Icon size={18} color="#0090FF" />
                  </div>
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 15, lineHeight: "1.3", color: "#09090B" }}>{title}</p>
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13.5, lineHeight: "1.6", color: "#71717A" }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing ──────────────────────────────────────────────────── */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="flex flex-col gap-10 items-center text-center w-full max-w-[1120px] mx-auto">
            <div className="flex flex-col gap-3 items-center">
              <SectionLabel>Pricing</SectionLabel>
              <SectionHeading>One rate. <span style={{ color: "#0090FF" }}>$4.99/TB/month.</span></SectionHeading>
              <SectionSub maxWidth={520}>
                Storage. That is the whole bill. Integrity verification, 11 nines durability, free reads, and no exit fees are all included.
              </SectionSub>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary"><span className="btn-primary-inner">Start for free</span></a>
              <a href="/contact-sales" className="btn-secondary">Talk to an expert</a>
            </div>
            <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13, color: "#71717A" }}>
              No credit card required · No retrieval fees · Connects in minutes
            </p>
          </div>
        </section>

        {/* ── Dark CTA ─────────────────────────────────────────────────── */}
        <section className="px-5 md:px-8 pb-24 md:pb-32 pt-0 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div ref={ctaRef} className={`w-full max-w-[1120px] mx-auto reveal${ctaInView ? " in-view" : ""}`}>
            <div
              style={{ position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #020D1A 0%, #0D2847 55%, #041525 100%)", borderRadius: 20, textAlign: "center" }}
              className="px-6 md:px-12 py-16 md:py-[104px]"
            >
              <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#fff" stroke-opacity="0.12" stroke-width="1"/></svg>')}")`, backgroundSize: "60px 60px", maskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, black 0%, transparent 80%)", WebkitMaskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, black 0%, transparent 80%)", pointerEvents: "none" }} />
              <div style={{ position: "relative" }}>
                <h2 className="text-[26px] md:text-[32px]" style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, letterSpacing: "-0.025em", lineHeight: "1.12", color: "#FFFFFF", marginBottom: 12 }}>
                  TODO final CTA headline.
                </h2>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 17, color: "rgba(255,255,255,0.60)", marginBottom: 32 }}>
                  TODO one supporting sentence.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary btn-primary-dark"><span className="btn-primary-inner">Start for free</span></a>
                  <a href="/contact-sales" className="btn-secondary btn-secondary-dark">Talk to an expert</a>
                </div>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.60)", marginTop: 16 }}>
                  No credit card required · No retrieval fees · Connects in minutes
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TodoNameLandingPage;
```

## After pasting

1. Rename `TodoNameLandingPage` (both the `const` and the `export default`) to match the
   file name.
2. Replace every `TODO`. Search the file for `TODO` before moving on — none may remain.
3. Sections are optional except Hero, Pricing, and Dark CTA. Delete a section cleanly
   (including its `useInView` ref) if the page doesn't need it; existing pages vary
   between 4 and 7 sections.
4. If you add an FAQ section, mirror the Q&A text into a `jsonLd` `FAQPage` entry in
   `scripts/prerender.mjs` (copy the `"/lp/agents"` example).
