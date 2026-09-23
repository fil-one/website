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
  /** The numeric amount as a string, e.g. "5.99" (for JSON-LD price fields). */
  PRICE_AMOUNT,
  /** The bare price with currency symbol, e.g. "$5.99". */
  PRICE_DISPLAY,
  /** The short per-TB rate, e.g. "$5.99/TB". */
  PRICE_PER_TB_SHORT,
  /** The full per-TB rate for inline copy, e.g. "$5.99/TB/month". */
  PRICE_PER_TB_MONTH,
  /** Monthly account minimum in USD, independent of the per-TB rate. */
  MONTHLY_MINIMUM,
  /** The monthly minimum with currency symbol, e.g. "$5.99". */
  MONTHLY_MINIMUM_DISPLAY,
} from "./pricing.constants.mjs";

import { PRICE_PER_TB } from "./pricing.constants.mjs";

/**
 * One band of a tiered rate. `upToTB` is the cumulative ceiling of the band in
 * decimal TB (null for the last, open-ended band).
 */
export interface RateTier {
  upToTB: number | null;
  pricePerTB: number;
}

/** A storage provider row for the pricing comparison / cost calculator. */
export interface Competitor {
  name: string;
  region: string | null;
  /** Flat storage rate, or the first band's rate when `storageTiers` is set. */
  storagePricePerTB: number;
  /** Flat egress rate, or the first band's rate when `egressTiers` is set. */
  egressPricePerTB: number;
  /** Volume bands for storage; when set they replace the flat rate. */
  storageTiers?: RateTier[];
  /** Volume bands for egress; when set they replace the flat rate. */
  egressTiers?: RateTier[];
  /** Egress free every month before any billing starts, in TB. */
  freeEgressTB?: number;
  /**
   * Free egress allowance as a multiple of the monthly stored amount. Egress up
   * to `freeEgressMultiplier × storedTB` is free; only the excess is billed at
   * `egressPricePerTB`. Defaults to 0 (all egress billed) when omitted.
   */
  freeEgressMultiplier?: number;
  isFilOne: boolean;
}

/** Cost of `tb` terabytes under a flat rate or, when given, volume bands. */
export const bandedCost = (tb: number, flatRate: number, tiers?: RateTier[]): number => {
  if (!tiers) return tb * flatRate;
  let cost = 0;
  let floor = 0;
  for (const { upToTB, pricePerTB } of tiers) {
    const ceiling = upToTB ?? Infinity;
    if (tb <= floor) break;
    cost += (Math.min(tb, ceiling) - floor) * pricePerTB;
    floor = ceiling;
  }
  return cost;
};

// AWS prices per GB with 1 TB = 1,024 GB, so its "50 TB" band ends at 51.2
// decimal TB. Bands below are converted to decimal TB (1 TB = 1,000 GB).
const AWS_STORAGE_TIERS: RateTier[] = [
  { upToTB: 51.2, pricePerTB: 23 },
  { upToTB: 512, pricePerTB: 22 },
  { upToTB: null, pricePerTB: 21 },
];
const AWS_EGRESS_TIERS: RateTier[] = [
  { upToTB: 10.24, pricePerTB: 90 },
  { upToTB: 51.2, pricePerTB: 85 },
  { upToTB: 153.6, pricePerTB: 70 },
  { upToTB: null, pricePerTB: 50 },
];

/**
 * Published list rates (USD/TB/month) for the cost calculator, shared by the
 * pricing page, the solutions page, and the /lp/price landing page. Fil One's
 * rate comes from PRICE_PER_TB; competitors are their public list rates,
 * checked against each provider's official pricing page on 2026-09-23.
 * Request fees are not modelled (see the calculator's disclaimer).
 */
export const COMPETITORS: Competitor[] = [
  { name: "Fil One",       region: null,        storagePricePerTB: PRICE_PER_TB, egressPricePerTB: 0,  isFilOne: true  },
  { name: "Wasabi",        region: null,        storagePricePerTB: 7.99,         egressPricePerTB: 0,  isFilOne: false },
  { name: "Backblaze B2",  region: null,        storagePricePerTB: 6.95,         egressPricePerTB: 10, freeEgressMultiplier: 3, isFilOne: false },
  { name: "Cloudflare R2", region: null,        storagePricePerTB: 15,           egressPricePerTB: 0,  isFilOne: false },
  {
    name: "AWS S3",
    region: "eu-west-1",
    storagePricePerTB: 23,
    egressPricePerTB: 90,
    storageTiers: AWS_STORAGE_TIERS,
    egressTiers: AWS_EGRESS_TIERS,
    freeEgressTB: 0.1,
    isFilOne: false,
  },
];

/**
 * Monthly storage + egress cost for one provider, using the same maths as the
 * pricing calculator (PricingComparison): banded storage, then egress billed
 * only above the provider's free allowance.
 */
export const monthlyCost = (c: Competitor, storedTB: number, egressTB: number): number => {
  const storage = bandedCost(storedTB, c.storagePricePerTB, c.storageTiers);
  const freeEgressTB = (c.freeEgressTB ?? 0) + (c.freeEgressMultiplier ?? 0) * storedTB;
  const egress = bandedCost(Math.max(0, egressTB - freeEgressTB), c.egressPricePerTB, c.egressTiers);
  return storage + egress;
};

/**
 * How many times cheaper Fil One is than AWS S3 for a workload, rounded down so
 * copy never overstates the saving (e.g. 18.7 → 18).
 */
export const timesCheaperThanAws = (storedTB: number, egressTB: number): number => {
  const filOne = COMPETITORS.find((c) => c.isFilOne)!;
  const aws = COMPETITORS.find((c) => c.name === "AWS S3")!;
  return Math.floor(monthlyCost(aws, storedTB, egressTB) / monthlyCost(filOne, storedTB, egressTB));
};
