import { useState } from "react";
import { Check, Copy } from "@phosphor-icons/react";
import { useInView } from "@/hooks/useInView";

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
    <section style={{ backgroundColor: "#F4F4F5", borderTop: "1px solid #E4E4E7", borderBottom: "1px solid #E4E4E7" }}>
      <div
        ref={ref}
        className="flex flex-col gap-12 px-5 md:px-8 py-24 md:py-32 w-full max-w-[1120px] mx-auto"
      >
        {/* Heading */}
        <div className={`flex flex-col gap-4 items-center text-center reveal${inView ? " in-view" : ""}`}>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: "0.1em",
              color: "#71717A",
              textTransform: "uppercase",
            }}
          >
            Developer first
          </span>
          <h2
            className="text-[26px] md:text-[34px]"
            style={{
              fontFamily: "'Aspekta', sans-serif",
              fontWeight: 500,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "#09090B",
              margin: 0,
              maxWidth: 480,
            }}
          >
            Your existing S3 code runs here.
          </h2>
          <p
            style={{
              fontFamily: "'Funnel Sans', sans-serif",
              fontWeight: 400,
              fontSize: 15,
              lineHeight: 1.65,
              color: "#71717A",
              maxWidth: 420,
              margin: 0,
            }}
          >
            Fil One is fully S3-compatible. Change the endpoint URL and you're done. Every tool you already use keeps working.
          </p>
        </div>

        {/* Step pills */}
        <div className={`flex flex-wrap items-center justify-center gap-2 reveal${inView ? " in-view" : ""}`}>
          {STEPS.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div
                className="flex items-center px-4 py-2 rounded-full"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid rgba(0,0,0,0.08)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                }}
              >
                <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13.5, color: "#3F3F46", whiteSpace: "nowrap" }}>
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
          className={`w-full rounded-2xl overflow-hidden reveal${inView ? " in-view" : ""}`}
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid rgba(0,0,0,0.07)",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 24px rgba(0,0,0,0.05)",
          }}
        >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-3 border-b"
              style={{ borderColor: "rgba(0,0,0,0.06)" }}
            >
              {/* Language tabs */}
              <div className="flex items-center gap-0.5">
                {LANGS.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setLang(key)}
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontWeight: 400,
                      fontSize: 12,
                      color: lang === key ? "#09090B" : "#A1A1AA",
                      backgroundColor: lang === key ? "#F4F4F5" : "transparent",
                      border: "none",
                      borderRadius: 6,
                      padding: "4px 10px",
                      cursor: "pointer",
                      transition: "all 0.12s ease",
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Copy button */}
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 transition-opacity hover:opacity-70"
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: 12.5,
                  color: copied ? "#0090FF" : "#A1A1AA",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px 6px",
                  borderRadius: 6,
                }}
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            {/* Code with line numbers */}
            <pre
              style={{
                margin: 0,
                padding: "20px 0",
                overflowX: "auto",
                fontFamily: "'DM Mono', monospace",
                fontSize: 13,
                lineHeight: 1.75,
              }}
            >
              {lines.map((line, i) => (
                <div key={i} className="flex px-5 hover:bg-black/[0.02] transition-colors">
                  <span
                    style={{
                      minWidth: 36,
                      textAlign: "right",
                      paddingRight: 20,
                      color: "#D4D4D8",
                      userSelect: "none",
                      flexShrink: 0,
                      fontSize: 12,
                    }}
                  >
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
