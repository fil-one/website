export type CoverStyle = "cyan" | "violet" | "lime";

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
}

export interface HubSpotBlogListResponse {
  results: HubSpotBlogPost[];
  total?: number;
  paging?: {
    next?: { after: string; link?: string };
  };
}
