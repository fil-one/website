# HubSpot forms on fil.one

All lead-capture forms POST directly to the HubSpot Forms API v3 from the browser.
There is no backend in this repo.

## Configuration — single source of truth

`src/lib/hubspot.ts` holds:

- `HS_PORTAL_ID = "51191454"`
- Form GUIDs: `HS_CONTACT_FORM_GUID` (contact sales), `HS_BUCKET_INTELLIGENCE_WAITLIST_FORM_GUID`,
  `HS_AGENT_TOOLKIT_WAITLIST_FORM_GUID`, `HS_PARTNER_FORM_GUID`, `HS_SUPPORT_FORM_GUID`
- `HS_MARKETING_SUBSCRIPTION_TYPE_ID` (consent communications)
- `getHubSpotUtk()` — reads the `hubspotutk` tracking cookie
- `getHubSpotContext(pageName)` — builds the submission `context` (pageUri, pageName, hutk)

New form GUIDs go HERE as exported constants — never inline a GUID in a page. (Portal ID
and GUIDs are public-by-design values visible in network requests; they are not secrets.)

## Pages using forms

| Page | Form |
|---|---|
| `src/pages/ContactSales.tsx` (+ `ContactSalesBcnES.tsx`) | Contact sales |
| `src/pages/BucketIntelligenceWaitlistPage.tsx` | Bucket Intelligence waitlist |
| `src/pages/AgentToolkitWaitlistPage.tsx` | AI Agent Toolkit waitlist |
| `src/pages/PartnerApplyPage.tsx` | Partner application |
| `src/pages/Support.tsx` (+ `SupportBcnES.tsx`) | Support |

## The canonical submission shape (copy from `BucketIntelligenceWaitlistPage.tsx`)

```ts
const res = await fetch(
  `https://api.hsforms.com/submissions/v3/integration/submit/${HS_PORTAL_ID}/${FORM_GUID}`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fields: [
        { objectTypeId: "0-1", name: "email", value: email },
        // optional fields are spread in conditionally:
        ...(useCase ? [{ objectTypeId: "0-1", name: "primary_use_case", value: useCase }] : []),
      ],
      context: getHubSpotContext("Human-readable page name"),
      legalConsentOptions: {
        consent: {
          consentToProcess: true,
          text: "…consent copy…",
          communications: [{ value: true, subscriptionTypeId: HS_MARKETING_SUBSCRIPTION_TYPE_ID, text: "…" }],
        },
      },
    }),
  },
);
if (!res.ok) { /* surface body.errors[].message to the user, keep the form filled */ }
```

Rules that past fixes established (commit "Fix HubSpot form integration and clean up
legacy waitlist"):

- `objectTypeId: "0-1"` on every field (contact object).
- Field `name` must match the HubSpot internal field name EXACTLY (e.g.
  `how_are_you_handling_rag_today`) — a wrong name returns a 400 whose `errors[].message`
  names the bad field; read it.
- Always include `context: getHubSpotContext(...)` — without the `hutk` cookie value,
  HubSpot won't trigger email workflows/sequences.
- Include `legalConsentOptions` on forms that subscribe people to communications.
- UI state machine: `loading` → `submitted` (success panel) | `error` (message shown,
  inputs preserved). Follow the existing pages.

## Adding a field to an existing form

1. Get the HubSpot internal field name from the task (or state that it must be created in
   HubSpot first — this repo cannot create HubSpot fields).
2. Add controlled-input state + markup following the page's existing fields.
3. Append to the `fields` array (conditionally, if optional).
4. Test: fill the form on the dev server and submit once. **A successful submit creates a
   real contact in production HubSpot** — use an obviously-fake test address like
   `test+claude@fil.org`, mention it in the PR, and do NOT submit repeatedly.

## Do not

- Hardcode portal/form IDs outside `src/lib/hubspot.ts`.
- Switch to the HubSpot embedded-forms JS (`hbspt.forms.create`) — the repo deliberately
  uses the raw API with custom-styled inputs.
- Remove the `hs-script-loader` script from `index.html` — it sets the `hubspotutk`
  cookie the context depends on.
- Add an API key: the Forms v3 submit endpoint is unauthenticated by design. Never put
  any HubSpot private key in this repo.
