import { localize, type Lang, type Localized } from "@/lib/i18n";

/**
 * The one announcement the site carries at a time. Change it here; every page
 * picks it up through PlatformNavbar. Keep `text` to one short sentence so the
 * bar stays a single line at desktop widths.
 */
const ANNOUNCEMENT: {
  pill: Localized;
  text: Localized;
  linkLabel: Localized;
  /** Phone widths drop `text` and show this as the link instead. */
  shortLinkLabel: Localized;
  href: string;
} = {
  pill: { en: "New", es: "Nuevo" },
  text: {
    en: "Introducing Fil One: S3-compatible storage built for the AI era.",
    es: "Presentamos Fil One: almacenamiento compatible con S3 para la era de la IA.",
  },
  linkLabel: { en: "Read the post →", es: "Leer el artículo →" },
  shortLinkLabel: { en: "Introducing Fil One →", es: "Presentamos Fil One →" },
  href: "/blog/introducing-fil-one-s3-compatible-storage-built-for-the-ai-era",
};

/** Height of the bar in px; PlatformNavbar and the page offsets depend on it (see `header` in tailwind.config.ts). */
const ANNOUNCEMENT_BAR_HEIGHT = 40;

interface AnnouncementBarProps {
  lang?: Lang;
}

/**
 * Thin space-black strip above the navbar: a mono "New" pill, one sentence and
 * a link. It scrolls with the header, so it takes no space away from the page.
 */
const AnnouncementBar = ({ lang = "en" }: AnnouncementBarProps) => {
  const l = (value: Localized) => localize(value, lang);
  return (
    <div
      className="flex items-center justify-center gap-2.5 bg-space px-5 font-sans text-small text-white/85 md:px-8"
      style={{ height: ANNOUNCEMENT_BAR_HEIGHT }}
    >
      <span className="inline-flex h-5 shrink-0 items-center rounded-full border border-brand-400/40 bg-brand-500/[0.18] px-2 font-mono text-[10.5px] font-medium uppercase tracking-[0.08em] text-brand-300">
        {l(ANNOUNCEMENT.pill)}
      </span>
      <span className="hidden truncate sm:inline">{l(ANNOUNCEMENT.text)}</span>
      <a
        href={ANNOUNCEMENT.href}
        className="shrink-0 font-medium text-brand-400 no-underline transition-colors ease-smooth hover:text-brand-300"
      >
        <span className="sm:hidden">{l(ANNOUNCEMENT.shortLinkLabel)}</span>
        <span className="hidden sm:inline">{l(ANNOUNCEMENT.linkLabel)}</span>
      </a>
    </div>
  );
};

export default AnnouncementBar;
