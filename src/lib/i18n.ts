/** The languages the site's shared shell (navbar, footer) is translated into. */
export type Lang = "en" | "es";

/**
 * A piece of copy inside a shared data structure. Use a plain string when the
 * text is identical in every language — brand and product names ("Bucket
 * Intelligence"), vendor names, and loanwords the Spanish pages keep in English
 * ("Partners", "Blog"). A bare string therefore reads as "deliberately not
 * translated" rather than "translation missing", which two identical copies of
 * the same string could not express.
 */
export type Localized = string | Record<Lang, string>;

/** Resolve a {@link Localized} value for one language. */
export const localize = (value: Localized, lang: Lang): string =>
  typeof value === "string" ? value : value[lang];
