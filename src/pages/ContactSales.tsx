import { useState } from "react";
import { Check } from "@phosphor-icons/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";
import {
  HS_PORTAL_ID,
  HS_CONTACT_FORM_GUID as HS_FORM_GUID,
  HS_MARKETING_SUBSCRIPTION_TYPE_ID,
  getHubSpotContext,
} from "@/lib/hubspot";

const DATA_OPTIONS = [
  "0-1 TB",
  "1-10 TB",
  "10-100 TB",
  "100-500 TB",
  "500-1,000 TB",
  "1+ PB",
];

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
  <div className="flex flex-col gap-1.5">
    <label style={labelStyle}>
      {label}
      {required && <span style={{ color: "#DC2626", marginLeft: 2 }}>*</span>}
    </label>
    {children}
  </div>
);

const ContactSales = () => {
  useSeo({
    title: "Contact Sales — Fil One S3 Object Storage",
    description: "Talk to the Fil One team about enterprise S3-compatible object storage pricing, volume discounts, and custom SLAs.",
    canonical: "https://filone.io/contact-sales",
  });

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    company: "",
    email: "",
    dataStorage: "",
    consent: false,
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [radioError, setRadioError] = useState(false);

  const set = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setForm((f) => ({ ...f, [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Manual validation for hidden radio group
    if (!form.dataStorage) {
      setRadioError(true);
      return;
    }
    setLoading(true);
    setError(null);
    setRadioError(false);
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
              { objectTypeId: "0-1", name: "company", value: form.company },
              { objectTypeId: "0-1", name: "email", value: form.email },
              { objectTypeId: "0-1", name: "how_much_data_are_you_looking_to_store", value: form.dataStorage },
            ],
            context: getHubSpotContext("Contact Sales"),
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
        const msg = body?.errors?.map((e: { message: string }) => e.message).join(" | ") || body?.message || JSON.stringify(body);
        console.error("HubSpot submission error:", body);
        setError(msg);
        return;
      }
      setSubmitted(true);
    } catch (err) {
      setError("Network error — please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#FFFFFF" }}>
      <Navbar />

      <main className="flex flex-col items-center px-5 md:px-8 pt-28 pb-24 w-full">
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
              Contact Sales
            </p>
            <h1
              className="text-[28px] md:text-[36px]"
              style={{
                fontFamily: "'Aspekta', sans-serif",
                fontWeight: 500,
                lineHeight: "1.15",
                letterSpacing: "-0.02em",
                color: "#09090B",
              }}
            >
              Talk to our team
            </h1>
            <p
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 400,
                fontSize: 15,
                lineHeight: "1.6",
                color: "#71717A",
              }}
            >
              Tell us about your use case and we'll get back to you shortly.
            </p>
          </div>

          <div className="w-full" style={{ height: 1, backgroundColor: "rgba(0,0,0,0.07)" }} />

          {submitted ? (
            /* ── Success state ── */
            <div className="flex flex-col gap-3 py-6">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-full"
                style={{ backgroundColor: "#F0FDF4" }}
              >
                <Check size={18} color="#22C55E" />
              </div>
              <p style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, fontSize: 20, color: "#09090B", letterSpacing: "-0.01em" }}>
                We'll be in touch soon.
              </p>
              <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14.5, color: "#71717A", lineHeight: "1.6" }}>
                Thanks for reaching out. Our team will review your message and get back to you shortly.
              </p>
            </div>
          ) : (
            /* ── Form ── */
            <form onSubmit={handleSubmit} data-hs-do-not-collect="true" className="flex flex-col gap-5">

              {/* First / Last name row */}
              <div className="grid grid-cols-2 gap-4">
                <Field label="First name" required>
                  <input
                    type="text"
                    value={form.firstname}
                    onChange={set("firstname")}
                    placeholder="Jane"
                    required
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = "rgba(0,0,0,0.30)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(0,0,0,0.10)")}
                  />
                </Field>
                <Field label="Last name" required>
                  <input
                    type="text"
                    value={form.lastname}
                    onChange={set("lastname")}
                    placeholder="Smith"
                    required
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = "rgba(0,0,0,0.30)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(0,0,0,0.10)")}
                  />
                </Field>
              </div>

              <Field label="Company name" required>
                <input
                  type="text"
                  value={form.company}
                  onChange={set("company")}
                  placeholder="Acme Inc."
                  required
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = "rgba(0,0,0,0.30)")}
                  onBlur={e => (e.target.style.borderColor = "rgba(0,0,0,0.10)")}
                />
              </Field>

              <Field label="Work email" required>
                <input
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  placeholder="jane@acme.com"
                  required
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = "rgba(0,0,0,0.30)")}
                  onBlur={e => (e.target.style.borderColor = "rgba(0,0,0,0.10)")}
                />
              </Field>

              {/* Data storage radio group */}
              <div className="flex flex-col gap-3">
                <label style={labelStyle}>
                  How much data are you looking to store?
                  <span style={{ color: "#DC2626", marginLeft: 2 }}>*</span>
                </label>
                {radioError && (
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 13, color: "#DC2626" }}>
                    Please select an option.
                  </p>
                )}
                <div className="flex flex-col gap-2">
                  {DATA_OPTIONS.map((option) => {
                    const checked = form.dataStorage === option;
                    return (
                      <label
                        key={option}
                        className="flex items-center gap-3 cursor-pointer"
                        style={{ userSelect: "none" }}
                      >
                        <input
                          type="radio"
                          name="dataStorage"
                          value={option}
                          checked={checked}
                          onChange={() => { setForm((f) => ({ ...f, dataStorage: option })); setRadioError(false); }}
                          style={{ display: "none" }}
                        />
                        {/* Custom radio */}
                        <span
                          style={{
                            width: 17,
                            height: 17,
                            borderRadius: "50%",
                            border: checked ? "5px solid #09090B" : "1.5px solid rgba(0,0,0,0.25)",
                            backgroundColor: "#FFFFFF",
                            flexShrink: 0,
                            transition: "border 150ms ease",
                            display: "inline-block",
                          }}
                        />
                        <span
                          style={{
                            fontFamily: "'Funnel Sans', sans-serif",
                            fontWeight: 400,
                            fontSize: 14.5,
                            color: checked ? "#09090B" : "#52525B",
                            transition: "color 150ms ease",
                          }}
                        >
                          {option}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

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
                  style={{ display: "none" }}
                />
                <span
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
                By clicking submit, you consent to allow Fil One to store and process the information submitted.
              </p>

              {/* Submit */}
              <div className="flex flex-col gap-2 pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{ border: "none", cursor: loading ? "default" : "pointer", opacity: loading ? 0.7 : 1, width: "100%" }}
                >
                  <span className="btn-primary-inner" style={{ padding: "11px 24px", fontSize: 15 }}>
                    {loading ? "Submitting…" : "Submit"}
                  </span>
                </button>
                {error && (
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 13, color: "#DC2626", textAlign: "center" }}>
                    {error}
                  </p>
                )}
              </div>

            </form>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactSales;
