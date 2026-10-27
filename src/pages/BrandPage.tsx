import { useState } from "react";
import { Check, Copy, DownloadSimple, X } from "@phosphor-icons/react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Pill from "@/components/Pill";
import CtaBanner from "@/components/CtaBanner";
import Icon from "@/components/Icon";
import { SectionHeading, SectionLabel, SectionSub } from "@/components/LandingPrimitives";
import { useSeo } from "@/hooks/useSeo";
import { trackCtaClick } from "@/lib/analytics";

const KIT_HREF = "/brand/fil-one-brand-kit.zip";

interface AssetVariant {
  /** File stem in /public/brand; each ships as .svg and .png. */
  file: string;
  name: string;
  use: string;
  /** Preview surface classes; the asset must be legible on it. */
  surface: string;
}

const LOGOS: AssetVariant[] = [
  { file: "fil-one-logo", name: "Full color", use: "The default. Use it on white and light backgrounds.", surface: "bg-white" },
  { file: "fil-one-logo-reversed", name: "Reversed", use: "Full color for dark backgrounds.", surface: "bg-space" },
  { file: "fil-one-logo-black", name: "Black", use: "Single color, for print and light backgrounds.", surface: "bg-zinc-100" },
  { file: "fil-one-logo-white", name: "White", use: "Single color, for brand blue and photography.", surface: "bg-brand-500" },
];

const SYMBOLS: AssetVariant[] = [
  { file: "fil-one-symbol", name: "Full color", use: "Avatars, app icons, and favicons.", surface: "bg-white" },
  { file: "fil-one-symbol-black", name: "Black", use: "Single color, for light backgrounds.", surface: "bg-zinc-100" },
  { file: "fil-one-symbol-white", name: "White", use: "Single color, for dark or blue backgrounds.", surface: "bg-space" },
];

const BRAND_COLOR = [
  { format: "HEX", value: "#0090FF" },
  { format: "RGB", value: "0, 144, 255" },
];

const DOS = [
  "Use the files from this kit as they are",
  "Leave clear space around the logo at least half the height of the symbol",
  "Keep the logo at least 96px wide on screen, and the symbol at least 16px",
  "Pick the variant with the most contrast against its background",
];

const DONTS = [
  "Recolor, stretch, rotate, or outline the logo",
  "Add shadows, gradients, or other effects",
  "Rearrange the symbol and wordmark or set the wordmark in another font",
  "Place the logo on busy images without enough contrast",
];

const CARD = "rounded-2xl border border-black/[0.07] bg-white shadow-elevated-sm overflow-hidden";
const SECTION = "flex flex-col gap-10 px-5 md:px-8 py-16 md:py-24 w-full max-w-container mx-auto";

/** Copies `value` and briefly confirms; the live region announces it to screen readers. */
const CopyButton = ({ value, label, className = "" }: { value: string; label: string; className?: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard can be blocked (insecure context, permissions); the value stays visible to copy by hand.
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={label}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-sans text-small font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 ${className}`}
    >
      <Icon icon={copied ? Check : Copy} size={14} />
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
};

const AssetCard = ({ asset, aspect }: { asset: AssetVariant; aspect: string }) => (
  <div className={`${CARD} flex flex-col`}>
    <div className={`flex items-center justify-center ${aspect} ${asset.surface} border-b border-black/[0.07]`}>
      <img src={`/brand/${asset.file}.svg`} alt={`Fil One ${asset.name.toLowerCase()} ${asset.file.includes("symbol") ? "symbol" : "logo"}`} className="max-h-[42%] max-w-[62%]" loading="lazy" />
    </div>
    <div className="flex flex-col gap-3 p-5">
      <div className="flex flex-col gap-1">
        <p className="m-0 font-sans font-medium text-body text-zinc-950">{asset.name}</p>
        <p className="m-0 font-sans text-body-sm leading-[1.5] text-zinc-600">{asset.use}</p>
      </div>
      <div className="flex gap-2">
        {(["svg", "png"] as const).map((ext) => (
          <a
            key={ext}
            href={`/brand/${asset.file}.${ext}`}
            download
            aria-label={`Download ${asset.name} ${asset.file.includes("symbol") ? "symbol" : "logo"} as ${ext.toUpperCase()}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.1] px-3 py-1.5 font-sans text-small font-medium text-zinc-700 no-underline transition-colors hover:border-black/[0.2] hover:bg-zinc-50"
          >
            <Icon icon={DownloadSimple} size={14} />
            {ext.toUpperCase()}
          </a>
        ))}
      </div>
    </div>
  </div>
);

const BrandPage = () => {
  useSeo();

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <PlatformNavbar />
      <main id="main-content">
        <Hero
          glow
          grid
          badge={<Pill>Brand kit</Pill>}
          title={<>Everything you need to <span className="text-brand-500">show Fil One</span></>}
          description="Our logo, symbol, and brand color for anyone writing about Fil One, building on it, or partnering with us. Download the full kit or grab individual files below."
          titleMaxWidth={640}
          descriptionMaxWidth={580}
          ctas={[
            {
              label: "Download the kit",
              href: KIT_HREF,
              variant: "primary",
              size: "lg",
              onClick: () => trackCtaClick("Download the kit", KIT_HREF, "primary"),
            },
          ]}
          tagline="SVG and PNG · Full color and single color"
          contentClassName="pb-16 md:pb-20"
        />

        {/* Logo */}
        <section className="w-full bg-white" aria-labelledby="brand-logo">
          <div className={SECTION}>
            <div className="flex flex-col gap-3 max-w-[560px]">
              <SectionLabel>Logo</SectionLabel>
              <SectionHeading id="brand-logo">The logo</SectionHeading>
              <SectionSub>The symbol and wordmark together. Reach for this first whenever there's room for it.</SectionSub>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {LOGOS.map((asset) => (
                <AssetCard key={asset.file} asset={asset} aspect="aspect-[2/1]" />
              ))}
            </div>
          </div>
        </section>

        {/* Symbol */}
        <section className="w-full bg-zinc-50" aria-labelledby="brand-symbol">
          <div className={SECTION}>
            <div className="flex flex-col gap-3 max-w-[560px]">
              <SectionLabel>Symbol</SectionLabel>
              <SectionHeading id="brand-symbol">The symbol</SectionHeading>
              <SectionSub>The mark on its own, for square and small spaces where the full logo won't fit.</SectionSub>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {SYMBOLS.map((asset) => (
                <AssetCard key={asset.file} asset={asset} aspect="aspect-[4/3]" />
              ))}
            </div>
          </div>
        </section>

        {/* Usage */}
        <section className="w-full bg-white" aria-labelledby="brand-usage">
          <div className={SECTION}>
            <div className="flex flex-col gap-3 max-w-[560px]">
              <SectionLabel>Usage</SectionLabel>
              <SectionHeading id="brand-usage">Using the logo</SectionHeading>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "Do", items: DOS, icon: Check, tone: "bg-success-50 text-success-700" },
                { title: "Don't", items: DONTS, icon: X, tone: "bg-danger-50 text-danger-700" },
              ].map(({ title, items, icon, tone }) => (
                <div key={title} className={`${CARD} flex flex-col gap-5 p-6 md:p-8`}>
                  <h3 className="m-0 font-display font-medium text-h4 text-zinc-950">{title}</h3>
                  <ul className="m-0 flex list-none flex-col gap-3 p-0">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-3 font-sans text-body leading-[1.55] text-zinc-600">
                        <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${tone}`} aria-hidden="true">
                          <Icon icon={icon} size={12} weight="bold" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Color */}
        <section className="w-full bg-zinc-50" aria-labelledby="brand-color">
          <div className={SECTION}>
            <div className="flex flex-col gap-3 max-w-[560px]">
              <SectionLabel>Color</SectionLabel>
              <SectionHeading id="brand-color">Brand blue</SectionHeading>
              <SectionSub>One color carries the brand. It's the color of the symbol and the accent across everything we make.</SectionSub>
            </div>
            <div className={`${CARD} grid grid-cols-1 md:grid-cols-[1.4fr_1fr]`}>
              <div className="h-40 md:h-auto md:min-h-[220px] bg-brand-500" aria-hidden="true" />
              <dl className="m-0 flex flex-col justify-center divide-y divide-black/[0.07] px-6 md:px-8">
                {BRAND_COLOR.map(({ format, value }) => (
                  <div key={format} className="flex flex-col gap-1 py-5">
                    <dt className="font-mono text-eyebrow font-medium uppercase tracking-[0.08em] text-zinc-500">{format}</dt>
                    <dd className="m-0 flex items-center justify-between gap-4">
                      <span className="font-mono text-body-lg font-medium text-zinc-950">{value}</span>
                      <CopyButton
                        value={value}
                        label={`Copy brand blue ${format} value ${value}`}
                        className="border border-black/[0.1] text-zinc-700 hover:bg-zinc-50"
                      />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <CtaBanner
          heading="Need something that isn't here?"
          subhead="Reach out for co-marketing, partner assets, or press requests and we'll get you what you need."
          cta={{
            label: "Talk to sales",
            href: "/contact-sales",
            onClick: () => trackCtaClick("Talk to sales", "/contact-sales", "primary"),
          }}
          secondaryCta={{
            label: "Support",
            href: "/support",
            onClick: () => trackCtaClick("Support", "/support", "secondary"),
          }}
        />
      </main>
      <Footer />
    </div>
  );
};

export default BrandPage;
