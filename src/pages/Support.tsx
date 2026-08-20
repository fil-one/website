import { useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { trackEvent } from "@/lib/analytics";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import FaqAccordion from "@/components/FaqAccordion";
import { useSeo } from "@/hooks/useSeo";
import { SectionLabel } from "@/components/LandingPrimitives";
import {
  TextField,
  TextAreaField,
  CheckboxField,
  SubmitButton,
  FormSuccess,
  FormError,
} from "@/components/FormControls";
import { HS_SUPPORT_FORM_GUID, submitHubSpotForm } from "@/lib/hubspot";
import { S3_ENDPOINT_HOST } from "@/lib/s3-endpoint";

const CATEGORY_OPTIONS = [
  { label: "Product issue", value: "PRODUCT_ISSUE" },
  { label: "Billing issue", value: "BILLING_ISSUE" },
  { label: "General inquiry", value: "GENERAL_INQUIRY" },
  { label: "Feature request", value: "FEATURE_REQUEST" },
];

const QUICK_LINKS = [
  { label: "Documentation", sub: "Guides, API reference & SDKs", href: "https://docs.fil.one" },
  { label: "Status", sub: "Live system & uptime status", href: "https://status.fil.one" },
];

const FAQS = [
  {
    q: "Does Fil One support IPFS or CIDs?",
    a: "No. Fil One is S3-compatible object storage. It does not support IPFS retrieval or content addressing via CIDs. If you need IPFS pinning or CID-based access, take a look at Filecoin Open Cloud (FOC).",
  },
  {
    q: "Can I make a bucket public?",
    a: "Public buckets are not currently supported. To share individual files, you can generate a presigned URL from the dashboard or via the S3 API. This gives time-limited access to a specific object without making the entire bucket public.",
  },
  {
    q: "Are there any hidden fees on top of the storage price?",
    a: "No. Fil One charges a flat rate per TB stored per month with no egress fees, no API request charges, and no retrieval penalties. What you see is what you pay.",
  },
  {
    q: "How do I migrate from Storacha or another S3-compatible provider?",
    a: `Fil One is S3-compatible, so tools like rclone work out of the box. Point rclone at ${S3_ENDPOINT_HOST} with your Fil One credentials and sync your data across. If you need help with a larger migration, reach out and we'll guide you through it.`,
  },
  {
    q: "Can I pay with FIL tokens?",
    a: "Not currently. Billing is in USD. If paying in FIL is a hard requirement, get in touch and we can explore options depending on your storage volume.",
  },
];

const Support = () => {
  useSeo({
    title: "Support · Fil One S3 Object Storage",
    description: "Get help from the Fil One support team. Submit a request and we'll get back to you shortly.",
    canonical: "https://www.fil.one/support",
  });

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    company: "",
    content: "",
    categories: [] as string[],
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categoryError, setCategoryError] = useState(false);

  const set = (key: keyof Omit<typeof form, "categories">) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const toggleCategory = (value: string) => {
    setCategoryError(false);
    setForm((f) => ({
      ...f,
      categories: f.categories.includes(value)
        ? f.categories.filter((c) => c !== value)
        : [...f.categories, value],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.categories.length === 0) {
      setCategoryError(true);
      return;
    }
    setLoading(true);
    setError(null);
    setCategoryError(false);

    const result = await submitHubSpotForm({
      formGuid: HS_SUPPORT_FORM_GUID,
      pageName: "Support",
      fields: [
        { objectTypeId: "0-1", name: "firstname", value: form.firstname },
        { objectTypeId: "0-1", name: "lastname", value: form.lastname },
        { objectTypeId: "0-1", name: "email", value: form.email },
        { objectTypeId: "0-1", name: "company", value: form.company },
        { objectTypeId: "0-5", name: "content", value: form.content },
        { objectTypeId: "0-5", name: "hs_ticket_category", value: form.categories.join(";") },
      ],
    });

    setLoading(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setSubmitted(true);
    trackEvent("Form Submit", { form: "support", page: window.location.pathname });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <PlatformNavbar />

      <main id="main-content" className="flex flex-col items-center px-5 md:px-8 pt-36 pb-24 w-full">
        <div className="flex flex-col gap-10 w-full max-w-[560px]">

          {/* Header */}
          <div className="flex flex-col gap-3">
            <SectionLabel>Support</SectionLabel>
            <h1 className="m-0 font-display font-medium text-[28px] md:text-[36px] leading-[1.15] tracking-[-0.02em] text-zinc-950">
              Get help
            </h1>
            <p className="m-0 font-sans font-normal text-[15px] leading-[1.6] text-zinc-500">
              Browse common questions below or submit a request.
            </p>
          </div>

          {/* Quick links */}
          <div className="grid grid-cols-2 gap-3">
            {QUICK_LINKS.map(({ label, sub, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-1 rounded-xl border border-black/[0.08] p-4 no-underline transition-colors hover:bg-black/[0.02]"
              >
                <div className="flex items-center gap-1">
                  <span className="font-sans font-medium text-[14px] text-zinc-950">
                    {label}
                  </span>
                  <ArrowUpRight size={13} className="text-zinc-600" />
                </div>
                <span className="font-sans text-[12.5px] text-zinc-500">
                  {sub}
                </span>
              </a>
            ))}
          </div>

          {/* FAQ */}
          <div className="flex flex-col">
            <div className="mb-4">
              <SectionLabel>Common questions</SectionLabel>
            </div>
            <FaqAccordion items={FAQS} idPrefix="support-faq" />
          </div>

          {submitted ? (
            <FormSuccess title="We'll be in touch soon.">
              Thanks for reaching out. Our team will review your request and get back to you shortly.
            </FormSuccess>
          ) : (
            <form onSubmit={handleSubmit} data-hs-do-not-collect="true" className="flex flex-col gap-5">

              {/* First / Last name row */}
              <div className="grid grid-cols-2 gap-4">
                <TextField
                  label="First name"
                  required
                  type="text"
                  value={form.firstname}
                  onChange={set("firstname")}
                  placeholder="Jane"
                />
                <TextField
                  label="Last name"
                  type="text"
                  value={form.lastname}
                  onChange={set("lastname")}
                  placeholder="Smith"
                />
              </div>

              {/* Email / Company row */}
              <div className="grid grid-cols-2 gap-4">
                <TextField
                  label="Email"
                  required
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  placeholder="jane@acme.com"
                />
                <TextField
                  label="Company name"
                  type="text"
                  value={form.company}
                  onChange={set("company")}
                  placeholder="Acme Inc."
                />
              </div>

              <TextAreaField
                label="Ticket description"
                required
                value={form.content}
                onChange={set("content")}
                placeholder="Describe your issue or question…"
                rows={5}
              />

              <CheckboxField
                legend="Category"
                required
                options={CATEGORY_OPTIONS}
                values={form.categories}
                onToggle={toggleCategory}
                error={categoryError ? "Please select at least one category." : undefined}
              />

              <div className="h-px w-full bg-black/[0.07]" />

              {/* Disclaimer */}
              <p className="font-sans font-normal text-[13px] leading-[1.7] text-zinc-500">
                Fil One needs the contact information you provide to us to contact you about our products and services. You may unsubscribe from these communications at any time. For information on how to unsubscribe, as well as our privacy practices and commitment to protecting your privacy, please review our{" "}
                <a href="/privacy" className="text-zinc-500 underline">Privacy Policy</a>.
              </p>

              {/* Response time */}
              <div className="flex items-center gap-2.5 rounded-xl border border-black/[0.06] bg-zinc-100 px-4 py-3">
                <div className="h-2 w-2 shrink-0 rounded-full bg-success-500" />
                <p className="m-0 font-sans text-[13.5px] text-zinc-600">
                  We typically respond within <span className="font-medium text-zinc-950">1 business day</span>.
                </p>
              </div>

              {/* Submit */}
              <div className="flex flex-col gap-2 pt-1">
                <SubmitButton loading={loading}>
                  {loading ? "Submitting…" : "Submit"}
                </SubmitButton>
                {error && <FormError>{error}</FormError>}
              </div>

            </form>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Support;
