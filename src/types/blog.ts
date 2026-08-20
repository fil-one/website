export type CoverStyle = "cyan" | "violet" | "lime";

/** A HubSpot blog tag — the blog's categories. */
export interface BlogTag {
  id: string;
  name: string;
  slug: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  /** Absent when HubSpot has no publish or create date for the post. */
  publishedAt?: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  coverStyle?: CoverStyle;
  tags: BlogTag[];
}

/** The projected shape /api/blogs returns — a subset of HubSpot's post object. */
export interface HubSpotBlogPost {
  id: string;
  slug: string;
  name: string;
  postSummary?: string;
  postBody?: string;
  metaDescription?: string;
  authorName?: string;
  publishDate?: string;
  createdAt?: string;
  featuredImage?: string;
  featuredImageAltText?: string;
  tags?: BlogTag[];
}

export interface HubSpotBlogListResponse {
  results: HubSpotBlogPost[];
  total?: number;
  paging?: {
    next?: { after: string; link?: string };
  };
}
