import { ArrowsOut, ChartLine, Plug, ShieldCheck } from "@phosphor-icons/react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useInView } from "@/hooks/useInView";
import { useSeo } from "@/hooks/useSeo";
import { GRID_SVG, SectionLabel, SectionHeading, SectionSub } from '@/components/LandingPrimitives';


// 10 TB stored per month, flat-rate vendors only (no egress/API line items —
// all three providers position themselves as egress-free / request-free flat storage).
// Fil One: 10 x $4.99 = $49.90 (public rate, $4.99/TB/month, see llms.txt)
// Backblaze B2: 10 x $6.95 = $69.50 (published flat rate, Q3 2026)
// Wasabi: 10 x $7.99 = $79.90 (published flat rate, Q3 2026; 90-day minimum retention applies)
const COMPARE_ROWS = [
  { provider: "Fil One", rate: "$4.99", total: "$49.90", isFilOne: true },
  { provider: "Backblaze B2", rate: "$6.95", total: "$69.50", isFilOne: false },
  { provider: "Wasabi", rate: "$7.99", total: "$79.90", isFilOne: false },
];

const FEATURES = [
  { icon: ChartLine, title: "One number on the invoice",    desc: "Storage volume times $4.99. No egress column, no request column, no retrieval tier. The invoice has one line." },
  { icon: ArrowsOut, title: "No egress fees",               desc: "Reads are included in flat storage. Download your own data as many times as you need — $0 in egress." },
  { icon: Plug,      title: "S3-compatible, zero migration cost", desc: "Existing SDKs, tools, and scripts connect with an endpoint change. No rewrite, no new library, no operational overhead." },
  { icon: ShieldCheck,title: "Recurring integrity checks", desc: "Every stored object is verified approximately every 24 hours. Low-cost storage that also proves your data is intact." },
];

const PriceLandingPage = () => {
  useSeo({
    title: "Fil One — $4.99. Theirs isn't.",
    description:
      "Compare flat-rate S3-compatible storage side by side. Fil One: $4.99/TB, $0 egress, no per-request fees — versus Wasabi $7.99/TB and Backblaze B2 $6.95/TB.",
    canonical: "https://fil.one/lp/price",
  });

  const { ref: tableRef,    inView: tableInView    } = useInView({ threshold: 0.05 });
  const { ref: problemRef,  inView: problemInView  } = useInView({ threshold: 0.05 });
  const { ref: featuresRef, inView: featuresInView } = useInView({ threshold: 0.05 });
  const { ref: ctaRef,      inView: ctaInView      } = useInView({ threshold: 0.05 });

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <PlatformNavbar />
      <main id="main-content">

        {/* Hero */}
        <section className="relative isolate pt-[58px] md:pt-[94px] bg-white">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none -z-10 bg-blue-halo" />
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none -z-10" style={{ backgroundImage: `url("data:image/svg+xml,${GRID_SVG}")`, backgroundSize: "60px 60px", backgroundPosition: "center top", maskImage: "radial-gradient(ellipse 80% 65% at 50% 0%, black 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 65%, transparent 80%)", WebkitMaskImage: "radial-gradient(ellipse 80% 65% at 50% 0%, black 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 65%, transparent 80%)" }} />
          <div className="flex flex-col items-center gap-6 px-5 md:px-8 w-full max-w-container mx-auto pt-20 md:pt-[120px] pb-16 md:pb-20">
            <div className="hero-fade-1 flex items-center gap-1.5 text-center bg-brand-50 border border-brand-500/20" style={{ borderRadius: 14, padding: "10px 14px", maxWidth: "90vw" }}>
              <span className="font-sans font-medium text-brand-600 text-sm" style={{ lineHeight: 1 }}>For teams comparing S3-compatible storage vendors</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl hero-fade-2 font-display text-zinc-950 text-center" style={{ fontWeight: 500, lineHeight: "1.08", letterSpacing: "-0.025em", maxWidth: 800, margin: 0 }}>
              $4.99.<br /><span className="text-brand-500">Theirs isn't.</span>
            </h1>
            <p className="text-base md:text-lg hero-fade-2 font-sans text-zinc-500 text-center" style={{ fontWeight: 400, lineHeight: "1.65", maxWidth: 580, margin: 0 }}>
              Wasabi and Backblaze also call their pricing flat-rate. Run the same 10 TB and the invoices don't land in the same place.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2 hero-fade-3">
              <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary"><span className="btn-primary-inner">Start for free</span></a>
              <a href="/contact-sales" className="btn-secondary">Talk to an expert</a>
            </div>
            <p className="hero-fade-4 font-sans text-zinc-500 text-center text-sm" style={{ fontWeight: 400 }}>No credit card required · No egress fees · Connects in minutes</p>
          </div>
        </section>

        {/* Comparison — the hero of the page */}
        <section className="px-5 md:px-8 pb-24 md:pb-32 pt-0 w-full bg-white">
          <div ref={tableRef} className={`flex flex-col gap-8 w-full max-w-[880px] mx-auto reveal${tableInView ? " in-view" : ""}`}>
            <div className="flex flex-col gap-3 items-center text-center">
              <SectionLabel>Side by side</SectionLabel>
              <SectionHeading>10 TB/month, <span className="text-brand-500">three flat-rate vendors.</span></SectionHeading>
              <SectionSub maxWidth={560}>They all call it flat. The per-TB rate is where "flat" stops meaning the same thing.</SectionSub>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table className="font-sans" style={{ width: "100%", minWidth: 420, borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {["Provider", "Rate / TB", "10 TB / month"].map(h => (
                      <th key={h} className="text-left text-xs font-medium uppercase text-zinc-500 border-b border-black/[0.07] whitespace-nowrap" style={{ padding: "11px 16px", letterSpacing: "0.06em" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_ROWS.map(r => (
                    <tr key={r.provider} className={r.isFilOne ? "bg-brand-50" : undefined}>
                      <td className={`border-b border-black/[0.06] text-sm ${r.isFilOne ? "font-bold text-brand-600" : "font-medium text-zinc-950"}`} style={{ padding: "14px 16px" }}>
                        {r.provider}{r.isFilOne && <span className="text-xs font-medium text-brand-600 bg-brand-50 border border-brand-500/20 align-middle" style={{ marginLeft: 8, borderRadius: 9999, padding: "2px 7px" }}>You</span>}
                      </td>
                      <td className={`border-b border-black/[0.06] text-sm ${r.isFilOne ? "font-semibold text-zinc-950" : "text-zinc-600"}`} style={{ padding: "14px 16px" }}>{r.rate}</td>
                      <td className={`border-b border-black/[0.06] ${r.isFilOne ? "font-bold text-brand-600 text-lg" : "text-zinc-600 text-sm"}`} style={{ padding: "14px 16px" }}>{r.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <span className="font-sans font-medium text-brand-600 bg-brand-50 border border-brand-500/20 text-center text-sm" style={{ borderRadius: 9999, padding: "7px 14px" }}>$19.60/mo less than Backblaze B2</span>
              <span className="font-sans font-medium text-brand-600 bg-brand-50 border border-brand-500/20 text-center text-sm" style={{ borderRadius: 9999, padding: "7px 14px" }}>$30.00/mo less than Wasabi</span>
            </div>
            <p className="text-xs text-zinc-500 text-center font-sans">Fil One: $4.99/TB/month flat, $0 egress, no per-request fees. Backblaze B2 and Wasabi published flat storage rates, Q3 2026 — $6.95/TB and $7.99/TB respectively; Wasabi's flat rate carries a 90-day minimum retention charge. All three positioned as egress-free / request-free flat storage; figures shown are storage cost for 10 TB stored for one month.</p>
          </div>
        </section>

        {/* Problem */}
        <section className="px-5 md:px-8 py-16 md:py-24 w-full bg-gray-50">
          <div ref={problemRef} className={`flex flex-col gap-10 w-full max-w-container mx-auto reveal${problemInView ? " in-view" : ""}`}>
            <div className="flex flex-col gap-4 items-center text-center max-w-[600px] mx-auto">
              <SectionLabel>The comparison problem</SectionLabel>
              <SectionHeading>"They're all about the same price," until you do the math.</SectionHeading>
              <SectionSub>Every S3-compatible vendor in this category calls its pricing simple and flat. The actual per-TB rate is a single number — and the three numbers are not close.</SectionSub>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {[
                { label: "Same word",   catch: "\"Flat-rate\" is doing a lot of work.",         body: "Wasabi, Backblaze B2, and Fil One each publish one storage rate with no line-item surprises. The word \"flat\" is identical across all three. The rate behind it is not." },
                { label: "Fine print",  catch: "The list price isn't always the invoice.",     body: "Wasabi's flat rate carries a 90-day minimum retention charge — capacity is billed for 90 days even if the data is deleted sooner. Fil One bills only for what's stored, no minimum term." },
                { label: "One line of math","catch": "The comparison takes a single multiplication.", body: "Storage volume times the per-TB rate. That's the whole comparison for flat-rate vendors — check the table above against your own workload." },
              ].map(({ label, body, catch: c }) => (
                <div key={label} className="flex flex-col rounded-2xl overflow-hidden bg-white border border-black/[0.07] shadow-elevated">
                  <div className="flex flex-col p-7" style={{ gap: 10, flex: 1 }}>
                    <span className="inline-block text-xs font-mono font-medium uppercase text-zinc-600 bg-zinc-100 border border-black/[0.08] self-start" style={{ letterSpacing: "0.08em", borderRadius: 9999, padding: "3px 10px", marginBottom: 2 }}>{label}</span>
                    <p className="font-sans font-semibold text-zinc-950 text-lg" style={{ lineHeight: "1.3", letterSpacing: "-0.01em" }}>{c}</p>
                    <p className="font-sans text-zinc-500 text-sm" style={{ lineHeight: 1.65, marginTop: 4 }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full bg-white">
          <div ref={featuresRef} className={`flex flex-col gap-10 items-center text-center w-full max-w-container mx-auto reveal${featuresInView ? " in-view" : ""}`}>
            <div className="flex flex-col gap-3 items-center">
              <SectionLabel>Why it stays $4.99</SectionLabel>
              <SectionHeading>Storage that works like <span className="text-brand-500">it says on the tin.</span></SectionHeading>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
              {FEATURES.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex flex-col gap-4 p-6 rounded-2xl border border-black/[0.07] bg-white shadow-elevated-sm text-left">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0 bg-brand-50"><Icon size={18} color="#0090FF" /></div>
                  <p className="font-sans font-medium text-zinc-950 text-base" style={{ lineHeight: "1.3" }}>{title}</p>
                  <p className="font-sans text-zinc-500 text-sm" style={{ lineHeight: "1.6" }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full bg-gray-50">
          <div className="flex flex-col gap-10 items-center text-center w-full max-w-container mx-auto">
            <div className="flex flex-col gap-3 items-center">
              <SectionLabel>Pricing</SectionLabel>
              <SectionHeading>One rate. <span className="text-brand-500">$4.99/TB/month.</span></SectionHeading>
              <SectionSub maxWidth={520}>Storage. That is the whole bill. No egress, no requests, no minimum term. Multiply your TB by $4.99 and that is the invoice.</SectionSub>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary"><span className="btn-primary-inner">Start for free</span></a>
              <a href="/contact-sales" className="btn-secondary">Talk to an expert</a>
            </div>
            <p className="font-sans text-zinc-500 text-sm" style={{ fontWeight: 400 }}>No credit card required · No egress fees · Connects in minutes</p>
          </div>
        </section>

        {/* Dark CTA */}
        <section className="px-5 md:px-8 pb-24 md:pb-32 pt-0 w-full bg-white">
          <div ref={ctaRef} className={`w-full max-w-container mx-auto reveal${ctaInView ? " in-view" : ""}`}>
            <div className="relative overflow-hidden bg-dark-section rounded-[20px] text-center px-6 md:px-12 py-16 md:py-section">
              <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#fff" stroke-opacity="0.12" stroke-width="1"/></svg>')}")`, backgroundSize: "60px 60px", maskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, black 0%, transparent 80%)", WebkitMaskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, black 0%, transparent 80%)", pointerEvents: "none" }} />
              <div className="relative">
                <h2 className="text-2xl md:text-3xl font-display text-white" style={{ fontWeight: 500, letterSpacing: "-0.025em", lineHeight: "1.12", marginBottom: 12 }}>Run your own numbers.</h2>
                <p className="font-sans text-white/60 text-lg" style={{ fontWeight: 400, marginBottom: 32 }}>Free 1 TB evaluation. Compare the invoice against whatever you're paying today.</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary btn-primary-dark"><span className="btn-primary-inner">Start for free</span></a>
                  <a href="/contact-sales" className="btn-secondary btn-secondary-dark">Talk to an expert</a>
                </div>
                <p className="font-sans text-white/60 text-sm" style={{ marginTop: 16 }}>No credit card required · No egress fees · Connects in minutes</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PriceLandingPage;
