/**
 * HeroLens — WebGL glass-lens overlay for the hero headline.
 *
 * Tweak constants are at the top of this file.
 */
import { useEffect, useRef } from "react";

// ─── Tweak constants ──────────────────────────────────────────────────────────
const RADIUS_FRACTION = 0.10;   // lens radius as fraction of canvas width
const REFRACTION      = 0.048;  // barrel-warp strength
const BLUR_STRENGTH   = 16.0;   // blur spread in canvas pixels
const BLUR_TAPS       = 12;     // blur sample count (baked into shader)
const EDGE_FEATHER    = 0.20;   // feather width as fraction of radius
const DRIFT_SPEED     = 0.00022;// radians/ms for autonomous drift
const FOLLOW_LERP     = 0.07;   // mouse-follow smoothing factor
const DRIFT_RADIUS_X  = 0.18;   // drift ellipse half-width (fraction of canvas)
const DRIFT_RADIUS_Y  = 0.18;   // drift ellipse half-height
const BOTTOM_PAD      = 0.10;   // extra canvas height below glyph — white space so CLAMP_TO_EDGE never repeats a descender pixel
const SAFE_OVERFLOW   = 18;     // max CSS px the canvas may extend below h1
// ─────────────────────────────────────────────────────────────────────────────

// ── Shaders ───────────────────────────────────────────────────────────────────

const VERT = /* glsl */`
  attribute vec2 a_pos;
  varying   vec2 v_uv;
  void main() {
    // v_uv (0,0)=bottom-left matches the WebGL convention.
    // Because we upload the texture with UNPACK_FLIP_Y_WEBGL=true the canvas
    // pixel origin (top-left) maps to UV (0,1), which is what we want.
    v_uv = a_pos * 0.5 + 0.5;
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`;

// BLUR_TAPS is spliced in at JS build time via .replace()
const FRAG_TEMPLATE = /* glsl */`
  precision highp float;

  uniform sampler2D u_tex;
  uniform vec2      u_res;       // canvas physical size (px)
  uniform vec2      u_center;    // lens centre in UV [0,1] — WebGL orientation
  uniform float     u_radius;    // lens radius in UV (fraction of width)
  uniform float     u_refr;      // refraction strength
  uniform float     u_blur;      // blur spread in px
  uniform float     u_feather;   // feather fraction of radius

  varying vec2 v_uv;

  float rand2(vec2 co) {
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec2  uv    = v_uv;
    float ar    = u_res.x / u_res.y;

    // Aspect-corrected distance from lens centre
    vec2  d     = (uv - u_center) * vec2(ar, 1.0);
    float dist  = length(d);
    float r     = u_radius * ar;

    // ── Lens mask (feathered circle) ─────────────────────────────────────────
    float mask  = 1.0 - smoothstep(r * (1.0 - u_feather),
                                   r * (1.0 + u_feather * 0.5),
                                   dist);

    // ── Refraction offset (barrel, zero at centre) ───────────────────────────
    float t       = clamp(dist / r, 0.0, 1.0);
    vec2  dDir    = normalize(d + vec2(1e-5));
    vec2  refrUV  = uv + (dDir / vec2(ar, 1.0)) * (u_refr * t * t);

    // ── Multi-tap rotational blur ────────────────────────────────────────────
    float jitter = rand2(uv) * 0.8;
    vec4  blurred = vec4(0.0);
    float wSum    = 0.0;
    for (int i = 0; i < ##TAPS##; i++) {
      float fi  = float(i) + jitter;
      float ang = fi * (6.28318 / float(##TAPS##));
      float rad = (u_blur / u_res.x) * (0.4 + 0.6 * fi / float(##TAPS##));
      vec2  sUV = refrUV + vec2(cos(ang), sin(ang)) * rad;
      blurred  += texture2D(u_tex, sUV);
      wSum     += 1.0;
    }
    blurred /= wSum;

    // Blend: sharp at centre, blurry toward edge
    vec4 sharp = texture2D(u_tex, refrUV);
    vec4 col   = mix(sharp, blurred, smoothstep(0.0, 0.85, t));

    // ── Chromatic aberration (rim only) ──────────────────────────────────────
    float ca    = u_refr * 0.65 * smoothstep(0.5, 1.0, t);
    vec2  caOff = (dDir / vec2(ar, 1.0)) * ca;
    col.r = mix(col.r, texture2D(u_tex, refrUV + caOff).r, mask * 0.7);
    col.b = mix(col.b, texture2D(u_tex, refrUV - caOff).b, mask * 0.7);

    // ── Specular highlight (top-left sheen) ──────────────────────────────────
    vec2  hlDir = normalize(vec2(-0.55, -0.75));
    float spec  = smoothstep(r * 0.65, 0.0, dist)
                * pow(max(dot(normalize(d), hlDir) + 0.55, 0.0), 3.0)
                * 0.15;
    col.rgb    += spec;

    // ── Composite ────────────────────────────────────────────────────────────
    // Show warped result inside lens, unwarped texture outside (canvas is
    // clipped to the lens circle via CSS clip-path, so outside is never seen).
    vec4 bg = texture2D(u_tex, uv);
    gl_FragColor = mix(bg, col, mask);
  }
`;

// ── WebGL helpers ─────────────────────────────────────────────────────────────

function compileShader(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
    console.error("Shader error:", gl.getShaderInfoLog(s));
  return s;
}

function buildProgram(gl: WebGLRenderingContext, vert: string, frag: string) {
  const p = gl.createProgram()!;
  gl.attachShader(p, compileShader(gl, gl.VERTEX_SHADER,   vert));
  gl.attachShader(p, compileShader(gl, gl.FRAGMENT_SHADER, frag));
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS))
    console.error("Program error:", gl.getProgramInfoLog(p));
  return p;
}

/**
 * Draw the h1 text onto an offscreen canvas and upload it as a WebGL texture.
 *
 * Vertical alignment strategy:
 *   The h1 has lineHeight:1.0, so its CSS box height == fontSize.
 *   We temporarily inject the clone into the live DOM (off-screen) so the
 *   browser performs real layout and we can read the exact baseline offset
 *   via Range.getBoundingClientRect() — then draw at that precise y.
 */
function buildTexture(
  gl: WebGLRenderingContext,
  h1: HTMLElement,
  canvasW: number,
  canvasH: number,
  dpr: number,
  existingTex: WebGLTexture | null,
  domLines: LineInfo[], // browser-detected lines (from Range API)
  safeTopCss: number,  // canvas CSS top offset relative to h1 top
): WebGLTexture {
  const cssW = canvasW / dpr;
  const cs   = window.getComputedStyle(h1);
  const fs   = parseFloat(cs.fontSize);
  const ls   = parseFloat(cs.letterSpacing) || 0;
  const text = (h1.textContent ?? "").trim();

  // ── Draw onto offscreen canvas ─────────────────────────────────────────────
  const off = document.createElement("canvas");
  off.width  = canvasW;
  off.height = canvasH;
  const ctx  = off.getContext("2d")!;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvasW, canvasH);

  ctx.scale(dpr, dpr);
  ctx.font         = `${cs.fontWeight} ${fs}px ${cs.fontFamily}`;
  ctx.fillStyle    = cs.color;
  ctx.textBaseline = "alphabetic";
  ctx.textAlign    = "left";

  // fontBoundingBoxAscent (measured with textBaseline="alphabetic") is the
  // distance from the alphabetic baseline to the font bounding-box top. Adding
  // it to the Range-API rect.top gives the alphabetic baseline position in
  // canvas CSS coords, which is the universal reference point shared by both
  // CSS layout and Canvas 2D — regardless of whether the font's bounding box
  // overflows its CSS line box (as Aspekta does).
  const fontBboxAscent = ctx.measureText("Hg").fontBoundingBoxAscent ?? (fs * 0.8);

  // Use Range-detected line info; fall back to single line at baseline ≈ 80% of fontSize.
  const linesToDraw: LineInfo[] = domLines.length > 0
    ? domLines
    : [{ text, topCss: fontBboxAscent }];

  linesToDraw.forEach(({ text: lineText, topCss }) => {
    // Measure width char-by-char to account for letter-spacing
    let lineW = 0;
    for (const ch of lineText) lineW += ctx.measureText(ch).width;
    lineW += ls * Math.max(0, [...lineText].length - 1);

    const x0 = cssW / 2 - lineW / 2;
    // alphabetic baseline in canvas CSS coords:
    //   rect.top (font bbox top relative to h1) − safeTopCss + fontBboxAscent
    // This maps the Range-API font bbox top to the alphabetic baseline, which
    // Canvas 2D's "alphabetic" textBaseline draws relative to.
    const y = topCss - safeTopCss + fontBboxAscent;
    let x = x0;
    for (const ch of lineText) {
      ctx.fillText(ch, x, y);
      x += ctx.measureText(ch).width + ls;
    }
  });

  // ── Upload ─────────────────────────────────────────────────────────────────
  if (existingTex) gl.deleteTexture(existingTex);
  const tex = gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, off);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  return tex;
}

/** A detected line of text with its measured y position. */
interface LineInfo {
  text: string;
  /** Font bounding-box top in CSS px, relative to h1's top edge.
   *  Using the measured rect.top (font bbox, not line-box) gives us
   *  pixel-accurate vertical alignment regardless of font overflow. */
  topCss: number;
}

/**
 * Use the browser's Range API to detect which text belongs to each visual line
 * in the h1 element. Returns the trimmed text of each line together with the
 * font bounding-box top (rect.top − h1.top) measured from the first character
 * on that line. This y value is passed straight to Canvas 2D fillText so the
 * texture glyphs sit at exactly the same pixel rows as the DOM-rendered text,
 * even for fonts (like Aspekta) whose bounding boxes overflow their line boxes.
 */
function detectLines(h1: HTMLElement): LineInfo[] {
  // Find the direct text node (skip child elements like the canvas overlay)
  let textNode: Text | null = null;
  for (const child of Array.from(h1.childNodes)) {
    if (child.nodeType === Node.TEXT_NODE && child.textContent?.trim()) {
      textNode = child as Text;
      break;
    }
  }
  if (!textNode) return [];

  const fullText = textNode.textContent ?? "";
  if (!fullText.trim()) return [];

  const h1Rect  = h1.getBoundingClientRect();
  const lines: LineInfo[] = [];
  let lineStart   = 0;
  let prevTop: number | null = null;
  let lineTopCss  = 0;

  for (let i = 0; i < fullText.length; i++) {
    const range = document.createRange();
    range.setStart(textNode, i);
    range.setEnd(textNode, i + 1);
    const rect = range.getBoundingClientRect();

    // Skip invisible characters (zero-width glyphs, trailing whitespace, etc.)
    if (rect.width === 0 && rect.height === 0) continue;

    if (prevTop === null) {
      prevTop   = rect.top;
      lineTopCss = rect.top - h1Rect.top;
    } else if (rect.top > prevTop + 2) {
      // New line detected — flush previous line
      const lineText = fullText.slice(lineStart, i).trim();
      if (lineText) lines.push({ text: lineText, topCss: lineTopCss });
      lineStart  = i;
      prevTop    = rect.top;
      lineTopCss = rect.top - h1Rect.top;
    }
  }

  // Flush the last line
  const lastLine = fullText.slice(lineStart).trim();
  if (lastLine) lines.push({ text: lastLine, topCss: lineTopCss });

  return lines;
}

// ── Component ─────────────────────────────────────────────────────────────────

interface HeroLensProps {
  h1Ref: React.RefObject<HTMLElement>;
  /** Background color of the hero section — must match the page exactly so
   *  the canvas is invisible outside the lens circle. */
  bg?: string;
}

const HeroLens: React.FC<HeroLensProps> = ({ h1Ref, bg = "#ffffff" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const h1     = h1Ref.current;
    if (!canvas || !h1) return;

    const dpr = window.devicePixelRatio || 1;
    const gl  = canvas.getContext("webgl", { alpha: false, premultipliedAlpha: false });
    if (!gl) return;

    // ── Build GPU program ────────────────────────────────────────────────────
    const frag = FRAG_TEMPLATE.replace(/##TAPS##/g, String(BLUR_TAPS));
    const prog = buildProgram(gl, VERT, frag);

    // Fullscreen quad (triangle strip)
    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER,
      new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    gl.useProgram(prog);
    const uRes    = gl.getUniformLocation(prog, "u_res");
    const uCenter = gl.getUniformLocation(prog, "u_center");
    const uRadius = gl.getUniformLocation(prog, "u_radius");
    const uRefr   = gl.getUniformLocation(prog, "u_refr");
    const uBlur   = gl.getUniformLocation(prog, "u_blur");
    const uFeat   = gl.getUniformLocation(prog, "u_feather");

    gl.uniform1f(uRefr, REFRACTION);
    gl.uniform1f(uBlur, BLUR_STRENGTH);
    gl.uniform1f(uFeat, EDGE_FEATHER);
    gl.uniform1i(gl.getUniformLocation(prog, "u_tex"), 0);

    // ── State ────────────────────────────────────────────────────────────────
    let tex: WebGLTexture | null = null;
    let lensUV   = { x: 0.5, y: 0.5 };
    let targetUV = { x: 0.5, y: 0.5 };
    let isHovered = false;
    let raf = 0;
    let startTime = 0;
    let canvasW_css = 1;
    let canvasH_css = 1;

    // ── Resize / retexture ───────────────────────────────────────────────────
    function resize() {
      const cssW = h1.offsetWidth;
      if (!cssW) return;

      // Use Range to get the exact rendered glyph bounds, not the full layout box.
      // This avoids the canvas being taller than the visible text.
      let glyphTop  = 0;
      let glyphH    = h1.offsetHeight;
      try {
        const range  = document.createRange();
        range.selectNodeContents(h1);
        const rects   = range.getClientRects();
        const h1Rect  = h1.getBoundingClientRect();
        if (rects.length > 0) {
          glyphTop = rects[0].top - h1Rect.top;  // offset from element top
          // Use full span from first rect top to last rect bottom (multi-line)
          const lastRect = rects[rects.length - 1];
          glyphH = lastRect.bottom - rects[0].top;
        }
      } catch (_) { /* use defaults */ }

      // If glyphTop is negative the glyph extends above the h1 element top.
      // Clamp the canvas to top:0 and add the extra height so text is
      // drawn at the correct offset — otherwise the canvas bleeds upward
      // into sibling elements (e.g. the "Fil" label) and covers them.
      const extraAbove  = Math.max(0, -glyphTop);
      const safeTop     = Math.max(0, glyphTop);
      // Extra bottom padding so descenders (e.g. "g", "y") sit inside the canvas
      // rather than at its very edge. CLAMP_TO_EDGE on a boundary pixel smears
      // the edge row and distorts descender tips under lens refraction.
      // The extra canvas area is opaque bg colour so it's invisible.
      const bottomPad   = Math.round(glyphH * BOTTOM_PAD);
      // Cap so the canvas never extends more than SAFE_OVERFLOW px below h1.offsetHeight.
      // SAFE_OVERFLOW < marginTop of the description (22px), so no sibling text is covered.
      const adjustedH   = Math.min(
        glyphH + extraAbove + bottomPad,
        h1.offsetHeight - safeTop + SAFE_OVERFLOW,
      );

      const pw = Math.round(cssW       * dpr);
      const ph = Math.round(adjustedH  * dpr);

      canvas.width  = pw;
      canvas.height = ph;
      canvas.style.width    = `${cssW}px`;
      canvas.style.height   = `${adjustedH}px`;
      canvas.style.position = "absolute";
      canvas.style.top      = `${safeTop}px`;
      canvas.style.left     = "0";
      canvas.style.clipPath = "";
      canvasW_css = cssW;
      canvasH_css = adjustedH;

      gl.viewport(0, 0, pw, ph);
      gl.uniform2f(uRes, pw, ph);
      gl.uniform1f(uRadius, RADIUS_FRACTION);

      // Detect browser-accurate line breaks via Range API so the texture has
      // the correct text on each line (fixes iOS Safari where Canvas 2D
      // measureText word-wrap disagrees with browser layout).
      // y positions are derived inside buildTexture from CSS lineHeight × index,
      // which is device-independent and matches the browser's vertical spacing.
      const domLines = detectLines(h1);
      tex = buildTexture(gl, h1, pw, ph, dpr, tex, domLines, safeTop);
    }

    // ── Render loop ──────────────────────────────────────────────────────────
    function draw(now: number) {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;

      if (!isHovered) {
        // Lissajous drift — starts near centre
        const angle  = elapsed * DRIFT_SPEED - Math.PI / 2;
        targetUV.x   = 0.5 + Math.cos(angle)         * DRIFT_RADIUS_X;
        targetUV.y   = 0.5 + Math.sin(angle * 1.618)  * DRIFT_RADIUS_Y * 0.55;
      }

      // Clamp lens centre so the full circle always stays inside the canvas
      const radiusPx  = RADIUS_FRACTION * canvasW_css;          // radius in CSS px
      const padX      = radiusPx / canvasW_css;
      const padY      = radiusPx / canvasH_css;
      targetUV.x = Math.max(padX, Math.min(1 - padX, targetUV.x));
      targetUV.y = Math.max(padY, Math.min(1 - padY, targetUV.y));

      lensUV.x += (targetUV.x - lensUV.x) * FOLLOW_LERP;
      lensUV.y += (targetUV.y - lensUV.y) * FOLLOW_LERP;

      // Mask canvas to the lens circle with a soft feathered edge
      const cx = lensUV.x * canvasW_css;
      const cy = lensUV.y * canvasH_css;
      const innerR = radiusPx * (1 - EDGE_FEATHER);
      const outerR = radiusPx * (1 + EDGE_FEATHER * 0.5);
      const mask = `radial-gradient(circle at ${cx}px ${cy}px, black ${innerR}px, transparent ${outerR}px)`;
      canvas.style.maskImage = mask;
      canvas.style.webkitMaskImage = mask;

      if (tex) {
        gl.clearColor(1, 1, 1, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.bindTexture(gl.TEXTURE_2D, tex);
        // WebGL v_uv.y=0 is bottom; our texture is flipped on upload,
        // so we pass the logical Y directly (no 1-y flip needed).
        gl.uniform2f(uCenter, lensUV.x, 1.0 - lensUV.y);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }

      raf = requestAnimationFrame(draw);
    }

    // ── Mouse events (attached to h1, canvas is pointer-events:none) ─────────
    function onMouseMove(e: MouseEvent) {
      // Use canvas rect (not h1) so UV maps to the canvas coordinate space,
      // which may differ from h1 in both top offset (safeTop) and height.
      const r = canvas.getBoundingClientRect();
      targetUV.x = (e.clientX - r.left) / r.width;
      targetUV.y = (e.clientY - r.top)  / r.height;
    }
    function onMouseEnter() { isHovered = true; }
    function onMouseLeave() { isHovered = false; }

    h1.addEventListener("mousemove",  onMouseMove);
    h1.addEventListener("mouseenter", onMouseEnter);
    h1.addEventListener("mouseleave", onMouseLeave);

    // Re-texture when fonts finish loading
    const ffs = (document as Document & { fonts?: FontFaceSet }).fonts;
    if (ffs) ffs.ready.then(resize);

    // Re-size when h1 changes dimensions
    const ro = new ResizeObserver(resize);
    ro.observe(h1);
    resize();

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      h1.removeEventListener("mousemove",  onMouseMove);
      h1.removeEventListener("mouseenter", onMouseEnter);
      h1.removeEventListener("mouseleave", onMouseLeave);
      if (tex) gl.deleteTexture(tex);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
    };
  }, [h1Ref]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none", zIndex: 10 }}
    />
  );
};

export default HeroLens;
