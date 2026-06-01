/**
 * Problem / workaround cards — 3-column layout showing why current
 * approaches fall short.
 *
 * Each card has a pill label, a catch-line headline, body text,
 * and a grey footer summary strip.
 */

import { SectionLabel, SectionHeading, SectionSub } from "./Typography";

export interface ProblemCard {
  label: string;
  /** Pill background colour */
  pillBg?: string;
  /** Pill border colour */
  pillBorder?: string;
  /** Pill text colour */
  pillColor?: string;
  /** Bold catch-line used as the card headline */
  catchLine: string;
  /** Body copy */
  body: string;
  /** Footer summary line */
  footer: string;
}

interface ProblemCardsProps {
  label: string;
  heading: React.ReactNode;
  sub?: React.ReactNode;
  subMaxWidth?: number;
  cards: ProblemCard[];
}

const ProblemCards = ({
  label,
  heading,
  sub,
  subMaxWidth,
  cards,
}: ProblemCardsProps) => (
  <div className="flex flex-col gap-10 w-full">
    <div className="flex flex-col gap-4 items-center text-center max-w-[560px] mx-auto">
      <SectionLabel>{label}</SectionLabel>
      <SectionHeading>{heading}</SectionHeading>
      {sub && <SectionSub maxWidth={subMaxWidth}>{sub}</SectionSub>}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      {cards.map(({ label: cardLabel, catchLine, body, footer }) => (
        <div
          key={cardLabel}
          className="flex flex-col rounded-2xl overflow-hidden"
          style={{
            border: "1px solid rgba(0,0,0,0.07)",
            backgroundColor: "#FFFFFF",
            boxShadow:
              "0px 1px 3px rgba(0,0,0,0.04), 0px 4px 16px rgba(0,0,0,0.04)",
          }}
        >
          {/* Card body */}
          <div className="flex flex-col p-7" style={{ gap: 10, flex: 1 }}>
            <span
              style={{
                display: "inline-block",
                fontFamily: "'DM Mono', monospace",
                fontWeight: 500,
                fontSize: 10,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#52525B",
                backgroundColor: "#F4F4F5",
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: 9999,
                padding: "3px 10px",
                marginBottom: 2,
                alignSelf: "flex-start",
              }}
            >
              {cardLabel}
            </span>
            <p
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 600,
                fontSize: 18,
                lineHeight: "1.3",
                letterSpacing: "-0.01em",
                color: "#09090B",
              }}
            >
              {catchLine}
            </p>
            <p
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 400,
                fontSize: 14,
                lineHeight: 1.65,
                color: "#71717A",
                marginTop: 4,
              }}
            >
              {body}
            </p>
          </div>
          {/* Footer strip */}
          <div
            className="flex items-center gap-2 px-7 py-4"
            style={{
              backgroundColor: "#F4F4F5",
              borderTop: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <span style={{ color: "#71717A", fontSize: 11, flexShrink: 0 }}>
              ✕
            </span>
            <p
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 500,
                fontSize: 13,
                color: "#52525B",
                lineHeight: 1.3,
              }}
            >
              {footer}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ProblemCards;
