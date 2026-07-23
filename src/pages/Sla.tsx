import { LegalPage, LegalSection, LegalP, LegalList, LegalTable } from "@/components/LegalPage";
import { useSeo } from "@/hooks/useSeo";

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
    canonical: "https://www.fil.one/sla",
  });

  return (
    <LegalPage title="Fil One Object Storage Service Level Agreement" meta="Last Updated: June 22, 2026">
      <LegalP>
        This Fil One Object Storage Service Level Agreement (&ldquo;SLA&rdquo;) is a policy governing the use of Fil One Object Storage and applies separately to each account using Fil One Object Storage. In the event of a conflict between the terms of this SLA and the terms of the Fil One Terms of Service or other agreement with FIL One LLC governing your use of our Services (the &ldquo;Agreement&rdquo;), the terms and conditions of this SLA apply, but only to the extent of such conflict. Capitalized terms used herein but not defined herein shall have the meanings set forth in the Agreement.
      </LegalP>

      <LegalSection title="1. Service Commitment">
        <LegalP>
          FIL One LLC will use commercially reasonable efforts to make <strong>Fil One Object Storage</strong> available with a Monthly Uptime Percentage, as described below, during any monthly billing cycle (the &ldquo;Service Commitment&rdquo;). In the event Fil One Object Storage does not meet the Service Commitment, you will be eligible to receive a Service Credit as described below.
        </LegalP>
      </LegalSection>

      <LegalSection title="2. Service Credits">
        <LegalP>
          Service Credits are calculated as a percentage of the total charges paid by you for Fil One Object Storage in the affected Fil One Network region or zone affected for the billing cycle in which the Monthly Uptime Percentage fell within the ranges set forth in the table below.
        </LegalP>

        <h3 className="m-0 font-sans font-semibold text-[14.5px] tracking-[-0.01em] text-zinc-950">
          Monthly Uptime Percentage &amp; Service Credit Tiers
        </h3>
        <LegalP>
          For all data storage, retrieval, and API requests to <strong>Fil One Object Storage</strong>:
        </LegalP>

        <LegalTable
          headers={["Monthly Uptime Percentage", "Service Credit Percentage"]}
          rows={CREDIT_TIERS.map(tier => ({
            key: tier.credit,
            cells: [
              tier.uptime,
              <span className="inline-block rounded-full bg-brand-50 px-3 py-0.5 font-sans font-semibold text-[13.5px] text-brand-600">
                {tier.credit}
              </span>,
            ],
          }))}
        />

        <LegalP>
          We will apply any Service Credits only against future Fil One Object Storage payments otherwise due from you. At our discretion, we may issue the Service Credit to the credit card or wallet address you used to pay for the billing cycle in which the Unavailability occurred. Service Credits will not entitle you to any refund or other payment from FIL One LLC. A Service Credit will be applicable and issued only if the credit amount for the applicable monthly billing cycle is greater than one dollar ($1 USD). Service Credits may not be transferred or applied to any other account.
        </LegalP>
      </LegalSection>

      <LegalSection title="3. Credit Request and Payment Procedures">
        <LegalP>
          To receive a Service Credit, you must submit a claim by opening a support case in the Fil One Console. To be eligible, the credit request must be received by us by the end of the second billing cycle after which the incident occurred and must include:
        </LegalP>
        <LegalList ordered>
          <li>The words &ldquo;SLA Credit Request&rdquo; in the subject line;</li>
          <li>The dates, times, and affected Fil One network regions or endpoints of each Unavailability incident that you are claiming;</li>
          <li>Your account identifiers and the specific Fil One Object Storage buckets affected; and</li>
          <li>Your request logs or network monitoring records that document the errors and corroborate your claimed outage (any confidential or sensitive information in these logs should be removed or replaced with asterisks).</li>
        </LegalList>
        <LegalP>
          If the Monthly Uptime Percentage of such request is confirmed by us and is less than the Service Commitment, then we will issue the Service Credit to you within one billing cycle following the month in which your request is confirmed by us. Your failure to provide the request and other information as required above will disqualify you from receiving a Service Credit.
        </LegalP>
      </LegalSection>

      <LegalSection title="4. SLA Exclusions">
        <LegalP>
          The Service Commitment does not apply to any unavailability, suspension or termination of Fil One Object Storage, or any other Fil One Object Storage performance issues:
        </LegalP>
        <LegalList>
          <li>That result from a suspension or termination of your right to use Fil One Object Storage in accordance with the Agreement;</li>
          <li>Caused by factors outside of our reasonable control, including any force majeure event or Internet access or related problems beyond the demarcation point of Fil One Object Storage;</li>
          <li>That result from any actions or inactions of you or any third party;</li>
          <li>That result from your equipment, software or other technology and/or third party equipment, software or other technology (other than third party equipment within our direct control);</li>
          <li>That result from any planned maintenance as provided for pursuant to the Agreement; or</li>
          <li>Arising from our suspension and termination of your right to use Fil One Object Storage in accordance with the Agreement.</li>
        </LegalList>
        <LegalP>
          If availability is impacted by factors other than those used in our Monthly Uptime Percentage calculation, then we may issue a Service Credit considering such factors at our sole discretion.
        </LegalP>
      </LegalSection>

      <LegalSection title="5. Definitions">
        <dl className="m-0 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <dt className="font-sans font-semibold text-[14.5px] text-zinc-950">Monthly Uptime Percentage</dt>
            <dd className="m-0 pl-4 border-l-2 border-black/10 font-sans text-[14.5px] leading-[1.7] text-zinc-600">
              Calculated by subtracting from 100% the percentage of minutes during the month in which Fil One Object Storage was in a state of Unavailability. Monthly Uptime Percentage measurements exclude downtime resulting directly or indirectly from any FIL One SLA Exclusions.
            </dd>
          </div>
          <div className="flex flex-col gap-1.5">
            <dt className="font-sans font-semibold text-[14.5px] text-zinc-950">Unavailability / Unavailable</dt>
            <dd className="m-0 pl-4 border-l-2 border-black/10 font-sans text-[14.5px] leading-[1.7] text-zinc-600">
              When all valid storage or retrieval requests to Fil One Object Storage fail during a 5-minute interval, or when the API error rate exceeds 10% over a continuous 5-minute window.
            </dd>
          </div>
          <div className="flex flex-col gap-1.5">
            <dt className="font-sans font-semibold text-[14.5px] text-zinc-950">Service Credit</dt>
            <dd className="m-0 pl-4 border-l-2 border-black/10 font-sans text-[14.5px] leading-[1.7] text-zinc-600">
              A dollar credit, calculated as set forth above, that we may credit back to an eligible account.
            </dd>
          </div>
        </dl>
      </LegalSection>
    </LegalPage>
  );
};

export default Sla;
