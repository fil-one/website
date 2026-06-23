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

/** Bucket Intelligence waitlist form */
export const HS_BUCKET_INTELLIGENCE_WAITLIST_FORM_GUID = "39527548-1773-4541-beed-eee6225ae3b2";

/** AI Agent Toolkit waitlist form */
export const HS_AGENT_TOOLKIT_WAITLIST_FORM_GUID = "4857a0c6-a4a5-459c-bf37-a56d452c7442";

/** Contact Sales form */
export const HS_CONTACT_FORM_GUID = "f7684332-cc69-4d56-bd8d-12a2b730bceb";

/** Partner Apply form */
export const HS_PARTNER_FORM_GUID = "b18ae776-5b6f-42fa-a6aa-10ce63a36cb5";

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
