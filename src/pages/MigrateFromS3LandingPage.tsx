import { ArrowsOut, ChartLine, Plug, Database } from "@phosphor-icons/react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useInView } from "@/hooks/useInView";
import { useSeo } from "@/hooks/useSeo";
import { SectionLabel, SectionHeading, SectionSub } from "@/components/LandingPrimitives";
import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import CtaBanner from "@/components/CtaBanner";
import CodeBlock from "@/components/CodeBlock";
import PriceComparisonTable, {
  type PriceComparisonColumn,
  type PriceComparisonRow,
} from "@/components/PriceComparisonTable";
import TextLink from "@/components/TextLink";
import { PRICE_PER_TB_SHORT } from "@/lib/pricing";

const SIGNUP_URL = "https://app.fil.one/login?screen_hint=signup";
const SALES_URL = "/contact-sales";

const TAGLINE = "No credit card required · No egress fees · Connects in minutes";

// 10 TB stored, 10 TB read/month, 1M GET operations.
// AWS S3 Standard us-east-1 Q2 2026: storage 10,240 GB x $0.023 = $235.52,
// egress 10,240 GB x $0.09 = $921.60, ops 1,000,000 / 1,000 x $0.0004 = $0.40.
// Fil One: 10 TB x $4.99 = $49.90, egress $0, ops $0.
const PRICING_COLUMNS: PriceComparisonColumn[] = [
  { key: "storage", header: "Storage" },
  { key: "egress", header: "Egress", colorByValue: true },
  { key: "api", header: "API / ops", colorByValue: true },
  { key: "total", header: "Total / month", total: true },
];

const PRICING_ROWS: PriceComparisonRow[] = [
  { provider: "AWS S3 Standard", values: { storage: "$236", egress: "$922", api: "$0.40", total: "$1,158" } },
  { provider: "Fil One", isFilOne: true, values: { storage: "$50", egress: "$0", api: "$0", total: "$50" } },
];

const FEATURES = [
  {
    icon: Plug,
    title: "Full S3 API parity",
    desc: "PutObject, GetObject, DeleteObject, ListObjectsV2, multipart upload, presigned URLs, and bucket operations all work as on AWS. Existing S3 code connects without modification.",
  },
  {
    icon: ArrowsOut,
    title: "No egress on reads",
    desc: "Every GET request on AWS charges $0.09/GB out to the internet. On Fil One, reads are included in flat storage. The SDKs behave identically; the bill does not.",
  },
  {
    icon: ChartLine,
    title: "Predictable flat cost",
    desc: `Storage at ${PRICE_PER_TB_SHORT}. No egress, no per-request fees, no storage tier waterfall. The line item you plan for is the line item that ships.`,
  },
  {
    icon: Database,
    title: "Flat cost at any scale",
    desc: `${PRICE_PER_TB_SHORT} whether you migrate 1 TB or 1 PB. The rate per TB does not change as the dataset grows.`,
  },
];

const BOTO3_CODE = `# Before — AWS S3
s3 = boto3.client(
    "s3",
    region_name="us-east-1",
)

# After · Fil One (no other changes)
s3 = boto3.client(
    "s3",
    endpoint_url="https://eu-west-1.s3.fil.one",
    aws_access_key_id=os.environ["FIL_ACCESS_KEY"],
    aws_secret_access_key=os.environ["FIL_SECRET_KEY"],
    region_name="eu-west-1",
)`;

const NODE_CODE = `// Before — AWS S3
const s3 = new S3Client({ region: "us-east-1" });

// After · Fil One
const s3 = new S3Client({
  endpoint: "https://eu-west-1.s3.fil.one",
  region: "eu-west-1",
  credentials: {
    accessKeyId: process.env.FIL_ONE_ACCESS_KEY,
    secretAccessKey: process.env.FIL_ONE_SECRET_KEY,
  },
});`;

const MigrateFromS3LandingPage = () => {
  useSeo({
    title: "Fil One · Leaving S3 is a config change, not a rewrite",
    description: `Same SDK. New endpoint. Lower bill. Point your existing S3 tools at Fil One and cut storage costs to ${PRICE_PER_TB_SHORT} flat with $0 egress.`,
    canonical: "https://www.fil.one/lp/migrate-from-s3",
  });

  const { ref: codeRef, inView: codeInView } = useInView({ threshold: 0.05 });
  const { ref: tableRef, inView: tableInView } = useInView({ threshold: 0.05 });
  const { ref: featuresRef, inView: featuresInView } = useInView({ threshold: 0.05 });

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <PlatformNavbar />

      <main id="main-content">
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <Hero
          glow
          grid
          titleSize="text-[30px] sm:text-[38px] md:text-[54px]"
          titleMaxWidth={800}
          descriptionMaxWidth={580}
          contentClassName="pb-20 md:pb-28"
          badge={
            <div className="inline-flex items-center rounded-full border border-brand/20 bg-brand-50 px-3.5 py-2.5 text-center max-w-[90vw]">
              <span className="whitespace-nowrap font-sans text-[13.5px] font-medium leading-none text-brand-600">
                For teams on AWS S3 looking to reduce storage costs
              </span>
            </div>
          }
          title={
            <>
              Leaving S3 is a config change,
              <br />
              <span className="text-brand-500">not a rewrite.</span>
            </>
          }
          description={
            <>Point your existing S3 tools at Fil One. {PRICE_PER_TB_SHORT} flat, no egress. Same SDK, same API, lower bill.</>
          }
          ctas={[
            { label: "Start for free", href: SIGNUP_URL, variant: "primary" },
            { label: "Talk to an expert", href: SALES_URL, variant: "secondary" },
          ]}
          tagline={TAGLINE}
        />

        {/* ── Code block — the endpoint swap ──────────────────────────────── */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full bg-zinc-50">
          <div
            ref={codeRef}
            className={`flex flex-col gap-10 w-full max-w-container mx-auto reveal${codeInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3">
              <SectionLabel>The migration</SectionLabel>
              <SectionHeading>
                Change the endpoint. <span className="text-brand-500">Nothing else.</span>
              </SectionHeading>
              <SectionSub maxWidth={620}>
                Fil One implements the S3 API. The code that works on AWS works here — PutObject, GetObject, ListObjectsV2, multipart upload, presigned URLs.
              </SectionSub>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CodeBlock snippets={[{ lang: "python", label: "Python (boto3)", code: BOTO3_CODE }]} />
              <CodeBlock snippets={[{ lang: "typescript", label: "Node.js (@aws-sdk/client-s3)", code: NODE_CODE }]} />
            </div>

            <div className="max-w-[680px] rounded-2xl border border-black/[0.07] bg-white p-6">
              <p className="m-0 mb-2 font-sans font-medium text-[14px] text-zinc-950">What is compatible</p>
              <p className="m-0 font-sans text-[13.5px] leading-[1.65] text-zinc-500">
                PutObject, GetObject, DeleteObject, HeadObject, CopyObject, ListObjectsV2, CreateBucket, DeleteBucket, multipart upload, presigned URLs. Standard Auth v4 signing. For a full compatibility list, see{" "}
                <TextLink href="https://docs.fil.one" tone="brand" external className="inline">
                  docs.fil.one
                </TextLink>
                .
              </p>
            </div>
          </div>
        </section>

        {/* ── Price comparison ─────────────────────────────────────────────── */}
        <section className="px-5 md:px-8 py-24 md:py-32 w-full bg-white">
          <div
            ref={tableRef}
            className={`flex flex-col gap-8 w-full max-w-container mx-auto reveal${tableInView ? " in-view" : ""}`}
          >
            <div className="flex flex-col gap-3">
              <SectionLabel>The delta</SectionLabel>
              <SectionHeading>
                10 TB stored, 10 TB read/month. <span className="text-brand-500">What changes.</span>
              </SectionHeading>
            </div>

            <PriceComparisonTable
              columns={PRICING_COLUMNS}
              rows={PRICING_ROWS}
              caption="Monthly cost for 10 TB stored, 10 TB read, AWS S3 Standard vs Fil One"
              footnote="AWS S3 Standard us-east-1 Q2 2026: $0.023/GB storage, $0.09/GB internet egress, $0.0004/1K GET. Computed from stated inputs — 10,240 GB × $0.023 = $235.52 storage; 10,240 GB × $0.09 = $921.60 egress; 1M × $0.0004/1K = $0.40 ops. Fil One: 10 TB × $4.99 = $49.90, egress $0, ops $0."
            />
          </div>
        </section>

        {/* ── Features ─────────────────────────────────────────────────────── */}
        <section className="w-full bg-zinc-50">
          <div className="flex flex-col gap-12 items-center px-5 md:px-8 py-24 md:py-32 w-full max-w-container mx-auto">
            <div className="flex flex-col gap-3 items-center text-center">
              <SectionLabel>What carries over</SectionLabel>
              <SectionHeading>
                S3 parity. <span className="text-brand-500">Lower bill.</span>
              </SectionHeading>
              <SectionSub maxWidth={560}>
                The same tools, the same APIs, the same integration patterns. The line items that dominated the invoice do not exist here.
              </SectionSub>
            </div>
            <div
              ref={featuresRef}
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full reveal-group reveal${featuresInView ? " in-view" : ""}`}
            >
              {FEATURES.map(({ icon, title, desc }) => (
                <FeatureCard
                  key={title}
                  icon={icon}
                  title={title}
                  description={desc}
                  className={`reveal${featuresInView ? " in-view" : ""}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Banner ────────────────────────────────────────────────────── */}
        <CtaBanner
          heading="Same SDK. New endpoint. Lower bill."
          subhead="Free 1 TB evaluation. Change two lines and run the same workload. The egress line will not be there."
          cta={{ label: "Start for free", href: SIGNUP_URL }}
          secondaryCta={{ label: "Talk to an expert", href: SALES_URL }}
          note={TAGLINE}
          surface="grey"
        />
      </main>

      <Footer />
    </div>
  );
};

export default MigrateFromS3LandingPage;
