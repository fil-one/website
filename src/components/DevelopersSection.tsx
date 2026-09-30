import CodeBlock, { type CodeSnippet } from "@/components/CodeBlock";
import TextLink from "@/components/TextLink";
import { SectionLabel, SectionHeading, SectionSub } from "@/components/LandingPrimitives";
import { useInView } from "@/hooks/useInView";
import { trackDocsClick } from "@/lib/analytics";
import { S3_ENDPOINT } from "@/lib/s3-endpoint";

const DOCS_URL = "https://docs.fil.one";

const SNIPPETS: CodeSnippet[] = [
  {
    lang: "python",
    label: "Python",
    code: `import boto3, os

s3 = boto3.client(
    "s3",
    endpoint_url="${S3_ENDPOINT}",
    aws_access_key_id=os.environ["FIL_ACCESS_KEY"],
    aws_secret_access_key=os.environ["FIL_SECRET_KEY"],
    region_name="eu-west-1",
)

s3.upload_file("train.parquet", "my-bucket", "train.parquet")`,
  },
  {
    lang: "typescript",
    label: "TypeScript",
    code: `import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  endpoint: "${S3_ENDPOINT}",
  region: "eu-west-1",
  credentials: {
    accessKeyId: process.env.FIL_ACCESS_KEY,
    secretAccessKey: process.env.FIL_SECRET_KEY,
  },
});

await s3.send(new PutObjectCommand({ Bucket: "my-bucket", Key: "train.parquet", Body: file }));`,
  },
  {
    lang: "go",
    label: "Go",
    code: `cfg, _ := config.LoadDefaultConfig(ctx, config.WithRegion("eu-west-1"))

client := s3.NewFromConfig(cfg, func(o *s3.Options) {
	o.BaseEndpoint = aws.String("${S3_ENDPOINT}")
	o.UsePathStyle = true
})

_, err := client.PutObject(ctx, &s3.PutObjectInput{
	Bucket: aws.String("my-bucket"),
	Key:    aws.String("train.parquet"),
	Body:   file,
})`,
  },
];

/** Developers: change the endpoint, keep your code. Grey band with the tabbed code sample. */
const DevelopersSection = () => {
  const { ref, inView } = useInView({ threshold: 0.05 });
  return (
    <section id="developers" className="w-full border-y border-zinc-100 bg-zinc-50 px-5 py-24 md:px-8">
      <div ref={ref} className={`mx-auto flex w-full max-w-container flex-col gap-10 reveal${inView ? " in-view" : ""}`}>
        <div className="flex max-w-[720px] flex-col gap-3.5">
          <SectionLabel>Developers</SectionLabel>
          <SectionHeading size="text-h2 md:text-h1">
            Change the endpoint.
            <br />
            <span className="text-brand-500">Keep your code.</span>
          </SectionHeading>
          <SectionSub maxWidth={560} size="text-body md:text-[16px]">
            Fil One speaks the S3 API. Your SDKs, CLIs and backup tools work as they are.
          </SectionSub>
        </div>
        <CodeBlock snippets={SNIPPETS} />
        <TextLink href={DOCS_URL} tone="brand" arrow external onClick={() => trackDocsClick(DOCS_URL)}>
          All integrations in the docs
        </TextLink>
      </div>
    </section>
  );
};

export default DevelopersSection;
