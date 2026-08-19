import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useInView } from "@/hooks/useInView";
import { useSeo } from "@/hooks/useSeo";
import { PRICE_DISPLAY, PRICE_PER_TB_SHORT } from "@/lib/pricing";
import { ArrowUpRight, ShieldCheck, Plug, TrendUp, CurrencyDollar, LockOpen, HardDrives } from "@phosphor-icons/react";
import Hero from "@/components/Hero";
import { SectionLabel, SectionHeading, SectionSub } from "@/components/LandingPrimitives";
import { Button } from "@/components/Button";
import Pill from "@/components/Pill";
import IconTile from "@/components/IconTile";
import TextLink from "@/components/TextLink";
import FeatureList from "@/components/FeatureList";
import CodeBlock, { type CodeSnippet } from "@/components/CodeBlock";
import Table from "@/components/Table";

const DOCS_URL = "https://docs.fil.one";

// ─── Comparison table data ─────────────────────────────────────────────────────
const COMPARISON_ROWS = [
  { item: "Storage",           aws: "$0.023/GB/month (~$23/TB)", filone: `~$0.005/GB/month (${PRICE_PER_TB_SHORT})` },
  { item: "PUT requests",      aws: "$0.005 per 1,000",          filone: "Included" },
  { item: "GET requests",      aws: "$0.0004 per 1,000",         filone: "Included" },
  { item: "Egress",            aws: "$0.09/GB",                  filone: "$0" },
  { item: "Predictable bill",  aws: "No",                        filone: "Yes" },
];

// ─── Agent code tabs ───────────────────────────────────────────────────────────
const AGENT_SNIPPETS: CodeSnippet[] = [
  {
    lang: "python",
    label: "quickstart.py",
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
    lang: "typescript",
    label: "quickstart.js",
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
    lang: "go",
    label: "main.go",
    code: `package main

import (
import { signupUrl } from "@/lib/console-url";
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

// ─── Value props data ──────────────────────────────────────────────────────────
const VALUE_PROPS = [
  {
    icon: CurrencyDollar,
    title: "Know what you'll pay upfront",
    body: "No per-call charges. No egress. You can read the pricing page once and stop thinking about it. Run your agents as hard as you need.",
  },
  {
    icon: LockOpen,
    title: "Go all in without getting locked in",
    body: "With no proprietary format, vendor-specific API, or migration tax, you can move your data and workloads freely. No surrendering your agents to a model you can't get out of.",
  },
  {
    icon: HardDrives,
    title: "Storage your agents can rely on",
    body: "S3-compatible object storage in US and EU regions, with the same durability and availability guarantees you'd expect from S3 — no egress fees when your agents need to read it all back.",
  },
];

// ─── Use cases data ────────────────────────────────────────────────────────────
const USE_CASES = [
  {
    icon: ShieldCheck,
    title: "Persistent agent memory and artifacts",
    description: "Your agents write session state, conversation history, checkpoints, and generated outputs straight to S3 buckets, and read them back on the next run. Flat pricing means the loop doesn't cost you: thousands of small reads and writes price the same as a handful. Keep everything your agents produce instead of deleting it to stay in budget. Plain S3: works today with boto3, the AWS CLI, or any SDK.",
    cta: { label: "Start now", href: signupUrl() },
  },
  {
    icon: Plug,
    title: "A storage tool your agent can call directly",
    description: "Give your agent read/write/list access to your buckets without hand-writing the S3 glue. The Agent Toolkit exposes storage as a native tool you drop into Claude Desktop, Cursor, or your framework via MCP, so the agent reaches storage through a clean interface, and the data stays in buckets you own, not a third-party SaaS.",
    badge: "Agent Toolkit coming soon",
    waitlist: "/waitlist/ai-agent-toolkit",
  },
  {
    icon: TrendUp,
    title: "A queryable knowledge base over your buckets",
    description: "Point a retrieval agent at a bucket and query it in plain language. Files index as they land; semantic search runs on your own model keys. Store the whole corpus at volume — flat pricing makes a large document set a storage cost, not a per-query tax.",
    badge: "RAG Coming soon",
    waitlist: "/waitlist/bucket-intelligence",
  },
];

// ─── Next steps data ───────────────────────────────────────────────────────────
const NEXT_STEPS = [
  {
    href: "/contact-sales",
    label: "Talk to a person",
    title: "Get in touch",
    body: "If you're building something at scale and want to talk through the fit before committing.",
    external: false,
  },
  {
    href: "https://docs.fil.one",
    label: "Documentation",
    title: "Docs",
    body: "Quickstart, S3 compatibility reference, SDK examples, and API docs.",
    external: true,
  },
];

// ─── Page ──────────────────────────────────────────────────────────────────────
const AgentsLandingPage = () => {
  useSeo({
    title: "Fil One for AI Agents · Flat storage. No egress. No billing surprises.",
    description:
      `S3-compatible object storage at ${PRICE_PER_TB_SHORT} flat. No egress fees, no per-request charges. Built for agentic workloads that read and write constantly. Start free — 1 TB included.`,
    canonical: "https://www.fil.one/lp/agents",
  });

  const { ref: compRef,     inView: compInView     } = useInView({ threshold: 0.04 });
  const { ref: devRef,      inView: devInView      } = useInView({ threshold: 0.04 });
  const { ref: useCasesRef, inView: useCasesInView } = useInView({ threshold: 0.04 });
  const { ref: learnRef,    inView: learnInView    } = useInView({ threshold: 0.04 });

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <PlatformNavbar />

      <main id="main-content">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <Hero
          glow
          grid
          titleSize="text-[28px] sm:text-[36px] md:text-[48px]"
          titleMaxWidth={640}
          descriptionMaxWidth={400}
          contentClassName="pb-20 md:pb-28"
          badge={
            <div className="inline-flex items-center rounded-full border border-brand/20 bg-brand-50 px-3.5 py-2.5 text-center max-w-[90vw]">
              <span className="whitespace-nowrap font-sans text-[13.5px] font-medium leading-none text-brand-600">
                For developers building with AI agents
              </span>
            </div>
          }
          title={
            <>
              Agents need space to run.
              <br />
              <span className="text-brand-500">Fil One doesn't run up your bill.</span>
            </>
          }
          description={
            <>
              S3-compatible object storage built for AI first.
              <br />
              No egress. No per-request fees.
            </>
          }
          ctas={[
            { label: "Start for free", href: signupUrl(), variant: "primary" },
            { label: "Read the docs", href: DOCS_URL, variant: "secondary", target: "_blank", rel: "noopener noreferrer" },
          ]}
          tagline="No credit card required · 30 days free · Connects in minutes"
        >
          {/* Price callout */}
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-display font-medium text-[clamp(28px,5vw,38px)] leading-none tracking-[-0.03em] text-zinc-950">
              {PRICE_DISPLAY}
            </span>
            <span className="pb-[3px] font-sans text-[16px] font-normal text-zinc-500">per TB per month</span>
          </div>
        </Hero>

        {/* ── Comparison ───────────────────────────────────────────────────── */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full bg-zinc-50 border-y border-zinc-100">
          <div
            ref={compRef}
            className={`flex flex-col gap-10 w-full max-w-container mx-auto reveal${compInView ? " in-view" : ""}`}
          >
            {/* Two-column: text left, cost callout right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
              {/* Left: text */}
              <div className="flex flex-col gap-4">
                <SectionLabel>The problem</SectionLabel>
                <SectionHeading>Standard storage keeps the meter running while your agent works</SectionHeading>
                <div className="flex flex-col gap-4 mt-1">
                  <SectionSub>
                    Agents behave differently from any workload hyperscalers were designed for.
                    They fetch, write, retry, and fetch again, thousands of times for a single task.
                    With traditional S3 pricing, every operation has a cost. The bill compounds because the work compounds.
                  </SectionSub>
                  <SectionSub>
                    Most teams end up deleting the data their agents generate because it costs too much to keep.
                    The valuable context, history, and outputs your agent built up last month, gone.
                  </SectionSub>
                </div>
              </div>

              {/* Right: cost callout card */}
              <div className="overflow-hidden rounded-2xl border border-brand/20 bg-brand-50">
                {/* Scenario label row */}
                <div className="border-b border-brand/10 px-6 py-4">
                  <span className="font-mono font-medium text-[10.5px] uppercase tracking-[0.08em] text-zinc-600">
                    <span className="text-brand-600">2M</span> ops (PUT + GET) ·{" "}
                    <span className="text-brand-600">1 TB</span> egress ·{" "}
                    <span className="text-brand-600">1 TB</span> storage
                  </span>
                </div>

                {/* Price columns */}
                <div className="grid grid-cols-2">
                  <div className="flex flex-col gap-1.5 border-r border-brand/10 p-6">
                    <span className="font-mono font-medium text-[10px] uppercase tracking-[0.07em] text-zinc-600">
                      AWS S3
                    </span>
                    <span className="font-display font-medium text-[36px] leading-[1.05] tracking-[-0.03em] text-zinc-600">
                      ~$118
                    </span>
                    <span className="mt-0.5 font-sans text-[12.5px] leading-[1.5] text-zinc-600">
                      storage + requests + egress
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5 p-6">
                    <span className="font-mono font-medium text-[10px] uppercase tracking-[0.07em] text-brand-600">
                      Fil One
                    </span>
                    <span className="font-display font-medium text-[36px] leading-[1.05] tracking-[-0.03em] text-brand-600">
                      {PRICE_DISPLAY}
                    </span>
                    <span className="mt-0.5 font-sans text-[12.5px] leading-[1.5] text-zinc-600">
                      storage only — requests and egress included
                    </span>
                  </div>
                </div>

                {/* CTA row — aligned to Fil One column */}
                <div className="grid grid-cols-2 border-t border-brand/10">
                  <div className="border-r border-brand/10" />
                  <div className="p-6">
                    <Button variant="primary" href={signupUrl()}>
                      Start for free
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Full-width callout sentence */}
            <p className="m-0 font-sans font-semibold text-[16px] leading-[1.65] text-zinc-950">
              Fil One changes the model. Let your agents experiment and keep what they generate.
            </p>

            {/* Comparison table */}
            <Table minWidth={520}>
              <Table.Head>
                <Table.Row>
                  <Table.HeadCell>Cost item</Table.HeadCell>
                  <Table.HeadCell className="text-right">AWS S3</Table.HeadCell>
                  <Table.HeadCell className="text-right text-brand-600">Fil One</Table.HeadCell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {COMPARISON_ROWS.map((row) => (
                  <Table.Row key={row.item}>
                    <Table.Cell className="text-[14px] text-zinc-600">{row.item}</Table.Cell>
                    <Table.Cell className="text-right text-[14px] text-zinc-500">{row.aws}</Table.Cell>
                    <Table.Cell
                      className={`text-right text-[14px] font-semibold ${
                        row.item === "Storage" ? "text-brand-600" : "text-zinc-950"
                      }`}
                    >
                      {row.filone}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>

            <p className="mt-2 font-sans text-[12px] font-normal text-zinc-500">
              AWS S3 Standard pricing as of May 2026, us-east-1. 1 TB = 1,000 GB (decimal). Actual AWS costs vary by tier, region, and volume discounts.
            </p>
          </div>
        </section>

        {/* ── Developer & agent first ───────────────────────────────────────── */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full bg-white">
          <div
            ref={devRef}
            className={`flex flex-col gap-12 w-full max-w-container mx-auto reveal${devInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-4 max-w-[600px]">
              <SectionLabel>Developer and agent first</SectionLabel>
              <SectionHeading>Your existing S3 code works</SectionHeading>
              <SectionSub maxWidth={560}>
                Just swap the endpoint, and your agents are running on Fil One. Your boto3, AWS CLI,
                and SDK calls work as-is, and buckets behave like you expect. So you can start
                running in minutes.
              </SectionSub>
            </div>

            <CodeBlock snippets={AGENT_SNIPPETS} />

            <TextLink href="https://docs.fil.one/quickstart" tone="brand" arrow external>
              Full quickstart guide
            </TextLink>
          </div>
        </section>

        {/* ── Value props ──────────────────────────────────────────────────── */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full bg-zinc-50 border-y border-zinc-100">
          <div className="flex flex-col gap-12 w-full max-w-container mx-auto">
            <div className="flex flex-col gap-3 max-w-[520px]">
              <SectionLabel>Why Fil One</SectionLabel>
              <SectionHeading>Built differently. Built for agents.</SectionHeading>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-10 w-full">
              {VALUE_PROPS.map(({ icon, title, body }) => (
                <div key={title} className="flex flex-col gap-4">
                  <IconTile icon={icon} size={18} className="border border-brand/20" />
                  <div className="flex flex-col gap-2">
                    <p className="m-0 font-sans font-semibold text-[15px] leading-[1.35] text-zinc-950">{title}</p>
                    <p className="m-0 font-sans text-[15px] leading-[1.7] text-zinc-500">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Use cases ────────────────────────────────────────────────────── */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full bg-white">
          <div
            ref={useCasesRef}
            className={`flex flex-col gap-12 w-full max-w-container mx-auto reveal${useCasesInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-4 max-w-[560px]">
              <SectionLabel>Use cases</SectionLabel>
              <SectionHeading>What agents need from storage</SectionHeading>
              <SectionSub>
                Start building today. Be the first to test upcoming features.
              </SectionSub>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 reveal-group">
              {USE_CASES.map(({ icon, title, description, badge, waitlist, cta }) => (
                <div
                  key={title}
                  className={`flex flex-col gap-5 p-8 rounded-2xl border border-black/[0.07] bg-white shadow-elevated reveal${useCasesInView ? " in-view" : ""}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <IconTile icon={icon} size={18} />
                    {badge && <Pill tone="neutral" className="whitespace-nowrap">{badge}</Pill>}
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <p className="m-0 font-sans font-medium text-[15px] leading-[1.3] text-zinc-950">{title}</p>
                    <p className="m-0 font-sans text-[14px] leading-[1.6] text-zinc-500">{description}</p>
                  </div>
                  {cta && (
                    <TextLink href={cta.href} tone="brand" arrow className="mt-1 self-start">
                      {cta.label}
                    </TextLink>
                  )}
                  {waitlist && (
                    <TextLink href={waitlist} tone="brand" arrow className="mt-1 self-start">
                      Join the waitlist
                    </TextLink>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing + Next steps ─────────────────────────────────────────── */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full bg-white">
          <div
            ref={learnRef}
            className={`w-full max-w-container mx-auto reveal${learnInView ? " in-view" : ""}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-stretch">

              {/* Left: pricing card — stretches to match right column height */}
              <div className="flex flex-col items-center justify-center gap-8 rounded-3xl border border-brand/20 bg-brand-50 px-8 py-14 text-center">
                <div className="flex flex-col items-center gap-2">
                  <span className="font-display font-medium text-[clamp(48px,7vw,72px)] leading-none tracking-[-0.03em] text-brand-600">
                    {PRICE_DISPLAY}
                  </span>
                  <span className="font-sans text-[16px] font-normal text-zinc-500">/ TB / month</span>
                </div>

                <FeatureList items={["No egress fees", "No per-request charges"]} className="items-center" />

                <p className="m-0 max-w-[320px] font-sans text-[13px] font-normal leading-[1.6] text-zinc-500">
                  Free trial: 1 TB storage + 2 TB bandwidth, 30 days.<br />No credit card required.
                </p>

                <Button variant="primary" href={signupUrl()}>
                  Start for free
                </Button>
              </div>

              {/* Right: next steps */}
              <div className="flex flex-col justify-center gap-7">
                <div className="flex flex-col gap-3">
                  <SectionLabel>Next steps</SectionLabel>
                  <SectionHeading maxWidth={380} size="text-[24px] md:text-[30px]">
                    Ready to get the most out of your agent storage?
                  </SectionHeading>
                  <SectionSub maxWidth={380}>
                    Talk to us about your use case, or head to the docs and start building today.
                  </SectionSub>
                </div>

                {/* Stacked cards */}
                <div className="flex flex-col gap-3">
                  {NEXT_STEPS.map(({ href, label, title, body, external }) => (
                    <a
                      key={label}
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group flex flex-col gap-2.5 rounded-2xl border border-black/[0.07] bg-white p-5 no-underline shadow-elevated-sm transition-colors hover:border-black/[0.12]"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-medium text-[10px] uppercase tracking-[0.08em] text-zinc-500">
                          {label}
                        </span>
                        <ArrowUpRight size={14} className="text-zinc-600" />
                      </div>
                      <p className="m-0 font-sans font-medium text-[16px] leading-[1.3] text-zinc-950">{title}</p>
                      <p className="m-0 font-sans text-[13.5px] leading-[1.6] text-zinc-500">{body}</p>
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default AgentsLandingPage;
