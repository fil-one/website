/**
 * Single source of truth for Fil One's pricing data — the headline storage
 * price and the competitor rates used by the pricing calculator.
 *
 * Centralised so a price change is a one-line edit here rather than a
 * find-and-replace across the site. Shared by the pricing page and the
 * /lp/price landing page.
 */

/** Fil One storage price, in USD per TB per month. */
export const PRICE_PER_TB = 4.99;

/** The bare price with currency symbol, e.g. "$4.99". */
export const PRICE_DISPLAY = `$${PRICE_PER_TB.toFixed(2)}`;

/** The full per-TB rate for inline copy, e.g. "$4.99/TB/month". */
export const PRICE_PER_TB_MONTH = `${PRICE_DISPLAY}/TB/month`;

/** A storage provider row for the pricing comparison / cost calculator. */
export interface Competitor {
  name: string;
  region: string | null;
  storagePricePerTB: number;
  egressPricePerTB: number;
  /**
   * Free egress allowance as a multiple of the monthly stored amount. Egress up
   * to `freeEgressMultiplier × storedTB` is free; only the excess is billed at
   * `egressPricePerTB`. Defaults to 0 (all egress billed) when omitted.
   */
  freeEgressMultiplier?: number;
  apiPer1M: number;
  isFilOne: boolean;
}

/**
 * Published list rates (USD/TB/month) for the cost calculator, shared by the
 * pricing page and the /lp/price landing page. Fil One's rate comes from
 * PRICE_PER_TB; competitors are their public list rates.
 */
export const COMPETITORS: Competitor[] = [
  { name: "Fil One",      region: null,        storagePricePerTB: PRICE_PER_TB, egressPricePerTB: 0,    apiPer1M: 0,   isFilOne: true  },
  { name: "Wasabi",       region: null,        storagePricePerTB: 7.99,         egressPricePerTB: 0,    apiPer1M: 0,   isFilOne: false },
  { name: "Backblaze B2", region: null,        storagePricePerTB: 6.95,         egressPricePerTB: 10.0, freeEgressMultiplier: 3, apiPer1M: 0,   isFilOne: false },
  { name: "AWS S3",       region: "eu-west-1", storagePricePerTB: 23.0,         egressPricePerTB: 90.0, apiPer1M: 5.0, isFilOne: false },
];
