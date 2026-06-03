import { useState, useEffect } from "react";
import { X, Check } from "@phosphor-icons/react";
import { trackEvent } from "@/lib/analytics";
import {
  HS_PORTAL_ID,
  HS_WAITLIST_FORM_GUID,
  HS_MARKETING_SUBSCRIPTION_TYPE_ID,
  getHubSpotContext,
} from "@/lib/hubspot";

interface Props {
  open: boolean;
  onClose: () => void;
}

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

const selectStyle: React.CSSProperties = {
  width: "100%",
  fontFamily: "'Funnel Sans', sans-serif",
  fontWeight: 400,
  fontSize: 14,
  color: "#09090B",
  backgroundColor: "#FFFFFF",
  border: "1px solid rgba(0,0,0,0.12)",
  borderRadius: 10,
  padding: "10px 36px 10px 12px",
  appearance: "none",
  WebkitAppearance: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23A1A1AA' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 12px center",
  cursor: "pointer",
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "'DM Mono', monospace",
  fontWeight: 500,
  fontSize: 10.5,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#71717A",
  marginBottom: 6,
  display: "block",
};

const ProductWaitlistModal = ({ open, onClose }: Props) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [email, setEmail] = useState("");
  const [useCase, setUseCase] = useState("");
  const [platform, setPlatform] = useState("");
  const [timeline, setTimeline] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Lock body scroll while open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const reset = () => {
    setProduct(null); setEmail(""); setUseCase(""); setPlatform("");
    setTimeline(""); setTeamSize(""); setNotes("");
    setLoading(false); setSubmitted(false); setError(false);
  };

  const handleClose = () => { reset(); onClose(); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || !email) return;
    setLoading(true);
    setError(false);

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
              ...(useCase   ? [{ objectTypeId: "0-1", name: "primary_use_case",  value: useCase   }] : []),
              ...(platform  ? [{ objectTypeId: "0-1", name: "current_platform",  value: platform  }] : []),
              ...(timeline  ? [{ objectTypeId: "0-1", name: "migration_timeline", value: timeline  }] : []),
              ...(teamSize  ? [{ objectTypeId: "0-1", name: "team_size",          value: teamSize  }] : []),
              ...(notes     ? [{ objectTypeId: "0-1", name: "message",            value: notes     }] : []),
            ],
            context: getHubSpotContext(document.title),
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
      if (!res.ok) throw new Error();
      setSubmitted(true);
      trackEvent("Form Submit", { form: "product-waitlist", page: window.location.pathname });
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div
        className="relative w-full max-w-[540px] rounded-2xl overflow-y-auto"
        style={{
          backgroundColor: "#FFFFFF",
          boxShadow: "0 24px 80px rgba(0,0,0,0.18)",
          maxHeight: "calc(100vh - 48px)",
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-7 pt-7 pb-5">
          <div>
            <h2 style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, fontSize: 20, letterSpacing: "-0.015em", color: "#09090B", margin: 0 }}>
              Join the waitlist
            </h2>
            <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13.5, color: "#71717A", marginTop: 4 }}>
              Helps us prioritise the first wave of alpha invitations.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="flex items-center justify-center rounded-lg transition-colors hover:bg-black/[0.05]"
            style={{ width: 32, height: 32, border: "none", backgroundColor: "transparent", cursor: "pointer", flexShrink: 0 }}
            aria-label="Close"
          >
            <X size={16} color="#71717A" />
          </button>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center gap-3 px-7 pb-10 pt-4 text-center">
            <div className="flex items-center justify-center rounded-full" style={{ width: 48, height: 48, backgroundColor: "#EFF8FF" }}>
              <Check size={22} color="#0090FF" weight="bold" />
            </div>
            <p style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, fontSize: 17, color: "#09090B" }}>You're on the list!</p>
            <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, color: "#71717A", maxWidth: 320 }}>
              We'll reach out as soon as your spot is ready. Keep an eye on your inbox.
            </p>
            <button onClick={handleClose} className="btn-primary mt-2" style={{ border: "none", cursor: "pointer" }}>
              <span className="btn-primary-inner">Done</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-7 pb-7">
            {/* Product interest */}
            <div>
              <span style={labelStyle}>I'm interested in</span>
              <div className="flex gap-2 flex-wrap">
                {PRODUCTS.map(({ key, label }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setProduct(key)}
                    style={{
                      fontFamily: "'Funnel Sans', sans-serif",
                      fontWeight: 400,
                      fontSize: 13.5,
                      padding: "7px 16px",
                      borderRadius: 9999,
                      border: product === key ? "1.5px solid #0090FF" : "1px solid rgba(0,0,0,0.12)",
                      backgroundColor: product === key ? "#EFF8FF" : "#FFFFFF",
                      color: product === key ? "#0070CC" : "#3F3F46",
                      cursor: "pointer",
                      transition: "all 0.12s ease",
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="wl-email" style={labelStyle}>Work email</label>
              <input
                id="wl-email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                style={{
                  ...selectStyle,
                  backgroundImage: "none",
                  padding: "10px 12px",
                }}
              />
            </div>

            {/* 2-col dropdowns */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="wl-usecase" style={labelStyle}>Primary use case</label>
                <select id="wl-usecase" value={useCase} onChange={e => setUseCase(e.target.value)} style={selectStyle}>
                  <option value="">Select…</option>
                  {USE_CASES.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="wl-platform" style={labelStyle}>Where do you run today?</label>
                <select id="wl-platform" value={platform} onChange={e => setPlatform(e.target.value)} style={selectStyle}>
                  <option value="">Select…</option>
                  {PLATFORMS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="wl-timeline" style={labelStyle}>Timeline</label>
                <select id="wl-timeline" value={timeline} onChange={e => setTimeline(e.target.value)} style={selectStyle}>
                  <option value="">Select…</option>
                  {TIMELINES.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="wl-teamsize" style={labelStyle}>Team size</label>
                <select id="wl-teamsize" value={teamSize} onChange={e => setTeamSize(e.target.value)} style={selectStyle}>
                  <option value="">Select…</option>
                  {TEAM_SIZES.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="wl-notes" style={labelStyle}>Notes <span style={{ textTransform: "none", letterSpacing: 0, fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 11 }}>(optional)</span></label>
              <textarea
                id="wl-notes"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={3}
                placeholder="What file types do you work with? How large is your document corpus?"
                style={{
                  ...selectStyle,
                  backgroundImage: "none",
                  padding: "10px 12px",
                  resize: "vertical",
                  lineHeight: 1.55,
                }}
              />
            </div>

            {error && (
              <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 13, color: "#EF4444", margin: 0 }}>
                Something went wrong — please try again.
              </p>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-1">
              <button
                type="button"
                onClick={handleClose}
                className="btn-secondary"
                style={{ cursor: "pointer" }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!product || !email || loading}
                className="btn-primary"
                style={{ border: "none", cursor: (!product || !email || loading) ? "not-allowed" : "pointer", opacity: (!product || !email || loading) ? 0.6 : 1 }}
              >
                <span className="btn-primary-inner">{loading ? "Joining…" : "Join waitlist"}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProductWaitlistModal;
