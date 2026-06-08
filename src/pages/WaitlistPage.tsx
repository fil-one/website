import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ArrowLeft } from "@phosphor-icons/react";
import LandingNavbar from "@/components/LandingNavbar";
import LandingFooter from "@/components/LandingFooter";
import { useSeo } from "@/hooks/useSeo";
import {
  HS_PORTAL_ID,
  HS_WAITLIST_FORM_GUID,
  HS_MARKETING_SUBSCRIPTION_TYPE_ID,
  getHubSpotContext,
} from "@/lib/hubspot";

type Product = "rag" | "agent" | "both";

const PRODUCTS: { key: Product; label: string }[] = [
  { key: "rag",   label: "RAG Pipeline" },
  { key: "agent", label: "AI Agent Toolkit" },
  { key: "both",  label: "Both" },
];

const USE_CASES = [
  "AI / ML workloads",
  "Data analytics",
  "Document search & retrieval",
  "Backup & archive",
  "Content storage",
  "Other",
];

const PLATFORMS = [
  "AWS S3",
  "Azure Blob",
  "Google Cloud Storage",
  "On-premise",
  "Not using cloud storage yet",
  "Other",
];

const TIMELINES = [
  "Immediately",
  "1–3 months",
  "3–6 months",
  "6+ months",
];

const TEAM_SIZES = [
  "1–10",
  "11–50",
  "51–200",
  "200+",
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

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: "none",
  WebkitAppearance: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23A1A1AA' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 14px center",
  paddingRight: 36,
  cursor: "pointer",
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

const WaitlistPage = () => {
  useSeo({
    title: "Join the Waitlist — Fil One RAG Pipeline & AI Agent Toolkit",
    description: "Get early access to Fil One's RAG Pipeline and AI Agent Toolkit. Join the waitlist and we'll reach out when your spot is ready.",
    canonical: "https://filone.io/waitlist",
  });

  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [productError, setProductError] = useState(false);
  const [email, setEmail] = useState("");
  const [useCase, setUseCase] = useState("");
  const [platform, setPlatform] = useState("");
  const [timeline, setTimeline] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) {
      setProductError(true);
      return;
    }
    setLoading(true);
    setError(null);
    setProductError(false);

    const productLabel = PRODUCTS.find(p => p.key === product)?.label ?? product;

    try {
      const res = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${HS_PORTAL_ID}/${HS_WAITLIST_FORM_GUID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fields: [
              { objectTypeId: "0-1", name: "email", value: email },
              { objectTypeId: "0-1", name: "product_interest", value: productLabel },
              ...(useCase  ? [{ objectTypeId: "0-1", name: "primary_use_case",   value: useCase   }] : []),
              ...(platform ? [{ objectTypeId: "0-1", name: "current_platform",   value: platform  }] : []),
              ...(timeline ? [{ objectTypeId: "0-1", name: "migration_timeline", value: timeline  }] : []),
              ...(teamSize ? [{ objectTypeId: "0-1", name: "team_size",          value: teamSize  }] : []),
              ...(notes    ? [{ objectTypeId: "0-1", name: "message",            value: notes     }] : []),
            ],
            context: getHubSpotContext("Join Waitlist"),
            legalConsentOptions: {
              consent: {
                consentToProcess: true,
                text: "By joining the waitlist, you consent to allow Fil One to store and process your information and send you product updates.",
                communications: [{
                  value: true,
                  subscriptionTypeId: HS_MARKETING_SUBSCRIPTION_TYPE_ID,
                  text: "I agree to receive product updates from Fil One.",
                }],
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
    } catch {
      setError("Network error — please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#FFFFFF" }}>
      <LandingNavbar />

      <main className="flex flex-col items-center px-5 md:px-8 pt-28 pb-24 w-full">
        <div className="flex flex-col gap-10 w-full max-w-[560px]">

          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5"
            style={{
              fontFamily: "'Funnel Sans', sans-serif",
              fontWeight: 400,
              fontSize: 14,
              color: "#71717A",
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              width: "fit-content",
              transition: "color 150ms ease",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#09090B")}
            onMouseLeave={e => (e.currentTarget.style.color = "#71717A")}
          >
            <ArrowLeft size={14} />
            Back
          </button>

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
              Early access
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
              Join the waitlist
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
              Get early access to the RAG Pipeline and AI Agent Toolkit. We'll reach out as soon as your spot is ready.
            </p>
          </div>

          <div className="w-full" style={{ height: 1, backgroundColor: "rgba(0,0,0,0.07)" }} />

          {submitted ? (
            /* ── Success state ── */
            <div className="flex flex-col gap-3 py-6">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-full"
                style={{ backgroundColor: "#EFF8FF" }}
              >
                <Check size={18} color="#0090FF" />
              </div>
              <p style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, fontSize: 20, color: "#09090B", letterSpacing: "-0.01em" }}>
                You're on the list!
              </p>
              <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14.5, color: "#71717A", lineHeight: "1.6" }}>
                We'll reach out as soon as your spot is ready. Keep an eye on your inbox.
              </p>
            </div>
          ) : (
            /* ── Form ── */
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* Product interest */}
              <div className="flex flex-col gap-1.5">
                <label style={labelStyle}>
                  I'm interested in
                  <span style={{ color: "#DC2626", marginLeft: 2 }}>*</span>
                </label>
                {productError && (
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 13, color: "#DC2626" }}>
                    Please select an option.
                  </p>
                )}
                <div className="flex gap-2 flex-wrap">
                  {PRODUCTS.map(({ key, label }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => { setProduct(key); setProductError(false); }}
                      style={{
                        fontFamily: "'Funnel Sans', sans-serif",
                        fontWeight: 400,
                        fontSize: 14,
                        padding: "8px 18px",
                        borderRadius: 9999,
                        border: product === key ? "1.5px solid #0090FF" : "1px solid rgba(0,0,0,0.12)",
                        backgroundColor: product === key ? "#EFF8FF" : "#FFFFFF",
                        color: product === key ? "#0070CC" : "#52525B",
                        cursor: "pointer",
                        transition: "all 0.12s ease",
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Work email */}
              <Field label="Work email" required>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = "rgba(0,0,0,0.30)")}
                  onBlur={e => (e.target.style.borderColor = "rgba(0,0,0,0.10)")}
                />
              </Field>

              {/* 2-col dropdowns */}
              <div className="grid grid-cols-2 gap-4">
                <Field label="Primary use case">
                  <select
                    value={useCase}
                    onChange={e => setUseCase(e.target.value)}
                    style={selectStyle}
                    onFocus={e => (e.target.style.borderColor = "rgba(0,0,0,0.30)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(0,0,0,0.10)")}
                  >
                    <option value="">Select…</option>
                    {USE_CASES.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </Field>
                <Field label="Where do you run today?">
                  <select
                    value={platform}
                    onChange={e => setPlatform(e.target.value)}
                    style={selectStyle}
                    onFocus={e => (e.target.style.borderColor = "rgba(0,0,0,0.30)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(0,0,0,0.10)")}
                  >
                    <option value="">Select…</option>
                    {PLATFORMS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </Field>
                <Field label="Timeline">
                  <select
                    value={timeline}
                    onChange={e => setTimeline(e.target.value)}
                    style={selectStyle}
                    onFocus={e => (e.target.style.borderColor = "rgba(0,0,0,0.30)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(0,0,0,0.10)")}
                  >
                    <option value="">Select…</option>
                    {TIMELINES.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </Field>
                <Field label="Team size">
                  <select
                    value={teamSize}
                    onChange={e => setTeamSize(e.target.value)}
                    style={selectStyle}
                    onFocus={e => (e.target.style.borderColor = "rgba(0,0,0,0.30)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(0,0,0,0.10)")}
                  >
                    <option value="">Select…</option>
                    {TEAM_SIZES.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </Field>
              </div>

              {/* Notes */}
              <Field label="Notes (optional)">
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  rows={3}
                  placeholder="What file types do you work with? How large is your document corpus?"
                  style={{ ...inputStyle, resize: "vertical", lineHeight: 1.55 }}
                  onFocus={e => (e.target.style.borderColor = "rgba(0,0,0,0.30)")}
                  onBlur={e => (e.target.style.borderColor = "rgba(0,0,0,0.10)")}
                />
              </Field>

              <div className="w-full" style={{ height: 1, backgroundColor: "rgba(0,0,0,0.07)" }} />

              {/* Privacy */}
              <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 12.5, lineHeight: "1.7", color: "#71717A" }}>
                By submitting this form you consent to allow Fil One to store and process your information and send you product updates. You can unsubscribe at any time. See our{" "}
                <a href="/privacy" style={{ color: "#71717A", textDecoration: "underline" }}>Privacy Policy</a>.
              </p>

              {/* Submit */}
              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  disabled={!email || loading}
                  className="btn-primary"
                  style={{ border: "none", cursor: (!email || loading) ? "default" : "pointer", opacity: (!email || loading) ? 0.7 : 1, width: "100%" }}
                >
                  <span className="btn-primary-inner" style={{ padding: "11px 24px", fontSize: 15 }}>
                    {loading ? "Joining…" : "Join waitlist"}
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

      <LandingFooter />
    </div>
  );
};

export default WaitlistPage;
