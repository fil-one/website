/**
 * HubSpot configuration
 *
 * To find your subscription type ID:
 *   1. Log into HubSpot → Settings → Marketing → Email → Subscription Types
 *   2. Click on the subscription type used for marketing/product emails
 *   3. The numeric ID is shown in the URL or in the subscription details
 *
 * If you only have one subscription type (common for new accounts),
 * it's typically the first one listed.
 */
export const HS_PORTAL_ID = "51191454";

/** Contact Sales form */
export const HS_CONTACT_FORM_GUID = "f7684332-cc69-4d56-bd8d-12a2b730bceb";

/** Partner Apply form */
export const HS_PARTNER_FORM_GUID = "b18ae776-5b6f-42fa-a6aa-10ce63a36cb5";

/**
 * Neocloud application form. Not created in HubSpot yet: until it is, this is
 * null and /neocloud/apply refuses to submit rather than posting to a form
 * that would reject the fields. Create it with the fields listed in
 * NeocloudApplyPage.tsx, then paste its GUID here.
 */
export const HS_NEOCLOUD_FORM_GUID: string | null = null;

/** Support form */
export const HS_SUPPORT_FORM_GUID = "44da45a4-b99b-4886-988a-70e27308322d";

/**
 * HubSpot communication subscription type ID.
 * Retrieved from the Contact Sales form definition (communicationTypeId).
 */
export const HS_MARKETING_SUBSCRIPTION_TYPE_ID = 2233676378;

/**
 * Read the HubSpot tracking cookie (`hubspotutk`).
 *
 * The HubSpot tracking script (hs-script-loader) sets this cookie
 * when a visitor lands on the site. Including it in the form submission
 * `context.hutk` links the submission to the tracked visitor, which is
 * required for HubSpot to trigger email workflows and sequences.
 */
export function getHubSpotUtk(): string | undefined {
  const match = document.cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith("hubspotutk="));
  return match ? match.split("=")[1] : undefined;
}

/**
 * Build the HubSpot form submission `context` object, including
 * the tracking cookie when available.
 */
export function getHubSpotContext(pageName: string) {
  const hutk = getHubSpotUtk();
  return {
    pageUri: window.location.href,
    pageName,
    ...(hutk ? { hutk } : {}),
  };
}

/** A single field in a HubSpot Forms-API submission. */
export interface HubSpotField {
  /** HubSpot object type (e.g. "0-1" contact, "0-5" ticket). */
  objectTypeId?: string;
  name: string;
  value: string;
}

export interface HubSpotSubmitResult {
  ok: boolean;
  /** Human-readable error message; present only when `ok` is false. */
  error?: string;
}

type SubmitErrorKind = "email" | "generic" | "network";

/**
 * Visitor-facing copy for submission failures. Raw HubSpot messages are
 * technical ("Error in 'fields.email'. Invalid email address"), so they are
 * logged to the console and mapped to one of these instead.
 */
const SUBMIT_ERROR_MESSAGES: Record<"en" | "es", Record<SubmitErrorKind, string>> = {
  en: {
    email: "We couldn't accept that email address. Please check it, or try a different work email.",
    generic: "Something went wrong and your message wasn't sent. Please try again in a moment.",
    network: "We couldn't reach our servers. Please check your connection and try again.",
  },
  es: {
    email: "No hemos podido aceptar ese correo electrónico. Revísalo o prueba con otro correo de trabajo.",
    generic: "Algo ha fallado y tu mensaje no se ha enviado. Vuelve a intentarlo en unos momentos.",
    network: "No hemos podido conectar con nuestros servidores. Comprueba tu conexión y vuelve a intentarlo.",
  },
};

/** HubSpot `errorType`s that mean the email address itself was rejected. */
const EMAIL_ERROR_TYPES = new Set(["INVALID_EMAIL", "BLOCKED_EMAIL"]);

/**
 * Submit a form to the HubSpot Forms API and normalize the result.
 *
 * Wraps the fetch + response parsing shared by every marketing form so pages
 * only build their `fields` array. Resolves to `{ ok: true }` on success or
 * `{ ok: false, error }` with friendly, localized copy on failure; never
 * throws. Callers own the `data-hs-do-not-collect` attribute on their `<form>`
 * and the `role="status"`/`role="alert"` announcements.
 */
export async function submitHubSpotForm(opts: {
  formGuid: string;
  fields: HubSpotField[];
  /** Human-readable page name recorded in the submission context. */
  pageName: string;
  /** Optional HubSpot `legalConsentOptions` payload (consent checkboxes). */
  legalConsentOptions?: unknown;
  /** Language of the error copy; "es" for the Spanish landing pages. */
  lang?: "en" | "es";
}): Promise<HubSpotSubmitResult> {
  const messages = SUBMIT_ERROR_MESSAGES[opts.lang ?? "en"];
  try {
    const res = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${HS_PORTAL_ID}/${opts.formGuid}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: opts.fields,
          context: getHubSpotContext(opts.pageName),
          ...(opts.legalConsentOptions
            ? { legalConsentOptions: opts.legalConsentOptions }
            : {}),
        }),
      }
    );
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      console.error("HubSpot submission error:", body);
      const errors: { errorType?: string }[] = Array.isArray(body?.errors) ? body.errors : [];
      const emailRejected = errors.some((e) => e.errorType && EMAIL_ERROR_TYPES.has(e.errorType));
      return { ok: false, error: emailRejected ? messages.email : messages.generic };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: messages.network };
  }
}
