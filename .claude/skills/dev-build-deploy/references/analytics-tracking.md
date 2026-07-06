# Analytics & tracking on fil.one

Four third-party systems load from `index.html`. They are marketing-owned; the only one
you write code against is Plausible.

| System | Where | Notes |
|---|---|---|
| Plausible | script in `index.html` + `src/lib/analytics.ts` | Custom events — the API you use |
| Google Tag Manager | `GTM-PK26TC8W` snippets in `index.html` (head + noscript) | Don't touch |
| Unify intent tracking | inline script in `index.html` | Don't touch |
| HubSpot tracking | `hs-script-loader` in `index.html` | Sets `hubspotutk` cookie forms depend on |

Consent is handled by CookieYes, injected outside this repo (a custom in-repo consent
banner was deliberately removed — commit `8b3ae54`). Do not rebuild a consent banner.

## Firing custom events (Plausible)

Use the helpers in `src/lib/analytics.ts` — never call `window.plausible` directly:

```ts
import { trackEvent, trackCtaClick, trackDocsClick } from "@/lib/analytics";

trackCtaClick("Start for free", "https://app.fil.one/...", "primary"); // CTA buttons
trackDocsClick("https://docs.fil.one/quickstart");                     // docs.fil.one links
trackEvent("FAQ Expand", { page: window.location.pathname, question: q }); // anything else
```

Conventions (from existing call sites and tests):

- Event names are Title Case with spaces: `"CTA Click"`, `"Docs Click"`, `"FAQ Expand"`,
  `"Scroll Past Hero"`, `"Scroll 50%"`.
- Always include `page: window.location.pathname` in props for page-scoped events
  (`trackCtaClick`/`trackDocsClick` add it for you).
- Helpers no-op safely when Plausible hasn't loaded — no need for extra guards.

## Scroll engagement

`src/hooks/useScrollTracking.ts` fires `Scroll Past Hero` (attach its `heroEndRef` to the
first section AFTER the hero) and `Scroll 50%`, each at most once per load:

```tsx
const { heroEndRef } = useScrollTracking();
…
<section ref={heroEndRef} …>  {/* first post-hero section */}
```

Not all pages use it — add it only when a task asks for scroll analytics.

## Testing analytics changes

`src/lib/analytics.test.ts` and `src/hooks/useScrollTracking.test.ts` mock
`window.plausible` and assert event names/props. If you add or rename an event, extend
those tests following the existing pattern (`plausibleSpy = vi.fn(); window.plausible =
plausibleSpy`). Run `npm test` — remember the 3 FaqSection failures are pre-existing.

To verify manually: dev server + browser console → `window.plausible` calls are visible
as network requests to `plausible.io/api/event` (they may be blocked by content blockers
or in sandboxes; the mock tests are the reliable check).
