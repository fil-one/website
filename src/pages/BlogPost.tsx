import { useEffect, useMemo, useState } from "react";
import { ArrowLeft } from "@phosphor-icons/react";
import { useParams } from "react-router-dom";
import BlogCover from "@/components/BlogCover";
import BlogPostCard from "@/components/BlogPostCard";
import Footer from "@/components/Footer";
import PlatformNavbar from "@/components/PlatformNavbar";
import { useSeo } from "@/hooks/useSeo";
import { fetchBlogPostBySlug, fetchBlogPosts, formatPostDate, selectRelatedPosts } from "@/lib/blog";
import { sanitizeHtml } from "@/lib/sanitizeHtml";
import type { BlogPost as BlogPostType } from "@/types/blog";

const BlogPost = () => {
  const { slug = "" } = useParams();
  const [post, setPost] = useState<BlogPostType | undefined>();
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [related, setRelated] = useState<BlogPostType[]>([]);

  useEffect(() => {
    let active = true;
    setPost(undefined);
    setLoading(true);
    setLoadError(false);
    fetchBlogPostBySlug(slug)
      .then((nextPost) => {
        if (active) setPost(nextPost);
      })
      .catch(() => {
        if (active) setLoadError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [slug]);

  // Loaded separately so the article renders without waiting on the index, and a
  // failure here costs the suggestions rather than the post.
  useEffect(() => {
    if (!post) return;
    let active = true;
    fetchBlogPosts()
      .then((posts) => {
        // Two, because the section is the width of the reading column.
        if (active) setRelated(selectRelatedPosts(posts, post, 2));
      })
      .catch(() => {
        if (active) setRelated([]);
      });
    return () => { active = false; };
  }, [post]);

  const safeContent = useMemo(() => sanitizeHtml(post?.content || ""), [post?.content]);

  // /blog/:slug is served by api/blog-page.js, which injects the real article
  // meta at request time for crawlers and link unfurlers. This keeps the title
  // and canonical correct for client-side navigations too.
  useSeo({
    title: post ? `${post.title} · Fil One` : "Blog · Fil One",
    description: post?.excerpt || "Ideas and practical guidance from Fil One.",
    canonical: `https://www.fil.one/blog/${slug}`,
    ogImage: post?.featuredImage || "https://www.fil.one/og-image.png",
  });

  const publishedLabel = formatPostDate(post?.publishedAt);

  return (
    <div className="min-h-screen bg-white">
      <PlatformNavbar />
      <main id="main-content" className="pt-[58px] md:pt-[94px]">
        {loading ? (
          <div className="mx-auto min-h-[60vh] max-w-container-prose px-5 py-20 text-sm text-zinc-500 md:px-8" aria-live="polite">Loading article…</div>
        ) : loadError ? (
          <div className="mx-auto min-h-[60vh] max-w-container-prose px-5 py-20 md:px-8">
            <h1 className="font-display text-4xl font-medium tracking-[-0.03em] text-zinc-950">Unable to load article</h1>
            <p className="mt-3 text-zinc-600">Please try again shortly.</p>
            <a href="/blog" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-brand-600"><ArrowLeft size={16} /> Back to blog</a>
          </div>
        ) : !post ? (
          <div className="mx-auto min-h-[60vh] max-w-container-prose px-5 py-20 md:px-8">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-zinc-500">404</p>
            <h1 className="mt-4 font-display text-4xl font-medium tracking-[-0.03em] text-zinc-950">Article not found</h1>
            <a href="/blog" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-brand-600"><ArrowLeft size={16} /> Back to blog</a>
          </div>
        ) : (
          <article>
            <header className="px-5 pb-10 pt-10 sm:px-6 md:px-8 md:pb-14 md:pt-16">
              <div className="mx-auto max-w-container-prose">
                <a href="/blog" className="inline-flex items-center gap-2 text-[15px] text-zinc-600 no-underline transition-colors hover:text-zinc-950"><ArrowLeft size={16} /> All articles</a>
                <p className="mt-8 font-mono text-xs uppercase tracking-[0.12em] text-zinc-500 md:mt-10">
                  {[publishedLabel, post.author].filter(Boolean).join(" · ")}
                </p>
                <h1 className="mt-4 font-display text-[36px] font-medium leading-[1.1] tracking-[-0.032em] text-zinc-950 sm:text-[42px] md:text-[54px]">{post.title}</h1>
                {post.excerpt && (
                  <p className="mt-5 text-[17px] leading-7 text-zinc-600 md:mt-6 md:text-lg md:leading-8">{post.excerpt}</p>
                )}
              </div>
            </header>

            <div className="mx-auto aspect-[2/1] max-w-[880px] overflow-hidden sm:rounded-2xl">
              <BlogCover post={post} priority />
            </div>

            <div className="px-5 pb-24 pt-12 sm:px-6 md:px-8 md:pb-section md:pt-16">
              <div className="blog-content mx-auto max-w-container-prose" dangerouslySetInnerHTML={{ __html: safeContent }} />
            </div>
          </article>
        )}

        {post && related.length > 0 && (
          <section aria-labelledby="keep-reading" className="border-t border-black/[0.07] bg-zinc-50 px-5 pb-20 pt-16 sm:px-6 md:px-8 md:pb-section md:pt-24">
            <div className="mx-auto max-w-container-prose">
              <h2 id="keep-reading" className="font-display text-2xl font-medium tracking-[-0.02em] text-zinc-950 md:text-[28px]">Keep reading</h2>
              <div className="mt-8 grid gap-x-7 gap-y-10 sm:grid-cols-2 md:mt-10">
                {related.map((item) => (
                  <BlogPostCard key={item.id} post={item} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
