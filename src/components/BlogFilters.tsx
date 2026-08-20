import { MagnifyingGlass, RssSimple, X } from "@phosphor-icons/react";
import { ALL_CATEGORY } from "@/lib/blog";
import type { BlogTag } from "@/types/blog";

/**
 * Blog index header controls: category tabs, search, and the RSS link.
 *
 * Categories come from the tags on the loaded posts, so the bar is empty (and
 * hidden) until HubSpot posts carry tags.
 */

const TAB_BASE =
  "whitespace-nowrap rounded-full px-3 py-1.5 font-sans text-[14.5px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40";
const TAB_ACTIVE = "bg-zinc-100 font-medium text-zinc-950";
const TAB_IDLE = "text-zinc-500 hover:text-zinc-900";

export interface BlogFiltersProps {
  categories: Array<BlogTag & { count: number }>;
  category: string;
  onCategoryChange: (slug: string) => void;
  query: string;
  onQueryChange: (query: string) => void;
  /** Announced result count, so filtering isn't silent for screen readers. */
  resultCount: number;
}

const BlogFilters = ({
  categories,
  category,
  onCategoryChange,
  query,
  onQueryChange,
  resultCount,
}: BlogFiltersProps) => {
  const tabs = [{ slug: ALL_CATEGORY, name: "All" }, ...categories];

  return (
    <div className="mt-7 flex flex-col gap-4 md:mt-8 md:flex-row md:items-center md:justify-between md:gap-6">
      {categories.length > 0 && (
        <nav aria-label="Filter posts by category" className="-mx-1 overflow-x-auto md:mx-0">
          <ul className="flex list-none items-center gap-1 px-1 md:px-0">
            {tabs.map((tab) => (
              <li key={tab.slug}>
                <button
                  type="button"
                  aria-pressed={category === tab.slug}
                  onClick={() => onCategoryChange(tab.slug)}
                  className={`${TAB_BASE} ${category === tab.slug ? TAB_ACTIVE : TAB_IDLE}`}
                >
                  {tab.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div className="flex items-center gap-2 md:ml-auto">
        <div className="relative flex-1 md:w-[260px] md:flex-none">
          <MagnifyingGlass
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search…"
            aria-label="Search posts"
            className="w-full rounded-full border border-black/10 bg-zinc-50 py-2 pl-10 pr-9 font-sans text-[14.5px] text-zinc-950 transition-colors placeholder:text-zinc-500 hover:border-black/20 focus:border-black/30 focus:outline-none focus:ring-2 focus:ring-brand-500/25 [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => onQueryChange("")}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-zinc-500 transition-colors hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40"
            >
              <X size={14} aria-hidden="true" />
            </button>
          )}
        </div>

        <a
          href="/blog/rss.xml"
          aria-label="Subscribe via RSS"
          title="RSS feed"
          className="rounded-full p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40"
        >
          <RssSimple size={18} aria-hidden="true" />
        </a>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {resultCount} {resultCount === 1 ? "post" : "posts"}
      </p>
    </div>
  );
};

export default BlogFilters;
