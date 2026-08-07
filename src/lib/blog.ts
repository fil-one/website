import type { BlogPost, HubSpotBlogListResponse, HubSpotBlogPost } from "@/types/blog";

const stripHtml = (value = "") => value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

const truncateExcerpt = (value: string, maxLength = 220) => {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength).replace(/\s+\S*$/, "").trim()}…`;
};

const localSlug = (slug: string) => {
  const segments = slug.split("/").filter(Boolean);
  return segments.at(-1) ?? slug;
};

export const mapHubSpotPost = (post: HubSpotBlogPost): BlogPost => ({
  id: post.id,
  slug: localSlug(post.slug),
  title: post.name,
  excerpt: truncateExcerpt(stripHtml(post.postSummary || post.metaDescription || "")),
  content: post.postBody || "",
  author: post.authorName || "Fil One Team",
  publishedAt: post.publishDate || post.createdAt || new Date(0).toISOString(),
  featuredImage: post.featuredImage || undefined,
  featuredImageAlt: post.featuredImageAltText || post.name,
});

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const response = await fetch("/api/blogs");
  if (!response.ok) throw new Error(`Blog API returned ${response.status}`);
  const data = (await response.json()) as HubSpotBlogListResponse;
  return (data.results || [])
    .map(mapHubSpotPost)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await fetchBlogPosts();
  const summary = posts.find((post) => post.slug === slug);
  if (!summary) return undefined;

  const response = await fetch(`/api/blogs/${encodeURIComponent(summary.id)}`);
  if (!response.ok) throw new Error(`Blog API returned ${response.status}`);
  return mapHubSpotPost((await response.json()) as HubSpotBlogPost);
}
