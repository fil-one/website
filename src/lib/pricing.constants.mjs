/**
 * Raw pricing constants in plain ESM so they can be shared across the two
 * worlds that need them:
 *   - the app / TypeScript (via src/lib/pricing.ts, which re-exports these), and
 *   - the build-time SEO meta (scripts/routeMeta.mjs), which is plain node ESM
 *     and cannot import a .ts file.
 *
 * This is the single source of truth for the headline price. Change it here and
 * both the rendered site and the prerendered <meta>/JSON-LD update together.
 */

/** Fil One storage price, in USD per TB per month. */
export const PRICE_PER_TB = 4.99;

/** The numeric amount as a string, for structured data (e.g. JSON-LD price). */
export const PRICE_AMOUNT = PRICE_PER_TB.toFixed(2);

/** The bare price with currency symbol, e.g. "$4.99". */
export const PRICE_DISPLAY = `$${PRICE_AMOUNT}`;

/** The short per-TB rate, e.g. "$4.99/TB". */
export const PRICE_PER_TB_SHORT = `${PRICE_DISPLAY}/TB`;

/** The full per-TB rate for inline copy, e.g. "$4.99/TB/month". */
export const PRICE_PER_TB_MONTH = `${PRICE_DISPLAY}/TB/month`;

/* ── EUR ────────────────────────────────────────────────────────────────────
 * The European pages (e.g. /lp/barcelona) quote a price denominated natively
 * in EUR rather than a conversion of the USD rate, so it is its own constant.
 * The two happen to share the same figure today; they are deliberately not
 * derived from one another so either can move independently.
 * ─────────────────────────────────────────────────────────────────────────── */

/** Fil One storage price, in EUR per TB per month. */
export const PRICE_PER_TB_EUR = 4.99;

/** The numeric EUR amount as a string, for structured data. */
export const PRICE_AMOUNT_EUR = PRICE_PER_TB_EUR.toFixed(2);

/** The bare EUR price with currency symbol, e.g. "€4.99". */
export const PRICE_DISPLAY_EUR = `€${PRICE_AMOUNT_EUR}`;

/** The short per-TB EUR rate, e.g. "€4.99/TB". */
export const PRICE_PER_TB_SHORT_EUR = `${PRICE_DISPLAY_EUR}/TB`;

/** The full per-TB EUR rate for inline copy, e.g. "€4.99/TB/month". */
export const PRICE_PER_TB_MONTH_EUR = `${PRICE_DISPLAY_EUR}/TB/month`;

/**
 * USD per 1 EUR, used to convert competitors' USD rate cards for the EUR
 * comparison tables. Kept here (rather than inline in a page footnote) so the
 * rate and its provenance move together across every page that cites them.
 */
export const EUR_USD_RATE = 1.17;

/** Where and when EUR_USD_RATE was taken, for the comparison-table footnote. */
export const EUR_USD_RATE_SOURCE = "ECB rate, May 2026";

/* ── Spanish-locale EUR formatting ──────────────────────────────────────────
 * Spanish writes a decimal comma with the symbol after the number and a
 * non-breaking space ("4,99 €"), not "€4.99". The Spanish pages format every
 * figure this way, so the helper is shared rather than hand-written per page.
 * ─────────────────────────────────────────────────────────────────────────── */

/** Format a EUR amount the Spanish way, e.g. 49.9 -> "49,90 €". Pass
 *  `decimals: 0` for whole-euro figures like "197 €". */
export const eurEs = (amount, decimals = 2) =>
  `${amount.toFixed(decimals).replace(".", ",")} €`;

/** The bare EUR price, Spanish format, e.g. "4,99 €". */
export const PRICE_DISPLAY_EUR_ES = eurEs(PRICE_PER_TB_EUR);

/** The short per-TB EUR rate, Spanish format, e.g. "4,99 €/TB". */
export const PRICE_PER_TB_SHORT_EUR_ES = `${PRICE_DISPLAY_EUR_ES}/TB`;

/** The full per-TB EUR rate for inline Spanish copy, e.g. "4,99 €/TB al mes". */
export const PRICE_PER_TB_MONTH_EUR_ES = `${PRICE_PER_TB_SHORT_EUR_ES} al mes`;

/** EUR_USD_RATE in Spanish format with the symbol after the number, "1,17 $". */
export const EUR_USD_RATE_ES = `${EUR_USD_RATE.toFixed(2).replace(".", ",")} $`;

/** Spanish rendering of EUR_USD_RATE_SOURCE, for the ES comparison footnote. */
export const EUR_USD_RATE_SOURCE_ES = "BCE, mayo de 2026";
