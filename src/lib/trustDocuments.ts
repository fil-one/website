/**
 * Documents a reviewer can request. `value` is the `?doc=` slug the trust page
 * links with, and the option value sent to HubSpot.
 * TODO(confirm before publishing): every item must be something we can send
 * within a few business days, and `nda` must match what Legal requires.
 */
export const TRUST_DOCUMENTS = [
  { value: "dc-iso27001", label: "Data center ISO 27001 certificate" },
  { value: "dc-soc2", label: "Data center SOC 2 report", nda: true },
  { value: "dpa", label: "Data processing agreement (DPA)" },
  { value: "baa", label: "Business Associate Agreement (BAA)" },
  { value: "subprocessors", label: "Subprocessor list" },
  { value: "questionnaire", label: "Security questionnaire (CAIQ, SIG Lite, or your own)" },
];

export const trustRequestHref = (doc: string) => `/trust/request?doc=${doc}`;
