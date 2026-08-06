import type { BlogPost } from "@/types/blog";

const coverClasses = {
  cyan: "from-[#D7FAFF] via-[#83EAFF] to-[#1099E8]",
  violet: "from-[#EEE9FF] via-[#B8A5FF] to-[#5640D8]",
  lime: "from-[#F3FFD8] via-[#C7F56B] to-[#439B62]",
};

const BlogCover = ({ post, priority = false }: { post: BlogPost; priority?: boolean }) => {
  if (post.featuredImage) {
    return (
      <img
        src={post.featuredImage}
        alt={post.featuredImageAlt || ""}
        className="h-full w-full object-cover"
        loading={priority ? "eager" : "lazy"}
      />
    );
  }

  const palette = coverClasses[post.coverStyle || "cyan"];
  return (
    <div className={`relative h-full w-full overflow-hidden bg-gradient-to-br ${palette}`} aria-hidden="true">
      <div className="absolute -right-[12%] -top-[18%] h-[78%] w-[78%] rounded-full border border-white/60 bg-white/20 backdrop-blur-sm" />
      <div className="absolute -bottom-[26%] -left-[10%] h-[75%] w-[75%] rounded-full border border-white/40 bg-black/10" />
      <div className="absolute left-[16%] top-[20%] h-[34%] w-[34%] rounded-full border border-white/70 bg-white/25 shadow-[0_24px_80px_rgba(0,0,0,0.14)]" />
      <div className="absolute bottom-5 right-5 font-mono text-[10px] uppercase tracking-[0.18em] text-black/55">Fil One / Journal</div>
    </div>
  );
};

export default BlogCover;
