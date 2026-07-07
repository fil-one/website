import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ArrowLeft } from "@phosphor-icons/react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";
import {
  HS_PORTAL_ID,
  HS_AGENT_TOOLKIT_WAITLIST_FORM_GUID,
  HS_MARKETING_SUBSCRIPTION_TYPE_ID,
  getHubSpotContext,
} from "@/lib/hubspot";

const TIMELINES = [
  "Actively building now",
  "Planning in next 3 months",
  "Evaluating in next 6 months",
  "Just exploring",
];

const TEAM_SIZES = [
  "Just me",
  "2-10 people",
  "11-50 people",
  "51+ people",
];

const TOOLS = [
  "Claude",
  "Cursor",
  "Continue",
  "ChatGPT",
  "Zapier",
  "n8n",
  "Make.com",
  "Not sure yet",
  "Other",
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

const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div className="flex flex-col gap-1.5">
    <label style={labelStyle}>
      {label}
      {required && <span style={{ color: "#DC2626", marginLeft: 2 }}>*</span>}
    </label>
    {children}
  </div>
);

const AgentToolkitWaitlistPage = () => {
  useSeo({
    title: "Join the AI Agent Toolkit Waitlist — Fil One",
    description: "Get early access to the AI Agent Toolkit. Connect your AI tools and automations to Fil One — join the waitlist and we'll reach out when your spot is ready.",
    canonical: "https://fil.one/waitlist/ai-agent-toolkit",
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [timeline, setTimeline] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [otherTool, setOtherTool] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleTool = (tool: string) => {
    setSelectedTools(prev =>
      prev.includes(tool) ? prev.filter(t => t !== tool) : [...prev, tool]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${HS_PORTAL_ID}/${HS_AGENT_TOOLKIT_WAITLIST_FORM_GUID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fields: [
              { objectTypeId: "0-1", name: "email", value: email },
              { objectTypeId: "0-1", name: "firstname", value: firstName },
              { objectTypeId: "0-1", name: "lastname", value: lastName },
              ...(timeline ? [{ objectTypeId: "0-1", name: "ai_toolkit_timeline", value: timeline }] : []),
              ...(teamSize ? [{ objectTypeId: "0-1", name: "team_size", value: teamSize }] : []),
              ...(selectedTools.length > 0 ? [{ objectTypeId: "0-1", name: "ai_tools", value: selectedTools.join(";") }] : []),
              ...(selectedTools.includes("Other") && otherTool ? [{ objectTypeId: "0-1", name: "other_tool", value: otherTool }] : []),
              ...(notes ? [{ objectTypeId: "0-1", name: "ai_toolkit_notes", value: notes }] : []),
            ],
            context: getHubSpotContext("AI Agent Toolkit Waitlist"),
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
      <PlatformNavbar />

      <main className="flex flex-col items-center px-5 md:px-8 pt-36 pb-24 w-full">
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
            <p style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500, fontSize: 11.5, letterSpacing: "0.08em", color: "#71717A", textTransform: "uppercase" }}>
              Early access · AI Agent Toolkit
            </p>
            <h1
              className="text-[28px] md:text-[36px]"
              style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, lineHeight: "1.15", letterSpacing: "-0.02em", color: "#09090B" }}
            >
              Join the waitlist
            </h1>
            <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 15, lineHeight: "1.6", color: "#71717A" }}>
              Get early access to the AI Agent Toolkit — connect your AI tools and automations directly to Fil One. We'll reach out as soon as your spot is ready.
            </p>
          </div>

          <div className="w-full" style={{ height: 1, backgroundColor: "rgba(0,0,0,0.07)" }} />

          {submitted ? (
            <div className="flex flex-col gap-3 py-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-full" style={{ backgroundColor: "#EFF8FF" }}>
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
            <form onSubmit={handleSubmit} data-hs-do-not-collect="true" className="flex flex-col gap-5">

              <div className="grid grid-cols-2 gap-4">
                <Field label="First name" required>
                  <input
                    type="text"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
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
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    placeholder="Smith"
                    required
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = "rgba(0,0,0,0.30)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(0,0,0,0.10)")}
                  />
                </Field>
              </div>

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

              <div className="grid grid-cols-2 gap-4">
                <Field label="Timeline">
                  <select value={timeline} onChange={e => setTimeline(e.target.value)} style={selectStyle} onFocus={e => (e.target.style.borderColor = "rgba(0,0,0,0.30)")} onBlur={e => (e.target.style.borderColor = "rgba(0,0,0,0.10)")}>
                    <option value="">Select…</option>
                    {TIMELINES.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </Field>
                <Field label="Team size">
                  <select value={teamSize} onChange={e => setTeamSize(e.target.value)} style={selectStyle} onFocus={e => (e.target.style.borderColor = "rgba(0,0,0,0.30)")} onBlur={e => (e.target.style.borderColor = "rgba(0,0,0,0.10)")}>
                    <option value="">Select…</option>
                    {TEAM_SIZES.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </Field>
              </div>

              <Field label="Which tools are you connecting?">
                <div className="grid grid-cols-2 gap-x-6 gap-y-3 pt-1">
                  {TOOLS.map(tool => (
                    <label
                      key={tool}
                      className="flex items-center gap-2.5 cursor-pointer"
                      style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14, color: "#3F3F46" }}
                    >
                      <div
                        onClick={() => toggleTool(tool)}
                        className="flex items-center justify-center shrink-0"
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: 5,
                          border: selectedTools.includes(tool) ? "1.5px solid #0090FF" : "1.5px solid rgba(0,0,0,0.18)",
                          backgroundColor: selectedTools.includes(tool) ? "#0090FF" : "#FFFFFF",
                          transition: "all 120ms ease",
                          cursor: "pointer",
                        }}
                      >
                        {selectedTools.includes(tool) && <Check size={11} color="#FFFFFF" weight="bold" />}
                      </div>
                      <span onClick={() => toggleTool(tool)}>{tool}</span>
                    </label>
                  ))}
                </div>
                {selectedTools.includes("Other") && (
                  <input
                    type="text"
                    value={otherTool}
                    onChange={e => setOtherTool(e.target.value)}
                    placeholder="Which tool?"
                    style={{ ...inputStyle, marginTop: 8 }}
                    onFocus={e => (e.target.style.borderColor = "rgba(0,0,0,0.30)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(0,0,0,0.10)")}
                  />
                )}
              </Field>

              <Field label="Notes (optional)">
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  rows={3}
                  placeholder="What are you building with Fil One?"
                  style={{ ...inputStyle, resize: "vertical", lineHeight: 1.55 }}
                  onFocus={e => (e.target.style.borderColor = "rgba(0,0,0,0.30)")}
                  onBlur={e => (e.target.style.borderColor = "rgba(0,0,0,0.10)")}
                />
              </Field>

              <div className="w-full" style={{ height: 1, backgroundColor: "rgba(0,0,0,0.07)" }} />

              <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 12.5, lineHeight: "1.7", color: "#71717A" }}>
                By submitting this form you consent to allow Fil One to store and process your information and send you product updates. You can unsubscribe at any time. See our{" "}
                <a href="/privacy" style={{ color: "#71717A", textDecoration: "underline" }}>Privacy Policy</a>.
              </p>

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

      <Footer />
    </div>
  );
};

export default AgentToolkitWaitlistPage;
