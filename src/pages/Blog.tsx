import { useEffect, useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import BlogCover from "@/components/BlogCover";
import Footer from "@/components/Footer";
import PlatformNavbar from "@/components/PlatformNavbar";
import { useSeo } from "@/hooks/useSeo";
import { fetchBlogPosts } from "@/lib/blog";
import type { BlogPost } from "@/types/blog";

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" }).format(new Date(date));

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let active = true;
    fetchBlogPosts()
      .then((nextPosts) => {
        if (active) setPosts(nextPosts);
      })
      .catch(() => {
        if (active) setLoadError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  useSeo({
    title: "Blog — Fil One",
    description: "Ideas and practical guidance on object storage, AI infrastructure, and verifiable data.",
    canonical: "https://filone.io/blog",
    ogImage: "https://filone.io/og-image.png",
  });

  const [featured, ...rest] = posts;

  return (
    <div className="min-h-screen bg-white">
      <PlatformNavbar />
      <main id="main-content" className="pt-[58px] md:pt-[94px]">
        <section className="px-5 py-10 sm:px-6 md:px-8 md:py-16">
          <div className="mx-auto max-w-[1160px]">
            {loading && (
              <div className="min-h-[55vh] py-12 text-sm text-[#71717A]" aria-live="polite">Loading articles…</div>
            )}

            {loadError && (
              <div className="min-h-[55vh] py-12">
                <h1 className="font-['Aspekta'] text-3xl font-medium tracking-[-0.025em] text-[#09090B]">Unable to load articles</h1>
                <p className="mt-3 text-[#52525B]">Please try again shortly.</p>
              </div>
            )}

            {!loading && !loadError && posts.length === 0 && (
              <div className="min-h-[55vh] py-12">
                <h1 className="font-['Aspekta'] text-3xl font-medium tracking-[-0.025em] text-[#09090B]">No articles yet</h1>
              </div>
            )}

            {featured && (
              <a href={`/blog/${featured.slug}`} className="group grid overflow-hidden rounded-2xl border border-black/[0.08] bg-[#FAFAFA] text-inherit no-underline shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-colors hover:border-black/[0.14] md:grid-cols-[0.95fr_1.05fr]">
                <div className="aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[410px]">
                  <BlogCover post={featured} priority />
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10 lg:p-12">
                  <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#71717A]">Featured · {formatDate(featured.publishedAt)}</p>
                  <h2 className="mt-4 font-['Aspekta'] text-[30px] font-medium leading-[1.12] tracking-[-0.025em] text-[#09090B] md:text-[38px] lg:text-[42px]">{featured.title}</h2>
                  <p className="mt-4 line-clamp-5 text-base leading-7 text-[#52525B] md:line-clamp-4">{featured.excerpt}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-[#09090B] md:mt-8">
                    Read article <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            )}

            {rest.length > 0 && (
              <div className="mt-10 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 md:mt-14">
                {rest.map((post) => (
                  <article key={post.id}>
                    <a href={`/blog/${post.slug}`} className="group block text-inherit no-underline">
                      <div className="aspect-[16/10] overflow-hidden rounded-xl border border-black/[0.07]">
                        <BlogCover post={post} />
                      </div>
                      <p className="mt-5 font-mono text-xs uppercase tracking-[0.1em] text-[#71717A]">{formatDate(post.publishedAt)}</p>
                      <h2 className="mt-3 font-['Aspekta'] text-2xl font-medium leading-[1.2] tracking-[-0.018em] text-[#09090B] transition-colors group-hover:text-[#1684C5] md:text-[26px]">{post.title}</h2>
                      <p className="mt-3 line-clamp-3 text-base leading-7 text-[#52525B]">{post.excerpt}</p>
                    </a>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
