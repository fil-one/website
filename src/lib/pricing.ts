/**
 * Single source of truth for Fil One's headline storage price.
 *
 * Centralised so a price change is a one-line edit here rather than a
 * find-and-replace across the site. Currently wired into the pricing page
 * only; other pages/landing pages still inline the literal — migrate them
 * to these exports as they're touched.
 */

/** Fil One storage price, in USD per TB per month. */
export const PRICE_PER_TB = 4.99;

/** The bare price with currency symbol, e.g. "$4.99". */
export const PRICE_DISPLAY = `$${PRICE_PER_TB.toFixed(2)}`;

/** The full per-TB rate for inline copy, e.g. "$4.99/TB/month". */
export const PRICE_PER_TB_MONTH = `${PRICE_DISPLAY}/TB/month`;
