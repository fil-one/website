import { useInView } from "@/hooks/useInView";
import SectionHeader from "@/components/SectionHeader";
import CodeBlock, { type CodeSnippet } from "@/components/CodeBlock";

const STEPS = [
  "Install the AWS SDK",
  "Point to Fil One",
  "Use every S3 tool",
];

const SNIPPETS: CodeSnippet[] = [
  {
    lang: "python",
    label: "Python",
    code: `import boto3, os

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
  },
  {
    lang: "typescript",
    label: "TypeScript",
    code: `import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
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
  },
  {
    lang: "go",
    label: "Go",
    code: `import (
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
  },
];

const DeveloperSection = () => {
  const { ref, inView } = useInView({ threshold: 0.05 });

  return (
    <section className="border-y border-zinc-100 bg-zinc-50">
      <div
        ref={ref}
        className="flex flex-col gap-12 px-5 md:px-8 py-24 md:py-32 w-full max-w-container mx-auto"
      >
        {/* Heading */}
        <SectionHeader
          className={`max-w-[480px] reveal${inView ? " in-view" : ""}`}
          label="Developer first"
          title="Your existing S3 code runs here."
          subtitle="Fil One is S3-compatible. Point your existing tools at the new endpoint, enable path-style requests, and most keep working."
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
                <svg width="20" height="16" viewBox="0 0 20 16" fill="none" className="shrink-0">
                  <path d="M1 8h14M11 4l4 4-4 4" stroke="#C4C4C8" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          ))}
        </div>

        {/* Code block */}
        <CodeBlock className={`reveal${inView ? " in-view" : ""}`} snippets={SNIPPETS} />
      </div>
    </section>
  );
};

export default DeveloperSection;
