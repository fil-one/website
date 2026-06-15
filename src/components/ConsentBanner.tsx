import { useState } from "react";
import { getConsent, setConsent } from "@/lib/consent";

const ConsentBanner = () => {
  const [visible, setVisible] = useState(() => getConsent() === null);

  if (!visible) return null;

  const accept = () => { setConsent("accepted"); setVisible(false); };
  const decline = () => { setConsent("declined"); setVisible(false); };

  return (
    <div
      className="fixed bottom-5 left-1/2 z-[100] -translate-x-1/2 w-full max-w-[640px] px-4"
      style={{ pointerEvents: "none" }}
    >
      <div
        className="flex items-center justify-between gap-4 rounded-2xl px-4 py-3 border"
        style={{
          backgroundColor: "#FFFFFF",
          borderColor: "rgba(0,0,0,0.08)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",
          pointerEvents: "auto",
        }}
      >
        <p
          style={{
            fontFamily: "'Funnel Sans', sans-serif",
            fontWeight: 400,
            fontSize: 13,
            color: "#52525B",
            lineHeight: "1.5",
          }}
        >
          We use cookies to improve your experience.{" "}
          <a href="/privacy" style={{ color: "#52525B", textDecoration: "underline" }}>
            Privacy Policy
          </a>
        </p>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={decline}
            style={{
              fontFamily: "'Funnel Sans', sans-serif",
              fontWeight: 400,
              fontSize: 13,
              color: "#71717A",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "5px 10px",
              fontSize: 12.5,
              borderRadius: 8,
            }}
            className="hover:bg-black/[0.04] transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="btn-primary btn-primary-sm"
            style={{ border: "none", cursor: "pointer" }}
          >
            <span className="btn-primary-inner" style={{ padding: "5px 14px", fontSize: 12.5 }}>Accept</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentBanner;
