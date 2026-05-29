import { useState } from "react";
import LandingNavbar from "@/components/LandingNavbar";
import LandingFooter from "@/components/LandingFooter";
import { useInView } from "@/hooks/useInView";
import { useSeo } from "@/hooks/useSeo";
import { ArrowUpRight, Copy, Check, CheckCircle, ShieldCheck, Plug, TrendUp, CaretRight } from "@phosphor-icons/react";

// ─── Grid texture ──────────────────────────────────────────────────────────────
const GRID_SVG = encodeURIComponent(
  '<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#000" stroke-opacity="0.16" stroke-width="1"/></svg>'
);

// ─── Typography helpers ────────────────────────────────────────────────────────
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <span
    aria-hidden="true"
    style={{
      fontFamily: "'DM Mono', monospace",
      fontWeight: 500,
      fontSize: 11.5,
      letterSpacing: "0.08em",
      color: "#71717A",
      textTransform: "uppercase" as const,
    }}
  >
    {children}
  </span>
);

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2
    className="text-[24px] md:text-[34px]"
    style={{
      fontFamily: "'Aspekta', sans-serif",
      fontWeight: 500,
      lineHeight: "1.2",
      letterSpacing: "-0.02em",
      color: "#09090B",
      margin: 0,
    }}
  >
    {children}
  </h2>
);

const SectionSub = ({
  children,
  maxWidth = 560,
}: {
  children: React.ReactNode;
  maxWidth?: number;
}) => (
  <p
    className="text-[15px] md:text-[17px]"
    style={{
      fontFamily: "'Funnel Sans', sans-serif",
      fontWeight: 400,
      lineHeight: "1.65",
      color: "#71717A",
      maxWidth,
      margin: 0,
    }}
  >
    {children}
  </p>
);

// ─── Reusable pricing CTA block ────────────────────────────────────────────────
const PricingCtaBlock = ({ bg = "#FFFFFF" }: { bg?: string }) => (
  <section
    className="w-full"
    style={{ backgroundColor: bg, borderTop: "1px solid rgba(0,0,0,0.06)" }}
  >
    <div className="flex flex-col items-center gap-8 px-5 md:px-8 py-20 md:py-28 w-full max-w-[1120px] mx-auto text-center">
      {/* Big price */}
      <div className="flex flex-col gap-2 items-center">
        <span
          style={{
            fontFamily: "'Aspekta', sans-serif",
            fontWeight: 500,
            fontSize: "clamp(52px, 10vw, 80px)",
            lineHeight: 1,
            letterSpacing: "-0.03em",
            color: "#09090B",
          }}
        >
          $4.99
        </span>
        <span
          style={{
            fontFamily: "'Funnel Sans', sans-serif",
            fontWeight: 400,
            fontSize: 18,
            color: "#71717A",
          }}
        >
          / TB / month
        </span>
      </div>

      {/* What you don't pay */}
      <div className="flex flex-col gap-2 items-center">
        {[
          "No egress fees",
          "No per-request charges",
          "No minimum retention period",
          "No data retrieval tax",
        ].map((item) => (
          <span
            key={item}
            style={{
              fontFamily: "'Funnel Sans', sans-serif",
              fontWeight: 400,
              fontSize: 15,
              color: "#52525B",
            }}
          >
            — {item}
          </span>
        ))}
      </div>

      {/* Free tier */}
      <p
        style={{
          fontFamily: "'Funnel Sans', sans-serif",
          fontWeight: 400,
          fontSize: 14,
          color: "#71717A",
          maxWidth: 380,
        }}
      >
        Free tier: 1 TB storage + 2 TB bandwidth, 30 days. No credit card required.
      </p>

      <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary">
        <span className="btn-primary-inner">Start free</span>
      </a>
    </div>
  </section>
);

// ─── Comparison table data ─────────────────────────────────────────────────────
const COMPARISON_ROWS = [
  { item: "Storage",           aws: "$0.023/GB/month (~$23/TB)",      filone: "~$0.005/GB/month ($4.99/TB)" },
  { item: "PUT requests",      aws: "$0.005 per 1,000",     filone: "Included" },
  { item: "GET requests",      aws: "$0.0004 per 1,000",    filone: "Included" },
  { item: "Egress",            aws: "$0.09/GB",             filone: "$0" },
  { item: "Predictable bill",  aws: "No",                   filone: "Yes" },
];

// ─── Dev features data ─────────────────────────────────────────────────────────
const DEV_FEATURES = [
  {
    number: "01",
    title: "Flat pricing.",
    body: "$4.99/TB/month. No per-call charges. No egress. When your agent loops a thousand times overnight, the bill reflects storage — nothing else. You can read the pricing page once and stop thinking about it.",
    code: null,
  },
  {
    number: "02",
    title: "S3-compatible.",
    body: "Your existing code works. Change the endpoint. Keep your boto3 client, your AWS CLI config, your SDK calls. Bucket operations, multipart uploads, presigned URLs, lifecycle policies — all behave as expected. If it runs against S3 today, it runs against Fil One.",
    code: `import boto3

s3 = boto3.client(
    "s3",
    endpoint_url="https://eu-west-1.s3.fil.one",
    aws_access_key_id="YOUR_ACCESS_KEY",
    aws_secret_access_key="YOUR_SECRET_KEY",
)

s3.put_object(Bucket="agent-memory", Key="session/abc123", Body=payload)
result = s3.get_object(Bucket="agent-memory", Key="session/abc123")`,
  },
  {
    number: "03",
    title: "Durable and verifiable.",
    body: "Cryptographic integrity on every object. If your agent needs to confirm a stored artefact hasn't changed — pull the proof. No trust required, no black box.",
    code: null,
  },
  {
    number: "04",
    title: "No lock-in.",
    body: "Your data is in standard S3-compatible object storage. Move it out with the same tools you used to move it in. There is no proprietary format, no vendor-specific API, no migration tax. Low stakes means you can commit to Fil One for a project without committing to Fil One forever.",
    code: null,
  },
];

// ─── Agent code tabs ───────────────────────────────────────────────────────────
const AGENT_TABS = [
  {
    label: "Python",
    filename: "quickstart.py",
    code: `import boto3

s3 = boto3.client(
    "s3",
    endpoint_url="https://eu-west-1.s3.fil.one",
    aws_access_key_id="YOUR_ACCESS_KEY",
    aws_secret_access_key="YOUR_SECRET_KEY",
)

# Upload a file (create the bucket first in the dashboard)
s3.upload_file("my-file.txt", "my-sdk-bucket", "my-file.txt")

# Verify
response = s3.list_objects_v2(Bucket="my-sdk-bucket")
for obj in response.get("Contents", []):
    print(f"{obj['Key']}  ({obj['Size']} bytes)")`,
  },
  {
    label: "JavaScript",
    filename: "quickstart.js",
    code: `import { S3Client, PutObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { readFileSync } from "fs";

const client = new S3Client({
  endpoint: "https://eu-west-1.s3.fil.one",
  region: "eu-west-1",
  forcePathStyle: true,
  credentials: {
    accessKeyId: "YOUR_ACCESS_KEY",
    secretAccessKey: "YOUR_SECRET_KEY",
  },
});

// Upload a file (create the bucket first in the dashboard)
await client.send(new PutObjectCommand({
  Bucket: "my-sdk-bucket",
  Key: "my-file.txt",
  Body: readFileSync("my-file.txt"),
}));

// Verify
const { Contents } = await client.send(
  new ListObjectsV2Command({ Bucket: "my-sdk-bucket" })
);
Contents?.forEach((obj) => console.log(obj.Key, obj.Size));`,
  },
  {
    label: "Go",
    filename: "main.go",
    code: `package main

import (
    "context"
    "fmt"
    "os"
    "strings"
    "github.com/aws/aws-sdk-go-v2/aws"
    "github.com/aws/aws-sdk-go-v2/credentials"
    "github.com/aws/aws-sdk-go-v2/service/s3"
)

func main() {
    client := s3.New(s3.Options{
        BaseEndpoint: aws.String("https://eu-west-1.s3.fil.one"),
        Region:       "eu-west-1",
        UsePathStyle: true,
        Credentials: credentials.NewStaticCredentialsProvider(
            os.Getenv("FIL_ACCESS_KEY"),
            os.Getenv("FIL_SECRET_KEY"),
            "",
        ),
    })
    ctx := context.Background()

    // Upload (create the bucket first in the dashboard)
    client.PutObject(ctx, &s3.PutObjectInput{
        Bucket: aws.String("my-sdk-bucket"),
        Key:    aws.String("hello.txt"),
        Body:   strings.NewReader("Hello from Go!"),
    })

    // List
    out, _ := client.ListObjectsV2(ctx, &s3.ListObjectsV2Input{
        Bucket: aws.String("my-sdk-bucket"),
    })
    for _, obj := range out.Contents {
        fmt.Printf("%s (%d bytes)\\n", *obj.Key, *obj.Size)
    }
}`,
  },
];

// ─── Cost math data ────────────────────────────────────────────────────────────
const COST_ROWS = [
  { item: "Storage (100 GB)",       aws: "$2.30",  filone: "$0.50" },
  { item: "PUT requests (500K)",    aws: "$2.50",  filone: "$0" },
  { item: "GET requests (500K)",    aws: "$0.20",  filone: "$0" },
  { item: "Egress (100 GB)",        aws: "$9.00",  filone: "$0" },
  { item: "Total",                  aws: "$14.00", filone: "$0.50", bold: true },
];

// ─── Use cases data ────────────────────────────────────────────────────────────
const USE_CASES = [
  {
    icon: ShieldCheck,
    title: "Persistent agent memory and artifacts",
    description: "Your agents write session state, conversation history, checkpoints, and generated outputs straight to S3 buckets, and read them back on the next run. Flat pricing means the loop doesn't cost you — thousands of small reads and writes price the same as a handful. Keep everything your agents produce instead of deleting it to stay in budget. Plain S3: works today with boto3, the AWS CLI, or any SDK.",
  },
  {
    icon: Plug,
    title: "A storage tool your agent can call directly",
    description: "Give your agent read/write/list access to your buckets without hand-writing the S3 glue. The Agent Toolkit exposes storage as a native tool you drop into Claude Desktop, Cursor, or your framework via MCP, so the agent reaches storage through a clean interface, and the data stays in buckets you own, not a third-party SaaS.",
    badge: "Agent Toolkit coming soon",
    waitlist: true,
  },
  {
    icon: TrendUp,
    title: "A queryable knowledge base over your buckets",
    description: "Point a retrieval agent at a bucket and query it in plain language. Files index as they land and semantic search runs on your own model keys. Store the whole corpus at volume — flat pricing makes a large document set a storage cost, not a per-query tax.",
    badge: "RAG Coming soon",
    waitlist: true,
  },
];

// ─── Syntax highlighter ────────────────────────────────────────────────────────
function renderCode(code: string, filename: string): React.ReactNode {
  const lang = filename.endsWith(".go") ? "go" : filename.endsWith(".js") ? "js" : "py";
  const C = { comment: "#6A9955", string: "#A31515", keyword: "#0070CC", plain: "#09090B" };
  const kw = {
    py: "import|from|for|in|if|else|elif|def|return|True|False|None|and|or|not|with|as|class|await|print",
    js: "import|from|const|let|var|function|return|await|async|new|if|else|for|of|export|default|true|false|null",
    go: "package|import|func|var|const|type|struct|for|if|else|return|range|nil|true|false|string|int|bool|main",
  }[lang];
  const commentPat = lang === "py" ? "#[^\n]*" : "//[^\n]*";
  const regex = new RegExp(`(${commentPat})|(\"[^\"\\n]*\"|'[^'\\n]*')|(\\b(?:${kw})\\b)`, "g");
  const parts: React.ReactNode[] = [];
  let last = 0, key = 0, m: RegExpExecArray | null;
  while ((m = regex.exec(code)) !== null) {
    if (m.index > last) parts.push(code.slice(last, m.index));
    if (m[1]) parts.push(<span key={key++} style={{ color: C.comment }}>{m[1]}</span>);
    else if (m[2]) parts.push(<span key={key++} style={{ color: C.string }}>{m[2]}</span>);
    else if (m[3]) parts.push(<span key={key++} style={{ color: C.keyword }}>{m[3]}</span>);
    last = regex.lastIndex;
  }
  if (last < code.length) parts.push(code.slice(last));
  return <>{parts}</>;
}

// ─── Page ──────────────────────────────────────────────────────────────────────
const AgentsLandingPage = () => {
  useSeo({
    title: "Fil One for AI Agents — Flat storage. No egress. No billing surprises.",
    description:
      "S3-compatible object storage at $4.99/TB flat. No egress fees, no per-request charges. Built for agentic workloads that read and write constantly. Start free — 1 TB included.",
    canonical: "https://filone.io/lp/agents",
  });

  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(AGENT_TABS[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const { ref: compRef,     inView: compInView     } = useInView({ threshold: 0.04 });
  const { ref: devRef,      inView: devInView      } = useInView({ threshold: 0.04 });
  const { ref: useCasesRef, inView: useCasesInView } = useInView({ threshold: 0.04 });
  const { ref: learnRef,    inView: learnInView    } = useInView({ threshold: 0.04 });

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#FFFFFF" }}>
      <LandingNavbar />

      <main id="main-content">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="relative isolate pt-[58px]" style={{ backgroundColor: "#FFFFFF" }}>
          {/* Blue radial glow */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none -z-10"
            style={{
              background:
                "radial-gradient(ellipse 55% 40% at 50% 0%, rgba(0,144,255,0.13) 0%, transparent 70%)",
            }}
          />
          {/* Grid texture */}
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
            {/* Badge */}
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
                For developers building with AI agents
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-[30px] sm:text-[38px] md:text-[52px] hero-fade-2"
              style={{
                fontFamily: "'Aspekta', sans-serif",
                fontWeight: 500,
                lineHeight: "1.1",
                letterSpacing: "-0.025em",
                color: "#09090B",
                textAlign: "center",
                maxWidth: 600,
                margin: 0,
              }}
            >
              Agents need space to run.{" "}
              <span style={{ color: "#0090FF" }}>
                Fil One won't let them run up your bill.
              </span>
            </h1>

            {/* Sub */}
            <p
              className="text-[15px] md:text-[17px] hero-fade-2"
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 400,
                lineHeight: "1.65",
                color: "#71717A",
                textAlign: "center",
                maxWidth: 480,
                margin: 0,
              }}
            >
              S3-compatible object storage at{" "}
              <span style={{ color: "#0090FF", fontWeight: 600 }}>$4.99/TB per month</span>{" "}flat.<br />No egress. No per-request fees.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2 hero-fade-3">
              <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary">
                <span className="btn-primary-inner">Start for free</span>
              </a>
              <a
                href="https://docs.fil.one"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-1"
              >
                Read the docs
                <ArrowUpRight size={13} style={{ color: "#A1A1AA", marginTop: 1 }} aria-hidden="true" />
              </a>
            </div>

            {/* Trust line */}
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
              No credit card required · 30 days free · Connects in minutes
            </p>
          </div>
        </section>

        {/* ── Comparison ───────────────────────────────────────────────────── */}
        <section
          className="px-5 md:px-8 py-24 md:py-32 w-full"
          style={{ backgroundColor: "#F9FAFB" }}
        >
          <div
            ref={compRef}
            className={`flex flex-col gap-10 w-full max-w-[1120px] mx-auto reveal${compInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-4 max-w-[640px]">
              <SectionLabel>The problem</SectionLabel>
              <SectionHeading>Standard storage keeps the meter running while your agent works</SectionHeading>
              <div className="flex flex-col gap-4" style={{ marginTop: 4 }}>
                <SectionSub maxWidth={640}>
                  Agents behave differently from any workload hyperscalers were designed for.
                  They fetch, write, retry, and fetch again, thousands of times for a single
                  task. With traditional S3 pricing, every operation has a cost. The bill
                  compounds because the work compounds.
                </SectionSub>
                <SectionSub maxWidth={640}>
                  Most teams end up deleting the data their agents generate because it costs
                  too much to keep. The valuable context, history, and outputs your agent
                  built up last month, gone.
                </SectionSub>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 600, fontSize: 16, lineHeight: 1.65, color: "#09090B", margin: 0 }}>
                  Fil One changes the model. Let your agents experiment and keep what they generate.
                </p>
              </div>
            </div>

            {/* Comparison table */}
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  minWidth: 520,
                  borderCollapse: "collapse",
                  fontFamily: "'Funnel Sans', sans-serif",
                }}
              >
                <thead>
                  <tr>
                    {[
                      { label: "Cost item", align: "left" },
                      { label: "AWS S3", align: "right" },
                      { label: "Fil One", align: "right", blue: true },
                    ].map(({ label, align, blue }) => (
                      <th
                        key={label}
                        style={{
                          textAlign: align as "left" | "right",
                          padding: "11px 16px",
                          fontSize: 11,
                          fontWeight: 500,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          color: blue ? "#0070CC" : "#71717A",
                          borderBottom: "1px solid rgba(0,0,0,0.08)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row) => (
                    <tr key={row.item} style={{ backgroundColor: "transparent" }}>
                      <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: 14, color: "#52525B" }}>
                        {row.item}
                      </td>
                      <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: 14, color: "#71717A", textAlign: "right" }}>
                        {row.aws}
                      </td>
                      <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: 14, fontWeight: 600, color: "#09090B", textAlign: "right" }}>
                        {row.item === "Storage" ? (
                          <span style={{ color: "#0070CC", fontWeight: 600 }}>{row.filone}</span>
                        ) : row.filone}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cost math callout */}
            <div
              style={{
                background: "linear-gradient(135deg, #EBF5FF 0%, #F0F7FF 100%)",
                border: "1px solid rgba(0,144,255,0.12)",
                borderRadius: 14,
                padding: "32px 36px",
                display: "flex",
                flexDirection: "column",
                gap: 28,
                width: "100%",
              }}
            >
              {/* Label */}
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontWeight: 500,
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#71717A",
                }}
              >
                <span style={{ color: "#0090FF" }}>2M</span> operations (PUT + GET mix) · <span style={{ color: "#0090FF" }}>1 TB</span> egress · <span style={{ color: "#0090FF" }}>1 TB</span> storage
              </span>

              {/* Comparison row */}
              <div style={{ display: "flex", alignItems: "stretch" }}>
                {/* AWS column */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontWeight: 500,
                      fontSize: 10.5,
                      letterSpacing: "0.07em",
                      textTransform: "uppercase",
                      color: "#A1A1AA",
                    }}
                  >
                    AWS S3
                  </span>
                  <span
                    style={{
                      fontFamily: "'Aspekta', sans-serif",
                      fontWeight: 500,
                      fontSize: 44,
                      lineHeight: 1,
                      letterSpacing: "-0.03em",
                      color: "#09090B",
                    }}
                  >
                    ~$118
                  </span>
                  <span
                    style={{
                      fontFamily: "'Funnel Sans', sans-serif",
                      fontSize: 13,
                      color: "#71717A",
                      lineHeight: 1.5,
                    }}
                  >
                    storage + requests + egress
                  </span>
                </div>

                {/* Divider */}
                <div
                  style={{
                    width: 1,
                    backgroundColor: "rgba(0,144,255,0.15)",
                    alignSelf: "stretch",
                    flexShrink: 0,
                    margin: "0 32px",
                  }}
                />

                {/* Fil One column */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontWeight: 500,
                      fontSize: 10.5,
                      letterSpacing: "0.07em",
                      textTransform: "uppercase",
                      color: "#0090FF",
                    }}
                  >
                    Fil One
                  </span>
                  <span
                    style={{
                      fontFamily: "'Aspekta', sans-serif",
                      fontWeight: 500,
                      fontSize: 44,
                      lineHeight: 1,
                      letterSpacing: "-0.03em",
                      color: "#0070CC",
                    }}
                  >
                    $4.99
                  </span>
                  <span
                    style={{
                      fontFamily: "'Funnel Sans', sans-serif",
                      fontSize: 13,
                      color: "#71717A",
                      lineHeight: 1.5,
                    }}
                  >
                    storage only — requests and egress included
                  </span>
                </div>

                {/* CTA — same row, right edge, vertically centered */}
                <div style={{ display: "flex", alignItems: "flex-end", marginLeft: "auto", paddingLeft: 40 }}>
                  <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary">
                    <span className="btn-primary-inner">Start for free</span>
                  </a>
                </div>
              </div>
            </div>

            <p style={{
              fontFamily: "'Funnel Sans', sans-serif",
              fontWeight: 400,
              fontSize: 12,
              color: "#52525B",
              marginTop: 8,
            }}>
              AWS S3 Standard pricing as of May 2026, us-east-1. 1 TB = 1,000 GB (decimal). Actual AWS costs vary by tier, region, and volume discounts.
            </p>

          </div>
        </section>

        {/* ── Developer & agent first ───────────────────────────────────────── */}
        <section
          className="px-5 md:px-8 py-24 md:py-32 w-full"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <div
            ref={devRef}
            className={`flex flex-col gap-12 w-full max-w-[1120px] mx-auto reveal${devInView ? " in-view" : ""}`}
          >
            {/* Header */}
            <div className="flex flex-col gap-4 max-w-[600px]">
              <SectionLabel>Developer and agent first</SectionLabel>
              <SectionHeading>Your existing S3 code works</SectionHeading>
              <SectionSub maxWidth={560}>
                Just swap the endpoint, and your agents are running on Fil One. Your boto3, AWS CLI,
                and SDK calls work as-is, and buckets behave like you expect. So you can start
                running in minutes.
              </SectionSub>
            </div>

            {/* Tabbed code block */}
            <div
              className="w-full rounded-2xl overflow-hidden border"
              style={{ borderColor: "rgba(0,0,0,0.09)", backgroundColor: "#FFFFFF" }}
            >
              {/* Header: file tabs + copy */}
              <div
                className="flex items-center justify-between border-b px-4"
                style={{ borderColor: "rgba(0,0,0,0.07)", backgroundColor: "#FAFAFA", minHeight: 44 }}
              >
                {/* File name tabs */}
                <div className="flex items-center gap-1.5">
                  {AGENT_TABS.map((tab, i) => (
                    <button
                      key={tab.label}
                      onClick={() => setActiveTab(i)}
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontWeight: 400,
                        fontSize: 12,
                        color: activeTab === i ? "#09090B" : "#A1A1AA",
                        backgroundColor: activeTab === i ? "#FFFFFF" : "transparent",
                        border: activeTab === i ? "1px solid rgba(0,0,0,0.10)" : "1px solid transparent",
                        borderRadius: 6,
                        padding: "3px 10px",
                        cursor: "pointer",
                        transition: "all 150ms ease",
                      }}
                    >
                      {tab.filename}
                    </button>
                  ))}
                </div>

                {/* Copy button */}
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5"
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontSize: 12.5,
                    fontWeight: 400,
                    color: copied ? "#0090FF" : "#A1A1AA",
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: "4px 6px",
                    transition: "color 150ms ease",
                  }}
                >
                  {copied
                    ? <><Check size={13} /><span>Copied</span></>
                    : <><Copy size={13} /><span>Copy</span></>
                  }
                </button>
              </div>

              {/* Code area with line numbers */}
              <div className="flex overflow-x-auto" style={{ backgroundColor: "#FFFFFF" }}>
                {/* Line numbers */}
                <div
                  aria-hidden="true"
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 13,
                    lineHeight: "1.75",
                    color: "#D4D4D8",
                    padding: "24px 12px 24px 20px",
                    textAlign: "right",
                    userSelect: "none",
                    flexShrink: 0,
                  }}
                >
                  {AGENT_TABS[activeTab].code.split("\n").map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>

                {/* Code */}
                <pre
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 13,
                    lineHeight: "1.75",
                    color: "#09090B",
                    margin: 0,
                    padding: "24px 24px 24px 16px",
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  <code>{renderCode(AGENT_TABS[activeTab].code, AGENT_TABS[activeTab].filename)}</code>
                </pre>
              </div>
            </div>

            {/* Docs link */}
            <a
              href="https://docs.fil.one/quickstart"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1"
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 500,
                fontSize: 14,
                color: "#0090FF",
                textDecoration: "none",
                width: "fit-content",
              }}
            >
              Full quickstart guide
              <ArrowUpRight size={14} style={{ marginTop: 1 }} />
            </a>
          </div>
        </section>

        {/* ── Value props ──────────────────────────────────────────────────── */}
        <section
          className="px-5 md:px-8 py-24 md:py-32 w-full"
          style={{ backgroundColor: "#F9FAFB" }}
        >
          <div className="flex flex-col gap-12 w-full max-w-[1120px] mx-auto">
            <div className="flex flex-col gap-3 max-w-[520px]">
              <SectionLabel>Why Fil One</SectionLabel>
              <SectionHeading>Built differently, priced differently</SectionHeading>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 w-full">
              {[
                {
                  title: "Know what you'll pay upfront",
                  body: "No per-call charges. No egress. You can read the pricing page once and stop thinking about it. Run your agents as hard as you need.",
                },
                {
                  title: "Go all in without getting locked in",
                  body: "No proprietary format, no vendor-specific API, no migration tax. Complete freedom to move your data out with the same tools you used to move it in.",
                },
                {
                  title: "Storage your agents can rely on",
                  body: "Distributed and redundant by design. Your agents retrieve exactly what you stored. Audit-ready visibility whenever you need it.",
                },
                {
                  title: "Independent infrastructure by design",
                  body: "Fil One routes your data across a global network of verified data centres, each monitored under SLA.",
                },
              ].map(({ title, body }) => (
                <div key={title} className="flex flex-col gap-3">
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 600, fontSize: 15, lineHeight: "1.35", color: "#09090B", margin: 0 }}>
                    {title}
                  </p>
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 15, lineHeight: "1.7", color: "#71717A", margin: 0 }}>
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Use cases ────────────────────────────────────────────────────── */}
        <section
          className="px-5 md:px-8 py-24 md:py-32 w-full"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <div
            ref={useCasesRef}
            className={`flex flex-col gap-12 w-full max-w-[1120px] mx-auto reveal${useCasesInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-4 max-w-[560px]">
              <SectionLabel>Use cases</SectionLabel>
              <SectionHeading>What agents need from storage</SectionHeading>
              <SectionSub>
                Persistent workspaces, memory at scale, and a complete audit trail. Flat pricing across all of it.
              </SectionSub>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 reveal-group">
              {USE_CASES.map(({ icon: Icon, title, description, badge, waitlist }) => (
                <div
                  key={title}
                  className={`flex flex-col gap-5 p-8 rounded-2xl border reveal${useCasesInView ? " in-view" : ""}`}
                  style={{
                    borderColor: "rgba(0,0,0,0.07)",
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0px 1px 3px rgba(0,0,0,0.04), 0px 4px 16px rgba(0,0,0,0.04)",
                  }}
                >
                  {/* Icon row + optional badge */}
                  <div className="flex items-center justify-between gap-3">
                    <div
                      className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
                      style={{ backgroundColor: "#EFF8FF" }}
                    >
                      <Icon size={18} color="#0090FF" />
                    </div>
                    {badge && (
                      <span style={{
                        fontFamily: "'DM Mono', monospace",
                        fontWeight: 500,
                        fontSize: 10,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase" as const,
                        color: "#71717A",
                        backgroundColor: "#F4F4F5",
                        border: "1px solid rgba(0,0,0,0.08)",
                        borderRadius: 9999,
                        padding: "4px 9px",
                        whiteSpace: "nowrap" as const,
                      }}>
                        {badge}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 15, lineHeight: "1.3", color: "#09090B", margin: 0 }}>
                      {title}
                    </p>
                    <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: "1.6", color: "#71717A", margin: 0 }}>
                      {description}
                    </p>
                  </div>
                  {waitlist && (
                    <a
                      href="/waitlist"
                      className="flex items-center gap-1"
                      style={{
                        fontFamily: "'Funnel Sans', sans-serif",
                        fontWeight: 500,
                        fontSize: 14,
                        color: "#0090FF",
                        textDecoration: "none",
                        alignSelf: "flex-start",
                        marginTop: 4,
                      }}
                    >
                      Join the waitlist
                      <CaretRight size={14} style={{ marginTop: 1 }} />
                    </a>
                  )}
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ── Pricing CTA ──────────────────────────────────────────────────── */}
        <section
          className="px-5 md:px-8 py-24 md:py-32 w-full"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <div className="w-full max-w-[1120px] mx-auto">
          <div className="flex flex-col items-center gap-8 text-center rounded-3xl px-8 py-16 md:py-20 max-w-[560px] mx-auto w-full"
            style={{
              background: "linear-gradient(135deg, #EBF5FF 0%, #EFF8FF 100%)",
              border: "1px solid rgba(0,144,255,0.12)",
            }}
          >
            {/* Big price */}
            <div className="flex flex-col gap-2 items-center">
              <SectionLabel>Pricing</SectionLabel>
              <span
                style={{
                  fontFamily: "'Aspekta', sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(52px, 10vw, 80px)",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  color: "#0070CC",
                }}
              >
                $4.99
              </span>
              <span
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: 18,
                  color: "#71717A",
                }}
              >
                / TB / month
              </span>
            </div>

            {/* What you don't pay */}
            <div className="flex flex-col gap-2 items-center">
              {[
                "No egress fees",
                "No per-request charges",
                "No minimum retention period",
                "No data retrieval tax",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2"
                >
                  <Check size={14} weight="bold" color="#0090FF" style={{ flexShrink: 0 }} />
                  <span
                    style={{
                      fontFamily: "'Funnel Sans', sans-serif",
                      fontWeight: 400,
                      fontSize: 15,
                      color: "#52525B",
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Free tier */}
            <p
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 400,
                fontSize: 14,
                color: "#71717A",
                maxWidth: 380,
                margin: 0,
              }}
            >
              Free trial: 1 TB storage + 2 TB bandwidth, 30 days.<br />No credit card required.
            </p>

            <a href="https://app.fil.one/login?screen_hint=signup" className="btn-primary">
              <span className="btn-primary-inner">Start for free</span>
            </a>
          </div>
          </div>
        </section>

        {/* ── Learn more ───────────────────────────────────────────────────── */}
        <section
          className="px-5 md:px-8 py-24 md:py-32 w-full"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <div
            ref={learnRef}
            className={`flex flex-col gap-10 w-full max-w-[1120px] mx-auto reveal${learnInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-4 items-center text-center">
              <SectionLabel>Next steps</SectionLabel>
              <SectionHeading>Ready to get the most out of your agent storage?</SectionHeading>
              <SectionSub maxWidth={380}>
                Talk to us about your use case, or head to the docs and start building today.
              </SectionSub>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Talk to a person */}
              <a
                href="/contact-sales"
                className="group flex flex-col gap-4 p-7 rounded-2xl border"
                style={{
                  borderColor: "rgba(0,0,0,0.07)",
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                  textDecoration: "none",
                }}
              >
                <div className="flex items-center justify-between">
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontWeight: 500,
                      fontSize: 10.5,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#A1A1AA",
                    }}
                  >
                    Talk to a person
                  </span>
                  <ArrowUpRight size={16} color="#A1A1AA" />
                </div>
                <p
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: 18,
                    color: "#09090B",
                    margin: 0,
                    lineHeight: "1.3",
                  }}
                >
                  Get in touch
                </p>
                <p
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontWeight: 400,
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: "#71717A",
                    margin: 0,
                  }}
                >
                  If you're building something at scale and want to talk through the fit before committing.
                </p>
              </a>

              {/* Docs */}
              <a
                href="https://docs.fil.one"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-4 p-7 rounded-2xl border"
                style={{
                  borderColor: "rgba(0,0,0,0.07)",
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                  textDecoration: "none",
                }}
              >
                <div className="flex items-center justify-between">
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontWeight: 500,
                      fontSize: 10.5,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#A1A1AA",
                    }}
                  >
                    Documentation
                  </span>
                  <ArrowUpRight size={16} color="#A1A1AA" />
                </div>
                <p
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: 18,
                    color: "#09090B",
                    margin: 0,
                    lineHeight: "1.3",
                  }}
                >
                  Docs
                </p>
                <p
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontWeight: 400,
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: "#71717A",
                    margin: 0,
                  }}
                >
                  Quickstart, S3 compatibility reference, SDK examples, and API docs.
                </p>
              </a>
            </div>

          </div>
        </section>

      </main>

      <LandingFooter />
    </div>
  );
};

export default AgentsLandingPage;
