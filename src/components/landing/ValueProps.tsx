/**
 * Value propositions — 3-column minimal layout with icon + title + body.
 *
 * Simpler than FeatureCards — no card border, no badge, no CTA.
 * Used on Agents page ("Why Fil One") section.
 */

import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { SectionLabel, SectionHeading } from "./Typography";

export interface ValueProp {
  icon: PhosphorIcon;
  title: string;
  body: string;
}

interface ValuePropsProps {
  label: string;
  heading: React.ReactNode;
  items: ValueProp[];
}

const ValueProps = ({ label, heading, items }: ValuePropsProps) => (
  <div className="flex flex-col gap-12 w-full">
    <div className="flex flex-col gap-3 max-w-[520px]">
      <SectionLabel>{label}</SectionLabel>
      <SectionHeading>{heading}</SectionHeading>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-10 w-full">
      {items.map(({ icon: Icon, title, body }) => (
        <div key={title} className="flex flex-col gap-4">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
            style={{
              backgroundColor: "#EFF8FF",
              border: "1px solid rgba(0,144,255,0.18)",
            }}
          >
            <Icon size={18} color="#0090FF" />
          </div>
          <div className="flex flex-col gap-2">
            <p
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 600,
                fontSize: 15,
                lineHeight: "1.35",
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
                fontSize: 15,
                lineHeight: "1.7",
                color: "#71717A",
                margin: 0,
              }}
            >
              {body}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ValueProps;
