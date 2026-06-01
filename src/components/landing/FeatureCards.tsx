/**
 * Feature cards grid — 2x3 or 3x2 layout of icon + title + description cards.
 *
 * Used on Barcelona (6 feature cards) and Agents (3 use-case cards).
 * Supports optional badge, optional CTA link per card, and custom column count.
 */

import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { useInView } from "@/hooks/useInView";
import { SectionLabel, SectionHeading, SectionSub } from "./Typography";

export interface FeatureCard {
  icon: PhosphorIcon;
  title: string;
  desc: string;
  /** Optional badge text (e.g. "Coming soon") */
  badge?: string;
  /** Optional CTA rendered at the bottom of the card */
  cta?: { label: string; href: string };
}

interface FeatureCardsProps {
  label: string;
  heading: React.ReactNode;
  sub?: React.ReactNode;
  subMaxWidth?: number;
  cards: FeatureCard[];
  /** Grid columns on large screens. Default 3 */
  cols?: 2 | 3;
  /** Center the section header. Default true */
  centerHeader?: boolean;
}

const FeatureCards = ({
  label,
  heading,
  sub,
  subMaxWidth,
  cards,
  cols = 3,
  centerHeader = true,
}: FeatureCardsProps) => {
  const { ref, inView } = useInView({ threshold: 0.05 });

  const colClass =
    cols === 2
      ? "grid-cols-1 md:grid-cols-2"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <div className="flex flex-col gap-12 items-center w-full">
      <div
        className={`flex flex-col gap-4 ${
          centerHeader ? "items-center text-center" : "items-start"
        }`}
      >
        <SectionLabel>{label}</SectionLabel>
        <SectionHeading>{heading}</SectionHeading>
        {sub && <SectionSub maxWidth={subMaxWidth}>{sub}</SectionSub>}
      </div>

      <div
        ref={ref}
        className={`grid ${colClass} gap-4 w-full reveal-group`}
      >
        {cards.map(({ icon: Icon, title, desc, badge, cta }) => (
          <div
            key={title}
            className={`flex flex-col gap-5 p-8 rounded-2xl border reveal${inView ? " in-view" : ""}`}
            style={{
              borderColor: "rgba(0,0,0,0.07)",
              backgroundColor: "#FFFFFF",
              boxShadow:
                "0px 1px 3px rgba(0,0,0,0.04), 0px 4px 16px rgba(0,0,0,0.04)",
            }}
          >
            {/* Icon row + optional badge */}
            <div className="flex items-center justify-between gap-3">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
                style={{ backgroundColor: "#EFF8FF" }}
              >
                <Icon size={18} color="#0090FF" />
              </div>
              {badge && (
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontWeight: 500,
                    fontSize: 10,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase" as const,
                    color: "#71717A",
                    backgroundColor: "#F4F4F5",
                    border: "1px solid rgba(0,0,0,0.08)",
                    borderRadius: 9999,
                    padding: "4px 9px",
                    whiteSpace: "nowrap" as const,
                  }}
                >
                  {badge}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <p
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: 15,
                  lineHeight: "1.3",
                  color: "#09090B",
                  margin: 0,
                }}
              >
                {title}
              </p>
              <p
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: "1.6",
                  color: "#71717A",
                  margin: 0,
                }}
              >
                {desc}
              </p>
            </div>

            {cta && (
              <a
                href={cta.href}
                className="flex items-center gap-1"
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: 14,
                  color: "#0090FF",
                  textDecoration: "none",
                  alignSelf: "flex-start",
                  marginTop: 4,
                }}
              >
                {cta.label}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 256 256"
                  fill="currentColor"
                  style={{ marginTop: 1 }}
                >
                  <path d="M184.49,136.49l-80,80a12,12,0,0,1-17-17L159,128,87.51,56.49a12,12,0,1,1,17-17l80,80A12,12,0,0,1,184.49,136.49Z" />
                </svg>
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureCards;
