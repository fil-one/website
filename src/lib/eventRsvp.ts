/**
 * Event RSVPs go to a Google Sheet through a Google Apps Script web app,
 * rather than to HubSpot, so the event team can work from a plain sheet. The
 * script and its setup steps are in scripts/apps-script/event-rsvp.gs.
 */

/**
 * The Apps Script web app URL. Use the plain /macros/s/<id>/exec form, not the
 * /a/macros/<domain>/ form the Apps Script editor shows to Workspace users,
 * which can send visitors outside that domain to a Google sign-in page.
 */
export const RSVP_ENDPOINT =
  "https://script.google.com/macros/s/AKfycby09Z7lsI4WrHoUL_xwzoeQ9ndeFiJO3VaxmhDIFN1YgASRPiiTuahIEqt_jcDHh6S3dg/exec";

export interface EventRsvp {
  /** Which event the row belongs to, so one sheet can hold several events. */
  event: string;
  firstname: string;
  lastname: string;
  email: string;
  company: string;
  jobtitle: string;
  invitedBy: string;
  dietary: string;
  /** Hidden honeypot input; people leave it empty, bots fill it in. */
  website: string;
}

export interface RsvpSubmitResult {
  ok: boolean;
  /** Visitor-facing message; present only when `ok` is false. */
  error?: string;
}

const MESSAGES = {
  email: "We couldn't accept that email address. Please check it and try again.",
  generic: "Something went wrong and your RSVP wasn't sent. Please try again in a moment.",
  network: "We couldn't reach our servers. Please check your connection and try again.",
};

/**
 * Post an RSVP to the sheet. Resolves to `{ ok: true }` or `{ ok: false, error }`
 * with visitor-facing copy; never throws.
 */
export async function submitEventRsvp(rsvp: EventRsvp): Promise<RsvpSubmitResult> {
  if (!RSVP_ENDPOINT) {
    console.error("RSVP_ENDPOINT is not set; see scripts/apps-script/event-rsvp.gs");
    return { ok: false, error: MESSAGES.generic };
  }
  try {
    const res = await fetch(RSVP_ENDPOINT, {
      method: "POST",
      // text/plain keeps this a "simple" request, so the browser sends no
      // CORS preflight. Apps Script web apps cannot answer a preflight.
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ ...rsvp, pageUrl: window.location.href }),
    });
    const body: { ok?: boolean; error?: string } = await res.json().catch(() => ({}));
    if (!res.ok || !body.ok) {
      console.error("RSVP submission error:", res.status, body);
      return { ok: false, error: body.error === "invalid_email" ? MESSAGES.email : MESSAGES.generic };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: MESSAGES.network };
  }
}
