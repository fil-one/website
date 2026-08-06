export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  coverStyle?: "cyan" | "violet" | "lime";
}

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
  total: number;
  paging?: {
    next?: { after: string; link?: string };
  };
}
