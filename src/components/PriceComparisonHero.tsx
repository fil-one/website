import { GRID_SVG, HeroHeading } from "@/components/LandingPrimitives";
import { Button } from "@/components/Button";
import { COMPETITORS, PRICE_DISPLAY } from "@/lib/pricing";
import filOneLogo from "../assets/fil-one-logo.svg";
import wasabiLogo from "../assets/wasabi.svg";
import backblazeLogo from "../assets/backblaze.svg";

const fmt = (n: number) => `$${n.toFixed(2)}`;
const rate = (name: string) => fmt(COMPETITORS.find((c) => c.name === name)!.storagePricePerTB);

/** Provider price cards: competitors flanking the highlighted Fil One rate. */
const CARDS = [
  { logo: wasabiLogo,    alt: "Wasabi",    price: rate("Wasabi"),       highlighted: false },
  { logo: filOneLogo,    alt: "Fil One",   price: PRICE_DISPLAY,        highlighted: true  },
  { logo: backblazeLogo, alt: "Backblaze", price: rate("Backblaze B2"), highlighted: false },
];

/**
 * Price-LP hero: a light hero that leads with a side-by-side price comparison —
 * the Fil One rate highlighted between two struck-through competitor rates.
 * Reuses the shared hero background layers (blue halo + grid) and the
 * HeroHeading / Button primitives; card styling is on design tokens.
 */
const PriceComparisonHero = ({ ctaHref }: { ctaHref: string }) => (
  <section className="relative w-full pt-[58px] md:pt-[94px] isolate">
    {/* Blue radial halo */}
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none -z-10 bg-blue-halo" />
    {/* Grid texture, faded by the shared hero mask */}
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none -z-10 [mask-image:theme(backgroundImage.hero-grid-mask)] [-webkit-mask-image:theme(backgroundImage.hero-grid-mask)]"
      style={{
        backgroundImage: `url("data:image/svg+xml,${GRID_SVG}")`,
        backgroundSize: "60px 60px",
        backgroundPosition: "center top",
      }}
    />

    <div className="relative flex flex-col items-center pt-20 md:pt-[120px] pb-10 md:pb-14 px-5 md:px-8 max-w-container mx-auto w-full">
      <div className="w-full hero-fade-1">
        <HeroHeading
          title={<>The <span className="text-brand-500">lowest-cost</span><br />S3 object storage</>}
          titleMaxWidth={720}
        />
      </div>

      {/* Provider price comparison */}
      <div className="mt-16 w-full max-w-[820px] grid grid-cols-1 sm:grid-cols-3 items-center gap-4 hero-fade-2">
        {CARDS.map(({ logo, alt, price, highlighted }) => (
          <div
            key={alt}
            className={
              "relative flex flex-col items-center justify-center gap-3.5 rounded-2xl px-6 text-center " +
              (highlighted
                ? "z-10 bg-brand-50 py-9 ring-1 ring-inset ring-brand-500/40 shadow-brand-glow sm:scale-[1.06]"
                : "border border-black/[0.06] bg-white py-7 shadow-elevated")
            }
          >
            {/* Logo row — fixed height so all three logos share a baseline.
                Competitor marks are desaturated so the full-colour Fil One
                logo and highlighted card hold the focus. */}
            <div className="flex h-6 items-center justify-center">
              <img
                src={logo}
                alt={alt}
                className={highlighted ? "max-h-6 w-auto" : "max-h-6 w-auto grayscale opacity-60"}
              />
            </div>

            {/* Price row — number + suffix share a baseline */}
            <div className="flex items-end justify-center gap-1.5">
              <span
                className={
                  highlighted
                    ? "font-display font-medium text-[40px] leading-none tracking-[-0.03em] text-zinc-950 tabular-nums"
                    : "font-display text-[26px] leading-none tracking-[-0.02em] text-zinc-500 line-through decoration-2 decoration-zinc-400 tabular-nums"
                }
              >
                {price}
              </span>
              <span className="font-sans text-[13px] leading-none pb-1 text-zinc-500">
                /TB/month
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-14 hero-fade-3">
        <Button variant="primary" size="lg" glow href={ctaHref}>
          Try 30 days for free
        </Button>
      </div>

      <p className="mt-4 hero-fade-4 text-center font-sans text-[13px] text-zinc-500">No credit card required</p>
    </div>
  </section>
);

export default PriceComparisonHero;
