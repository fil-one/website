import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";

const pStyle = {
  fontFamily: "'Funnel Sans', sans-serif" as const,
  fontWeight: 400,
  fontSize: 14.5,
  lineHeight: "1.7",
  color: "#52525B",
};

const liStyle = {
  fontFamily: "'Funnel Sans', sans-serif" as const,
  fontWeight: 400,
  fontSize: 14.5,
  lineHeight: "1.7",
  color: "#52525B",
};

const h2Style = {
  fontFamily: "'Funnel Sans', sans-serif" as const,
  fontWeight: 600,
  fontSize: 15,
  color: "#09090B",
  letterSpacing: "-0.01em",
};

const h3Style = {
  fontFamily: "'Funnel Sans', sans-serif" as const,
  fontWeight: 600,
  fontSize: 14.5,
  color: "#09090B",
  letterSpacing: "-0.01em",
};

const thStyle = {
  fontFamily: "'Funnel Sans', sans-serif" as const,
  fontWeight: 600,
  fontSize: 13.5,
  color: "#09090B",
  textAlign: "left" as const,
  padding: "12px 16px",
  borderBottom: "1px solid rgba(0,0,0,0.07)",
  backgroundColor: "#F4F4F5",
};

const tdStyle = {
  fontFamily: "'Funnel Sans', sans-serif" as const,
  fontWeight: 400,
  fontSize: 14,
  color: "#52525B",
  padding: "12px 16px",
  borderBottom: "1px solid rgba(0,0,0,0.07)",
  verticalAlign: "top" as const,
};

const creditBadgeStyle = {
  display: "inline-block",
  backgroundColor: "#EFF8FF",
  color: "#0070CC",
  fontFamily: "'Funnel Sans', sans-serif" as const,
  fontWeight: 600,
  fontSize: 13.5,
  padding: "2px 12px",
  borderRadius: 9999,
};

const dtStyle = {
  fontFamily: "'Funnel Sans', sans-serif" as const,
  fontWeight: 600,
  fontSize: 14.5,
  color: "#09090B",
};

const ddStyle = {
  fontFamily: "'Funnel Sans', sans-serif" as const,
  fontWeight: 400,
  fontSize: 14.5,
  lineHeight: "1.7",
  color: "#52525B",
  margin: 0,
  paddingLeft: 16,
  borderLeft: "2px solid rgba(0,0,0,0.1)",
};

const CREDIT_TIERS = [
  { uptime: "Less than 99.9% but equal to or greater than 99.0%", credit: "10%" },
  { uptime: "Less than 99.0% but equal to or greater than 95.0%", credit: "25%" },
  { uptime: "Less than 95.0%", credit: "100%" },
];

const Sla = () => {
  useSeo({
    title: "Service Level Agreement · Fil One",
    description:
      "The Fil One Object Storage Service Level Agreement: uptime commitment, service credit tiers, and how to request credits.",
    canonical: "https://fil.one/sla",
  });

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#FFFFFF" }}>
      <PlatformNavbar />

      <main className="flex flex-col items-center px-5 md:px-8 pt-36 pb-24 w-full">
        <div className="flex flex-col gap-10 w-full max-w-[720px]">

          {/* Header */}
          <div className="flex flex-col gap-2">
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
              Fil One Object Storage Service Level Agreement
            </h1>
            <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13.5, color: "#71717A" }}>
              Last Updated: June 22, 2026
            </p>
          </div>

          <div className="w-full" style={{ height: 1, backgroundColor: "rgba(0,0,0,0.07)" }} />

          {/* Intro */}
          <p style={pStyle}>
            This Fil One Object Storage Service Level Agreement (&ldquo;SLA&rdquo;) is a policy governing the use of Fil One Object Storage and applies separately to each account using Fil One Object Storage. In the event of a conflict between the terms of this SLA and the terms of the Fil One Terms of Service or other agreement with FIL One LLC governing your use of our Services (the &ldquo;Agreement&rdquo;), the terms and conditions of this SLA apply, but only to the extent of such conflict. Capitalized terms used herein but not defined herein shall have the meanings set forth in the Agreement.
          </p>

          {/* 1 */}
          <div className="flex flex-col gap-3">
            <h2 style={h2Style}>1. Service Commitment</h2>
            <p style={pStyle}>
              FIL One LLC will use commercially reasonable efforts to make <strong>Fil One Object Storage</strong> available with a Monthly Uptime Percentage, as described below, during any monthly billing cycle (the &ldquo;Service Commitment&rdquo;). In the event Fil One Object Storage does not meet the Service Commitment, you will be eligible to receive a Service Credit as described below.
            </p>
          </div>

          {/* 2 */}
          <div className="flex flex-col gap-3">
            <h2 style={h2Style}>2. Service Credits</h2>
            <p style={pStyle}>
              Service Credits are calculated as a percentage of the total charges paid by you for Fil One Object Storage in the affected Fil One Network region or zone affected for the billing cycle in which the Monthly Uptime Percentage fell within the ranges set forth in the table below.
            </p>

            <h3 style={h3Style}>Monthly Uptime Percentage &amp; Service Credit Tiers</h3>
            <p style={pStyle}>
              For all data storage, retrieval, and API requests to <strong>Fil One Object Storage</strong>:
            </p>

            <div className="w-full overflow-x-auto">
              <table
                className="w-full"
                style={{
                  borderCollapse: "collapse",
                  border: "1px solid rgba(0,0,0,0.07)",
                  borderRadius: 8,
                  overflow: "hidden",
                }}
              >
                <thead>
                  <tr>
                    <th style={thStyle}>Monthly Uptime Percentage</th>
                    <th style={thStyle}>Service Credit Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {CREDIT_TIERS.map((tier, i) => (
                    <tr key={tier.credit} style={i % 2 === 1 ? { backgroundColor: "#FAFAFA" } : undefined}>
                      <td style={tdStyle}>{tier.uptime}</td>
                      <td style={tdStyle}>
                        <span style={creditBadgeStyle}>{tier.credit}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p style={pStyle}>
              We will apply any Service Credits only against future Fil One Object Storage payments otherwise due from you. At our discretion, we may issue the Service Credit to the credit card or wallet address you used to pay for the billing cycle in which the Unavailability occurred. Service Credits will not entitle you to any refund or other payment from FIL One LLC. A Service Credit will be applicable and issued only if the credit amount for the applicable monthly billing cycle is greater than one dollar ($1 USD). Service Credits may not be transferred or applied to any other account.
            </p>
          </div>

          {/* 3 */}
          <div className="flex flex-col gap-3">
            <h2 style={h2Style}>3. Credit Request and Payment Procedures</h2>
            <p style={pStyle}>
              To receive a Service Credit, you must submit a claim by opening a support case in the Fil One Console. To be eligible, the credit request must be received by us by the end of the second billing cycle after which the incident occurred and must include:
            </p>
            <ol className="flex flex-col gap-2 pl-5 list-decimal">
              <li style={liStyle}>The words &ldquo;SLA Credit Request&rdquo; in the subject line;</li>
              <li style={liStyle}>The dates, times, and affected Fil One network regions or endpoints of each Unavailability incident that you are claiming;</li>
              <li style={liStyle}>Your account identifiers and the specific Fil One Object Storage buckets affected; and</li>
              <li style={liStyle}>Your request logs or network monitoring records that document the errors and corroborate your claimed outage (any confidential or sensitive information in these logs should be removed or replaced with asterisks).</li>
            </ol>
            <p style={pStyle}>
              If the Monthly Uptime Percentage of such request is confirmed by us and is less than the Service Commitment, then we will issue the Service Credit to you within one billing cycle following the month in which your request is confirmed by us. Your failure to provide the request and other information as required above will disqualify you from receiving a Service Credit.
            </p>
          </div>

          {/* 4 */}
          <div className="flex flex-col gap-3">
            <h2 style={h2Style}>4. SLA Exclusions</h2>
            <p style={pStyle}>
              The Service Commitment does not apply to any unavailability, suspension or termination of Fil One Object Storage, or any other Fil One Object Storage performance issues:
            </p>
            <ul className="flex flex-col gap-2 pl-5 list-disc">
              <li style={liStyle}>That result from a suspension or termination of your right to use Fil One Object Storage in accordance with the Agreement;</li>
              <li style={liStyle}>Caused by factors outside of our reasonable control, including any force majeure event or Internet access or related problems beyond the demarcation point of Fil One Object Storage;</li>
              <li style={liStyle}>That result from any actions or inactions of you or any third party;</li>
              <li style={liStyle}>That result from your equipment, software or other technology and/or third party equipment, software or other technology (other than third party equipment within our direct control);</li>
              <li style={liStyle}>That result from any planned maintenance as provided for pursuant to the Agreement; or</li>
              <li style={liStyle}>Arising from our suspension and termination of your right to use Fil One Object Storage in accordance with the Agreement.</li>
            </ul>
            <p style={pStyle}>
              If availability is impacted by factors other than those used in our Monthly Uptime Percentage calculation, then we may issue a Service Credit considering such factors at our sole discretion.
            </p>
          </div>

          {/* 5 */}
          <div className="flex flex-col gap-3">
            <h2 style={h2Style}>5. Definitions</h2>
            <dl className="flex flex-col gap-4 m-0">
              <div className="flex flex-col gap-1.5">
                <dt style={dtStyle}>Monthly Uptime Percentage</dt>
                <dd style={ddStyle}>
                  Calculated by subtracting from 100% the percentage of minutes during the month in which Fil One Object Storage was in a state of Unavailability. Monthly Uptime Percentage measurements exclude downtime resulting directly or indirectly from any FIL One SLA Exclusions.
                </dd>
              </div>
              <div className="flex flex-col gap-1.5">
                <dt style={dtStyle}>Unavailability / Unavailable</dt>
                <dd style={ddStyle}>
                  When all valid storage or retrieval requests to Fil One Object Storage fail during a 5-minute interval, or when the API error rate exceeds 10% over a continuous 5-minute window.
                </dd>
              </div>
              <div className="flex flex-col gap-1.5">
                <dt style={dtStyle}>Service Credit</dt>
                <dd style={ddStyle}>
                  A dollar credit, calculated as set forth above, that we may credit back to an eligible account.
                </dd>
              </div>
            </dl>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Sla;
