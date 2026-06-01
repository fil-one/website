/**
 * Integration pills — flex-wrap list of tool/integration names with
 * an optional docs link.
 */

import { useInView } from "@/hooks/useInView";
import { SectionLabel, SectionHeading, SectionSub } from "./Typography";

interface IntegrationPillsProps {
  label: string;
  heading: React.ReactNode;
  sub?: React.ReactNode;
  subMaxWidth?: number;
  integrations: string[];
  docsHref?: string;
  docsLabel?: string;
}

const IntegrationPills = ({
  label,
  heading,
  sub,
  subMaxWidth = 440,
  integrations,
  docsHref = "https://docs.fil.one",
  docsLabel = "View documentation →",
}: IntegrationPillsProps) => {
  const { ref, inView } = useInView({ threshold: 0.05 });

  return (
    <div
      ref={ref}
      className={`flex flex-col gap-10 items-center text-center w-full reveal${inView ? " in-view" : ""}`}
    >
      <div className="flex flex-col gap-3 items-center">
        <SectionLabel>{label}</SectionLabel>
        <SectionHeading>{heading}</SectionHeading>
        {sub && <SectionSub maxWidth={subMaxWidth}>{sub}</SectionSub>}
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          justifyContent: "center",
        }}
      >
        {integrations.map((name) => (
          <div
            key={name}
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid rgba(0,0,0,0.09)",
              borderRadius: 10,
              padding: "12px 24px",
              fontFamily: "'Funnel Sans', sans-serif",
              fontWeight: 500,
              fontSize: 15.5,
              color: "#374151",
            }}
          >
            {name}
          </div>
        ))}
      </div>

      {docsHref && (
        <a
          href={docsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          {docsLabel}
        </a>
      )}
    </div>
  );
};

export default IntegrationPills;
