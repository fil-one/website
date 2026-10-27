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

const COLORS = [
  { name: "Brand blue", hex: "#0090FF", role: "Primary. The symbol, highlights, and accents.", swatch: "bg-brand-500", text: "text-zinc-950" },
  { name: "Deep blue", hex: "#0055CC", role: "Links, pressed states, and blue text on white.", swatch: "bg-brand-700", text: "text-white" },
  { name: "Aqua", hex: "#1EBFFF", role: "Gradient accent paired with brand blue.", swatch: "bg-aqua-400", text: "text-zinc-950" },
  { name: "Space", hex: "#070B14", role: "The darkest surfaces and announcement bars.", swatch: "bg-space", text: "text-white" },
  { name: "Navy", hex: "#041525", role: "Dark sections and code blocks.", swatch: "bg-navy-900", text: "text-white" },
  { name: "Ink", hex: "#09090B", role: "Headings and body text.", swatch: "bg-zinc-950", text: "text-white" },
];

const TYPEFACES = [
  {
    name: "Aspekta",
    role: "Display and headings",
    sample: "Storage you can verify",
    sampleClass: "font-display font-medium text-h3 md:text-h2 tracking-[-0.02em]",
    href: "https://github.com/ivodolenc/aspekta",
  },
  {
    name: "Funnel Sans",
    role: "Body copy and interface",
    sample: "S3-compatible object storage with no egress penalties.",
    sampleClass: "font-sans text-body-lg",
    href: "https://fonts.google.com/specimen/Funnel+Sans",
  },
  {
    name: "DM Mono",
    role: "Labels, eyebrows, and code",
    sample: "PUT s3://my-bucket/model.safetensors",
    sampleClass: "font-mono text-body-sm",
    href: "https://fonts.google.com/specimen/DM+Mono",
  },
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
          description="Logos, colors, and type for anyone writing about Fil One, building on it, or partnering with us. Download the full kit or grab individual files below."
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
              <SectionHeading id="brand-color">Color palette</SectionHeading>
              <SectionSub>Brand blue leads. Dark surfaces stay deep and cool, and text sits in near-black ink.</SectionSub>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {COLORS.map((color) => (
                <div key={color.hex} className={`${CARD} flex flex-col`}>
                  <div className={`flex h-32 items-end justify-between p-4 ${color.swatch} ${color.text}`}>
                    <span className="font-mono text-body-sm font-medium">{color.hex}</span>
                    <CopyButton
                      value={color.hex}
                      label={`Copy ${color.name} hex code ${color.hex}`}
                      className={color.text === "text-white" ? "bg-white/15 hover:bg-white/25" : "bg-black/10 hover:bg-black/15"}
                    />
                  </div>
                  <div className="flex flex-col gap-1 p-5">
                    <p className="m-0 font-sans font-medium text-body text-zinc-950">{color.name}</p>
                    <p className="m-0 font-sans text-body-sm leading-[1.5] text-zinc-600">{color.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="w-full bg-white" aria-labelledby="brand-type">
          <div className={SECTION}>
            <div className="flex flex-col gap-3 max-w-[560px]">
              <SectionLabel>Typography</SectionLabel>
              <SectionHeading id="brand-type">Typefaces</SectionHeading>
              <SectionSub>Three free typefaces, each with one job.</SectionSub>
            </div>
            <div className="flex flex-col gap-4">
              {TYPEFACES.map((face) => (
                <div key={face.name} className={`${CARD} grid grid-cols-1 md:grid-cols-[240px_1fr] gap-4 md:gap-10 p-6 md:p-8 md:items-center`}>
                  <div className="flex flex-col gap-1">
                    <p className="m-0 font-sans font-medium text-body text-zinc-950">{face.name}</p>
                    <p className="m-0 font-sans text-body-sm text-zinc-600">{face.role}</p>
                    <a
                      href={face.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 font-sans text-body-sm font-medium text-brand-600 no-underline hover:opacity-70"
                    >
                      Get the font<span className="sr-only"> {face.name} (opens in a new tab)</span>
                    </a>
                  </div>
                  <p className={`m-0 leading-[1.3] text-zinc-950 break-words ${face.sampleClass}`}>{face.sample}</p>
                </div>
              ))}
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
