/**
 * Documents a reviewer can request. `value` is the `?doc=` slug the trust page
 * links with, and the option value sent to HubSpot.
 * TODO(confirm before publishing): every item must be something we can send
 * within a few business days.
 */
export const TRUST_DOCUMENTS = [
  { value: "dpa", label: "Data processing agreement (DPA)" },
  { value: "baa", label: "Business Associate Agreement (BAA)" },
];

export const trustRequestHref = (doc: string) => `/trust/request?doc=${doc}`;
