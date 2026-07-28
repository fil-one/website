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
