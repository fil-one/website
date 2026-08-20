import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BlogFilters from "@/components/BlogFilters";
import BlogPostCard from "@/components/BlogPostCard";
import { Button } from "@/components/Button";
import Footer from "@/components/Footer";
import PlatformNavbar from "@/components/PlatformNavbar";
import { useSeo } from "@/hooks/useSeo";
import { ALL_CATEGORY, buildCategories, fetchBlogPosts, filterPosts } from "@/lib/blog";
import type { BlogPost } from "@/types/blog";

/**
 * Grid cards shown before "Load more". The full archive is already in memory
 * (search and category filtering need it), so this caps rendering, not fetching.
 *
 * Both counts are multiples of 6 — the grid is 2 columns at `sm` and 3 at `lg`,
 * so a multiple of 6 always leaves the last row full. The featured card sits
 * outside the grid and isn't counted here.
 */
const GRID_BATCH = 12;
const LOAD_MORE_STEP = 6;

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  // Filter state lives in the URL so a filtered view can be linked and the back
  // button works.
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || ALL_CATEGORY;
  const query = searchParams.get("q") || "";

  /**
   * Category changes push a history entry, so Back returns to the previous tab
   * rather than leaving the blog. Typing replaces, so Back doesn't walk the
   * search box one character at a time.
   */
  const setParam = (key: string, value: string, { push = false } = {}) => {
    const next = new URLSearchParams(searchParams);
    if (value && !(key === "category" && value === ALL_CATEGORY)) next.set(key, value);
    else next.delete(key);
    setSearchParams(next, { replace: !push });
  };

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
    title: "Blog · Fil One",
    description: "Ideas and practical guidance on object storage, AI infrastructure, and the cost of moving data at scale.",
    canonical: "https://www.fil.one/blog",
    ogImage: "https://www.fil.one/og-image.png",
  });

  const categories = useMemo(() => buildCategories(posts), [posts]);
  const matching = useMemo(() => filterPosts(posts, { category, query }), [posts, category, query]);
  const isFiltered = category !== ALL_CATEGORY || query.trim() !== "";

  const [gridShown, setGridShown] = useState(GRID_BATCH);
  // A new filter starts a fresh list, so collapse back to the first batch.
  useEffect(() => setGridShown(GRID_BATCH), [category, query]);

  // The featured slot is a front-page device. In a filtered or searched view the
  // top post is just the newest match, so everything gets equal weight instead.
  const featured = isFiltered ? undefined : matching[0];
  const gridPosts = featured ? matching.slice(1) : matching;

  const rest = gridPosts.slice(0, gridShown);
  const remaining = gridPosts.length - rest.length;

  return (
    <div className="min-h-screen bg-white">
      <PlatformNavbar />
      <main id="main-content" className="pt-[58px] md:pt-[94px]">
        <section className="px-5 pb-20 pt-10 sm:px-6 md:px-8 md:pb-section md:pt-16">
          <div className="mx-auto max-w-container">
            <header className="mb-10 md:mb-14">
              <h1 className="font-display text-[36px] font-medium leading-[1.1] tracking-[-0.03em] text-zinc-950 md:text-[48px]">Blog</h1>
              {!loading && !loadError && posts.length > 0 && (
                <BlogFilters
                  categories={categories}
                  category={category}
                  onCategoryChange={(slug) => setParam("category", slug, { push: true })}
                  query={query}
                  onQueryChange={(value) => setParam("q", value)}
                  resultCount={matching.length}
                />
              )}
            </header>

            {loading && (
              <div className="min-h-[55vh] text-sm text-zinc-500" aria-live="polite">Loading articles…</div>
            )}

            {loadError && (
              <div className="min-h-[55vh]">
                <h2 className="font-display text-2xl font-medium tracking-[-0.025em] text-zinc-950">Unable to load articles</h2>
                <p className="mt-3 text-zinc-600">Please try again shortly.</p>
              </div>
            )}

            {!loading && !loadError && posts.length === 0 && (
              <div className="min-h-[55vh]">
                <h2 className="font-display text-2xl font-medium tracking-[-0.025em] text-zinc-950">No articles yet</h2>
              </div>
            )}

            {!loading && !loadError && posts.length > 0 && matching.length === 0 && (
              <div className="min-h-[40vh]">
                <h2 className="font-display text-2xl font-medium tracking-[-0.025em] text-zinc-950">No matching articles</h2>
                <p className="mt-3 text-zinc-600">Try a different search or category.</p>
              </div>
            )}

            {featured && <BlogPostCard post={featured} variant="featured" />}

            {rest.length > 0 && (
              <div className={`grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 ${featured ? "mt-10 md:mt-14" : ""}`}>
                {rest.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            )}

            {remaining > 0 && (
              <div className="mt-12 flex justify-center md:mt-16">
                <Button
                  variant="secondary"
                  onClick={() => setGridShown((current) => current + LOAD_MORE_STEP)}
                >
                  Load more
                  <span className="sr-only"> articles ({remaining} remaining)</span>
                </Button>
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
