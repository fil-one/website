/**
 * Google Apps Script web app that appends event RSVPs from the website to a
 * Google Sheet. The site posts to it from src/lib/eventRsvp.ts.
 *
 * This file is not built or deployed with the site; it lives here so the
 * script is versioned next to the form that calls it.
 *
 * Setup (once per sheet):
 *   1. Create a Google Sheet. In it, open Extensions → Apps Script.
 *   2. Replace the contents of Code.gs with this file and save.
 *   3. Deploy → New deployment → type "Web app".
 *        Execute as: Me
 *        Who has access: Anyone
 *   4. Copy the web app URL (ends in /exec) into RSVP_ENDPOINT in
 *      src/lib/eventRsvp.ts.
 *
 * "Anyone" means anyone with the URL can post a row, which is unavoidable for
 * a public form. The script only ever appends: it cannot read, change or
 * delete existing rows. Editing this file later needs a new deployment
 * version (Deploy → Manage deployments → Edit → New version); the URL stays
 * the same.
 */

/** Column order in the sheet. The header row is written on the first RSVP. */
var COLUMNS = [
  "submittedAt",
  "event",
  "firstname",
  "lastname",
  "email",
  "company",
  "jobtitle",
  "invitedBy",
  "dietary",
  "pageUrl",
];

var REQUIRED = ["event", "firstname", "lastname", "email", "company", "jobtitle"];

/** Longest value kept per cell, so one request cannot bloat the sheet. */
var MAX_LENGTH = 500;

function doPost(e) {
  var data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return respond({ ok: false, error: "invalid_json" });
  }

  // Honeypot: the site hides this field from people, so only bots fill it.
  // Report success so the bot has no signal to adapt to.
  if (data.website) return respond({ ok: true });

  for (var i = 0; i < REQUIRED.length; i++) {
    if (!clean(data[REQUIRED[i]])) return respond({ ok: false, error: "missing_" + REQUIRED[i] });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean(data.email))) {
    return respond({ ok: false, error: "invalid_email" });
  }

  var row = COLUMNS.map(function (key) {
    return key === "submittedAt" ? new Date() : clean(data[key]);
  });

  // Two RSVPs arriving together would otherwise race for the same last row.
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) sheet.appendRow(COLUMNS);
    sheet.appendRow(row);
  } finally {
    lock.releaseLock();
  }

  return respond({ ok: true });
}

/**
 * Trims and caps a value, and stops it being read as a formula. A cell
 * starting with =, +, - or @ is evaluated by Sheets, so a crafted RSVP could
 * otherwise run a formula when someone opens the sheet; the leading
 * apostrophe makes Sheets store it as plain text.
 */
function clean(value) {
  var text = String(value == null ? "" : value).trim().slice(0, MAX_LENGTH);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function respond(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
