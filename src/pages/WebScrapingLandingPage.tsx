import { Database, ArrowsOut, ChartLine, Plug } from "@phosphor-icons/react";
import LandingNavbar from "@/components/LandingNavbar";
import LandingFooter from "@/components/LandingFooter";
import { useInView } from "@/hooks/useInView";
import { useSeo } from "@/hooks/useSeo";
import { GRID_SVG, SectionLabel, SectionHeading, SectionSub } from '@/components/LandingPrimitives';


// Per-PUT comparison: 1 billion PUTs/month.
// AWS S3: $0.005/1K = $5,000. Google Cloud: $0.05/10K = $5,000. Azure: $0.055/10K = $5,500.
// Wasabi, Backblaze B2, Fil One: $0 per request.
const PUT_ROWS = [
  { name: "AWS S3 Standard",   rate: "$0.005 / 1K PUT",     total: "$5,000", win: false, you: false },
  { name: "Google Cloud",      rate: "$0.05 / 10K ops",     total: "$5,000", win: false, you: false },
  { name: "Azure Blob",        rate: "$0.055 / 10K writes",  total: "$5,500", win: false, you: false },
  { name: "Wasabi",            rate: "$0 per request",       total: "$0",     win: true,  you: false },
  { name: "Backblaze B2",      rate: "$0 per request",       total: "$0",     win: true,  you: false },
  { name: "Fil One",           rate: "$0 per request",       total: "$0",     win: true,  you: true  },
];

const FEATURES = [
  {
    icon: Database,
    title: "No per-PUT fees",
    desc: "1 billion PUTs per month on Fil One costs $0 in request charges. The only cost is the storage that results from collection.",
  },
  {
    icon: ArrowsOut,
    title: "No egress on processing",
    desc: "Read the scraped corpus back for enrichment, deduplication, or classification without a $0.09/GB charge on every pass.",
  },
  {
    icon: ChartLine,
    title: "Predictable collection cost",
    desc: "Storage at $4.99/TB. The write rate determines the dataset size; the dataset size determines the cost. No request-rate multiplier.",
  },
  {
    icon: Plug,
    title: "S3-compatible, drop-in",
    desc: "Any framework that writes files — Scrapy, Crawlee, Playwright pipelines — works with standard S3 upload APIs. Swap the endpoint.",
  },
];

const WebScrapingLandingPage = () => {
  useSeo({
    title: "Fil One — Scrape at scale without the per-PUT bill",
    description:
      "$4.99/TB flat storage. No per-PUT charges, no egress fees. Run large-scale web scraping and data collection pipelines without per-write billing.",
    canonical: "https://fil.one/lp/web-scraping",
  });

  const { ref: problemRef, inView: problemInView } = useInView({ threshold: 0.05 });
  const { ref: proofRef, inView: proofInView } = useInView({ threshold: 0.05 });
  const { ref: featuresRef, inView: featuresInView } = useInView({ threshold: 0.05 });
  const { ref: ctaRef, inView: ctaInView } = useInView({ threshold: 0.05 });

  const SCRAPE_CODE = `import boto3, os
from concurrent.futures import ThreadPoolExecutor

s3 = boto3.client(
    "s3",
    endpoint_url="https://eu-west-1.s3.fil.one",
    aws_access_key_id=os.environ["FIL_ACCESS_KEY"],
    aws_secret_access_key=os.environ["FIL_SECRET_KEY"],
    region_name="eu-west-1",
)

def store_page(page):
    s3.put_object(
        Bucket="scraped-data",
        Key=f"crawl/{page.domain}/{page.url_hash}.html",
        Body=page.content,
        ContentType="text/html",
    )

# High-throughput parallel upload — no PUT charge
with ThreadPoolExecutor(max_workers=64) as pool:
    pool.map(store_page, scraped_pages)
# 1 billion PUTs this month: $0 in request fees`;

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#FFFFFF" }}>
      <LandingNavbar />

      <main id="main-content">
        {/* Hero */}
        <section className="relative isolate pt-[58px]" style={{ backgroundColor: "#FFFFFF" }}>
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none -z-10"
            style={{
              background:
                "radial-gradient(ellipse 55% 40% at 50% 0%, rgba(0,144,255,0.13) 0%, transparent 70%)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none -z-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,${GRID_SVG}")`,
              backgroundSize: "60px 60px",
              backgroundPosition: "center top",
              maskImage:
                "radial-gradient(ellipse 80% 65% at 50% 0%, black 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 65%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 65% at 50% 0%, black 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 65%, transparent 80%)",
            }}
          />

          <div className="flex flex-col items-center gap-6 px-5 md:px-8 w-full max-w-[1120px] mx-auto pt-20 md:pt-[120px] pb-20 md:pb-28">
            <div
              className="hero-fade-1 flex items-center gap-1.5 text-center"
              style={{
                backgroundColor: "#EFF8FF",
                border: "1px solid rgba(0,144,255,0.2)",
                borderRadius: 14,
                padding: "10px 14px",
                maxWidth: "90vw",
              }}
            >
              <span
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: 13.5,
                  lineHeight: 1,
                  color: "#0070CC",
                }}
              >
                For teams running large-scale scraping pipelines
              </span>
            </div>

            <h1
              className="text-[30px] sm:text-[38px] md:text-[54px] hero-fade-2"
              style={{
                fontFamily: "'Aspekta', sans-serif",
                fontWeight: 500,
                lineHeight: "1.08",
                letterSpacing: "-0.025em",
                color: "#09090B",
                textAlign: "center",
                maxWidth: 760,
                margin: 0,
              }}
            >
              Scrape at scale.<br />
              <span style={{ color: "#0090FF" }}>Keep all of it.</span>
            </h1>

            <p
              className="text-[15px] md:text-[17px] hero-fade-2"
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 400,
                lineHeight: "1.65",
                color: "#71717A",
                textAlign: "center",
                maxWidth: 580,
                margin: 0,
              }}
            >
              $4.99/TB flat. No per-PUT charges, no egress, S3-compatible. Collection pipelines that bill per write shrink the dataset the budget allows.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2 hero-fade-3">
              <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary">
                <span className="btn-primary-inner">Start for free</span>
              </a>
              <a href="/contact-sales" className="btn-secondary">
                Talk to an expert
              </a>
            </div>

            <p
              className="hero-fade-4"
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 400,
                fontSize: 13,
                color: "#71717A",
                textAlign: "center",
              }}
            >
              No credit card required · No per-PUT fees · Connects in minutes
            </p>
          </div>
        </section>

        {/* Problem */}
        <section className="px-5 md:px-8 py-16 md:py-24 w-full" style={{ backgroundColor: "#F9FAFB" }}>
          <div
            ref={problemRef}
            className={`flex flex-col gap-10 w-full max-w-[1120px] mx-auto reveal${problemInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-4 items-center text-center max-w-[600px] mx-auto">
              <SectionLabel>The trap</SectionLabel>
              <SectionHeading>High-write pipelines pay per write.</SectionHeading>
              <SectionSub>
                A scraping pipeline writes constantly by design. At per-PUT pricing, the collection operation itself — not the dataset it produces — becomes the largest line item.
              </SectionSub>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {[
                {
                  label: "The PUT bill",
                  catch: "1 billion writes. $5,000 in fees.",
                  body: "AWS S3 charges $0.005 per 1,000 PUTs. A pipeline writing 1 billion objects per month incurs $5,000 in PUT fees alone — before a byte of storage is billed. The collection operation is its own cost centre.",
                },
                {
                  label: "The coverage decision",
                  catch: "The budget decides what gets collected.",
                  body: "Teams start pruning scope not because the data has no value, but because the write cost does not discriminate. Lower-priority domains get dropped. Crawl frequency gets reduced. The dataset reflects budget constraints, not coverage goals.",
                },
                {
                  label: "The egress hit",
                  catch: "Processing your own collection costs extra.",
                  body: "Deduplicating, enriching, and classifying the scraped corpus reads it back from storage. On AWS, $0.09/GB egress means reading 10 TB of collected content costs $900. Collection pipelines pay twice.",
                },
              ].map(({ label, body, catch: catchLine }) => (
                <div
                  key={label}
                  className="flex flex-col rounded-2xl overflow-hidden"
                  style={{
                    border: "1px solid rgba(0,0,0,0.07)",
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0px 1px 3px rgba(0,0,0,0.04), 0px 4px 16px rgba(0,0,0,0.04)",
                  }}
                >
                  <div className="flex flex-col p-7" style={{ gap: 10, flex: 1 }}>
                    <span
                      style={{
                        display: "inline-block",
                        fontFamily: "'DM Mono', monospace",
                        fontWeight: 500,
                        fontSize: 10,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#52525B",
                        backgroundColor: "#F4F4F5",
                        border: "1px solid rgba(0,0,0,0.08)",
                        borderRadius: 9999,
                        padding: "3px 10px",
                        marginBottom: 2,
                        alignSelf: "flex-start",
                      }}
                    >
                      {label}
                    </span>
                    <p
                      style={{
                        fontFamily: "'Funnel Sans', sans-serif",
                        fontWeight: 600,
                        fontSize: 18,
                        lineHeight: "1.3",
                        letterSpacing: "-0.01em",
                        color: "#09090B",
                      }}
                    >
                      {catchLine}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Funnel Sans', sans-serif",
                        fontWeight: 400,
                        fontSize: 14,
                        lineHeight: 1.65,
                        color: "#71717A",
                        marginTop: 4,
                      }}
                    >
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Proof — code block + per-PUT comparison */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div
            ref={proofRef}
            className={`flex flex-col gap-10 w-full max-w-[1120px] mx-auto reveal${proofInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3">
              <SectionLabel>The proof</SectionLabel>
              <SectionHeading>
                Same S3 upload call. <span style={{ color: "#0090FF" }}>Zero per-PUT counter.</span>
              </SectionHeading>
              <SectionSub maxWidth={620}>
                Any scraping framework that writes to S3 works without modification. Swap the endpoint; remove the per-write ceiling.
              </SectionSub>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Code block */}
              <div
                style={{
                  borderRadius: 16,
                  overflow: "hidden",
                  border: "1px solid rgba(0,0,0,0.08)",
                  backgroundColor: "#0F172A",
                }}
              >
                <div
                  style={{
                    padding: "10px 16px",
                    backgroundColor: "#1E293B",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 12,
                    color: "#94A3B8",
                  }}
                >
                  scraper.py
                </div>
                <pre
                  style={{
                    margin: 0,
                    padding: "20px 18px",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 12.5,
                    lineHeight: 1.65,
                    color: "#E2E8F0",
                    overflowX: "auto",
                  }}
                >
                  {SCRAPE_CODE}
                </pre>
              </div>

              {/* Per-PUT comparison */}
              <div
                style={{
                  border: "1px solid rgba(0,0,0,0.07)",
                  borderRadius: 16,
                  backgroundColor: "#F9FAFB",
                  padding: 28,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <SectionLabel>Request fees only, 1 billion PUTs/month</SectionLabel>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {PUT_ROWS.map((r) => (
                    <div
                      key={r.name}
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                        gap: 12,
                        padding: "10px 14px",
                        backgroundColor: r.you ? "#EFF8FF" : "#FFFFFF",
                        border: `1px solid ${r.you ? "rgba(0,144,255,0.2)" : "rgba(0,0,0,0.07)"}`,
                        borderRadius: 10,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Funnel Sans', sans-serif",
                          fontWeight: r.you ? 700 : 500,
                          fontSize: 13.5,
                          color: r.you ? "#0070CC" : "#09090B",
                        }}
                      >
                        {r.name}
                      </span>
                      <span
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: 11.5,
                          color: "#71717A",
                          flex: 1,
                          textAlign: "center",
                        }}
                      >
                        {r.rate}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Funnel Sans', sans-serif",
                          fontWeight: 700,
                          fontSize: 14,
                          color: r.win ? "#16a34a" : "#dc2626",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {r.total}
                      </span>
                    </div>
                  ))}
                </div>
                <p
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontSize: 12,
                    color: "#71717A",
                    margin: 0,
                  }}
                >
                  Public US rate cards, Q2 2026. Storage and egress not included — request fees only. AWS: 1,000,000,000 / 1,000 × $0.005 = $5,000. Google: 1,000,000,000 / 10,000 × $0.05 = $5,000. Azure: 1,000,000,000 / 10,000 × $0.055 = $5,500.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#F9FAFB" }}>
          <div
            ref={featuresRef}
            className={`flex flex-col gap-10 items-center text-center w-full max-w-[1120px] mx-auto reveal${featuresInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3 items-center">
              <SectionLabel>Why it works</SectionLabel>
              <SectionHeading>
                Collection cost that scales with <span style={{ color: "#0090FF" }}>dataset size, not write rate.</span>
              </SectionHeading>
              <SectionSub maxWidth={560}>
                The only change is the endpoint. Write volume stops being a billing event.
              </SectionSub>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
              {FEATURES.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex flex-col gap-4 p-6 rounded-2xl border"
                  style={{
                    borderColor: "rgba(0,0,0,0.07)",
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0px 1px 3px rgba(0,0,0,0.04)",
                    textAlign: "left",
                  }}
                >
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
                    style={{ backgroundColor: "#EFF8FF" }}
                  >
                    <Icon size={18} color="#0090FF" />
                  </div>
                  <p
                    style={{
                      fontFamily: "'Funnel Sans', sans-serif",
                      fontWeight: 500,
                      fontSize: 15,
                      lineHeight: "1.3",
                      color: "#09090B",
                    }}
                  >
                    {title}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Funnel Sans', sans-serif",
                      fontWeight: 400,
                      fontSize: 13.5,
                      lineHeight: "1.6",
                      color: "#71717A",
                    }}
                  >
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="flex flex-col gap-10 items-center text-center w-full max-w-[1120px] mx-auto">
            <div className="flex flex-col gap-3 items-center">
              <SectionLabel>Pricing</SectionLabel>
              <SectionHeading>
                One rate. <span style={{ color: "#0090FF" }}>$4.99/TB/month.</span>
              </SectionHeading>
              <SectionSub maxWidth={520}>
                Storage. That is the whole bill. No per-PUT fees, no egress. Collection pipelines cost what they produce, not what they write.
              </SectionSub>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary">
                <span className="btn-primary-inner">Start for free</span>
              </a>
              <a href="/contact-sales" className="btn-secondary">
                Talk to an expert
              </a>
            </div>
            <p
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 400,
                fontSize: 13,
                color: "#71717A",
              }}
            >
              No credit card required · No per-PUT fees · Connects in minutes
            </p>
          </div>
        </section>

        {/* Dark CTA */}
        <section className="px-5 md:px-8 pb-24 md:pb-32 pt-0 w-full" style={{ backgroundColor: "#FFFFFF" }}>
          <div
            ref={ctaRef}
            className={`w-full max-w-[1120px] mx-auto reveal${ctaInView ? " in-view" : ""}`}
          >
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                background: "linear-gradient(135deg, #020D1A 0%, #0D2847 55%, #041525 100%)",
                borderRadius: 20,
                textAlign: "center",
              }}
              className="px-6 md:px-12 py-16 md:py-[104px]"
            >
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
                    '<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#fff" stroke-opacity="0.12" stroke-width="1"/></svg>'
                  )}")`,
                  backgroundSize: "60px 60px",
                  maskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, black 0%, transparent 80%)",
                  WebkitMaskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, black 0%, transparent 80%)",
                  pointerEvents: "none",
                }}
              />
              <div style={{ position: "relative" }}>
                <h2
                  className="text-[26px] md:text-[32px]"
                  style={{
                    fontFamily: "'Aspekta', sans-serif",
                    fontWeight: 500,
                    letterSpacing: "-0.025em",
                    lineHeight: "1.12",
                    color: "#FFFFFF",
                    marginBottom: 12,
                  }}
                >
                  Collect without the PUT counter.
                </h2>
                <p
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontWeight: 400,
                    fontSize: 17,
                    color: "rgba(255,255,255,0.60)",
                    marginBottom: 32,
                  }}
                >
                  Free 1 TB evaluation. Swap the endpoint in your existing scraping framework and watch the request line zero out.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary btn-primary-dark">
                    <span className="btn-primary-inner">Start for free</span>
                  </a>
                  <a href="/contact-sales" className="btn-secondary btn-secondary-dark">
                    Talk to an expert
                  </a>
                </div>
                <p
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontSize: 13,
                    color: "rgba(255,255,255,0.60)",
                    marginTop: 16,
                  }}
                >
                  No credit card required · No per-PUT fees · Connects in minutes
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
};

export default WebScrapingLandingPage;
