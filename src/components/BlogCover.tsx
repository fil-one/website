import type { BlogPost, CoverStyle } from "@/types/blog";

/**
 * Generated cover for posts with no featured image.
 *
 * Same language as public/filone-auth-background.svg: a dark field with soft
 * blurred gradient forms, overlaid with a hairline geometric figure.
 *
 *  - Colour comes from the post's category, so every "AI & data" post shares a
 *    hue and the grid reinforces the taxonomy.
 *  - The figure also comes from the category, but abstractly: each category gets
 *    a different geometric system, not a picture of the subject.
 *  - Composition is derived from the post id, so each cover is distinct while
 *    staying inside the system. Same post always renders the same cover.
 */

interface Palette {
  base: string;
  from: string;
  to: string;
  accent: string;
}

/** Tokens from tailwind.config.ts, plus the warm pair used by the auth background. */
const PALETTES: Record<string, Palette> = {
  "ai-data": { base: "#09090B", from: "#0090FF", to: "#002E6B", accent: "#83EAFF" },
  "backup-recovery": { base: "#041525", from: "#1EBFFF", to: "#0D2847", accent: "#1EBFFF" },
  "storage-costs": { base: "#09090B", from: "#D49C24", to: "#BA411A", accent: "#D49C24" },
  guides: { base: "#09090B", from: "#83EAFF", to: "#0070CC", accent: "#83EAFF" },
  "product-updates": { base: "#09090B", from: "#0090FF", to: "#0055CC", accent: "#0090FF" },
  company: { base: "#0D2847", from: "#0D2847", to: "#09090B", accent: "#0090FF" },
};

/** Palette for posts with no recognised category, keyed off the existing hash. */
const FALLBACK: Record<CoverStyle, Palette> = {
  cyan: PALETTES["ai-data"],
  violet: PALETTES["product-updates"],
  lime: PALETTES["backup-recovery"],
};

const paletteFor = (post: BlogPost): Palette => {
  for (const tag of post.tags ?? []) {
    const palette = PALETTES[tag.slug];
    if (palette) return palette;
  }
  return FALLBACK[post.coverStyle ?? "cyan"];
};

/** Seeded generator, so a post's composition never changes between renders. */
const seededRandom = (seed: string) => {
  let state = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    state ^= seed.charCodeAt(i);
    state = Math.imul(state, 16777619);
  }
  return () => {
    state += 0x6d2b79f5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const VIEW_W = 640;
const VIEW_H = 400;

interface Blob {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  rotate: number;
  opacity: number;
  fill: number;
  /** Soft forms are the diffuse field; tight ones read as a light source. */
  blur: "soft" | "tight";
}

/**
 * Corner anchors. The primary form takes a seeded corner and the secondary takes
 * the diagonally opposite one, so the composition stays balanced but its
 * direction changes from post to post. Ranges are inset from the edges because
 * the artwork is slice-cropped to 2:1 on article heroes, trimming 10% off the
 * top and bottom.
 */
const ANCHORS = [
  { x: [0.08, 0.32], y: [0.14, 0.36] }, // top-left
  { x: [0.68, 0.92], y: [0.14, 0.36] }, // top-right
  { x: [0.08, 0.32], y: [0.64, 0.86] }, // bottom-left
  { x: [0.68, 0.92], y: [0.64, 0.86] }, // bottom-right
];

/** 0<->3 and 1<->2 are diagonal opposites. */
const opposite = (index: number) => 3 - index;

const composition = (seed: string) => {
  const random = seededRandom(seed);
  const between = (min: number, max: number) => min + random() * (max - min);

  const primary = Math.floor(random() * ANCHORS.length);
  const corners = [primary, opposite(primary)];
  if (random() > 0.35) corners.push((primary + (random() > 0.5 ? 1 : 2)) % ANCHORS.length);

  const blobs: Blob[] = corners.map((anchorIndex, index) => {
    const anchor = ANCHORS[anchorIndex];
    return {
      cx: between(anchor.x[0], anchor.x[1]) * VIEW_W,
      cy: between(anchor.y[0], anchor.y[1]) * VIEW_H,
      rx: between(0.28, 0.44) * VIEW_W,
      ry: between(0.3, 0.48) * VIEW_H,
      rotate: between(-40, 40),
      opacity: index === 0 ? between(0.78, 0.96) : between(0.28, 0.55),
      fill: index % 2,
      blur: "soft",
    };
  });

  // A small, tighter form near the primary mass, so the light has a source
  // instead of being evenly diffuse. Present on most covers, not all.
  if (random() > 0.25) {
    const anchor = ANCHORS[primary];
    blobs.push({
      cx: between(anchor.x[0] - 0.04, anchor.x[1] + 0.04) * VIEW_W,
      cy: between(anchor.y[0] - 0.04, anchor.y[1] + 0.04) * VIEW_H,
      rx: between(0.09, 0.17) * VIEW_W,
      ry: between(0.11, 0.2) * VIEW_H,
      rotate: between(-30, 30),
      opacity: between(0.5, 0.8),
      fill: 1,
      blur: "tight",
    });
  }

  // Gradient direction varies too, so two covers sharing a corner still differ.
  const gradients = [0, 1].map(() => {
    const flipX = random() > 0.5;
    const flipY = random() > 0.5;
    return { x1: flipX ? 1 : 0, y1: flipY ? 1 : 0, x2: flipX ? 0 : 1, y2: flipY ? 0 : 1 };
  });

  return {
    blobs,
    gradients,
    softBlur: between(64, 88),
    tightBlur: between(26, 42),
    figurePhase: random(),
  };
};

/* ── Hairline fields ─────────────────────────────────────────────────────────
 *
 * Six abstract fields, one per category. They depict nothing: the category is
 * expressed as a different kind of order.
 *
 * Everything is one colour at one weight. Opacity is set once on the group, not
 * per line, so where strokes cross they do NOT accumulate into brighter
 * intersections: the group is composited as a single layer. That is what keeps a
 * dense field reading as one drawn surface rather than a tangle.
 */

const BOX = 240;
const MID = BOX / 2;

/** Rotational lattice: one ellipse swept through a half turn. */
const Lattice = ({ phase }: { phase: number }) => (
  <>
    {Array.from({ length: 26 }, (_, i) => (
      <ellipse
        key={i}
        cx={MID}
        cy={MID}
        rx={112}
        ry={26 + phase * 10}
        transform={`rotate(${(i * 180) / 26} ${MID} ${MID})`}
      />
    ))}
  </>
);

/** Polar grid: rings crossed by spokes. */
const Polar = ({ phase }: { phase: number }) => (
  <>
    {Array.from({ length: 9 }, (_, i) => (
      <circle key={i} cx={MID} cy={MID} r={14 + i * 13} />
    ))}
    {Array.from({ length: 48 }, (_, i) => {
      const angle = (i / 48) * Math.PI * 2 + phase;
      return (
        <line
          key={i}
          x1={MID + Math.cos(angle) * 14}
          y1={MID + Math.sin(angle) * 14}
          x2={MID + Math.cos(angle) * 118}
          y2={MID + Math.sin(angle) * 118}
        />
      );
    })}
  </>
);

/** Comb: verticals whose length follows a wave. */
const Comb = ({ phase }: { phase: number }) => {
  const count = 62;
  const step = BOX / (count - 1);
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const wave = Math.sin((i / count) * Math.PI * 3 + phase * 6);
        const half = 30 + Math.abs(wave) * 84;
        return <line key={i} x1={i * step} y1={MID - half} x2={i * step} y2={MID + half} />;
      })}
    </>
  );
};

/** Interference: curves at drifting amplitude. */
const Interference = ({ phase }: { phase: number }) => {
  const count = 28;
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const y = i * (BOX / (count - 1));
        const amp = Math.sin((i / count) * Math.PI * 2 + phase * 4) * 22;
        return (
          <path
            key={i}
            d={`M 0 ${y} C ${BOX * 0.28} ${y - amp}, ${BOX * 0.72} ${y + amp}, ${BOX} ${y}`}
          />
        );
      })}
    </>
  );
};

/** Radial sweep: spokes modulated in length. */
const Sweep = ({ phase }: { phase: number }) => (
  <>
    {Array.from({ length: 120 }, (_, i) => {
      const angle = (i / 120) * Math.PI * 2;
      const reach = 62 + (Math.sin(i * 0.26 + phase * 5) * 0.5 + 0.5) * 58;
      return (
        <line
          key={i}
          x1={MID + Math.cos(angle) * 22}
          y1={MID + Math.sin(angle) * 22}
          x2={MID + Math.cos(angle) * reach}
          y2={MID + Math.sin(angle) * reach}
        />
      );
    })}
  </>
);

/** Sheared grid: a lattice bent progressively across itself. */
const Shear = ({ phase }: { phase: number }) => {
  const count = 22;
  const step = BOX / (count - 1);
  const skew = 18 + phase * 26;
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const t = i / (count - 1);
        const offset = Math.sin(t * Math.PI) * skew;
        return <line key={`h${i}`} x1={0} y1={i * step} x2={BOX} y2={i * step + offset} />;
      })}
      {Array.from({ length: count }, (_, i) => {
        const t = i / (count - 1);
        const offset = Math.sin(t * Math.PI) * skew;
        return <line key={`v${i}`} x1={i * step} y1={0} x2={i * step + offset} y2={BOX} />;
      })}
    </>
  );
};

const FIELDS: Record<string, (props: { phase: number }) => JSX.Element> = {
  "ai-data": Lattice,
  "backup-recovery": Polar,
  "storage-costs": Comb,
  guides: Interference,
  "product-updates": Sweep,
  company: Shear,
};

/**
 * Centred, axis-aligned, one opacity for the whole group.
 *
 * Scaled past the frame and clipped, so the field runs edge to edge instead of
 * sitting in the middle as an object: a contained figure reads as an icon, a
 * field that continues past the crop reads as a surface. Centring keeps it
 * symmetrical, and the same artwork still works when the cover is cropped to 2:1.
 */
const BLEED = 2.7;

const Field = ({ slug, phase, id }: { slug: string; phase: number; id: string }) => {
  const Drawing = FIELDS[slug] ?? Lattice;
  const x = (VIEW_W - BOX * BLEED) / 2;
  const y = (VIEW_H - BOX * BLEED) / 2;

  return (
    <g clipPath={`url(#${id}-frame)`}>
      <g
        opacity={0.1}
        stroke="#FFFFFF"
        strokeWidth={1}
        fill="none"
        vectorEffect="non-scaling-stroke"
        transform={`translate(${x} ${y}) scale(${BLEED})`}
      >
        <Drawing phase={phase} />
      </g>
    </g>
  );
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

  const palette = paletteFor(post);
  const categorySlug = post.tags?.[0]?.slug ?? "";
  const { blobs, gradients, softBlur, tightBlur, figurePhase } = composition(post.id);
  // Gradient ids must be unique per instance or they collide between covers.
  const id = `cover-${post.id}`;

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-0`} {...gradients[0]}>
          <stop offset="0" stopColor={palette.from} />
          <stop offset="1" stopColor={palette.to} />
        </linearGradient>
        <linearGradient id={`${id}-1`} {...gradients[1]}>
          <stop offset="0" stopColor={palette.accent} />
          <stop offset="1" stopColor={palette.to} />
        </linearGradient>
        {/*
          The filter region has to be generous: a blur of ~85 on a per-ellipse
          filter overflows a -50%/200% region and gets clipped into a hard
          straight edge across the artwork.
        */}
        <filter id={`${id}-soft`} x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation={softBlur} />
        </filter>
        <filter id={`${id}-tight`} x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation={tightBlur} />
        </filter>
        <clipPath id={`${id}-frame`}>
          <rect width={VIEW_W} height={VIEW_H} />
        </clipPath>
      </defs>

      <rect width={VIEW_W} height={VIEW_H} fill={palette.base} />
      {blobs.map((blob, index) => (
        <ellipse
          key={index}
          cx={blob.cx}
          cy={blob.cy}
          rx={blob.rx}
          ry={blob.ry}
          opacity={blob.opacity}
          fill={`url(#${id}-${blob.fill})`}
          filter={`url(#${id}-${blob.blur})`}
          transform={`rotate(${blob.rotate} ${blob.cx} ${blob.cy})`}
        />
      ))}
      <Field slug={categorySlug} phase={figurePhase} id={id} />
    </svg>
  );
};

export default BlogCover;
