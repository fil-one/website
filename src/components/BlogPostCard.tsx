import { ArrowRight } from "@phosphor-icons/react";
import BlogCover from "@/components/BlogCover";
import { formatPostDate } from "@/lib/blog";
import type { BlogPost } from "@/types/blog";

/**
 * A post as it appears on the blog index.
 *
 * `featured` is the full-width front-page treatment (cover beside the copy);
 * `grid` is the stacked card used in the three-column list. Both share the same
 * cover / date / title / excerpt structure, which is why they live together.
 */

const META_CLASS = "font-mono text-xs uppercase tracking-[0.1em] text-zinc-500";

export interface BlogPostCardProps {
  post: BlogPost;
  variant?: "grid" | "featured";
}

const BlogPostCard = ({ post, variant = "grid" }: BlogPostCardProps) => {
  const published = formatPostDate(post.publishedAt);

  if (variant === "featured") {
    return (
      <article>
        <a href={`/blog/${post.slug}`} className="group grid overflow-hidden rounded-2xl border border-black/[0.08] bg-zinc-50 text-inherit no-underline shadow-elevated-sm transition-colors hover:border-black/[0.14] md:grid-cols-[0.95fr_1.05fr]">
          <div className="aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[380px]">
            <BlogCover post={post} priority />
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10 lg:p-12">
            <p className={`${META_CLASS} tracking-[0.12em]`}>{["Featured", published].filter(Boolean).join(" · ")}</p>
            <h2 className="mt-4 font-display text-[26px] font-medium leading-[1.15] tracking-[-0.025em] text-zinc-950 md:text-[31px] lg:text-[34px]">{post.title}</h2>
            <p className="mt-4 line-clamp-5 text-[15px] leading-7 text-zinc-600 md:line-clamp-4 md:text-base">{post.excerpt}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-zinc-950 md:mt-8">
              Read article <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </a>
      </article>
    );
  }

  return (
    <article>
      <a href={`/blog/${post.slug}`} className="group block text-inherit no-underline">
        <div className="aspect-[16/10] overflow-hidden rounded-xl border border-black/[0.07]">
          <BlogCover post={post} />
        </div>
        {published && <p className={`mt-5 ${META_CLASS}`}>{published}</p>}
        <h2 className="mt-2.5 font-display text-[19px] font-medium leading-[1.25] tracking-[-0.015em] text-zinc-950 transition-colors group-hover:text-brand-600 md:text-[21px]">{post.title}</h2>
        <p className="mt-2.5 line-clamp-3 text-[15px] leading-6 text-zinc-600">{post.excerpt}</p>
      </a>
    </article>
  );
};

export default BlogPostCard;
