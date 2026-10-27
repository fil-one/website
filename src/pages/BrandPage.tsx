import { useState } from "react";
import { Check, Copy, DownloadSimple } from "@phosphor-icons/react";
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
  { format: "OKLCH", value: "oklch(64.93% 0.193 251.78)" },
];

const CARD = "rounded-2xl border border-black/[0.07] bg-white shadow-elevated-sm overflow-hidden";
const SECTION = "flex flex-col gap-10 px-5 md:px-8 py-16 md:py-24 w-full max-w-container mx-auto";

/** Copies `value` and briefly confirms; the live region announces it to screen readers. */
const CopyButton = ({
  value,
  label,
  text = "Copy",
  iconOnly = false,
  className = "",
}: {
  /** The text to copy, or a loader for text fetched on click (e.g. an SVG file). */
  value: string | (() => Promise<string>);
  label: string;
  text?: string;
  /** Show only the icon; the text stays in the live region for screen readers. */
  iconOnly?: boolean;
  className?: string;
}) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      if (typeof value === "string") {
        await navigator.clipboard.writeText(value);
      } else if (typeof ClipboardItem !== "undefined") {
        // Hand the clipboard a pending blob so Safari keeps the click's user activation across the fetch.
        const blob = value().then((t) => new Blob([t], { type: "text/plain" }));
        await navigator.clipboard.write([new ClipboardItem({ "text/plain": blob })]);
      } else {
        await navigator.clipboard.writeText(await value());
      }
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
      className={`inline-flex items-center gap-1.5 rounded-full font-sans text-small font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 ${iconOnly ? "h-9 w-9 justify-center" : "px-3 py-1.5"} ${className}`}
    >
      <Icon icon={copied ? Check : Copy} size={iconOnly ? 16 : 14} />
      <span aria-live="polite" className={iconOnly ? "sr-only" : undefined}>{copied ? "Copied" : text}</span>
    </button>
  );
};

const AssetCard = ({ asset, aspect }: { asset: AssetVariant; aspect: string }) => (
  <div className={`${CARD} flex flex-col`}>
    <div className={`group relative flex items-center justify-center ${aspect} ${asset.surface} border-b border-black/[0.07]`}>
      <img src={`/brand/${asset.file}.svg`} alt={`Fil One ${asset.name.toLowerCase()} ${asset.file.includes("symbol") ? "symbol" : "logo"}`} className="max-h-[42%] max-w-[62%]" loading="lazy" />
      {/* Revealed on hover or keyboard focus; always shown on touch screens, which can't hover. */}
      <CopyButton
        value={() => fetch(`/brand/${asset.file}.svg`).then((r) => r.text())}
        label={`Copy ${asset.name} ${asset.file.includes("symbol") ? "symbol" : "logo"} SVG code`}
        iconOnly
        className="absolute right-3 top-3 border border-black/[0.08] bg-white text-zinc-700 shadow-elevated-sm opacity-0 transition-opacity hover:bg-zinc-50 focus-visible:opacity-100 group-hover:opacity-100 [@media(hover:none)]:opacity-100"
      />
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
        <section className="w-full bg-white" aria-labelledby="brand-symbol">
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

        {/* Color */}
        <section className="w-full bg-white" aria-labelledby="brand-color">
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
            label: "Support",
            href: "/support",
            onClick: () => trackCtaClick("Support", "/support", "primary"),
          }}
        />
      </main>
      <Footer />
    </div>
  );
};

export default BrandPage;
