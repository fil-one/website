import { useState } from "react";
import { Check, Copy } from "@phosphor-icons/react";
import { useInView } from "@/hooks/useInView";
import SectionHeader from "@/components/SectionHeader";
import Icon from "@/components/Icon";

type LangKey = "python" | "typescript" | "go";

const LANGS: { key: LangKey; label: string }[] = [
  { key: "python",     label: "Python"     },
  { key: "typescript", label: "TypeScript" },
  { key: "go",         label: "Go"         },
];

const STEPS = [
  "Install the AWS SDK",
  "Point to Fil One",
  "Use every S3 tool",
];

const CODE: Record<LangKey, string> = {
  python: `import boto3, os

# One line change — your endpoint
s3 = boto3.client(
    "s3",
    endpoint_url="https://eu-west-1.s3.fil.one",
    aws_access_key_id=os.environ["FIL_ACCESS_KEY"],
    aws_secret_access_key=os.environ["FIL_SECRET_KEY"],
    region_name="eu-west-1",
)

# Everything else stays exactly the same
s3.upload_file("model.bin", "my-bucket", "models/v2/model.bin")

url = s3.generate_presigned_url(
    "get_object",
    Params={"Bucket": "my-bucket", "Key": "models/v2/model.bin"},
    ExpiresIn=3600,
)`,

  typescript: `import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { readFileSync } from "fs";

// One line change — your endpoint
const s3 = new S3Client({
  endpoint: "https://eu-west-1.s3.fil.one",
  region: "eu-west-1",
  credentials: {
    accessKeyId: process.env.FIL_ACCESS_KEY!,
    secretAccessKey: process.env.FIL_SECRET_KEY!,
  },
  forcePathStyle: true,
});

// Everything else stays exactly the same
await s3.send(new PutObjectCommand({
  Bucket: "my-bucket",
  Key: "models/v2/model.bin",
  Body: readFileSync("model.bin"),
}));

const url = await getSignedUrl(s3,
  new GetObjectCommand({ Bucket: "my-bucket", Key: "models/v2/model.bin" }),
  { expiresIn: 3600 }
);`,

  go: `import (
    "os"
    "github.com/aws/aws-sdk-go-v2/aws"
    "github.com/aws/aws-sdk-go-v2/credentials"
    "github.com/aws/aws-sdk-go-v2/service/s3"
)

// One line change — your endpoint
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

// Everything else stays exactly the same
client.PutObject(ctx, &s3.PutObjectInput{
    Bucket: aws.String("my-bucket"),
    Key:    aws.String("models/v2/model.bin"),
    Body:   f,
})`,
};

// Syntax highlighter for light backgrounds — safe: code is hardcoded, not user input
function highlight(raw: string, lang: LangKey): string {
  const s = raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Whole-line comments: return early so string/keyword regex can't corrupt the span attribute
  const trimmed = s.trimStart();
  if (lang === "python" && trimmed.startsWith("#")) {
    return `<span style="color:#6B7280;font-style:italic">${s}</span>`;
  }
  if ((lang === "typescript" || lang === "go") && trimmed.startsWith("//")) {
    return `<span style="color:#6B7280;font-style:italic">${s}</span>`;
  }

  let out = s;
  // strings
  out = out.replace(/("(?:[^"\\]|\\.)*")/g, '<span style="color:#0D9488">$1</span>');
  // keywords
  const kw =
    lang === "python"
      ? /\b(import|from|as|await|async|for|in|if|else|return|def|class|True|False|None)\b/g
      : lang === "typescript"
      ? /\b(import|from|export|const|let|var|await|async|new|for|of|do|while|if|else|return|true|false|null|undefined)\b/g
      : /\b(import|func|var|const|return|if|else|for|range|go|defer|type|struct|interface)\b/g;
  out = out.replace(kw, '<span style="color:#7C3AED">$1</span>');
  return out;
}

const DeveloperSection = () => {
  const [lang, setLang] = useState<LangKey>("python");
  const [copied, setCopied] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.05 });

  const handleCopy = () => {
    navigator.clipboard.writeText(CODE[lang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const lines = CODE[lang].split("\n");

  return (
    <section className="border-y border-zinc-200 bg-zinc-100">
      <div
        ref={ref}
        className="flex flex-col gap-12 px-5 md:px-8 py-24 md:py-32 w-full max-w-container mx-auto"
      >
        {/* Heading */}
        <SectionHeader
          className={`max-w-[480px] reveal${inView ? " in-view" : ""}`}
          label="Developer first"
          title="Your existing S3 code runs here."
          subtitle="Fil One is fully S3-compatible. Change the endpoint URL and you're done. Every tool you already use keeps working."
        />

        {/* Step pills */}
        <div className={`flex flex-wrap items-center justify-center gap-2 reveal${inView ? " in-view" : ""}`}>
          {STEPS.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div className="flex items-center rounded-full border border-black/[0.08] bg-white px-4 py-2 shadow-elevated-sm">
                <span className="whitespace-nowrap font-sans text-[13.5px] font-normal text-zinc-700">
                  {step}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <svg width="20" height="16" viewBox="0 0 20 16" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M1 8h14M11 4l4 4-4 4" stroke="#C4C4C8" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          ))}
        </div>

        {/* Code block */}
        <div
          className={`w-full overflow-hidden rounded-2xl border border-black/[0.07] bg-white reveal${inView ? " in-view" : ""}`}
          style={{
            // Bespoke code-block shadow — no matching token.
            boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 24px rgba(0,0,0,0.05)",
          }}
        >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-black/[0.06] px-5 py-3">
              {/* Language tabs */}
              <div className="flex items-center gap-0.5">
                {LANGS.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setLang(key)}
                    className={`cursor-pointer rounded-md px-2.5 py-1 font-mono text-[12px] transition-all ${
                      lang === key ? "bg-zinc-100 text-zinc-950" : "text-zinc-500"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Copy button */}
              <button
                onClick={handleCopy}
                className={`flex cursor-pointer items-center gap-1.5 rounded-md px-1.5 py-1 font-sans text-[12.5px] transition-opacity hover:opacity-70 ${
                  copied ? "text-brand-500" : "text-zinc-500"
                }`}
              >
                <Icon icon={copied ? Check : Copy} size={13} />
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            {/* Code with line numbers */}
            <pre className="m-0 overflow-x-auto py-5 font-mono text-[13px] leading-[1.75]">
              {lines.map((line, i) => (
                <div key={i} className="flex px-5 hover:bg-black/[0.02] transition-colors">
                  <span className="min-w-9 shrink-0 select-none pr-5 text-right text-[12px] text-zinc-300">
                    {i + 1}
                  </span>
                  <span
                    style={{ color: "#374151" }}
                    dangerouslySetInnerHTML={{ __html: highlight(line, lang) }}
                  />
                </div>
              ))}
            </pre>
        </div>
      </div>
    </section>
  );
};

export default DeveloperSection;
