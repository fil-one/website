import { useState } from "react";
import { Check } from "@phosphor-icons/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";
import {
  HS_PORTAL_ID,
  HS_SUPPORT_FORM_GUID,
  getHubSpotContext,
} from "@/lib/hubspot";

const CATEGORY_OPTIONS = [
  { label: "Product issue", value: "PRODUCT_ISSUE" },
  { label: "Billing issue", value: "BILLING_ISSUE" },
  { label: "General inquiry", value: "GENERAL_INQUIRY" },
  { label: "Feature request", value: "FEATURE_REQUEST" },
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

const Support = () => {
  useSeo({
    title: "Support — Fil One S3 Object Storage",
    description: "Get help from the Fil One support team. Submit a request and we'll get back to you shortly.",
    canonical: "https://filone.io/support",
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
    try {
      const res = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${HS_PORTAL_ID}/${HS_SUPPORT_FORM_GUID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fields: [
              { objectTypeId: "0-1", name: "firstname", value: form.firstname },
              { objectTypeId: "0-1", name: "lastname", value: form.lastname },
              { objectTypeId: "0-1", name: "email", value: form.email },
              { objectTypeId: "0-1", name: "company", value: form.company },
              { objectTypeId: "0-5", name: "content", value: form.content },
              { objectTypeId: "0-5", name: "hs_ticket_category", value: form.categories.join(";") },
            ],
            context: getHubSpotContext("Support"),
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
    } catch {
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
              Support
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
              Get help
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
              Submit a request and our support team will get back to you shortly.
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
                Thanks for reaching out. Our team will review your request and get back to you shortly.
              </p>
            </div>
          ) : (
            /* ── Form ── */
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

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
                <Field label="Last name">
                  <input
                    type="text"
                    value={form.lastname}
                    onChange={set("lastname")}
                    placeholder="Smith"
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = "rgba(0,0,0,0.30)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(0,0,0,0.10)")}
                  />
                </Field>
              </div>

              {/* Email / Company row */}
              <div className="grid grid-cols-2 gap-4">
                <Field label="Email" required>
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
                <Field label="Company name">
                  <input
                    type="text"
                    value={form.company}
                    onChange={set("company")}
                    placeholder="Acme Inc."
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = "rgba(0,0,0,0.30)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(0,0,0,0.10)")}
                  />
                </Field>
              </div>

              {/* Ticket description */}
              <Field label="Ticket description" required>
                <textarea
                  value={form.content}
                  onChange={set("content")}
                  placeholder="Describe your issue or question…"
                  required
                  rows={5}
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                    lineHeight: "1.6",
                  }}
                  onFocus={e => (e.target.style.borderColor = "rgba(0,0,0,0.30)")}
                  onBlur={e => (e.target.style.borderColor = "rgba(0,0,0,0.10)")}
                />
              </Field>

              {/* Category checkboxes */}
              <div className="flex flex-col gap-3">
                <label style={labelStyle}>
                  Category
                  <span style={{ color: "#DC2626", marginLeft: 2 }}>*</span>
                </label>
                {categoryError && (
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 13, color: "#DC2626" }}>
                    Please select at least one category.
                  </p>
                )}
                <div className="flex flex-col gap-2">
                  {CATEGORY_OPTIONS.map(({ label, value }) => {
                    const checked = form.categories.includes(value);
                    return (
                      <label
                        key={value}
                        className="flex items-center gap-3 cursor-pointer"
                        style={{ userSelect: "none" }}
                      >
                        <span
                          onClick={() => toggleCategory(value)}
                          style={{
                            width: 16,
                            height: 16,
                            borderRadius: 4,
                            border: checked ? "none" : "1.5px solid rgba(0,0,0,0.25)",
                            backgroundColor: checked ? "#09090B" : "#FFFFFF",
                            flexShrink: 0,
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "background-color 150ms ease, border 150ms ease",
                            cursor: "pointer",
                          }}
                        >
                          {checked && <Check size={10} color="#FFFFFF" />}
                        </span>
                        <span
                          onClick={() => toggleCategory(value)}
                          style={{
                            fontFamily: "'Funnel Sans', sans-serif",
                            fontWeight: 400,
                            fontSize: 14.5,
                            color: checked ? "#09090B" : "#52525B",
                            transition: "color 150ms ease",
                          }}
                        >
                          {label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="w-full" style={{ height: 1, backgroundColor: "rgba(0,0,0,0.07)" }} />

              {/* Disclaimer */}
              <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13, lineHeight: "1.7", color: "#71717A" }}>
                Fil One needs the contact information you provide to us to contact you about our products and services. You may unsubscribe from these communications at any time. For information on how to unsubscribe, as well as our privacy practices and commitment to protecting your privacy, please review our{" "}
                <a href="/privacy" style={{ color: "#71717A", textDecoration: "underline" }}>Privacy Policy</a>.
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

export default Support;
