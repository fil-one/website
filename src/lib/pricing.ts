/**
 * Single source of truth for Fil One's pricing data — the headline storage
 * price and the competitor rates used by the pricing calculator.
 *
 * The raw price constants live in ./pricing.constants.mjs (plain ESM) so the
 * build-time SEO meta (scripts/routeMeta.mjs) can share the exact same values;
 * they are re-exported here so app code keeps importing from "@/lib/pricing".
 * A price change is a one-line edit in pricing.constants.mjs.
 */

export {
  /** Fil One storage price, in USD per TB per month. */
  PRICE_PER_TB,
  /** The numeric amount as a string, e.g. "4.99" (for JSON-LD price fields). */
  PRICE_AMOUNT,
  /** The bare price with currency symbol, e.g. "$4.99". */
  PRICE_DISPLAY,
  /** The short per-TB rate, e.g. "$4.99/TB". */
  PRICE_PER_TB_SHORT,
  /** The full per-TB rate for inline copy, e.g. "$4.99/TB/month". */
  PRICE_PER_TB_MONTH,
  /** Fil One storage price, in EUR per TB per month. */
  PRICE_PER_TB_EUR,
  /** The numeric EUR amount as a string, e.g. "4.99". */
  PRICE_AMOUNT_EUR,
  /** The bare EUR price with currency symbol, e.g. "€4.99". */
  PRICE_DISPLAY_EUR,
  /** The short per-TB EUR rate, e.g. "€4.99/TB". */
  PRICE_PER_TB_SHORT_EUR,
  /** The full per-TB EUR rate for inline copy, e.g. "€4.99/TB/month". */
  PRICE_PER_TB_MONTH_EUR,
  /** USD per 1 EUR, for converting competitors' USD rate cards. */
  EUR_USD_RATE,
  /** Where and when EUR_USD_RATE was taken. */
  EUR_USD_RATE_SOURCE,
  /** Format a EUR amount the Spanish way, e.g. 49.9 -> "49,90 €". */
  eurEs,
  /** The bare EUR price, Spanish format, e.g. "4,99 €". */
  PRICE_DISPLAY_EUR_ES,
  /** The short per-TB EUR rate, Spanish format, e.g. "4,99 €/TB". */
  PRICE_PER_TB_SHORT_EUR_ES,
  /** The full per-TB EUR rate for Spanish copy, e.g. "4,99 €/TB al mes". */
  PRICE_PER_TB_MONTH_EUR_ES,
} from "./pricing.constants.mjs";

import { PRICE_PER_TB } from "./pricing.constants.mjs";

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
