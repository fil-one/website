import { useState } from "react";
import { Check } from "@phosphor-icons/react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";
import {
  HS_PORTAL_ID,
  HS_PARTNER_FORM_GUID as HS_FORM_GUID,
  HS_MARKETING_SUBSCRIPTION_TYPE_ID,
  getHubSpotContext,
} from "@/lib/hubspot";

const PARTNER_TYPES = [
  { value: "Channel partner", label: "Channel Partner", sub: "You sell technology solutions to customers and want to add cloud storage to your portfolio." },
  { value: "Technology Partner", label: "Technology Partner", sub: "You build software and want to integrate storage directly into your product." },
  { value: "Managed Service Provider (MSP)", label: "Managed Service Provider (MSP)", sub: "You manage infrastructure, backup, or data services on behalf of clients." },
];

const COMPANY_SIZES = ["1-10 employees", "11-50 employees", "51-200 employees", "201-1,000 employees", "1,000+ employees"];

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid rgba(0,0,0,0.10)",
  borderRadius: 10,
  padding: "10px 14px",
  fontFamily: "'Funnel Sans', sans-serif",
  fontWeight: 400,
  fontSize: 14.5,
  color: "#09090B",
  backgroundColor: "#FFFFFF",
  outline: "none",
  transition: "border-color 150ms ease",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "'Funnel Sans', sans-serif",
  fontWeight: 500,
  fontSize: 13.5,
  color: "#3F3F46",
};

const Field = ({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) => (
  <label className="flex flex-col gap-1.5">
    <span style={labelStyle}>
      {label}
      {required && <span aria-hidden="true" style={{ color: "#DC2626", marginLeft: 2 }}>*</span>}
    </span>
    {children}
  </label>
);

const PartnerApplyPage = () => {
  useSeo({
    title: "Partner Application · Fil One",
    description: "Apply to join the Fil One partner program as a Channel, Technology, or MSP partner.",
    canonical: "https://fil.one/partners/apply",
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
  ) =>
    setForm((f) => ({
      ...f,
      [key]: (e.target as HTMLInputElement).type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : e.target.value,
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.partnerType) {
      setPartnerTypeError(true);
      return;
    }
    setLoading(true);
    setError(null);
    setPartnerTypeError(false);
    try {
      const res = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${HS_PORTAL_ID}/${HS_FORM_GUID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
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
            context: getHubSpotContext("Partner Application"),
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
          }),
        }
      );
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const msg =
          body?.errors?.map((e: { message: string }) => e.message).join(" | ") ||
          body?.message ||
          JSON.stringify(body);
        setError(msg);
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Network error — please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#FFFFFF" }}>
      <PlatformNavbar />

      <main className="flex flex-col items-center px-5 md:px-8 pt-36 pb-24 w-full">
        <div className="flex flex-col gap-10 w-full max-w-[560px]">

          {/* Header */}
          <div className="flex flex-col gap-3">
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontWeight: 500,
                fontSize: 11.5,
                letterSpacing: "0.08em",
                color: "#71717A",
                textTransform: "uppercase",
              }}
            >
              Partner Application
            </p>
            <h1
              style={{
                fontFamily: "'Aspekta', sans-serif",
                fontWeight: 500,
                fontSize: 32,
                letterSpacing: "-0.02em",
                lineHeight: "1.15",
                color: "#09090B",
                margin: 0,
              }}
            >
              Apply to partner with Fil One
            </h1>
            <p
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 400,
                fontSize: 15,
                color: "#71717A",
                lineHeight: "1.6",
                margin: 0,
              }}
            >
              Tell us about your business and the role that fits. Our partner team will get back to you shortly.
            </p>
          </div>

          <div style={{ width: "100%", height: 1, backgroundColor: "rgba(0,0,0,0.07)" }} />

          {submitted ? (
            <div className="flex flex-col items-center gap-5 py-10 text-center">
              <div
                className="flex items-center justify-center w-12 h-12 rounded-full"
                style={{ backgroundColor: "#ECFDF5" }}
              >
                <Check size={22} weight="bold" style={{ color: "#16A34A" }} />
              </div>
              <div className="flex flex-col gap-2">
                <h2
                  style={{
                    fontFamily: "'Aspekta', sans-serif",
                    fontWeight: 500,
                    fontSize: 20,
                    color: "#09090B",
                    margin: 0,
                  }}
                >
                  Application received
                </h2>
                <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 14.5, color: "#71717A", margin: 0 }}>
                  Thanks for applying. We'll review your details and reach out within 2 business days.
                </p>
              </div>
              <a href="/partners" className="btn-secondary" style={{ marginTop: 8 }}>
                Back to Partners
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} data-hs-do-not-collect="true" className="flex flex-col gap-6" noValidate>

              {/* Name row */}
              <div className="grid grid-cols-2 gap-4">
                <Field label="First name" required>
                  <input
                    style={inputStyle}
                    type="text"
                    placeholder="Jane"
                    value={form.firstname}
                    onChange={set("firstname")}
                    required
                    onFocus={(e) => (e.target.style.borderColor = "rgba(0,144,255,0.5)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.10)")}
                  />
                </Field>
                <Field label="Last name" required>
                  <input
                    style={inputStyle}
                    type="text"
                    placeholder="Smith"
                    value={form.lastname}
                    onChange={set("lastname")}
                    required
                    onFocus={(e) => (e.target.style.borderColor = "rgba(0,144,255,0.5)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.10)")}
                  />
                </Field>
              </div>

              <Field label="Work email" required>
                <input
                  style={inputStyle}
                  type="email"
                  placeholder="jane@acme.com"
                  value={form.email}
                  onChange={set("email")}
                  required
                  onFocus={(e) => (e.target.style.borderColor = "rgba(0,144,255,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.10)")}
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Company name" required>
                  <input
                    style={inputStyle}
                    type="text"
                    placeholder="Acme Inc."
                    value={form.company}
                    onChange={set("company")}
                    required
                    onFocus={(e) => (e.target.style.borderColor = "rgba(0,144,255,0.5)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.10)")}
                  />
                </Field>
                <Field label="Job title">
                  <input
                    style={inputStyle}
                    type="text"
                    placeholder="VP Partnerships"
                    value={form.jobtitle}
                    onChange={set("jobtitle")}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(0,144,255,0.5)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.10)")}
                  />
                </Field>
              </div>

              <Field label="Company website">
                <input
                  style={inputStyle}
                  type="url"
                  placeholder="https://acme.com"
                  value={form.website}
                  onChange={set("website")}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(0,144,255,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.10)")}
                />
              </Field>

              {/* Partner type */}
              <fieldset className="flex flex-col gap-2" style={{ border: "none", padding: 0, margin: 0 }}>
                <legend style={{ ...labelStyle, padding: 0 }}>
                  Partner type <span aria-hidden="true" style={{ color: "#DC2626", marginLeft: 2 }}>*</span>
                </legend>
                <div className="flex flex-col gap-2">
                  {PARTNER_TYPES.map(({ value, label, sub }) => {
                    const selected = form.partnerType === value;
                    return (
                      <label
                        key={value}
                        className="flex items-start gap-3 rounded-xl border cursor-pointer transition-colors px-4 py-3"
                        style={{
                          borderColor: selected ? "rgba(0,144,255,0.5)" : "rgba(0,0,0,0.09)",
                          backgroundColor: selected ? "#EFF8FF" : "#FFFFFF",
                        }}
                      >
                        <input
                          type="radio"
                          name="partnerType"
                          value={value}
                          checked={selected}
                          onChange={set("partnerType")}
                          style={{ marginTop: 3, accentColor: "#0070CC" }}
                        />
                        <div>
                          <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 14, color: "#09090B", margin: 0 }}>
                            {label}
                          </p>
                          <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 12.5, color: "#71717A", margin: 0 }}>
                            {sub}
                          </p>
                        </div>
                      </label>
                    );
                  })}
                </div>
                {partnerTypeError && (
                  <p role="alert" style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 13, color: "#DC2626" }}>
                    Please select a partner type.
                  </p>
                )}
              </fieldset>

              {/* Company size */}
              <Field label="Company size">
                <div style={{ position: "relative" }}>
                  <select
                    style={{ ...inputStyle, appearance: "none", cursor: "pointer", paddingRight: 36 }}
                    value={form.companySize}
                    onChange={set("companySize")}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(0,144,255,0.5)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.10)")}
                  >
                    <option value="">Select…</option>
                    {COMPANY_SIZES.map((s) => (
                      <option key={s} value={s}>{s} employees</option>
                    ))}
                  </select>
                  <svg
                    width="14" height="14" viewBox="0 0 14 14" fill="none"
                    style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
                  >
                    <path d="M3 5L7 9L11 5" stroke="#71717A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </Field>

              {/* Message */}
              <Field label="Tell us about your business">
                <textarea
                  style={{ ...inputStyle, minHeight: 110, resize: "vertical" }}
                  placeholder="What do you do, who are your customers, and what makes this a good fit?"
                  value={form.message}
                  onChange={set("message")}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(0,144,255,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.10)")}
                />
              </Field>

              <div className="w-full" style={{ height: 1, backgroundColor: "rgba(0,0,0,0.07)" }} />

              {/* Consent text */}
              <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13, lineHeight: "1.7", color: "#71717A" }}>
                Fil One is committed to protecting your privacy. We'll only use your personal information to administer your account and provide the products and services you requested. From time to time we'd like to contact you about our products and services.
              </p>

              {/* Consent checkbox */}
              <label className="flex items-start gap-3 cursor-pointer" style={{ userSelect: "none" }}>
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={set("consent")}
                  className="peer sr-only"
                />
                <span
                  className="peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2"
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 4,
                    border: form.consent ? "none" : "1.5px solid rgba(0,0,0,0.25)",
                    backgroundColor: form.consent ? "#09090B" : "#FFFFFF",
                    flexShrink: 0,
                    marginTop: 2,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background-color 150ms ease, border 150ms ease",
                    outlineColor: "#0090FF",
                  }}
                >
                  {form.consent && (
                    <Check size={10} color="#FFFFFF" />
                  )}
                </span>
                <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13.5, color: "#52525B", lineHeight: "1.6" }}>
                  I agree to receive other communications from Fil One.
                </span>
              </label>

              <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 12.5, lineHeight: "1.7", color: "#71717A" }}>
                You can unsubscribe at any time. For more information, review our{" "}
                <a href="/privacy" style={{ color: "#71717A", textDecoration: "underline" }}>Privacy Policy</a>.
                {" "}By clicking submit, you consent to allow Fil One to store and process the information submitted.
              </p>

              {error && (
                <p
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontSize: 13.5,
                    color: "#DC2626",
                    backgroundColor: "#FEF2F2",
                    border: "1px solid rgba(220,38,38,0.2)",
                    borderRadius: 8,
                    padding: "10px 14px",
                  }}
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full"
                style={{ opacity: loading ? 0.7 : 1 }}
              >
                <span className="btn-primary-inner w-full justify-center">
                  {loading ? "Submitting…" : "Submit application"}
                </span>
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PartnerApplyPage;
