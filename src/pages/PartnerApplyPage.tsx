import { useState } from "react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";
import { SectionLabel } from "@/components/LandingPrimitives";
import {
  TextField,
  TextAreaField,
  SelectField,
  RadioCardField,
  Checkbox,
  SubmitButton,
  FormSuccess,
  FormError,
} from "@/components/FormControls";
import {
  HS_PARTNER_FORM_GUID,
  HS_MARKETING_SUBSCRIPTION_TYPE_ID,
  submitHubSpotForm,
} from "@/lib/hubspot";

const PARTNER_TYPES = [
  { value: "Channel partner", label: "Channel Partner", sub: "You sell technology solutions to customers and want to add cloud storage to your portfolio." },
  { value: "Technology Partner", label: "Technology Partner", sub: "You build software and want to integrate storage directly into your product." },
  { value: "Managed Service Provider (MSP)", label: "Managed Service Provider (MSP)", sub: "You manage infrastructure, backup, or data services on behalf of clients." },
];

const COMPANY_SIZES = ["1-10 employees", "11-50 employees", "51-200 employees", "201-1,000 employees", "1,000+ employees"];

const PartnerApplyPage = () => {
  useSeo({
    title: "Partner Application · Fil One",
    description: "Apply to join the Fil One partner program as a Channel, Technology, or MSP partner.",
    canonical: "https://www.fil.one/partners/apply",
  });

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    company: "",
    email: "",
    jobtitle: "",
    partnerType: "",
    companySize: "",
    website: "",
    message: "",
    consent: false,
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [partnerTypeError, setPartnerTypeError] = useState(false);

  const set = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.partnerType) {
      setPartnerTypeError(true);
      return;
    }
    setLoading(true);
    setError(null);
    setPartnerTypeError(false);

    const result = await submitHubSpotForm({
      formGuid: HS_PARTNER_FORM_GUID,
      pageName: "Partner Application",
      fields: [
        { objectTypeId: "0-1", name: "firstname", value: form.firstname },
        { objectTypeId: "0-1", name: "lastname", value: form.lastname },
        { objectTypeId: "0-2", name: "name", value: form.company },
        { objectTypeId: "0-1", name: "email", value: form.email },
        { objectTypeId: "0-1", name: "jobtitle", value: form.jobtitle },
        { objectTypeId: "0-2", name: "website", value: form.website },
        { objectTypeId: "0-2", name: "partner_type", value: form.partnerType },
        ...(form.companySize ? [{ objectTypeId: "0-2", name: "company_size", value: form.companySize }] : []),
        ...(form.message ? [{ objectTypeId: "0-2", name: "tell_us_about_your_business", value: form.message }] : []),
      ],
      legalConsentOptions: {
        consent: {
          consentToProcess: true,
          text: "By clicking submit, you consent to allow Fil One to store and process the information submitted.",
          communications: [
            {
              value: form.consent,
              subscriptionTypeId: HS_MARKETING_SUBSCRIPTION_TYPE_ID,
              text: "I agree to receive other communications from Fil One.",
            },
          ],
        },
      },
    });

    setLoading(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <PlatformNavbar />

      <main id="main-content" className="flex flex-col items-center px-5 md:px-8 pt-36 pb-24 w-full">
        <div className="flex flex-col gap-10 w-full max-w-[560px]">

          {/* Header */}
          <div className="flex flex-col gap-3">
            <SectionLabel>Partner Application</SectionLabel>
            <h1 className="m-0 font-display font-medium text-[32px] leading-[1.15] tracking-[-0.02em] text-zinc-950">
              Apply to partner with Fil One
            </h1>
            <p className="m-0 font-sans font-normal text-[15px] leading-[1.6] text-zinc-500">
              Tell us about your business and the role that fits. Our partner team will get back to you shortly.
            </p>
          </div>

          <div className="h-px w-full bg-black/[0.07]" />

          {submitted ? (
            <FormSuccess
              title="Application received"
              align="center"
              action={<a href="/partners" className="btn-secondary">Back to Partners</a>}
            >
              Thanks for applying. We'll review your details and reach out within 2 business days.
            </FormSuccess>
          ) : (
            <form onSubmit={handleSubmit} data-hs-do-not-collect="true" className="flex flex-col gap-6" noValidate>

              {/* Name row */}
              <div className="grid grid-cols-2 gap-4">
                <TextField label="First name" required type="text" placeholder="Jane" value={form.firstname} onChange={set("firstname")} />
                <TextField label="Last name" required type="text" placeholder="Smith" value={form.lastname} onChange={set("lastname")} />
              </div>

              <TextField label="Work email" required type="email" placeholder="jane@acme.com" value={form.email} onChange={set("email")} />

              <div className="grid grid-cols-2 gap-4">
                <TextField label="Company name" required type="text" placeholder="Acme Inc." value={form.company} onChange={set("company")} />
                <TextField label="Job title" type="text" placeholder="VP Partnerships" value={form.jobtitle} onChange={set("jobtitle")} />
              </div>

              <TextField label="Company website" type="url" placeholder="https://acme.com" value={form.website} onChange={set("website")} />

              <RadioCardField
                legend="Partner type"
                name="partnerType"
                required
                options={PARTNER_TYPES}
                value={form.partnerType}
                onChange={(value) => { setForm((f) => ({ ...f, partnerType: value })); setPartnerTypeError(false); }}
                error={partnerTypeError ? "Please select a partner type." : undefined}
              />

              <SelectField label="Company size" value={form.companySize} onChange={set("companySize")}>
                <option value="">Select…</option>
                {COMPANY_SIZES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </SelectField>

              <TextAreaField
                label="Tell us about your business"
                value={form.message}
                onChange={set("message")}
                placeholder="What do you do, who are your customers, and what makes this a good fit?"
                className="min-h-[110px]"
              />

              <div className="h-px w-full bg-black/[0.07]" />

              {/* Consent text */}
              <p className="font-sans font-normal text-[13px] leading-[1.7] text-zinc-500">
                Fil One is committed to protecting your privacy. We'll only use your personal information to administer your account and provide the products and services you requested. From time to time we'd like to contact you about our products and services.
              </p>

              <Checkbox checked={form.consent} onChange={(checked) => setForm((f) => ({ ...f, consent: checked }))}>
                I agree to receive other communications from Fil One.
              </Checkbox>

              <p className="font-sans font-normal text-[12.5px] leading-[1.7] text-zinc-500">
                You can unsubscribe at any time. For more information, review our{" "}
                <a href="/privacy" className="text-zinc-500 underline">Privacy Policy</a>.
                {" "}By clicking submit, you consent to allow Fil One to store and process the information submitted.
              </p>

              {error && <FormError>{error}</FormError>}

              <SubmitButton loading={loading}>
                {loading ? "Submitting…" : "Submit application"}
              </SubmitButton>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PartnerApplyPage;
