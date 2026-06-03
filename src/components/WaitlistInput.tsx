import { useState } from "react";
import { Check } from "@phosphor-icons/react";
import { trackEvent } from "@/lib/analytics";
import {
  HS_PORTAL_ID,
  HS_WAITLIST_FORM_GUID as HS_FORM_GUID,
  HS_MARKETING_SUBSCRIPTION_TYPE_ID,
  getHubSpotContext,
} from "@/lib/hubspot";

const WaitlistInput = ({ className = "" }: { className?: string }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${HS_PORTAL_ID}/${HS_FORM_GUID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fields: [{ objectTypeId: "0-1", name: "email", value: email }],
            context: getHubSpotContext(document.title),
            legalConsentOptions: {
              consent: {
                consentToProcess: true,
                text: "By joining the waitlist, you consent to allow Fil One to store and process your email address and send you product updates.",
                communications: [
                  {
                    value: true,
                    subscriptionTypeId: HS_MARKETING_SUBSCRIPTION_TYPE_ID,
                    text: "I agree to receive product updates and communications from Fil One.",
                  },
                ],
              },
            },
          }),
        }
      );
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        console.error("HubSpot waitlist submission error:", body);
        throw new Error();
      }
      setSubmitted(true);
      trackEvent("Form Submit", { form: "waitlist", page: window.location.pathname });
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div
        className={`flex items-center justify-center gap-2 px-5 py-3 rounded-full ${className}`}
        style={{ backgroundColor: "#F4F4F5" }}
      >
        <Check size={16} />
        <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 500, fontSize: 14.5, color: "#3F3F46" }}>
          You're on the list!
        </span>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      data-hs-do-not-collect="true"
      className={`flex items-center gap-0 ${className}`}
      style={{
        position: "relative",
        backgroundColor: "#FFFFFF",
        borderRadius: 9999,
        padding: "4px 4px 4px 20px",
        border: "1px solid rgba(0,0,0,0.10)",
      }}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your work email"
        aria-label="Work email address"
        required
        style={{
          background: "transparent",
          border: "none",
          outline: "none",
          fontFamily: "'Funnel Sans', sans-serif",
          fontWeight: 400,
          fontSize: 14.5,
          color: "#09090B",
          flex: 1,
          minWidth: 0,
        }}
      />
      <button
        type="submit"
        disabled={loading}
        className="btn-primary shrink-0"
        style={{ border: "none", cursor: loading ? "default" : "pointer", opacity: loading ? 0.7 : 1 }}
      >
        <span className="btn-primary-inner" style={{ padding: "8px 18px", fontSize: 14.5 }}>
          {loading ? "Joining…" : "Join waitlist"}
        </span>
      </button>
      {error && (
        <span style={{ position: "absolute", bottom: -20, left: 20, fontFamily: "'Funnel Sans', sans-serif", fontSize: 12, color: "#EF4444" }}>
          Something went wrong. Please try again.
        </span>
      )}
    </form>
  );
};

export default WaitlistInput;
