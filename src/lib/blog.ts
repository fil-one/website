import type { BlogPost, BlogTag, CoverStyle, HubSpotBlogListResponse, HubSpotBlogPost } from "@/types/blog";

/** Pages to walk when loading the index (the API caps each page at 100). */
const MAX_PAGES = 10;

const COVER_STYLES: CoverStyle[] = ["cyan", "violet", "lime"];

export const stripHtml = (value = "") => value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

export const truncateExcerpt = (value: string, maxLength = 220) => {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength).replace(/\s+\S*$/, "").trim()}…`;
};

/** HubSpot slugs can be nested ("blog/my-post"); the site routes on the last segment. */
export const localSlug = (slug: string) => {
  const segments = slug.split("/").filter(Boolean);
  return segments.at(-1) ?? slug;
};

/**
 * Deterministic fallback cover palette, so a post without a featured image keeps
 * the same gradient across renders and neighbouring cards don't all match.
 */
export const coverStyleFor = (id: string): CoverStyle => {
  let hash = 0;
  for (const char of id) hash = (hash * 31 + char.charCodeAt(0)) % 9973;
  return COVER_STYLES[hash % COVER_STYLES.length];
};

export const mapHubSpotPost = (post: HubSpotBlogPost): BlogPost => ({
  id: post.id,
  slug: localSlug(post.slug),
  title: post.name,
  excerpt: truncateExcerpt(stripHtml(post.postSummary || post.metaDescription || "")),
  content: post.postBody || "",
  author: post.authorName || "Fil One Team",
  publishedAt: post.publishDate || post.createdAt,
  featuredImage: post.featuredImage || undefined,
  featuredImageAlt: post.featuredImageAltText || post.name,
  coverStyle: coverStyleFor(post.id),
  tags: post.tags || [],
});

/** Post date as displayed on the index and article pages; "" when unusable. */
export const formatPostDate = (date?: string) => {
  if (!date) return "";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "";
  return new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" }).format(parsed);
};

/** Category slug meaning "no filter" — the leading tab, as on Linear's blog. */
export const ALL_CATEGORY = "all";

/**
 * The category tabs to show: every tag present on a loaded post, most-used
 * first so the busiest categories lead. Tags nobody has used never appear.
 */
export function buildCategories(posts: BlogPost[]): Array<BlogTag & { count: number }> {
  const counts = new Map<string, BlogTag & { count: number }>();

  for (const post of posts) {
    for (const tag of post.tags) {
      const existing = counts.get(tag.slug);
      if (existing) existing.count += 1;
      else counts.set(tag.slug, { ...tag, count: 1 });
    }
  }

  return [...counts.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

/** Filter by category tab and search text (title, excerpt and category names). */
export function filterPosts(
  posts: BlogPost[],
  { category = ALL_CATEGORY, query = "" }: { category?: string; query?: string } = {}
): BlogPost[] {
  const needle = query.trim().toLowerCase();

  return posts.filter((post) => {
    if (category !== ALL_CATEGORY && !post.tags.some((tag) => tag.slug === category)) return false;
    if (!needle) return true;

    const haystack = [post.title, post.excerpt, ...post.tags.map((tag) => tag.name)]
      .join(" ")
      .toLowerCase();
    return haystack.includes(needle);
  });
}

const byNewestFirst = (a: BlogPost, b: BlogPost) =>
  new Date(b.publishedAt ?? 0).getTime() - new Date(a.publishedAt ?? 0).getTime();

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Blog API returned ${response.status}`);
  return (await response.json()) as T;
}

/** Every published post, following the API's paging cursor. */
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const posts: BlogPost[] = [];
  let after: string | undefined;

  for (let page = 0; page < MAX_PAGES; page += 1) {
    const query = new URLSearchParams({ limit: "100" });
    if (after) query.set("after", after);

    const data = await getJson<HubSpotBlogListResponse>(`/api/blogs?${query}`);
    posts.push(...(data.results || []).map(mapHubSpotPost));

    after = data.paging?.next?.after;
    if (!after) break;
  }

  return posts.sort(byNewestFirst);
}

/**
 * One published post by its local slug, body included. Resolved server-side, so
 * it works for every article rather than only those on the first page.
 */
export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const response = await fetch(`/api/blogs?slug=${encodeURIComponent(slug)}`);
  if (response.status === 404) return undefined;
  if (!response.ok) throw new Error(`Blog API returned ${response.status}`);

  const data = (await response.json()) as HubSpotBlogListResponse;
  const [post] = data.results || [];
  return post ? mapHubSpotPost(post) : undefined;
}
